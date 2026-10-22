# VELLORE INSTITUTE OF TECHNOLOGY
### School of Computer Science and Engineering
### Course: Software Configuration Management (SCM)
---

# FINAL PROJECT REPORT & SYSTEM SPECIFICATION
## Project Title: CCB Simulator with Configuration Item Registry
**Total Marks:** 30 (Review 1: 5 Marks | Review 2: 10 Marks | Review 3: 15 Marks)  
**Standard Followed:** SWEBOK v3.0 (Software Configuration Management Knowledge Area) & IEEE 828  
**Team Members:**  
1. Member A (Registration No. / Role: Configuration Identification & RBAC)  
2. Member B (Registration No. / Role: Change Control Board & Auto-Versioning)  
3. Member C (Registration No. / Role: Status Accounting, Audits & CI/CD Pipeline)  

---

## 1. Introduction & Problem Statement

### 1.1 Background
In contemporary software engineering environments, software systems evolve rapidly through concurrent feature additions, maintenance patches, and architectural shifts. Without rigorous configuration governance, projects suffer from the classic problems of:
- **Simultaneous Updates:** Changes made by one engineer overwriting another's code.
- **Shared Code and Configuration Drift:** Inconsistencies between what was authorized in specifications and what is deployed physically.
- **Multiple Versions & Lack of Traceability:** Inability to pinpoint who authorized an update, when it occurred, or what technical impact it introduced.

### 1.2 Objective
The primary objective of this project is to build an interactive, production-grade **CCB Simulator with Configuration Item Registry** that demonstrates the complete SCM lifecycle prescribed by **SWEBOK v3.0**:
1. Unambiguous Configuration Identification of heterogeneous project artifacts.
2. Formal Configuration Control through Change Requests and Change Control Board (CCB) governance.
3. Automated semantic versioning and baseline integrity enforcement.
4. Comprehensive Configuration Status Accounting (CSA).
5. Formal Functional and Physical Configuration Audits (FCA/PCA).
6. Operational integration with modern distributed version control (Git & GitHub).

---

## 2. System Architecture & Methodology

```
+-----------------------------------------------------------------------------------+
|                           SCM CCB SIMULATOR SYSTEM ARCHITECTURE                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ User Personas & RBAC ]                                                         |
|  - Developer (Member A)       --> [ Raise Change Request (CR) ]                   |
|  - CCB Chair (Member B)       --> [ Adjudicate (Approve / Reject / Defer) ]       |
|  - SCM Admin / Auditor (C)    --> [ Run FCA/PCA Audits, Manage Baselines ]        |
|                                                                                   |
|                                     |                                             |
|                                     v                                             |
|                   +-----------------------------------+                           |
|                   |   Configuration Item Registry     |                           |
|                   |  - Metadata: ID, Type, Owner, Ver |                           |
|                   |  - Baseline Locks (BL-v1.0, etc.) |                           |
|                   +-----------------------------------+                           |
|                                     |                                             |
|             +-----------------------+-----------------------+                     |
|             |                                               |                     |
|             v                                               v                     |
|  +-----------------------+                     +-----------------------+          |
|  |   CCB Workflow Engine |                     | SCM Verification Unit |          |
|  | - Minor (+0.1)        |                     | - PCA (Drift Detect)  |          |
|  | - Major (+1.0)        |                     | - FCA (SRS Checklist) |          |
|  | - Emergency Hotfix    |                     +-----------------------+          |
|  | - SLA Stale CR Flag   |                                  |                     |
|  +-----------------------+                                  |                     |
|             |                                               |                     |
|             v                                               v                     |
|  +-------------------------------------------------------------------+            |
|  |    Configuration Status Accounting (CSA) & Immutable Audit Trail   |           |
|  |    - Real-time KPI Dashboards & Chart.js Metrics Breakdown        |            |
|  |    - Formal CSV Export & Historical Event Stream                  |            |
|  +-------------------------------------------------------------------+            |
|                                     |                                             |
+-------------------------------------|---------------------------------------------+
                                      v
+-----------------------------------------------------------------------------------+
|               GIT & GITHUB DISTRIBUTED TOOL MAPPING & CI/CD PIPELINE               |
|  - Main Branch (Protected Baseline)  <-- Merged PRs <-- Feature Branches          |
|  - Release Tags (v1.0, v1.1)         <-- Baselined Milestones                     |
|  - GitHub Actions Workflow           <-- Automated Lint, FCA/PCA Sanity Check     |
+-----------------------------------------------------------------------------------+
```

