# SCM CCB Simulator & Configuration Item Registry
> **Course:** Software Configuration Management (SCM) &bull; **Institution:** Vellore Institute of Technology (VIT)  
> **Evaluation:** Review 3 (15 Marks) &bull; **Standard:** SWEBOK v3.0 & IEEE 828  
> **Team:** 3-Member Engineering Team (Member A, Member B, Member C)

---

## 🌟 Executive Summary
The **CCB Simulator with Configuration Item Registry** is a comprehensive, production-grade Software Configuration Management platform. It operationalizes foundational SCM principles:
1. **Configuration Identification:** Explicit registration, metadata tagging, and categorization of software artifacts (Source Code, Documentation, Database Schemas, Test Suites).
2. **Configuration Control (Change Management):** Formal Change Request (CR) initiation, impact analysis, and adjudication by a simulated Change Control Board (CCB) with Chairperson SLA enforcement.
3. **Automated Semantic Versioning:** Dynamic version progression ($v1.0 \rightarrow v1.1$ for Minor changes, $v1.0 \rightarrow v2.0$ for Major breaking changes) preserving historical lineage.
4. **Configuration Status Accounting (CSA):** Real-time analytics, status metrics, and compliance ledgers for stakeholder visibility.
5. **Configuration Verification & Audits:** Automated Physical Configuration Audit (PCA) detecting baseline drift, and Functional Configuration Audit (FCA) tracking requirement compliance.
6. **Tool Integration:** Direct architectural alignment with **Git + GitHub**, Pull Requests, feature branching, release tags, and automated GitHub Actions CI.

---

## 🏗️ Architecture & SCM Concepts Mapping

| SCM Theoretical Concept | Git / GitHub Equivalent | Simulator Implementation |
| :--- | :--- | :--- |
| **Configuration Item (CI)** | Tracked Git Repository Files | `CI Registry` module (`CI-AUTH-01`, `CI-SRS-01`) |
| **Delta / Version Point** | Commit (SHA-1 Hash) | Auto-generated version states upon CR approval |
| **Formal Baseline** | Annotated Tag (`v1.0`, `v1.1`) | Locked baseline releases with immutability guarantees |
| **Change Request (CR)** | GitHub Pull Request / Issue | Form `SCM-CR-01` with justification & classification |
| **CCB Adjudication** | PR Review, Approval & Merge | Chairperson review console with mandatory rationale |
| **Parallel Development** | Feature Branches (`feature/*`) | Isolated developer workspace branches |
| **Audit & Verification** | CI/CD Pipeline (GitHub Actions) | PCA drift comparison & FCA test checklist |
| **Status Accounting (CSA)** | Insights, Release Notes & Issues | Dynamic CSA dashboard with CSV export |

---

## 👥 3-Member Team Contribution Split

- **Member A (Developer Persona):**
  - Designed Configuration Item (CI) Identification scheme and Registry UI.
  - Developed Role-Based Access Control (RBAC) permission structure.
  - Implemented Client-side persistence and search/filter algorithms.

- **Member B (CCB Chairperson Persona):**
  - Formulated Change Request (CR) submission workflow (Minor, Major, Emergency).
  - Built the CCB Adjudication dashboard and Chairperson console.
  - Programmed the Semantic Auto-Versioning calculus and Stale CR SLA alert engine.

- **Member C (SCM Administrator & Auditor Persona):**
  - Engineered Configuration Status Accounting (CSA) metrics and chart visualization.
  - Created Functional & Physical Configuration Audit (FCA/PCA) drift detection engine.
  - Established Git branching topology, release tagging, and GitHub Actions CI workflow.

---

## 🚀 Quick Start / How to Run

### 1. Launch the Live Web Application
Double-click `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox).  
*No server setup, Node.js installations, or internet connectivity required!*

### 2. Generate 3-Member Git Commit History
To populate your local Git repository with multi-day commits from all 3 members, feature branches, and tags:
```powershell
# In PowerShell:
.\generate_git_history.ps1

# Or simply double-click:
setup_git.bat
```

### 3. Push to GitHub
```bash
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git branch -M main
git push -u origin main --tags
git push origin feature/ccb-workflow
```

---

## 🧪 Demonstration Sequence for Review 3 Viva

1. **CI Registry:** Open `1. CI Registry` and showcase the registered items (`CI-AUTH-01`, `CI-SRS-01`). Point out the `Baselined` status tag.
2. **Raise Change Request:** Switch to `2. Raise Change Request`, pick `CI-AUTH-01`, select `Minor`, enter a defect fix description, and submit.
3. **Stale SLA Notification:** Notice the pulsing red bell in the navigation bar flagging a CR that has remained pending for $> 48\text{ hours}$.
4. **CCB Adjudication:** Switch persona to **CCB Chairperson**, open `3. CCB Review Queue`, review the submitted CR, enter rationale, and click **Approve**.
5. **Auto-Versioning Verification:** Show how `CI-AUTH-01` automatically incremented from `v1.0` $\rightarrow$ `v1.1` and preserved previous baseline records.
6. **Status Accounting (CSA):** Open `4. Status Accounting` to showcase the dynamic metrics and export the CSV report.
7. **Run FCA / PCA Audit:** Open `5. FCA / PCA Audits`, click **Execute Automated Baseline Audit**, and demonstrate baseline vs. actual drift verification.
8. **GitHub & CI/CD:** Show the commit graph in Git, feature branch merge, release tags (`v1.0`, `v1.1`), and `.github/workflows/ci.yml`.

---
*Compliant with VIT SCM Review 3 Syllabus & SWEBOK Guidelines.*
