import faiss
import pickle
from sentence_transformers import SentenceTransformer

print("Loading model...")
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

print("Loading FAISS index...")
index = faiss.read_index("schemes.index")

print("Loading scheme data...")
with open("schemes.pkl", "rb") as f:
    df = pickle.load(f)


def search_schemes(query, top_k=10):
    query_embedding = model.encode(
        [query],
        convert_to_numpy=True
    )

    faiss.normalize_L2(query_embedding)

    scores, indices = index.search(query_embedding, top_k)

    results = []

    for score, idx in zip(scores[0], indices[0]):
        if idx == -1:
            continue

        scheme = df.iloc[idx].fillna("").to_dict()
        scheme["similarity_score"] = round(float(score), 3)

        results.append(scheme)

    return results


if __name__ == "__main__":
    query = "Scholarship for Maharashtra engineering students"

    results = search_schemes(query)

    for i, scheme in enumerate(results, 1):
        print(f"\n{i}. {scheme['Scheme Name']}")
        print("State:", scheme.get("State / UT / Ministry", ""))
        print("Score:", scheme["similarity_score"])