# case-management-mp
![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)


This project is for a technical evaluation using React, NodeJS and Docker


The project is planed use the following components
- *backend:* with nodejs, express and express session.
- *frontend:* with react
- *DB:* with SQL Express Server
- *ORM:* Sequelize
- *Session Store:* SQL-based session Table
- *API Testing:* Postman + Newman


## Status of todos
- [x] Design of views with mockups and ER schema
- [x] First design for testing API(postman)
- [x] REST Api implemented
- [x] Postman runner passed
- [ ] Frontend implemented
 


📝 Note:
This project was originally developed in Spanish for a technical evaluation on a government institution in Guatemala.  
All table names, some endpoint and views are in Spanish for consistency.  
If you are reviewing this as part of my portfolio, a fully translated version is planned.

## Run this project

### Clone the repository
1. `git clone https://github.com/emayu/case-management-mp`
2. `cd case-management-mp`
2. Copy the environment example file:
     `cp .env.dev.example .env`
2. Now use docker compose to start all the components using: `docker compose -f docker/mp/docker-compose.yml up`
3. Access to the application
    - Backend API: `http://localhost:3000`
    - SQL Server: `localhost:1433`


### Setup DB initial Data for dev environment
1. Open a cmd or PowerShell console
2. run the file `/docker/mp/scripts/run.init.cmd` this will init the db with DB structure and some initial data.
3. Alternatively, you run the following command manually:
```cmd
docker exec -it sqlserver2019 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MiPasswrodFuerte123" -C -i /docker-entrypoint-initdb.d/init.sql
```

## RESTful API and Testing
The API is documented and tested using Postman. You can load the collection located at: `postman/MP_Cases_Management.postman_collection`.

### To Run test
Before running tests, you need to reset the DB to its initial state to ensure E2E test work correctly, run the script in SQL Server 
```bash
docker exec -it sqlserver2019 /opt/mssql-tools18/bin/sqlcmd -S localhost  -U SA -P "MiPasswrodFuerte123" -C -i /docker-entrypoint-initdb.d/reset-data-before-test.sql
```
You can use docker to run automate test with 
```bash
docker exec -it mp_backend npm run test 
```

## Monitoring Endpoints

- `/healthz`: Simple health check
- `/version`: Returns build tag for deployment tracing (for future use in CD/CI)


##  (Backend)
### 📁 Folder Structure
```
src/
├── config/      # Configuration (DB, sessions)
├── constants/   # Project-wide constants
├── controllers/ # Route logic (handlers)
├── middlewares/ # Auth, error handling
├── models/      # Sequelize models
├── routes/      # Route definitions
├── types/       # TypeScript interfaces & definitions
├── utils/       # Helpers, logging
└── server.ts    # Application entry point
```
_Note: Due to time constraints, a service/repository architecture was not implemented, but the current structure allows easy future migration._

## License
© 2025 Héctor Yaque — All rights reserved.
This project is licensed under the [Creative Commons BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) license.  
You may view the code, but you may not use it for commercial purposes or create derivative works without explicit permission.