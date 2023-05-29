#!/bin/bash

# Execute docker-compose up -d
docker-compose up database -d 


# Exit with the message "done"
echo "Database has been started successfully!"
exit 0
