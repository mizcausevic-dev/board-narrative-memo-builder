$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-MemoImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Board Narrative Memo Builder", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic board-memo render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-MemoImage -Title "Board narrative overview for the next executive review" -Subtitle "One memo layer for exposure, savings, investment priority, and recommendation strength." -Bullets @(
  "The overview keeps board-ready tracks, blocked narratives, and investment posture visible in one executive surface.",
  "Leadership can see which stories already travel well and which still need sharper evidence or decision framing.",
  "This layer turns scorecards and proof packets into a reusable memo instead of another manual board-prep cycle."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-MemoImage -Title "Memo lane keeps board questions and next decisions connected" -Subtitle "Every route retains the audience, owner, memo theme, readiness, and next board decision." -Bullets @(
  "The memo-lane view makes it obvious which narratives are ready now and which are still blocked by weak ownership or compression.",
  "Board questions stay attached to an actual owner and a concrete next decision instead of floating in abstract strategy language.",
  "Leadership can tighten the memo before the next board, investor, or diligence review begins."
) -OutputPath (Join-Path $screenshots "02-memo-lane-proof.png")

New-MemoImage -Title "Narrative gaps show where confidence and evidence still break" -Subtitle "Risk, confidence, headline gaps, and company-tag traces stay visible in one board-readout." -Bullets @(
  "This view keeps IBM, CyberArk, biotech, procurement, and revenue traces tied to actual live surfaces and memo tracks.",
  "Confidence gaps stay visible before the board packet overclaims what the system can really support.",
  "Leadership can see which narrative upgrade will remove the most friction from the next board cycle."
) -OutputPath (Join-Path $screenshots "03-narrative-gaps-proof.png")

New-MemoImage -Title "Investment posture keeps savings and recommendation strength together" -Subtitle "Memo pressure remains grounded in investment priority, savings potential, and linked proof surfaces." -Bullets @(
  "The executive story stays tied to actual recommendation strength rather than vague strategy language.",
  "Weak investment asks remain visible before they turn into another inconclusive board discussion.",
  "This creates a repeatable board memo pattern that can travel into diligence, investor, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-investment-posture-proof.png")