---

## 3. SCM Process Implementations

### 3.1 Configuration Identification
Artifacts are identified uniquely by hierarchical keys (`CI-AUTH-01`, `CI-SRS-01`, `CI-DB-02`). Each CI carries:
- **Identification Key & Human-readable Name**
- **Category:** Source Code, Documentation, Database, Test Suite, Configuration.
- **Current Version & Baseline Version**
- **Lifecycle Status:** `Baselined` (Locked) or `Draft` (Under development).
- **Custodian / Owner**

### 3.2 Configuration Control & CCB Adjudication
- Once an artifact is **Baselined**, it cannot be directly altered.
- Any modification mandates raising a **Change Request (Form SCM-CR-01)** specifying:
  - Technical justification & defect description.
  - Classification: **Minor**, **Major**, or **Emergency**.
  - Risk & Impact assessment on dependent CIs.
- **CCB Chairperson Console:**
  - Adjudicates submitted CRs as **Approved**, **Rejected**, or **Deferred**.
  - Enforces mandatory recorded rationale for all verdicts.
  - Monitors SLA compliance: flags any CR pending $> 48\text{ hours}$ with a high-priority warning badge.

### 3.3 Automated Version Calculus
Upon CCB approval, the version calculus automatically transitions the artifact:
$$\text{Minor Change:} \quad vM.m \longrightarrow vM.(m+1) \quad (\text{e.g., } v1.0 \rightarrow v1.1)$$
$$\text{Major Change:} \quad vM.m \longrightarrow v(M+1).0 \quad (\text{e.g., } v1.2 \rightarrow v2.0)$$
$$\text{Emergency Change:} \quad vM.m.p \longrightarrow vM.m.(p+1) \quad (\text{e.g., } v1.0.0 \rightarrow v1.0.1)$$
The engine archives prior versions into an immutable version history array to ensure rollback viability.

### 3.4 Configuration Status Accounting (CSA)
CSA provides real-time visibility into the configuration state:
- Real-time KPI summaries: Total CIs, Baselined CIs, Approved CRs, Pending Reviews.
- Visual breakdown of CR distribution across statuses and CI categories.
- Exportable formal CSA Ledger (CSV) for stakeholder and executive review.

### 3.5 Configuration Audits (FCA / PCA)
- **Physical Configuration Audit (PCA):** Compares physical deployed builds against the authorized baseline ledger. Highlights unbaselined drafts or unauthorized deviations ("Configuration Drift").
- **Functional Configuration Audit (FCA):** Validates that all software requirements in the SRS have passed formal automated verification test suites before baseline lock.

---

## 4. Git and SCM Tool Integration

The theoretical SCM framework is directly mapped to industry-standard Git operations:

| SCM Concept | Git / GitHub Mechanism |
| :--- | :--- |
| Configuration Item | Tracked file in Git working tree |
| Delta Version | Git Commit with unique SHA-1 identifier |
| Baseline | Annotated Git Tag (`v1.0`, `v1.1`) |
| Change Request | GitHub Pull Request (PR) |
| CCB Approval | PR Code Review & Merge Commit into `main` |
| Parallel Work | Feature branches (`feature/ccb-workflow`) |
| Audit / Check | GitHub Actions CI Workflow (`.github/workflows/ci.yml`) |

---

## 5. Team Contribution Matrix

| Team Member | Module / Responsibility | Delivered Artifacts |
| :--- | :--- | :--- |
| **Member A** | Configuration Identification & RBAC | CI Registry UI, Metadata schema, Search/Filter, Role switching engine |
| **Member B** | Change Control Board & Auto-Versioning | CR submission form, CCB Chairperson review dashboard, Version calculus, SLA alert |
| **Member C** | CSA, Audits & GitHub CI/CD | CSA dashboards, FCA/PCA audit engine, Git commit simulation script, CI/CD pipeline |

---

## 6. Conclusion
The **CCB Simulator with CI Registry** fulfills 100% of the requirements specified across Reviews 1, 2, and 3. By combining an intuitive web simulator with practical Git version control workflows, the project bridges theoretical software engineering standards (SWEBOK / IEEE 828) with real-world DevOps practices.
