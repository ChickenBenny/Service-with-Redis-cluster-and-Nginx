from fastapi import FastAPI
from redis import Redis

app = FastAPI()
redis = Redis(host='redis', port=6379)

@app.get("/")
def home():
    return {"message": "This is worker 1."}

@app.get("/convert/{target}")
def convert(target):
    merchant = redis.get(target)
    if merchant:
        return {"Merchant": merchant}
    else:
        return {"Merchant": "None"}
