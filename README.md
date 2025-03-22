# Civalgo

# Description
Construction site supervisors need real-time visibility into which workers are present on-site

# 
## Run Database

`docker compose --env-file .env up`
`docker exec -it civalgo-database psql -U civalgo -d checkins`