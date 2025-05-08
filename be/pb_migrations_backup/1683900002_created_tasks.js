/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "tasks",
    "created": "2023-05-12 10:02:00.000Z",
    "updated": "2023-05-12 10:02:00.000Z",
    "name": "tasks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "title",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "description",
        "name": "description",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": 2000,
          "pattern": ""
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
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": ["title"]
        }
      },
      {
        "system": false,
        "id": "type",
        "name": "type",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": ["code", "design", "decision", "data", "ai"]
        }
      },
      {
        "system": false,
        "id": "difficulty",
        "name": "difficulty",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": ["beginner", "intermediate", "advanced", "expert"]
        }
      },
      {
        "system": false,
        "id": "timeLimit",
        "name": "timeLimit",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 3600,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "resources",
        "name": "resources",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "evaluation",
        "name": "evaluation",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "order",
        "name": "order",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "noDecimal": true
        }
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
  const collection = dao.findCollectionByNameOrId("tasks");

  return dao.deleteCollection(collection);
});
