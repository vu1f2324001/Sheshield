import pickle

with open("schemes.pkl", "rb") as f:
    df = pickle.load(f)

print("Total schemes:", len(df))

result = df[
    df["Scheme Name"].str.contains(
        "Rajarshi Chhatrapati Shahu",
        case=False,
        na=False
    )
]

print("\nMatching schemes:")
print(result[["Scheme Name", "State / UT / Ministry"]].to_string(index=False))