/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "results",
    "created": "2023-05-12 10:03:00.000Z",
    "updated": "2023-05-12 10:03:00.000Z",
    "name": "results",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "user",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": ["name", "email"]
        }
      },
      {
        "system": false,
        "id": "simulation",
        "name": "simulation",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "simulations",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": ["title"]
        }
      },
      {
        "system": false,
        "id": "task",
        "name": "task",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "tasks",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": ["title"]
        }
      },
      {
        "system": false,
        "id": "startTime",
        "name": "startTime",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "endTime",
        "name": "endTime",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "score",
        "name": "score",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "accuracy",
        "name": "accuracy",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "speed",
        "name": "speed",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "submission",
        "name": "submission",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "feedback",
        "name": "feedback",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 2000,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "recording",
        "name": "recording",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "completed",
        "name": "completed",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("results");

  return dao.deleteCollection(collection);
});
