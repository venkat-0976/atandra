Write-Host "Starting image audit..." -ForegroundColor Cyan

$distPath = "dist"

if (!(Test-Path $distPath)) {
    Write-Host "dist folder not found. Run build first." -ForegroundColor Red
    exit
}

$htmlFiles = Get-ChildItem -Path $distPath -Recurse -Filter *.html

$images = @()

foreach ($file in $htmlFiles) {
    $lines = Get-Content $file.FullName

    foreach ($line in $lines) {

        # og:image
        if ($line -like '*og:image*content=*') {
            $start = $line.IndexOf('content="')
            if ($start -ge 0) {
                $start = $start + 9
                $end = $line.IndexOf('"', $start)
                if ($end -gt $start) {
                    $images += $line.Substring($start, $end - $start)
                }
            }
        }

        # img src
        if ($line -like '*<img*src=*') {
            $start = $line.IndexOf('src="')
            if ($start -ge 0) {
                $start = $start + 5
                $end = $line.IndexOf('"', $start)
                if ($end -gt $start) {
                    $images += $line.Substring($start, $end - $start)
                }
            }
        }
    }
}

$images = $images | Sort-Object -Unique

$images | Out-File all-image-urls.txt -Encoding utf8

$images | Where-Object { $_ -like '* *' } |
    Out-File space-images.txt -Encoding utf8

$images | Where-Object {
    ($_ -split '/' | Select-Object -Last 1) -cmatch '[A-Z]'
} | Out-File uppercase-images.txt -Encoding utf8

$missing = @()

foreach ($img in $images) {
    if ($img.StartsWith("http")) { continue }

    $localPath = Join-Path $distPath ($img.TrimStart('/'))
    if (!(Test-Path $localPath)) {
        $missing += $img
    }
}

$missing | Out-File missing-images.txt -Encoding utf8

Write-Host "Audit complete." -ForegroundColor Green
Write-Host "Generated:"
Write-Host " - all-image-urls.txt"
Write-Host " - space-images.txt"
Write-Host " - uppercase-images.txt"
Write-Host " - missing-images.txt"
