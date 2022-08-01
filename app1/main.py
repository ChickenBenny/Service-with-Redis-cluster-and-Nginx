from fastapi import FastAPI
from redis import Redis
from rediscluster import RedisCluster

app = FastAPI()
rc = RedisCluster(startup_nodes=[{"host": "redis-1", "port": "7001"}], decode_responses=True)

@app.get("/")
async def home():
    return {"message": "This is worker 1."}

@app.get("/convert/{target}")
async def convert(target):
    merchant = rc.get(target)
    if merchant:
        return {"Merchant": merchant}
    else:
        return {"Merchant": "None"}

# @app.get("/test")
# async def test():
#     res = rc.get("ping")
#     return {"res": res}