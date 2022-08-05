###### tags: `Microservice`
# Service with Redis cluster  
### Quick start
1. Create a directory for this project
```
$ mkdir service
$ cd service
$ git clone git@github.com:ChickenBenny/Service-with-Redis-cluster-and-Nginx.git
```
2. Change the ip of redis cluster
> Find your server ip first and change the ip  in tmpl file.

> After change the ip, you should run the script(```needToRun.sh```), which will help you create all the redis config.
```
$ cd reids
$ vi redis-cluster.tmpl   // cluster-announce-ip ${your ip}
```
3. Change the cluster ip in docker-compose
> Cluster will create when redis-1 container build.

> Change all the ip in redis-1 command to your ip.

```
redis-cli -h {ip} -p 7001 
    --cluster create {ip}:7001 {ip}:7002 {ip}:7003 {ip}:7004 {ip}:7005 {ip}:7006 
    --cluster-replicas 1 & tail -f 
```
4. Run the compose yml
> This yml will create 3 workers with a nginx load balance and a redis-cluster with 3 master slave db
```
$ docker-compose up
```

5. Service workflow

 ![](https://i.imgur.com/WHOLyjb.png)




### Technology
<p align="left">
<img src="https://www.vectorlogo.zone/logos/python/python-icon.svg" />
<img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" />
<img src="https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg"/>
<img src="https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg" />
<img src="https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg" />
<img src="https://www.vectorlogo.zone/logos/redis/redis-icon.svg" />
<img src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg" />
</p>

* Nginx (load balancer)
* Fastapi (backend server)
* React (frontend server)
* Redis (NoSQL database)
* Docker (Container)

### Learn more
#### Nginx
We used Nginx as load balancer. Take a look as following resource.
* What is load balancer : https://medium.com/tech-it-out/proxy-vs-reverse-proxy-vs-load-balancer-3937915631c8
* LB with docker : https://towardsdatascience.com/sample-load-balancing-solution-with-docker-and-nginx-cf1ffc60e644

#### Fastapi
We used fastapi as backend framework. We create thee workers and a data management app. Take a look as following resource.
* FastAPI doc : https://fastapi.tiangolo.com/
* Youtube tutorial(19 hr) : https://www.youtube.com/watch?v=0sOvCWFmrtA&list=LL&index=37&t=1132s

#### Redis
We used redis as our database, because we are solving key-value mapping issue and we want the reponse really quickly. Take a look as following resource.
* Redis introduction : https://blog.devops.dev/redis-introduction-from-zero-to-hero-part-i-7c13e63170f5
* Redis persistence :　https://blog.devops.dev/redis-persistence-and-cap-theorem-from-zero-to-hero-part-ii-91eaedf58d79
* Redis cluster : https://blog.devops.dev/redis-cluster-and-sentinel-with-docker-from-zero-to-hero-part-iv-63ba9d196cc3

#### React
We used React as our db management frontend page. Take a look as following resource.
* Tutorial : https://www.w3schools.com/REACT/DEFAULT.ASP

