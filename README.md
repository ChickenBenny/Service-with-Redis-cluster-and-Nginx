###### tags: `Microservice`
# MicroService 
### Quick start
1. Clone the repository .
```
git clone https://github.com/ChickenBenny/Microservice-Fastapi-Redis-Nginx
```
2. Start the container
```
docker-compose up
```
3. Check the database

```
docker ps => find the container id of database
docker exec -it <container id> sh
redis-cli (start the database command line)
```
 Find the command in this cheat sheet :https://lzone.de/cheat-sheet/
 
4. Check the service
```
curl 127.0.0.1:8080
```
### Problem try to solve
1. Try to build a microservice can transfer the code to the name of merchant.
2. The service time should be compress in 1-3 sec.
### Technology
* Nginx (load balance)
* Fastapi (backend server)
* Redis (NoSQL database)
* Docker (Container)
### Architecture of the project
![](https://i.imgur.com/Aeu2BuY.png)

```
.
├── README.md
├── app1
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── app2
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── app3
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── data
│   ├── Dockerfile
│   ├── data.csv
│   ├── main.py
│   └── requirements.txt
├── docker-compose.yml
└── nginx
    ├── Dockerfile
    └── nginx.conf
```

### Nginx - load balance
Load balance architecture help to increase the availability and reliability of application.If a certain number of clinets request some number of resource to backends, load balancer solve the traffic and send the request to the most suitable routing.

In this prokect we choose nginx as a load balancer to solve the high concurrency situation.

8080 is the default port of proxy server.

$nginx/nginx.conf$
```
upstream loadbalancer {
    sever (outside port):(sevice port) weight=x(distribute the loading to this worker);
}
server{
    location/ {
        proxy_pass http://loadbalancer;
    }
}
```
$nginx/Dockerfile$
```
From nginx
RUN rm /etc/nginx/conf.d/default.conf (將原本的conf檔案刪除)
COPY nginx.conf /etc/nginx/conf.d/default.conf(新增設定好的conf檔案)
```
### FastAPI
Fastapi is an api framework and written in Python. Compare to Flask and Django, FastAPI can support async function. Therefore, we choose FastAPI as our framework.

$Worker$
Worker is the main api in this project, the workers are response to ask the merchant name from database.()
![](https://i.imgur.com/HcfOS89.png)
1. Home router is only use to check which worker is working riht now.
2. Convert router is use to convert the merchant code to merchant name.
![](https://i.imgur.com/IBLY2JH.png)


$DataAPI$
DataAPI is response to manipulate the database.

8004 is the default port of tthis api.
##### CRUD method
![](https://i.imgur.com/h0w90MN.png)



### Redis
Redis is a in-memory NoSQL database, and redis is really fast in solving the key-value mapping problem.

In this project we choose NoSQL as our database, because we our data doesn't have relationship. And we need to use key-value mapping function, so we choose to save the key and value in the NoSQL database.And also we need to complete the mission in 1-3 second, we choose redis as our database. 