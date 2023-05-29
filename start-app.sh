#!/bin/bash

# Execute docker-compose up -d
docker-compose up -d

# Run migrations 
echo "Running migrations"
DB_HOST=localhost npm run migrate

# Run operations seed
DB_HOST=localhost npm rum seed:operations

# Run users seed
DB_HOST=localhost npm rum seed:users

# Exit with the message "done"
echo "Application has been started successfully!"
exit 0
