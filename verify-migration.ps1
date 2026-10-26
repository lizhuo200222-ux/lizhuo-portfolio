[CmdletBinding()]
param(
    [switch]$Install,
    [switch]$Build,
    [switch]$Test
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -LiteralPath $projectRoot

$failures = [System.Collections.Generic.List[string]]::new()

function Require-File {
    param([string]$RelativePath)
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $RelativePath) -PathType Leaf)) {
        $failures.Add("missing file: $RelativePath")
    }
}

function Require-Directory {
    param([string]$RelativePath)
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $RelativePath) -PathType Container)) {
        $failures.Add("missing directory: $RelativePath")
    }
}

function Invoke-NpmChecked {
    param([string[]]$Arguments)
    & npm @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "npm command failed ($LASTEXITCODE): npm $($Arguments -join ' ')"
    }
}

foreach ($file in @(
    'package.json',
    'package-lock.json',
    'index.html',
    'vite.config.js',
    'README.md',
    'MIGRATION_README.md',
    'src/main.jsx',
    'src/data.js',
    'src/styles.css',
    'src/components/DepthCarousel.jsx',
    'src/components/MorphSlider.jsx',
    'src/components/VariableProximity.jsx'
)) {
    Require-File $file
}

foreach ($directory in @(
    'src',
    'public/assets',
    'public/assets/portfolio/dome-posters/collection',
    'docs/references/source-materials/poster-originals',
    'public/assets/portfolio/generation-workbench'
)) {
    Require-Directory $directory
}

try {
    $packageJson = Get-Content -LiteralPath (Join-Path $projectRoot 'package.json') -Raw | ConvertFrom-Json
    if (-not $packageJson.dependencies) {
        $failures.Add('package.json has no dependencies')
    }
} catch {
    $failures.Add("package.json is not valid JSON: $($_.Exception.Message)")
}

$posterDir = Join-Path $projectRoot 'public/assets/portfolio/dome-posters/collection'
$posterCount = @(Get-ChildItem -LiteralPath $posterDir -File -ErrorAction SilentlyContinue | Where-Object { $_.Extension -match '^\.(jpe?g|png|webp)$' }).Count
if ($posterCount -ne 47) {
    $failures.Add("poster collection count is $posterCount; expected 47")
}
$posterOriginalDir = Join-Path $projectRoot 'docs/references/source-materials/poster-originals'
$posterOriginalCount = @(Get-ChildItem -LiteralPath $posterOriginalDir -File -ErrorAction SilentlyContinue | Where-Object { $_.Extension -match '^\.(jpe?g|png|webp)$' }).Count
if ($posterOriginalCount -ne 47) {
    $failures.Add("poster original input count is $posterOriginalCount; expected 47")
}

$peopleDir = Join-Path $projectRoot 'public/assets/portfolio/generation-workbench/batch-people'
$watermelonDir = Join-Path $projectRoot 'public/assets/portfolio/generation-workbench/batch-watermelon'
$peopleCount = @(Get-ChildItem -LiteralPath $peopleDir -File -ErrorAction SilentlyContinue).Count
$watermelonCount = @(Get-ChildItem -LiteralPath $watermelonDir -File -ErrorAction SilentlyContinue).Count
if ($peopleCount -ne 10) {
    $failures.Add("people candidate count is $peopleCount; expected 10")
}
if ($watermelonCount -ne 10) {
    $failures.Add("watermelon source count is $watermelonCount; expected 10")
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    $failures.Add('node executable not found')
} else {
    $nodeVersion = (& node --version).Trim()
    if ($nodeVersion -match '^v(\d+)' -and [int]$Matches[1] -lt 18) {
        $failures.Add("Node.js $nodeVersion is too old; use Node 18 or newer")
    }
    Write-Host "node=$nodeVersion"
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    $failures.Add('npm executable not found')
} else {
    Write-Host "npm=$((& npm --version).Trim())"
}

if ($failures.Count -gt 0) {
    Write-Host 'migration_status=failed' -ForegroundColor Red
    $failures | ForEach-Object { Write-Host "ERROR: $_" -ForegroundColor Red }
    exit 1
}

if ($Install) {
    Write-Host 'installing dependencies with npm ci'
    Invoke-NpmChecked @('ci', '--no-audit', '--no-fund')
}

if ($Build) {
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'node_modules') -PathType Container)) {
        throw 'Build requested but node_modules is missing. Run with -Install first.'
    }
    Write-Host 'running production build'
    Invoke-NpmChecked @('run', 'build')
}

if ($Test) {
    Write-Host 'running project tests'
    & node --test `
        src/portfolioPresentation.test.js `
        src/generationWorkbench.test.js `
        src/portfolioEffects.test.js `
        src/galleryLayout.test.js `
        src/circularGalleryContract.test.js
    if ($LASTEXITCODE -ne 0) {
        throw "node tests failed ($LASTEXITCODE)"
    }
}

Write-Host 'migration_status=verified' -ForegroundColor Green
