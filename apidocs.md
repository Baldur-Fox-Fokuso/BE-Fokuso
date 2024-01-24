## post /login 

req.body
```json
{
  "email": "string",
  "password": "string"
} ```

response
```json
{
  "_id": "string",
  "access_token": "string"
}
```

## post /register 

req.body
```json 
{ 
  "name": "string", 
  "email": "string", 
  "password": "string" 
}```

response
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
}
```

## get /user/:userId 
req.params
```json
  "userId": "string"
}```

response
```json
{
  "_id": "string",
	"name": "string",
	"email": "string"
}
```

## get /user/:userId/task 
req.params
```json
{
  "userId": "string"
}```

response
```json
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
req.body
```json
{ 
  "name": "string", 
  "description": "string", 
  "deadline": "string", 
  "subTasks": "Task[]" 
}```

response
```json
{
  "message": "Task created successfully"
}
```

## get /task/:taskId 
req.params
```json
{
  "taskId": "string"
}```

response = Task
```json
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
```

## get /task/:taskId/session 
req.params
```json
{
  "taskId": "string"
}```

response
```json
{
  "taskId": "string",
  "duration": "number",
  "isDone": boolean,
  "createdAt": "date",
  "updatedAt": "date"
}
```

## post /task/:taskId/session 
```json
req.params =
{
  "taskId": "string"
}```

response
```json
{
  "message": "Session created successfully",
  "data": "updateResult",
  "sessionId": "string"
}
```

## patch /task/:taskId/session/:sessionId 
```json
req.params =
{
  "taskId": "string",
  "sessionId": "string"
}```

response
```json
{
  "success": true,
  "updateResult",
  "message": "Session has been updated to Done"
}
```

## get /task/:taskId/session/:sessionId 
```json
req.params =
{
  "taskId": "string",
  "sessionId": "string"
}```

response
```json

```
