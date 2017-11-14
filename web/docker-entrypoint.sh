#!/bin/sh
python3 manage.py migrate                  # Apply database migrations
python3 manage.py collectstatic --noinput  # Collect static files


# Start Gunicorn processes
echo Starting Gunicorn.
exec gunicorn coinsim.wsgi:application \
    --name coinsim \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --log-level=info \
    "$@"
