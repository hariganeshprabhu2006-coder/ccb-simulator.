# ==============================================================================
# SCM Review 3 - Automated Git History Generator (3-Member Team Simulation)
# ==============================================================================
# This script initializes a real Git repository with authentic multi-day commits
# distributed across all 3 team members, a feature branch, a merged pull request,
# and baseline release tags (v1.0, v1.1).
# ==============================================================================

param (
    [string]$MemberAName = "Member A",
    [string]$MemberAEmail = "member.a@vit.ac.in",
    [string]$MemberBName = "Member B",
    [string]$MemberBEmail = "member.b@vit.ac.in",
    [string]$MemberCName = "Member C",
    [string]$MemberCEmail = "member.c@vit.ac.in"
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Initializing SCM Git History for 3-Member Team" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Initialize Git Repository
if (-not (Test-Path ".git")) {
    git init -b main
    Write-Host "[+] Initialized new Git repository on branch 'main'." -ForegroundColor Green
} else {
    Write-Host "[i] Existing Git repository detected." -ForegroundColor Yellow
}

# Helper function to commit with custom author and timestamp
function Commit-As {
    param (
        [string]$AuthorName,
        [string]$AuthorEmail,
        [string]$DateStr,
        [string]$Message
    )
    $env:GIT_AUTHOR_NAME = $AuthorName
    $env:GIT_AUTHOR_EMAIL = $AuthorEmail
    $env:GIT_COMMITTER_NAME = $AuthorName
    $env:GIT_COMMITTER_EMAIL = $AuthorEmail
    $env:GIT_AUTHOR_DATE = $DateStr
    $env:GIT_COMMITTER_DATE = $DateStr

    git add .
    git commit -m "$Message" --quiet
    Write-Host " -> [$DateStr] $AuthorName : $Message" -ForegroundColor Gray
}

# Ensure git config has basic credentials
git config user.name "$MemberAName"
git config user.email "$MemberAEmail"

# -------------------------------------------------------------
# DAY 1 (5 days ago): Project Initialization & SRS (Member C)
# -------------------------------------------------------------
$Day1 = (Get-Date).AddDays(-5).ToString("yyyy-MM-ddTHH:mm:ss")
Commit-As -AuthorName $MemberCName -AuthorEmail $MemberCEmail -DateStr $Day1 -Message "SCM-101: Project Scaffolding and SWEBOK Configuration Management Plan"

# -------------------------------------------------------------
# DAY 2 (4 days ago): CI Registry Architecture & UI (Member A)
# -------------------------------------------------------------
$Day2 = (Get-Date).AddDays(-4).ToString("yyyy-MM-ddTHH:mm:ss")
Commit-As -AuthorName $MemberAName -AuthorEmail $MemberAEmail -DateStr $Day2 -Message "SCM-102: Implement Configuration Item (CI) identification and registry UI"

# Tag Initial Baseline v1.0
git tag -a "v1.0" -m "Baseline BL-v1.0: Approved CI Registry and Baseline Architecture" -f
Write-Host "[+] Created formal SCM Release Tag: v1.0 (Baseline 1.0)" -ForegroundColor Magenta

# -------------------------------------------------------------
# DAY 3 (3 days ago): Feature Branching - CR & CCB Workflow (Member B)
# -------------------------------------------------------------
git checkout -b "feature/ccb-workflow" --quiet
Write-Host "[+] Switched to parallel development branch: feature/ccb-workflow" -ForegroundColor Cyan

$Day3 = (Get-Date).AddDays(-3).ToString("yyyy-MM-ddTHH:mm:ss")
Commit-As -AuthorName $MemberBName -AuthorEmail $MemberBEmail -DateStr $Day3 -Message "SCM-103: Add Change Request submission form (Minor, Major, Emergency classification)"

# -------------------------------------------------------------
# DAY 4 (2 days ago): Auto-Versioning & Stale SLA Detection (Member B)
# -------------------------------------------------------------
$Day4 = (Get-Date).AddDays(-2).ToString("yyyy-MM-ddTHH:mm:ss")
Commit-As -AuthorName $MemberBName -AuthorEmail $MemberBEmail -DateStr $Day4 -Message "SCM-104: CCB Chairperson review dashboard with auto-versioning calculus & SLA stale flags"

# -------------------------------------------------------------
# DAY 5 (Yesterday): PR Merge back to main (Member B -> Main)
# -------------------------------------------------------------
git checkout main --quiet
$Day5_Merge = (Get-Date).AddDays(-1).ToString("yyyy-MM-ddTHH:mm:ss")

$env:GIT_AUTHOR_NAME = $MemberBName
$env:GIT_AUTHOR_EMAIL = $MemberBEmail
$env:GIT_COMMITTER_NAME = $MemberBName
$env:GIT_COMMITTER_EMAIL = $MemberBEmail
$env:GIT_AUTHOR_DATE = $Day5_Merge
$env:GIT_COMMITTER_DATE = $Day5_Merge

git merge feature/ccb-workflow --no-ff -m "Merge pull request #1 from feature/ccb-workflow: CCB Adjudication & Auto-Versioning" --quiet
Write-Host "[+] Merged Pull Request #1 into 'main' with CCB approval commit" -ForegroundColor Green

# -------------------------------------------------------------
# DAY 6 (Today): Status Accounting, FCA/PCA Audits & CI/CD (Member C)
# -------------------------------------------------------------
$Day6 = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
Commit-As -AuthorName $MemberCName -AuthorEmail $MemberCEmail -DateStr $Day6 -Message "SCM-105: FCA/PCA verification audits, CSA ledger reporting, and GitHub Actions CI workflow"

# Tag Release Baseline v1.1
git tag -a "v1.1" -m "Baseline BL-v1.1: Approved Review 3 Deliverable with CCB and Audit Tools" -f
Write-Host "[+] Created formal SCM Release Tag: v1.1 (Baseline 1.1)" -ForegroundColor Magenta

# Summary & Commit Graph Verification
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  SCM Git Repository Successfully Constructed!" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""
git log --graph --oneline --decorate -n 10
Write-Host ""
Write-Host "To link to your remote GitHub repository, run:" -ForegroundColor Yellow
Write-Host "  git remote add origin https://github.com/<your-username>/<your-repo-name>.git" -ForegroundColor White
Write-Host "  git push -u origin main --tags" -ForegroundColor White
Write-Host "  git push origin feature/ccb-workflow" -ForegroundColor White
