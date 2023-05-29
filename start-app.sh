#!/bin/bash

# Execute docker-compose up -d
docker-compose up -d database

# Run migrations 
echo "Running migrations"
DB_HOST=localhost npm run migrate

# Run operations seed
DB_HOST=localhost npm run seed:operations

# Run users seed
DB_HOST=localhost npm run seed:users

npm run dev
# Exit with the message "done"
echo "Application has been started successfully!"
exit 0
