import pandas as pd

df = pd.read_csv("data/gov_myscheme_data.csv")

print("Total schemes:", len(df))
print("\nColumns:")
print(df.columns.tolist())

print("\nMaharashtra related schemes:")
for col in df.columns:
    if df[col].dtype == "object":
        result = df[df[col].fillna("").str.contains(
            "Maharashtra|MahaDBT|EBC|Panjabrao",
            case=False,
            regex=True
        )]

        if not result.empty:
            print("\nColumn:", col)
            print(result["Scheme Name"].head(10).to_string(index=False))