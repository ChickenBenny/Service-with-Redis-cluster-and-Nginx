from fastapi import FastAPI
from redis import Redis
from rediscluster import RedisCluster
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Data(BaseModel):
    key: str


app = FastAPI()
rc = RedisCluster(startup_nodes=[{"host": "redis-1", "port": "7001"},
                                 {"host": "redis-2", "port": "7002"},
                                 {"host": "redis-3", "port": "7003"},
                                 {"host": "redis-4", "port": "7004"},
                                 {"host": "redis-5", "port": "7005"},
                                 {"host": "redis-6", "port": "7006"}], decode_responses=True)


origins = [
    "http://localhost",
    "https://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def home():
    return {"message": "Connect successfully."}

@app.get("/convert/{target}")
async def convert(target):
    merchant = rc.get(target)
    if merchant:
        return {"Merchant": merchant}
    else:
        return {"Merchant": "None"}

@app.post("/convert")
async def convert(data: Data):
    merchant = rc.get(data.key)
    if merchant:
        return {"Merchant": merchant}
    else:
        return {"Merchant": "None"}