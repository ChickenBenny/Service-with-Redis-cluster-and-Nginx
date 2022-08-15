#!/bin/bash
ip=172.28.129.121
for port in {7001..7006}; 
do 
mkdir -p ./${port}/conf && PORT=${port} IP=${ip} envsubst < ./redis-cluster.tmpl > ./${port}/conf/redis.conf; 
done