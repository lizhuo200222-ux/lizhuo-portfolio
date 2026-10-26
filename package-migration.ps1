[CmdletBinding()]
param(
    [string]$OutputDirectory,
    [switch]$SkipHash
)

$ErrorActionPreference = 'Stop'
$sourceRoot = (Resolve-Path -LiteralPath (Split-Path -Parent $MyInvocation.MyCommand.Definition)).Path

function Write-Utf8NoBom {
    param(
        [string]$Path,
        [string]$Content
    )
    $encoding = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Content, $encoding)
}

if ([string]::IsNullOrWhiteSpace($OutputDirectory)) {
    $OutputDirectory = Join-Path (Split-Path -Parent $sourceRoot) ("生图-迁移包-" + (Get-Date -Format 'yyyyMMdd-HHmmss'))
}

$outputRoot = [IO.Path]::GetFullPath($OutputDirectory)
$sourcePrefix = $sourceRoot.TrimEnd('\') + '\'
if ($outputRoot.StartsWith($sourcePrefix, [StringComparison]::OrdinalIgnoreCase)) {
    throw 'OutputDirectory must be outside the project root to avoid packaging the archive into itself.'
}

$packageRoot = $outputRoot
$suffix = 2
while (Test-Path -LiteralPath $packageRoot) {
    $packageRoot = "$outputRoot-v$suffix"
    $suffix++
}
$stagingParent = Join-Path (Split-Path -Parent $packageRoot) ("_staging_" + (Split-Path -Leaf $packageRoot))
if (Test-Path -LiteralPath $stagingParent) {
    throw "Staging path already exists: $stagingParent"
}
$stageRoot = Join-Path $stagingParent 'li-zhuo-portfolio-legacy'
$zipPath = Join-Path $packageRoot 'li-zhuo-portfolio-migration.zip'
New-Item -ItemType Directory -Path $packageRoot,$stageRoot -Force | Out-Null

try {
    $excludedNames = @('node_modules', '.playwright-cli', '.superpowers', '__pycache__', '.venv', 'venv')
    $excludedDirectories = @(
        Get-ChildItem -LiteralPath $sourceRoot -Recurse -Directory -Force -ErrorAction SilentlyContinue |
            Where-Object { $excludedNames -contains $_.Name } |
            ForEach-Object { $_.FullName }
    )
    $excludedDirectories += (Join-Path $sourceRoot '兼职接单')
    $excludedFiles = @((Join-Path $sourceRoot 'offboarding-cleanup-preview-2026-08-13.md'))

    $robocopyArgs = @(
        $sourceRoot,
        $stageRoot,
        '/E', '/COPY:DAT', '/DCOPY:DAT', '/R:1', '/W:1', '/XJ', '/FFT',
        '/NP', '/NFL', '/NDL', '/NJH', '/NJS', '/XD'
    ) + $excludedDirectories + @('/XF') + $excludedFiles
    & robocopy @robocopyArgs
    if ($LASTEXITCODE -gt 7) {
        throw "robocopy failed with exit code $LASTEXITCODE"
    }

    $portableFiles = @(Get-ChildItem -LiteralPath $stageRoot -Recurse -File -Force | Sort-Object FullName)
    $textExtensions = @('.json', '.js', '.jsx', '.ts', '.tsx', '.py', '.ps1', '.md', '.txt', '.html', '.css', '.yml', '.yaml')
    $secretPattern = '(?i)(sk-[A-Za-z0-9]{20,}|Bearer\s+[A-Za-z0-9._-]{20,}|(?:api[_-]?key|token|password|secret|cookie)\s*[:=]\s*["''][^"'']{12,}["''])'
    $secretHits = @(
        $portableFiles |
            Where-Object { $textExtensions -contains $_.Extension.ToLowerInvariant() } |
            Select-String -Pattern $secretPattern -AllMatches -ErrorAction SilentlyContinue
    )
    if ($secretHits.Count -gt 0) {
        $examples = ($secretHits | Select-Object -First 5 | ForEach-Object { "$($_.Path):$($_.LineNumber)" }) -join ', '
        throw "Potential hard-coded secret detected; package stopped. Review: $examples"
    }

    $entries = [System.Collections.Generic.List[object]]::new()
    $index = 0
    foreach ($file in $portableFiles) {
        $index++
        $relative = $file.FullName.Substring($stageRoot.Length + 1).Replace('\', '/')
        $hash = $null
        if (-not $SkipHash) {
            $hash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
        }
        $entries.Add([ordered]@{
            path = $relative
            bytes = [int64]$file.Length
            sha256 = $hash
        })
        if (($index % 250) -eq 0) {
            Write-Host "hashed $index/$($portableFiles.Count)"
        }
    }

    $gitHead = (& git -C $sourceRoot rev-parse HEAD 2>$null).Trim()
    $statusCount = @(git -C $sourceRoot status --porcelain 2>$null).Count
    $totalBytes = ($portableFiles | Measure-Object -Property Length -Sum).Sum
    $manifest = [ordered]@{
        schemaVersion = 1
        packageName = (Split-Path -Leaf $stageRoot)
        createdAt = (Get-Date).ToUniversalTime().ToString('o')
        sourceKind = 'legacy portfolio web project'
        legacyBaseline = $true
        gitHead = $gitHead
        workingTreeChangesAtPackaging = $statusCount
        nodeVersion = (& node --version).Trim()
        npmVersion = (& npm --version).Trim()
        fileCount = $portableFiles.Count
        totalBytes = [int64]$totalBytes
        hashesIncluded = (-not $SkipHash)
        excluded = @('node_modules', '兼职接单/.build/node_modules', '视频剪辑/**/.venv', '**/__pycache__', '.playwright-cli', '.superpowers', '兼职接单', 'offboarding-cleanup-preview-2026-08-13.md')
        files = $entries
    }
    $manifestPath = Join-Path $stageRoot 'MIGRATION_MANIFEST.json'
    Write-Utf8NoBom -Path $manifestPath -Content ($manifest | ConvertTo-Json -Depth 8)

    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::CreateFromDirectory($stagingParent, $zipPath, [System.IO.Compression.CompressionLevel]::Optimal, $false)

    $archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
    try {
        $entriesInZip = @($archive.Entries | Where-Object { -not $_.FullName.EndsWith('/') })
        $forbidden = @($entriesInZip | Where-Object { $_.FullName -match '(^|/)(node_modules|\.playwright-cli|\.superpowers|__pycache__|\.venv|venv)(/|$)' -or $_.FullName -match '(^|/)兼职接单(/|$)' })
        if ($forbidden.Count -gt 0) {
            throw 'Archive contains an excluded directory.'
        }
    } finally {
        $archive.Dispose()
    }

    $archiveHash = (Get-FileHash -LiteralPath $zipPath -Algorithm SHA256).Hash.ToLowerInvariant()
    $manifestHash = (Get-FileHash -LiteralPath $manifestPath -Algorithm SHA256).Hash.ToLowerInvariant()
    Copy-Item -LiteralPath (Join-Path $stageRoot 'MIGRATION_MANIFEST.json') -Destination (Join-Path $packageRoot 'MIGRATION_MANIFEST.json') -Force
    Copy-Item -LiteralPath (Join-Path $stageRoot 'MIGRATION_README.md') -Destination (Join-Path $packageRoot 'MIGRATION_README.md') -Force
    Copy-Item -LiteralPath (Join-Path $stageRoot 'verify-migration.ps1') -Destination (Join-Path $packageRoot 'verify-migration.ps1') -Force
    Write-Utf8NoBom -Path (Join-Path $packageRoot 'SHA256SUMS.txt') -Content (
        @("$archiveHash  $(Split-Path -Leaf $zipPath)", "$manifestHash  MIGRATION_MANIFEST.json") -join [Environment]::NewLine
    )

    Write-Host "package=$packageRoot"
    Write-Host "archive=$zipPath"
    Write-Host "archive_bytes=$((Get-Item -LiteralPath $zipPath).Length)"
    Write-Host "archive_sha256=$archiveHash"
    Write-Host "manifest_sha256=$manifestHash"
    Write-Host "source_files=$($portableFiles.Count)"
    Write-Host "source_bytes=$totalBytes"
    Write-Host 'package_status=verified'
} finally {
    if (Test-Path -LiteralPath $stagingParent) {
        Remove-Item -LiteralPath $stagingParent -Recurse -Force
    }
}
