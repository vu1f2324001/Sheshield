# Sheshield

> An AI-powered, women-centric government scheme discovery, eligibility verification, and application assistance platform.

---

## 1. Problem Statement

Public welfare initiatives, educational grants, and entrepreneurship loan programs are frequently underutilized by women across India. The barriers are systemic:

- **Scattered Information Sources:** Schemes are fragmented across dozens of disparate central ministries and state-level department portals.
- **Opaque Legal Terminology:** Official guidelines use dense administrative jargon, making it difficult for an applicant to determine whether her age, family income, education, or social category qualifies.
- **Unclear Documentation Pipelines:** Applicants often begin applications without knowing which certificates (e.g., domicile, income, caste) are mandatory versus optional, leading to delays and rejections.
- **Missing Actionable Pathways:** Finding a scheme name rarely translates to knowing where to register, how to submit evidence, or how to monitor status post-submission.

Existing discovery engines operate primarily as static keyword search directories. They lack contextual reasoning, do not verify whether an applicant matches multi-variable criteria, and fail to translate raw policy rules into step-by-step guidance.

---

## 2. Our Solution

Sheshield acts as an intelligent decision-support and workflow-guidance layer between women and public benefit programs. It moves beyond passive search into deterministic and natural-language evaluation.

---

## 3. Key Features (Implemented)

### Dual Intake Modalities
- **Structured Assessment Form:** Direct inputs for demographic coordinates: Age, State of Domicile, Current Occupation, Education Level, Annual Family Income, and Social Category.
- **Natural Language Parsing Interface:** A conversational text area where users describe their life situation in plain text. The system parses age, state, and occupation cohorts automatically.

### Multi-Dimensional Eligibility & Scoring
- **Deterministic Rule Engine:** Evaluates multi-factor eligibility across age boundaries, state-level domicile restrictions, annual family income ceilings, and occupational targets.
- **Explainable Criteria Verification (XAI):** Explicit status breakdowns (`PASS`, `PARTIAL`, `FAIL`) per requirement, showing users exactly why a condition was met or flagged.
- **Confidence Scoring & Categorization:** Computes an overall match confidence percentage and assigns clear tier ratings:
  - `High Match` (≥ 80%)
  - `Possible Match` (50% – 79%)
  - `Low Match` (< 50%)

### Actionable Guidance & Tracking
- **Scheme-Specific Document Checklists:** Displays mandatory and optional paperwork required for specific schemes, enabling users to track document readiness locally without uploading sensitive files.
- **6-Stage Application Timeline:** Step-by-step roadmap from eligibility confirmation and document gathering to portal submission, reference tracking, and DBT verification.
- **Application Tracker & Reference Notes:** Local storage registry where users store application token numbers and monitor stages (`Not Started` → `Docs Prepared` → `Ready to Apply` → `Submitted` → `Sanctioned`).
- **Dashboard & Saved Scheme Registry:** Overview of analyzed opportunities, saved schemes, and in-progress applications.

### Reliability & Regulatory Safety
- **Judge Demo Mode:** Instant, pre-loaded profile (21-year-old engineering student from Maharashtra) for fast hackathon evaluations without manual input.
- **Authoritative Links Only:** Routes users directly to verified official platforms (e.g., National Scholarship Portal, JanSamarth, Aaple Sarkar).
- **Non-Authoritative Advisory Notice:** Clear system disclosures emphasizing that results are AI-assisted estimates and formal sanctions remain with official departmental authorities.

---

## 4. How Sheshield Works

When a user submits a situation:

> *"I am a 21-year-old engineering student from Maharashtra looking for financial support for my college fees."*

1. **Intent & Coordinate Extraction:** The input layer detects key entities:
   - `Age`: 21
   - `State`: Maharashtra
   - `Occupation`: Student
   - `Education`: Graduate / Technical
   - `Implied Need`: Tuition / Financial Aid
2. **Registry Filtering:** The scheme discovery engine pulls candidate schemes (e.g., *AICTE Pragati Scholarship for Girls*, *Majhi Kanya Bhagyashree*, *Mudra Mahila Yojana*).
3. **Criteria Execution:** The evaluation module checks the extracted coordinates against the scheme's parameter matrix:
   - *Age Limit Check:* $21 \in [16, 25]$ $\rightarrow$ `PASS` (+25 pts)
   - *Domicile Check:* Maharashtra matches scheme eligibility $\rightarrow$ `PASS` (+25 pts)
   - *Income Ceiling Check:* Stated family income within maximum limit $\rightarrow$ `PASS` (+25 pts)
   - *Occupation Check:* User is a student matching target group $\rightarrow$ `PASS` (+25 pts)
4. **Confidence Computation:** Scores are summed and normalized into a composite score (e.g., 92% – `High Match`).
5. **Breakdown & Checklist Generation:** The system prepares a transparent audit trail with status indicators and populates the scheme's document requirements (e.g., 10th/12th Marksheet, Income Certificate, College Admission Slip).
6. **Action Pipeline Creation:** An interactive 6-step roadmap is generated with links to official portals (e.g., `scholarships.gov.in`).

---

## 5. System & Agent Architecture

Sheshield uses an orchestrator-centric pattern to coordinate between natural-language understanding, eligibility evaluation, and application assistance modules.

```mermaid
flowchart TD
    User([User / Applicant]) --> UI[Client UI: React + Tailwind]
    UI --> Router{Input Mode}
    
    Router -->|Natural Language Text| NLPAgent[Natural Language Parser / LLM Service]
    Router -->|Form Inputs| Orchestrator[Sheshield Orchestration Controller]
    
    NLPAgent -->|Extracted Profile Attributes| Orchestrator
    
    Orchestrator --> DiscoveryAgent[Scheme Discovery Module]
    DiscoveryAgent --> DB[(Scheme Knowledge Base / MongoDB)]
    DB --> DiscoveryAgent
    DiscoveryAgent -->|Candidate Schemes| Orchestrator
    
    Orchestrator --> ReasoningAgent[Eligibility Reasoning Engine]
    ReasoningAgent -->|Evaluated Breakdown & Scores| Orchestrator
    
    Orchestrator --> AssistAgent[Action Plan & Document Assistant]
    AssistAgent -->|Checklists & Step Sequences| Orchestrator
    
    Orchestrator --> UI
    UI --> Tracker[Local Application Tracker]
    UI --> ExternalPortal([Official Gov Portals: NSP / JanSamarth / State])
