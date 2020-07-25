API Basename Structure: `{localhost:3000|{uri}}/{dev|prod}/`

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