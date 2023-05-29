# Run migrations 
echo "Running migrations"
DB_HOST=localhost npm run migrate

# Run operations seed
DB_HOST=localhost npm run seed:operations

# Run users seed
DB_HOST=localhost npm run seed:users

exit 0