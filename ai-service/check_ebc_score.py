from retrieve import search_schemes

query = """
Maharashtra female engineering undergraduate student
EBC scholarship tuition fee financial assistance
family income below 8 lakh
"""

results = search_schemes(query, top_k=100)

for scheme in results:
    if "Rajarshi Chhatrapati Shahu" in scheme.get("Scheme Name", ""):
        print("\nEBC SCHEME FOUND!")
        print("Name:", scheme["Scheme Name"])
        print("State:", scheme["State / UT / Ministry"])
        print("Score:", scheme["similarity_score"])
        break
else:
    print("EBC scheme not found in top 100.")