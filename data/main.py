import pandas as pd
from fastapi import FastAPI
from redis import Redis
from pydantic import BaseModel

class Data(BaseModel):
    key: str
    value: str

app = FastAPI()
redis = Redis(host='redis', port=6379)

@app.get("/")
async def home():
    return {"message": "This is the worker which can manipulate the database."}

@app.get("/cleanup")
async def cleanup():
    redis.flushdb()
    return {"message": "Clean all the data."}

@app.get("/get/{id}")
async def input(id: str):
    data = redis.get(id)
    return {"message": data}    

@app.post("/get/")
async def input(data: Data):
    redis.set(str(data['key']), str(data['value']))
    return {"message": f"Set KEY : {data['key']} and Value : {data['value']}."}

@app.put("/put/{id}")
async def update(id: str, data: Data):
    redis.set(str(data['key']), str(data['value']))
    return {"message": f"Update KEY : {data['key']} and Value : {data['value']}."}    

@app.delete("/delete/{id}")
async def delete(id: str):
    redis.delete(id)
    return {"message": f"Delete {id}."}

@app.get("/test")
async def test():
    data = pd.read_csv('./data')
    for i in data.shape[0]:
        redis.set(str(data.iloc[i, 1]), str(data.iloc[i, 2]))
    return {"message": "Success."}