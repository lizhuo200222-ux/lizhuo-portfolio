param(
  [string]$Message = ""
)

# 把当前改动提交并推送到 GitHub（origin/master）
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

git add -A
$staged = git diff --cached --name-only
if (-not $staged) {
  Write-Host "[sync] 没有需要提交的改动"
  exit 0
}

if ([string]::IsNullOrWhiteSpace($Message)) {
  $Message = "auto: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
}

git -c core.quotepath=false commit -m $Message | Out-Null

$branch = git rev-parse --abbrev-ref HEAD
git push origin $branch 2>&1 | ForEach-Object { Write-Host "[sync] $_" }
Write-Host "[sync] 已推送 $branch"
