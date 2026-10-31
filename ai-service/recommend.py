import faiss
import pickle
from sentence_transformers import SentenceTransformer
from gemini_service import generate_scheme_answer

print("Loading AI model...")
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

print("Loading FAISS index...")
index = faiss.read_index("schemes.index")

with open("schemes.pkl", "rb") as f:
    df = pickle.load(f)


def recommend(query, top_k=5):

    query_embedding = model.encode(
        [query],
        convert_to_numpy=True
    )

    faiss.normalize_L2(query_embedding)

    scores, indices = index.search(query_embedding, top_k)

    schemes = []

    for score, idx in zip(scores[0], indices[0]):

        if idx != -1:

            scheme = df.iloc[idx].fillna("").to_dict()

            scheme["similarity_score"] = round(float(score), 3)

            schemes.append(scheme)

    print("\nGenerating Gemini AI response...\n")

    answer = generate_scheme_answer(query, schemes)

    return {
        "answer": answer,
        "schemes": schemes
    }


if __name__ == "__main__":

    user_query = input("Enter your requirement: ")

    result = recommend(user_query)

    print("\n========== SHESHIELD AI RESPONSE ==========\n")
    print(result["answer"])

    print("\n========== RETRIEVED SCHEMES ==========\n")

    for scheme in result["schemes"]:
        print(scheme.get("Scheme Name", ""))