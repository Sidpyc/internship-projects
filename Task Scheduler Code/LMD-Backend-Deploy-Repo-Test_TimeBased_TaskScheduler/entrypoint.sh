#!/bin/bash

set -e  # Exit on error

echo "Applying migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Setting static files permissions..."
chmod -R 755 /lmsdocker/staticfiles/
chown -R www-data:www-data /lmsdocker/staticfiles/

echo "Restarting Nginx..."
service nginx restart

echo "Starting Uvicorn..."
exec uvicorn LMS.asgi:application --host 0.0.0.0 --port 8000 --workers 3 --proxy-headers --forwarded-allow-ips '*'

