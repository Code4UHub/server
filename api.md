# Code4U API

> [ Base URL: ec2-3-140-188-143.us-east-2.compute.amazonaws.com:65534/v1 ]

Description API

## Assignment

### GET /assignment/:id/

Returns all the questions for an assignment

#### Parameters

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| id        | string | yes      | assignment id |

#### Responses

- 200

```json
status: "sucess"
data: [{
                "open_question_id": 1,
                "open_question": {
                    "id": "TC1028_#tema_tipo_#",
                    "tests": [
                        {
                            "input": {
                                "base": 5,
                                "height": 10
                            },
                            "output": 25
                        },
                        {
                            "input": {
                                "base": 8,
                                "height": 2
                            },
                            "output": 8
                        },
                        {
                            "input": {
                                "base": 12,
                                "height": 6
                            },
                            "output": 36
                        }
                    ],
                    "title": "Calculating the area of a triangle",
                    "topic": "Geometry",
                    "author": "John Smith",
                    "driver": "calculate_area",
                    "difficulty": "Easy",
                    "description": "Write a function that calculates the area of a triangle given its base and height."
                },
                "assignment_id": 1
            },
            },]
```

- 400

```json
Status: "sucess"
Data: "Invalid request"
```

- 500

```json
Status: "sucess"
Data: "Internal server error"
```

# **\*\*\*\***\*\*\*\***\*\*\*\***\*\*\***\*\*\*\***\*\*\*\***\*\*\*\***

## Class

### GET /class/all

Returns all the classes

#### Responses

- 200

```json
Status: "sucess"
Data: {
    "status": "success",
    "data": [
        {
            "class_id": "CodeCl1",
            "subject.subject_id": "CS10101",
            "subject.subject_name": "Materia de 1er semestre"
        },
        {
            "class_id": "CodeCl2",
            "subject.subject_id": "CS10101",
            "subject.subject_name": "Materia de 1er semestre"
        },
        {
            "class_id": "MyOwnCode",
            "subject.subject_id": "CS10101",
            "subject.subject_name": "Materia de 1er semestre"
        }
    ]
}
```

- 400

```json
Status: "sucess"
Data: "Invalid request"
```

- 500

```json
Status: "sucess"
Data: "Internal server error"
```

### GET /class?id

Returns a class by its id

#### Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | string | yes      | class id    |

#### Responses

- 200

```json
{
  "status": "success",
  "data": [
    {
      "class_id": "CodeCl2",
      "is_finished": false,
      "finished_date": null,
      "days": ["MA", "VI"],
      "start_time": "09:00:00",
      "end_time": "10:00:00",
      "teacher_id": "L00000002",
      "subject_id": "CS10101"
    }
  ]
}
```

- 400

```json
Status: "sucess"
Data: "Invalid request"
```

- 500

```json
Status: "sucess"
Data: "Internal server error"
```

### POST /class/create

Returns a class by its id

#### Request body example

```json
{
  "class_id": "MyOwnCode",
  "is_finished": false,
  "finished_date": null,
  "days": ["LU", "MA"],
  "start_time": "08:00:00",
  "end_time": "10:00:00",
  "subject_id": "CS10101",
  "teacher_id": "L00000001"
}
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "Class succesfully created"
}
```

- 400

```json
Status: "sucess"
Data: "Invalid request"
```

- 500

```json
Status: "sucess"
Data: "Internal server error"
```
