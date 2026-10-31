import pandas as pd
from pathlib import Path

DATA_PATH = Path(__file__).parent / "data" / "gov_myscheme_data.csv"

def load_schemes():
    df = pd.read_csv(DATA_PATH)

    # Handle missing values
    df = df.fillna("")

    # Combine important scheme information
    df["combined_text"] = (
        df["Scheme Name"].astype(str) + " " +
        df["Description"].astype(str) + " " +
        df["Eligibility Criteria"].astype(str) + " " +
        df["Eligibility (General)"].astype(str) + " " +
        df["Benefits"].astype(str) + " " +
        df["Tags / Categories"].astype(str)
    )

    return df


if __name__ == "__main__":
    schemes = load_schemes()

    print("SHESHIELD DATASET LOADED")
    print("Total Schemes:", len(schemes))
    print("Total Columns:", len(schemes.columns))
    print("Combined Text Created:", "combined_text" in schemes.columns)

    print("\nFirst 3 Scheme Names:")
    print(schemes["Scheme Name"].head(3).to_string(index=False))