## post /login 
```js
req.body=
{
  "email": "string",
  "password": "string"
} 

res.json=
{
  "_id": "string",
  "access_token": "string"
}
```

## post /register 
```js 
req.body = { 
  "name": "string", 
  "email": "string", 
  "password": "string" 
}

res.json = {
  "id": "string",
  "name": "string",
  "email": "string",
}
```

## get /user/:userId 
```js
req.params = { 
  "userId": "string"
}

res.json = 
{
  "_id": "string",
	"name": "string",
	"email": "string"
}
```

## get /user/:userId/task 
```js
req.params =
{
  "userId": "string"
}

res.json =
[
  {
  "_id": "string",
  "userId": "string",
  "name":"you ",
  "sessions":[
    {
    "taskId": "string",
    "duration": "number",
    "isDone": boolean,
    "createdAt": "date",
    "updatedAt": "date"
    }
  ],
  "subTasks": [
    {
    "name": "string",
    "isDone": "boolean"
    }
  ],
  "description": "string",
  "deadline": "string",
  "isDone": "boolean",
  "createdAt": "date"
  }
]
```

## post /task 
```js
req.body = 
{ 
  "name": "string", 
  "description": "string", 
  "deadline": "string", 
  "subTasks": "Task[]" 
}

res.json =
{
  "message": "Task created successfully"
}
```

## get /task/:taskId 
```js
req.params =
{
  "taskId": "string"
}

res.json = "Task"
```

## get /task/:taskId/session 
```js
req.params =
{
  "taskId": "string"
}

res.json = "Session[]"
```

## post /task/:taskId/session 
```js
req.params =
{
  "taskId": "string"
}

res.json =
{
  "message": "Session created successfully",
  "data": "updateResult",
  "sessionId": "string"
}
```

## patch /task/:taskId/session/:sessionId 
```js 
req.params =
{
  "taskId": "string",
  "sessionId": "string"
}

res.json =
{
  "success": true,
  "updateResult",
  "message": "Session has been updated to Done"
}
```

## get /task/:taskId/session/:sessionId 
```js
req.params =
{
  "taskId": "string",
  "sessionId": "string"
}
```
