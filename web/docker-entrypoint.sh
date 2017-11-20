#!/bin/sh

# wait for Postgres to start
function postgres_ready(){
python3 << END
import sys
import psycopg2
try:
    conn = psycopg2.connect(dbname="$DB_NAME", user="$DB_USER", password="$DB_PASS", host="$DB_SERVICE")
    conn.close()
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)
END
}

until postgres_ready; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done


# Apply database migrations
python3 manage.py migrate       

# Collect static files           
python3 manage.py collectstatic --noinput  


# Start Gunicorn processes
echo Starting Gunicorn.
exec gunicorn coinsim.wsgi:application \
    --name coinsim \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --log-level=info \
    --reload \
    "$@"
