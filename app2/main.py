from fastapi import FastAPI
from redis import Redis

app = FastAPI()
redis = Redis(host='redis', port=6379)

@app.get("/")
async def home():
    return {"message": "This is worker 2."}

@app.get("/convert/{target}")
async def convert(target):
    merchant = redis.get(target)
    if merchant:
        return {"Merchant": merchant}
    else:
        return {"Merchant": "None"}
