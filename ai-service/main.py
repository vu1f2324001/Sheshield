from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from recommend import recommend

app = FastAPI(
    title="Sheshield AI Recommendation API",
    description="Government Scheme Recommendation System",
    version="1.0"
)


class RecommendationRequest(BaseModel):
    query: str


@app.get("/")
def home():
    return {
        "status": "online",
        "message": "Sheshield AI Service is Running"
    }


@app.get("/health")
def health():
    return {"success": True}


@app.post("/recommend")
def get_recommendations(request: RecommendationRequest):
    try:
        if not request.query.strip():
            raise HTTPException(
                status_code=400,
                detail="Please enter your requirement."
            )

        result = recommend(request.query)

        return {
            "success": True,
            "query": request.query,
            "recommendations": result
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )