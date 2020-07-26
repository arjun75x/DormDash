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

## GET /dining-hall

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

## POST /dining-hall-table

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
}
```

## PUT /dining-hall-table

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

## DELETE /dining-hall-table

Deletes a dining hall table from a specific dining hall 

### Request Body Schema

```json
{
  "DiningHallName": "string",
  "TableID": "number"
}
```

### Response Body Schema

```json
{
  "message": "string",
}
```