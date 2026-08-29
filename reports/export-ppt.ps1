param(
  [Parameter(Mandatory = $true)][string]$PptxPath,
  [Parameter(Mandatory = $true)][string]$PdfPath,
  [Parameter(Mandatory = $true)][string]$RenderDir
)

$ErrorActionPreference = 'Stop'
$pptx = (Resolve-Path -LiteralPath $PptxPath).Path
$pdf = [System.IO.Path]::GetFullPath($PdfPath)
$render = [System.IO.Path]::GetFullPath($RenderDir)
[System.IO.Directory]::CreateDirectory($render) | Out-Null

$powerPoint = New-Object -ComObject PowerPoint.Application
try {
  $presentation = $powerPoint.Presentations.Open($pptx, $false, $false, $false)
  try {
    $presentation.SaveAs($pdf, 32)
    $presentation.Export($render, 'PNG', 1600, 900)
  }
  finally {
    $presentation.Close()
  }
}
finally {
  $powerPoint.Quit()
  [System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($powerPoint) | Out-Null
}

Write-Output "PDF: $pdf"
Write-Output "Rendered slides: $render"
