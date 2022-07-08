###### tags: `Microservice`
# MicroService 
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
├── worker1
│   ├── Dockerfile
│   ├── app1.py
│   └── requirements.txt
├── worker2
│   ├── Dockerfile
│   ├── app2.py
│   └── requirements.txt
├── worker2
│   ├── Dockerfile
│   ├── app3.py
│   └── requirements.txt
├── dataApi
│   ├── Dockerfile
│   ├── app_data.py
│   ├── data.csv
│   └── requirements.txt
├── redis
│   └── Dockerfile
├── nginx
│   ├── Dockerfile
│   └── nginx.conf
└── docker-compose.yml
```

### Nginx - load balance
Load balance architecture help to increase the availability and reliability of application.If a certain number of clinets request some number of resource to backends, load balancer solve the traffic and send the request to the most suitable routing.

In this prokect we choose nginx as a load balancer to solve the high concurrency situation.

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
