#!/bin/bash
set -e


psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -a -f /docker-entrypoint-initdb.d/seed.sql
echo "--- Structure cities créée avec succès ---"


psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "COPY cities(id, geom, name, population, region) FROM '/docker-entrypoint-initdb.d/cities.csv' DELIMITER ',' CSV HEADER;"
echo "--- Importation des données terminée ---"