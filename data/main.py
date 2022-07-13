import fastapi
import pandas as pd
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

@app.get("/")
async def home():
    print("Connect success!")
    return {"message": "This is the worker which can manipulate the database."}

@app.get("/cleanup")
async def cleanup():
    redis.flushall()
    return {"message": "Clean all the data."}

@app.get("/get/{id}")
async def input(id: str):
    data = redis.get(id)
    return {"message": data}  


@app.post("/get/")
async def input(data: Data):
    # redis.set(str(data['key']), str(data['value']))
    print(f"Create \nKEY: {data.key}\nVALUE: {data.value}")
    return {"message": f"KEY: {data.key} VALUE: {data.value}"}
    # return {"message": f"Set KEY : {data['key']} and Value : {data['value']}."}

@app.put("/put/{id}")
async def update(id: str, data: Data):
    redis.set(str(data['key']), str(data['value']))
    return {"message": f"Update KEY : {data['key']} and Value : {data['value']}."}    

@app.delete("/delete/{id}")
async def delete(id: str) :
    redis.delete(id)
    return {"message": f"Delete {id}."}

@app.get("/inputdata")
async def inputdata():
    need_to_load = pd.read_csv('./data/data.csv')
    for i in range(10000):
        print(i)
        redis.set(str(need_to_load.iloc[i, 1]), str(need_to_load.iloc[i, 2]))
    return {"message": "Success."}