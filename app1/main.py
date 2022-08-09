from fastapi import FastAPI
from redis import Redis
from rediscluster import RedisCluster

app = FastAPI()
rc = RedisCluster(startup_nodes=[{"host": "redis-1", "port": "7001"},
                                 {"host": "redis-2", "port": "7002"},
                                 {"host": "redis-3", "port": "7003"},
                                 {"host": "redis-4", "port": "7004"},
                                 {"host": "redis-5", "port": "7005"},
                                 {"host": "redis-6", "port": "7006"}], decode_responses=True)

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