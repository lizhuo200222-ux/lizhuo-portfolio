# 监听工作区：改动稳定后自动提交并推送到 GitHub
# 用法：powershell -ExecutionPolicy Bypass -File tools\watch-push.ps1
$ErrorActionPreference = 'SilentlyContinue'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$interval = 6      # 轮询间隔（秒）
$stableNeed = 2    # 连续几次状态不变才提交，避免改到一半就推
$last = ''
$stable = 0

Write-Host "[watch] 开始监听：$root"
while ($true) {
  $status = (git status --porcelain | Out-String).Trim()
  if ($status) {
    if ($status -eq $last) { $stable++ } else { $last = $status; $stable = 0 }
    if ($stable -ge $stableNeed) {
      & "$PSScriptRoot\sync.ps1" -Message ("auto: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss"))
      $last = ''; $stable = 0
    }
  } else {
    $last = ''; $stable = 0
  }
  Start-Sleep -Seconds $interval
}
