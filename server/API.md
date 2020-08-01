API Basename Structure: `{localhost:3000|{uri}}/{dev|prod}/`

## Auth Headers

Auth is a hack on the Basic Authorization header scheme. 

```javascript
token = base64encode(`Google:${idToken}`);
```

or

```javascript
token = base64encode(`DeveloperOnly:${netID}`); // Only works in dev env
```

### Request headers:

```javascript
{
  "Authorization": `Basic ${token}`
}
```

## GET /test

Pings test route

### Response Body Schema

```json
{
  "message": "string"
}
```

## GET /admin/dining-hall

Fetches list of dining halls

### Response Body Schema

```json
{
  "message": "string",
  "diningHalls": [{
    "DiningHallName": "string",
    "Latitude": "number",
    "Longitude": "number",
    "Tables": {
      "TableID": "number",
      "Capacity": "number"
    }
  }]
}
```

## POST /admin/dining-hall-table

Adds a dining hall table to a specific dining hall

### Request Body Schema

```json
{
  "DiningHallName": "string",
  "Capacity": "number"
}
```

### Response Body Schema

```json
{
  "message": "string",
  "table": {
    "TableID": "number",
    "Capacity": "number",
    "DiningHallName": "string" 
  }
}
```

## PUT /admin/dining-hall-table

Updates metadata of a specific dining hall table

### Request Body Schema

```json
{
  "TableID": "number",
  "Capacity": "number"
}
```

### Response Body Schema

```json
{
  "message": "string",
}
```

## DELETE /admin/dining-hall-table

Deletes a dining hall table

### Request Body Schema

```json
{
  "TableID": "number"
}
```

### Response Body Schema

```json
{
  "message": "string",
}
```

## POST /admin/dining-hall

Adds a dining hall table to a specific dining hall

### Request Body Schema

```json
{
  "DiningHallName": "string",
  "Latitude": "number",
  "Longitude": "number"
}
```

### Response Body Schema

```json
{
  "message": "string",
}
```

## DELETE /admin/dining-hall

Deletes a dining hall

### Request Body Schema

```json
{
  "DiningHallName": "string"
}
```

### Response Body Schema

```json
{
  "message": "string",
}
```

## POST /queue

Joins the queue

### Request Body Schema

```json
{
  "DiningHallName": "string",
  "QueueGroup": ["NetID"],
}
```

### Response Body Schema

```json
{
    "message": "string",
    "queueRequest": {
        "QueueRequestID": "number",
        "EnterQueueTime": "datetime",
        "ExitQueueTime": "datetime",
        "RequestTime": "datetime",
        "Preferences": "string",
        "Canceled": "boolean",
        "DiningHallName": "string",
        "QueueGroup": ["NetID"]
    }
}
```

## POST /admit

Attempts to admit off the queue. Returns back null admittedEntry if it can't

### Request Body Schema

```json
{
  "NetID": "string",
}
```

### Response Body Schema

```json
{
    "message": "string",
    "admittedEntry": {
        "EntryID": "number",
        "MealType": "string",
        "AdmitOffQueueTime": "datetime",
        "TableID": "number",
        "QueueRequestID": "number",
        "DiningHallName": "string",
        "QueueGroup": ["NetID"]
    }
}
```

## POST /admit/leave

Exits the dining hall

### Request Body Schema

```json
{
  "NetID": "string",
}
```

### Response Body Schema

```json
{
    "message": "string"
}
```

## POST /admit/arrive

Enters the dining hall *after* having been admitted

### Request Body Schema

```json
{
  "NetID": "string",
}
```

### Response Body Schema

```json
{
    "message": "string"
}
```

## GET /hall-recommendation

Returns the best dining hall based on recommendation system

### Request Body Schema

```json
{
  "Latitude": "number",
  "Longitude": "number",
}
```

### Response Body Schema

```json
{
  "DiningHallName": "string"
}
```