#!/bin/sh

# wait for RabbitMQ server to start
sleep 10

cd /data/web/coinsim  

# run Celery worker for our project myproject with Celery configuration stored in Celeryconf
celery beat -A coinsim.celery --uid=user -l info
