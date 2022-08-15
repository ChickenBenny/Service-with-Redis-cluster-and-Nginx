from fastapi import FastAPI
import pandas as pd
from fastapi import FastAPI, File, UploadFile
from redis import Redis
from rediscluster import RedisCluster
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Data(BaseModel):
    key: str
    value: str


app = FastAPI()
rc = RedisCluster(startup_nodes=[{"host": "redis-1", "port": "7001"},
                                 {"host": "redis-2", "port": "7002"},
                                 {"host": "redis-3", "port": "7003"},
                                 {"host": "redis-4", "port": "7004"},
                                 {"host": "redis-5", "port": "7005"},
                                 {"host": "redis-6", "port": "7006"}], decode_responses=True)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

lib = {
    "Benny": "Hsiao",
    "Computer": "Science",
    "Python": "Hello world"
}


@app.get("/")
async def home():
    return {"message": "Connected successfully!"}


@app.get("/get/{id}")
async def input(id: str):
    data = rc.get(id)
    if data:
        return {"message": data}
    else:
        return {"message": "None"}


@app.post("/get/")
async def input(data: Data):
    rc.set(data.key, data.value)
    return {"message": "Success"}


@app.delete("/delete/{id}")
async def delete(id: str):
    if rc.get(id):
        rc.delete(id)
        return {"message": "Success"}
    else:
        return {"message": "None"}


@app.put("/put/{id}")
async def update(id: str, data: Data):
    rc.set(data.key, data.value)
    return {"message": "Success"}


@app.get("/cleanup")
async def cleanup():
    rc.flushall()
    return {"message": "Flush success."}


@app.post("/uploadfile")
async def upload_file(file: UploadFile = File(...)):
    print(file.filename)
    data = pd.read_csv(file.file)
    for i in range(data.shape[0]):
        print(f"data_{i}_ok: {data.iloc[i, 2]}")
        rc.set(str(data.iloc[i, 1]), str(data.iloc[i, 2]))
    return {"message": "Init the database with the file complete."}


@app.get("/test")
async def test():
    data = pd.read_csv('/data/data.csv')
    print(data)
    for i in range(data.shape[0]):
        print(f"data_{i}_ok: {data.iloc[i, 2]}")
        rc.set(str(data.iloc[i, 1]), str(data.iloc[i, 2]))
    return {"message": "Init the database with the file complete."}