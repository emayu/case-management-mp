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
- [ ] REST Api implemented
- [ ] Postman runner passed
- [ ] Frontend implemented
 


📝 Note:
This project was originally developed in Spanish for a technical evaluation on a government institution in Guatemala.  
All table names, some endpoint and views are in Spanish for consistency.  
If you are reviewing this as part of my portfolio, a fully translated version is planned.

## Monitoring Endpoints

- `/healthz`: Simple health check
- `/version`: Returns build tag for deployment tracing
##  (Backend)
### 📁 Folder Structure
```
src/
├── config/ # Configuration (DB, sessions)
├── controllers/ # Route logic (handlers)
├── models/ # Sequelize models
├── routes/ # Route definitions
├── middlewares/ # Auth, error handling
├── utils/ # Helpers, logging
├── app.ts # Express app definition
└── server.ts # Application entry point
```
_Note: Due to time constraints, a service/repository architecture was not implemented, but the current structure allows easy future migration._

### Monitoring Endpoints
- `/healthz`: Simple health check
- `/version`: Returns build tag for deployment tracing

## License
© 2025 Héctor Yaque — All rights reserved.
This project is licensed under the [Creative Commons BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) license.  
You may view the code, but you may not use it for commercial purposes or create derivative works without explicit permission.