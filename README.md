# TodoApp

## Client

- Écran de chargement
- Affichage des données
- Gestion des catégories
- Création d'une nouvelle tâche
- Modification du status d'une tâche
- Modification de la description d'une tâche
- Suppresion d'une tâche
- Gestion des erreurs
- Gestion des actions avec affichage d'une notifcation

## Server

| METHOD    | PATH                    | PARAM
| ---       | ---                     | --
| GET       | /todo/ping              | NULL
| GET       | /todo/getall            | NULL
| GET       | /todo/getone/:todoID    | todoId
| POST      | /todo/create            | todoId, description
| POST      | /todo/update            | todoId, description
| POST      | /todo/delete            | todoId


# Start app

## On MacOs
`npm run start`

## Others
### MongoDb
`mongod --port 3300 --dbpath 'your_db_path'`
### Server
`cd server && npm run dev`
### Client
`cd client && npm run start`
