import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer
from data_loader import load_schemes

print("Loading dataset...")
df = load_schemes()

print("Loading embedding model...")
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

print("Generating embeddings...")
embeddings = model.encode(
    df["combined_text"].tolist(),
    show_progress_bar=True,
    convert_to_numpy=True
)

# Normalize embeddings
faiss.normalize_L2(embeddings)

print("Creating FAISS index...")
index = faiss.IndexFlatIP(embeddings.shape[1])
index.add(embeddings.astype("float32"))

# Save index and scheme data
faiss.write_index(index, "schemes.index")

with open("schemes.pkl", "wb") as f:
    pickle.dump(df, f)

print("\nSHESHIELD VECTOR STORE CREATED")
print("Total vectors:", index.ntotal)
print("Embedding dimensions:", embeddings.shape[1])