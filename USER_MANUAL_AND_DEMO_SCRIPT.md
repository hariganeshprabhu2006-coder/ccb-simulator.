# SCM CCB Simulator - User Manual & Review 3 Demo Script
> **Course:** Software Configuration Management (SCM) &bull; **Institution:** VIT  
> **Evaluation:** Review 3 Demonstration (15 Marks)  
> **Target Audience:** Project Team, Evaluator / Faculty

---

## Part 1: Step-by-Step Viva Demo Script (5-7 Minutes)

Use this script during your Review 3 demonstration to present a seamless, structured workflow to the faculty.

### ⏱️ Minute 0:00 - 1:00: Introduction & Overview (Member C)
> **Spoken by Member C:**  
> *"Good morning/afternoon Professor. For our Review 3 of Software Configuration Management, our project is the **CCB Simulator with Configuration Item Registry**.  
> Across Reviews 1 and 2, we identified our problem statement, methodology, SWEBOK compliance, and CCB structure. Today for Review 3, we have fully implemented the interactive web application, integrated it with Git and GitHub, and implemented automated auto-versioning, status accounting, and FCA/PCA audits."*

---

### ⏱️ Minute 1:00 - 2:30: CI Identification & Change Request (Member A)
> **Action:** Open the web app on tab `1. CI Registry`. Set persona dropdown to `Member A (Developer)`.

> **Spoken by Member A:**  
> *"Here is our **Configuration Item Registry**. Each software artifact—whether it is source code like `UserAuthenticationService.js`, documentation like `SystemRequirementsSpec.pdf`, or SQL schema files—is uniquely registered with a CI identifier, owner, and current version.  
> Notice that critical items are marked as **Baselined (Locked)**. Under SCM principles, developers cannot directly edit a baselined item.  
> To modify an item, I will click **Raise CR** on `CI-AUTH-01`.  
> In the Change Request form (Form SCM-CR-01), we classify this change as **Minor** for a security token update, provide the technical description, and document the impact assessment. When I submit, it gets placed into the formal CCB review queue."*

---

### ⏱️ Minute 2:30 - 4:00: CCB Adjudication, SLA Alert & Auto-Versioning (Member B)
> **Action:** Switch persona to `Member B (CCB Chairperson)`. Point to the top bell notification, then click tab `3. CCB Review Queue`.

> **Spoken by Member B:**  
> *"I am now acting as the **CCB Chairperson**. Notice the top notification banner: our simulator includes an **SLA alert** that automatically flags any Change Request that has been sitting in 'Pending' for more than 48 hours without decision.  
> Here in the review queue, we see the pending CR. As CCB Chair, I can inspect the target CI's baseline version (`v1.0`), review the impact, and adjudicate.  
> I will click **Adjudicate / Review**. Here, I select **Approve** and provide the mandatory SCM justification: 'Security audit passed; token refresh is backward-compatible'.  
> Notice the **Auto-Versioning Engine**: because this is classified as a Minor change, the system automatically calculates the next version as `v1.0` $\rightarrow$ `v1.1`. When I click **Submit Official Verdict**, the version is updated, the baseline state is maintained, and the old version is preserved in history."*

---

### ⏱️ Minute 4:00 - 5:30: CSA Dashboard & FCA/PCA Audits (Member C)
> **Action:** Open tab `4. Status Accounting (CSA)`, then tab `5. FCA / PCA Audits`.

> **Spoken by Member C:**  
> *"Next is **Configuration Status Accounting (CSA)**. This dashboard provides immediate metrics on total CIs, baselined artifacts, and approved vs. pending CRs, complete with real-time charts. We can also export the formal CSA ledger to CSV with one click.  
> Next, we have **SCM Verification and Audits**:  
> - In the **Physical Configuration Audit (PCA)**, the system compares the authorized baseline version against live builds to detect **configuration drift**.  
> - In the **Functional Configuration Audit (FCA)**, we track an interactive checklist verifying that SRS functional test requirements have been fulfilled.  
> In tab 6, our **Immutable Change History Log** maintains a chronological, timestamped audit trail of every single action taken."*

---

### ⏱️ Minute 5:30 - 7:00: Git & GitHub SCM Tool Demonstration (All Members)
> **Action:** Show the Git terminal or GitHub repository page with commit logs, branches, and tags.

> **Spoken by Member C:**  
> *"Finally, we mapped our entire simulator architecture onto **Git and GitHub**:  
> - CIs correspond to tracked files.  
> - Baselined versions are tagged with annotated Git tags (`v1.0`, `v1.1`).  
> - Change Requests are developed on feature branches like `feature/ccb-workflow` and merged into `main` only after CCB review.  
> - Commits are distributed across all three members over several days.  
> - We also added a GitHub Actions CI pipeline (`.github/workflows/ci.yml`) that automatically runs baseline verification and FCA/PCA sanity checks on every push.  
> This completes our Review 3 requirements. We are now open for questions."*

---

## Part 2: User Manual (System Feature Guide)

### 1. Persona Switching (RBAC)
- Locate the **Active Persona** selector in the top right header.
- Available roles:
  - **Member A (Developer):** Can register CIs, raise CRs, view records.
  - **Member B (CCB Chairperson):** Full access + exclusive authority to approve/reject CRs.
  - **Member C (Admin & Auditor):** Full administrative privileges, audit execution, and log clearing.
  - **Stakeholder (Viewer Only):** Read-only mode across all dashboards.

### 2. CI Registration
1. Navigate to **1. CI Registry**.
2. Click **+ Register New CI**.
3. Fill in CI ID (e.g. `CI-GATEWAY-05`), Name, Category, Initial Version, Owner, and Baseline Status.
4. Click **Save CI**. The item is immediately saved to `localStorage` and recorded in the audit log.

### 3. Change Request Workflow
1. Navigate to **2. Raise Change Request** (or click **Raise CR** on any CI row).
2. Select target CI.
3. Select Classification:
   - **Minor:** Increments minor digit ($1.0 \rightarrow 1.1$).
   - **Major:** Increments major digit ($1.1 \rightarrow 2.0$).
   - **Emergency:** Increments patch / minor digit.
4. Enter description and impact assessment, then click **Submit to CCB Queue**.

### 4. CCB Review & Approval
1. Switch role to **Member B (CCB Chairperson)**.
2. Navigate to **3. CCB Review Queue**.
3. Click **Adjudicate / Review** on any pending CR.
4. Select **Approve**, **Reject**, or **Defer**.
5. Type mandatory justification.
6. Click **Submit Official Verdict**. The target CI is auto-versioned, and a notification is displayed.

### 5. Running Baseline Audits
1. Navigate to **5. FCA / PCA Audits**.
2. Click **Execute Automated Baseline Audit**.
3. Verify the PCA table: checks that deployed versions match authorized baseline specifications.
4. Review the FCA checklist: check/uncheck requirements to observe real-time audit updates.
