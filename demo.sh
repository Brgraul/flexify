#!/bin/bash

# Initializes all the docker containers 
docker-compose -f docker-compose.prod.yml up -d 

# Store in a variable the 5th reservation in the table (random choice)
var=$(docker-compose exec db psql -t --username=hello_django --dbname=hello_django_prod -c "SELECT code FROM landing_reservation LIMIT 1 OFFSET 5"| sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')

# Open a guest client in a Chrome window on developer mode for achieving movile viewport
open -a "Google Chrome"  "http://localhost:81/booking/$var" --args --auto-open-devtools-for-tabs

# Open a cleaner client in a Chrome window on developer mode for achieving movile viewport
open -a "Google Chrome"  "http://localhost:82" --args --auto-open-devtools-for-tabs

# Open a hotel manager client in a Chrome window on developer mode for achieving movile viewport
open -a "Google Chrome"  "http://localhost:83”"
