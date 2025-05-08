/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "roles",
    "created": "2023-05-12 10:00:00.000Z",
    "updated": "2023-05-12 10:00:00.000Z",
    "name": "roles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "title",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": true,
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
          "max": 500,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "icon",
        "name": "icon",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "color",
        "name": "color",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 50,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("roles");

  return dao.deleteCollection(collection);
});
