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
    "Capacity": "number"
  }]
}
```