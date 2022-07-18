import fastapi
import pandas as pd
from fastapi import FastAPI, File, UploadFile
from redis import Redis
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Data(BaseModel):
    key: str
    value: str


app = FastAPI()
redis = Redis(host='redis', port=6379)

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
    data = redis.get(id)
    if data:
        return {"message": data}
    else:
        return {"message": "None"}


@app.post("/get/")
async def input(data: Data):
    redis.set(data.key, data.value)
    return {"message": "Success"}


@app.get("/test/{id}")
def test(id: str):
    print(lib.get(id))
    return {"message": "OK"}


@app.delete("/delete/{id}")
async def delete(id: str):
    if redis.get(id):
        redis.delete(id)
        return {"message": "Success"}
    else:
        return {"message": "None"}


@app.put("/put/{id}")
async def update(id: str, data: Data):
    redis.hset(data.key, data.value)
    return {"message": "Success"}


@app.get("/cleanup")
async def cleanup():
    redis.flushall()
    return {"message": "Flush success."}


@app.post("/file/")
async def create_upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}


@app.post("/uploadfile")
async def upload_file(file: UploadFile = File(...)):
    print(file.filename)
    data = pd.read_csv(file.file)
    for i in range(data.shape[0]):
        print(f"data_{i}_ok: {data.iloc[i, 2]}")
        redis.set(str(data.iloc[i, 1]), str(data.iloc[i, 2]))
    return {"message": "Init the database with the file complete."}


@app.get("/test")
async def test():
    data = pd.read_csv('/data/data.csv')
    print(data)
    for i in range(data.shape[0]):
        print(f"data_{i}_ok: {data.iloc[i, 2]}")
        redis.set(str(data.iloc[i, 1]), str(data.iloc[i, 2]))
    return {"message": "Init the database with the file complete."}