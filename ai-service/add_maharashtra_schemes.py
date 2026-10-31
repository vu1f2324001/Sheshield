import pandas as pd

CSV_PATH = "data/gov_myscheme_data.csv"

df = pd.read_csv(CSV_PATH)

new_schemes = [
    {
        "Scheme Name": "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)",
        "Scheme Slug": "rajarshi-chhatrapati-shahu-maharaj-ebc",
        "Level": "State",
        "State / UT / Ministry": "Maharashtra - Directorate of Technical Education",
        "Application Mode": "Online",
        "Tags / Categories": "Maharashtra, EBC, EWS, SEBC, Scholarship, Engineering, Female Students",
        "Description": "Financial assistance for eligible EBC, EWS and SEBC students admitted to eligible technical and professional courses in Maharashtra through the Centralized Admission Process (CAP).",
        "Eligibility Criteria": "Indian nationality; Maharashtra domicile; eligible professional or technical course; admission through CAP; family annual income up to Rs. 8 lakh. Other conditions and institute restrictions apply.",
        "Eligibility (General)": "Eligible Maharashtra-domiciled students pursuing approved technical and professional courses. Female students may receive 100% tuition fee and examination fee benefits under applicable DTE rules.",
        "Exclusions / Ineligibility": "Admissions through management quota or institute-level quota are excluded under applicable DTE rules. Private deemed and self-financed universities may be excluded. Verify current rules.",
        "Benefits": "For eligible female students in professional courses: 100% tuition fee and 100% examination fee under applicable DTE scheme rules. Benefits for male students may differ.",
        "Application Process": "Apply online through the official MahaDBT portal. Complete profile details and submit the required documents.",
        "Documents Required": "Maharashtra domicile certificate, family income certificate, previous examination marksheets, CAP allotment/admission documents and other documents requested by the portal.",
        "Frequently Asked Questions (FAQs)": "Q: Is eligibility guaranteed? A: No. Final eligibility depends on current government rules, course, admission type, institute and document verification.",
        "Official Link": "https://mahadbt.maharashtra.gov.in/",
        "MyScheme URL": "https://dte.maharashtra.gov.in/rajarshi-chhatrapati-shahu-maharaj/"
    }
]

new_df = pd.DataFrame(new_schemes)

# Avoid duplicate scheme names
existing_names = df["Scheme Name"].astype(str).str.strip().str.lower()

new_df = new_df[
    ~new_df["Scheme Name"].str.strip().str.lower().isin(existing_names)
]

if not new_df.empty:
    df = pd.concat([df, new_df], ignore_index=True)
    df.to_csv(CSV_PATH, index=False)
    print("Maharashtra scheme added successfully!")
else:
    print("Scheme already exists. No duplicate added.")

print("Total schemes:", len(df))
print("Maharashtra schemes:",
      df["State / UT / Ministry"].astype(str)
      .str.contains("Maharashtra", case=False).sum())