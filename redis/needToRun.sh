for port in {7001..7006}; 
do 
mkdir -p ./${port}/conf && PORT=${port} envsubst < ./redis-cluster.tmpl > ./${port}/conf/redis.conf && mkdir -p ./${port}/data; 
done