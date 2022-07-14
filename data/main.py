import fastapi
# import pandas as pd
from fastapi import FastAPI
# from redis import Redis
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Data(BaseModel):
    key: str
    value: str

app = FastAPI()
# redis = Redis(host='redis', port=6379)

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
    if redis.get(id):
        redis.set(id, data.value)
        return {"message": "Success"}
    else:
        return {"message": "None"}


@app.get("/cleanup")
async def cleanup():
    redis.flushall()
    return {"message": "Clean all the data."}




# @app.get("/inputdata")
# async def inputdata():
#     need_to_load = pd.read_csv('./data/data.csv')
#     for i in range(10000):
#         print(i)
#         redis.set(str(need_to_load.iloc[i, 1]), str(need_to_load.iloc[i, 2]))
#     return {"message": "Success."}