#!/bin/bash

# Builds the docker images for all the services
docker-compose -f docker-compose.prod.yml up -d --build

# Runs the initial migration and initializes the database
docker-compose -f docker-compose.prod.yml exec web python manage.py migrate 

# Prompts you to create a new super user
docker-compose -f docker-compose.prod.yml exec web python manage.py createsuperuser

# Collects and gathers all the backend static files for serving
docker-compose -f docker-compose.prod.yml exec web python manage.py collectstatic --noinput

# Winds down all the containers
docker-compose -f docker-compose.prod.yml down 