/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "simulations",
    "created": "2023-05-12 10:01:00.000Z",
    "updated": "2023-05-12 10:01:00.000Z",
    "name": "simulations",
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
          "max": 1000,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "role",
        "name": "role",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "roles",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": ["title"]
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
          "values": ["beginner", "intermediate", "advanced", "expert", "adaptive"]
        }
      },
      {
        "system": false,
        "id": "duration",
        "name": "duration",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 180,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "image",
        "name": "image",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": ["image/jpeg", "image/png", "image/svg+xml", "image/gif", "image/webp"],
          "thumbs": ["100x100", "300x300"]
        }
      },
      {
        "system": false,
        "id": "isActive",
        "name": "isActive",
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
  const collection = dao.findCollectionByNameOrId("simulations");

  return dao.deleteCollection(collection);
});
