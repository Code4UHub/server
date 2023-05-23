# Code4U API

> [ Base URL: ec2-3-140-188-143.us-east-2.compute.amazonaws.com:65534/v1 ]

Description API

## Class

### GET /class/all

Returns all the classes

#### Responses

- 200

```json
Status: "success"
Data: {
    "status": "success",
    "data": [
        {
            "class_id": "CodeCl1",
            "is_finished": false,
            "subject_id": "CS10101",
            "subject_name": "Materia de 1er semestre",
            "teacher_id": "L00000001",
            "teacher_name": "Emily Johnson"
        },
        {
            "class_id": "CodeCl2",
            "is_finished": false,
            "subject_id": "CS10101",
            "subject_name": "Materia de 1er semestre",
            "teacher_id": "L00000002",
            "teacher_name": "Matthew Smith"
        }
    ]
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

### GET /class/:class_id

Returns a class by its id

#### Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| class_id  | string | yes      | class id    |

#### Responses

- 200

```json
{
  "status": "success",
  "data": [
    {
      "class_id": "id123",
      "is_finished": false,
      "finished_date": "2023-05-26",
      "days": ["MA", "VI"],
      "start_time": "23:15:00",
      "end_time": "23:16:00",
      "teacher_id": "L00000003",
      "subject_id": "SE20101",
      "subject_name": "Software Engineering Principles",
      "teacher_name": "Olivia Brown"
    }
  ]
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

### GET /class/:class_id/students

Returns all students from a class by its id

#### Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| class_id  | string | yes      | class id    |

#### Responses

- 200

```json
{
  "status": "success",
  "data": [
    {
      "student_id": "a01731416",
      "pending": false,
      "request_date": "2023-05-17",
      "first_name": "Carlos",
      "last_name": "Vega"
    },
    {
      "student_id": "a00000002",
      "pending": false,
      "request_date": "2023-05-17",
      "first_name": "John",
      "last_name": "Wayne"
    },
    {
      "student_id": "a00000003",
      "pending": false,
      "request_date": "2023-05-18",
      "first_name": "John",
      "last_name": "Wayne"
    }
  ]
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

### POST /class/create

Creates a class

#### Request body example

```json
{
  "class_id": "newClas",
  "finished_date": "2023-05-26",
  "days": ["MA", "VI"],
  "start_time": "22:15",
  "end_time": "23:16",
  "subject_id": "T001",
  "teacher_id": "carlosvega"
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
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---

### POST /class/register

Register student to class

#### Request body example

```json
{
  "class_id": "XCode",
  "student_id": "A01735707"
}
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "Student succcessfully registered"
}
```

- 400

```json
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---

### POST /class/register

Register student to class

#### Request body example

```json
{
  "class_id": "XCode",
  "student_id": "A01735707"
}
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "Student succcessfully registered"
}
```

- 400

```json
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---

### PUT /class/accept_student

Accept student to class

#### Request body example

```json
{
  "class_id": "CodeCl1",
  "student_id": "a00000070"
}
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "Student succcessfully accepted"
}
```

- 400

```json
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---

### PUT /class/accept_students

Accept many student to class

#### Request body example

```json
[
  {
    "class_id": "MyOwnCode",
    "student_id": "A01735707"
  },
  {
    "class_id": "MyOwnCode",
    "student_id": "A01735740"
  }
]
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "X Students succcessfully accepted"
}
```

- 400

```json
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---

### PUT /class/reject_student

Reject student to class

#### Request body example

```json
{
  "class_id": "CodeCl1",
  "student_id": "a00000070"
}
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "Student succcessfully rejected"
}
```

- 400

```json
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---

### PUT /class/reject_students

Reject many student to class

#### Request body example

```json
[
  {
    "class_id": "MyOwnCode",
    "student_id": "A01735707"
  },
  {
    "class_id": "MyOwnCode",
    "student_id": "A01735740"
  }
]
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "X students succcessfully rejected"
}
```

- 400

```json
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---

<br>
<br>

## Teacher

### GET /teacher

Returns all the teachers

#### Responses

- 200

```json
Status: "success"
Data: {
    "status": "success",
    "data": [
        {
            "teacher_id": "L00000001",
            "first_name": "Emily",
            "last_name": "Johnson",
            "email": "l00000001@tec.com"
        },
        {
            "teacher_id": "L00000002",
            "first_name": "Matthew",
            "last_name": "Smith",
            "email": "l00000002@tec.com"
        },
    ]
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

### GET /teacher/login?email&?password

Log in for teacher account

#### Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| email     | string | yes      | teacher email    |
| password  | string | yes      | teacher password |

#### Responses

- 200

```json
{
  "status": "success",
  "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTAwMDAwMDA2Iiwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE2ODQ3MzAxMjksImV4cCI6MTY4NTMzNDkyOX0",
  "data": {
    "id": "a00000006",
    "role": "teacher",
    "first_name": "Carlos",
    "last_name": "Diaz",
    "email": "l00000006@tec.mx"
  }
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

### POST /teacher/register

Sign up for teacher

#### Request body example

```json
{
  "teacher_id": "goca",
  "first_name": "angel",
  "last_name": "gonzlez",
  "email": "angoca@tec.mx",
  "password": "12345"
}
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "Teacher succcessfully created"
}
```

- 400

```json
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---

### GET /teacher/:teacher_id/class

Returns all classes from a teacher

#### Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| teacher_id | string | yes      | teacher id  |

#### Responses

- 200

```json
{
  "status": "success",
  "data": [
    {
      "class_id": "issdds3",
      "is_finished": false,
      "subject_id": "CS10101",
      "subject_name": "Materia de 1er semestre",
      "days": ["MA", "VI"],
      "start_time": "23:15:00",
      "end_time": "23:16:00"
    },
    {
      "class_id": "morning",
      "is_finished": false,
      "subject_id": "AI40101",
      "subject_name": "Artificial Intelligence and Machine Learning",
      "days": ["LU", "MI"],
      "start_time": "15:00:00",
      "end_time": "16:30:00"
    }
  ]
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

### GET /teacher/:teacher_id/student_class

Returns all requests from a teacher

#### Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| teacher_id | string | yes      | teacher id  |

#### Responses

- 200

```json
{
  "status": "success",
  "data": [
    {
      "class_id": "CodeCl1",
      "subject_id": "CS10101",
      "subject_name": "Materia de 1er semestre",
      "student_id": "A01735740",
      "first_name": "Carlos",
      "last_name": "Espindola",
      "request_date": "2023-05-05",
      "pending": true
    },
    {
      "class_id": "thisIsCl2",
      "subject_id": "CS10101",
      "subject_name": "Materia de 1er semestre",
      "student_id": "A01735740",
      "first_name": "Carlos",
      "last_name": "Espindola",
      "request_date": null,
      "pending": true
    }
  ]
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

<br>
<br>

## Student

### GET /student

Returns all the students

#### Responses

- 200

```json
Status: "success"
Data: {
    "status": "success",
    "data": [
        {
            "student_id": "a00000002",
            "first_name": "John",
            "last_name": "Wayne",
            "email": "a00000002@tec.mx"
        },
        {
            "student_id": "a00000001",
            "first_name": "John",
            "last_name": "Wayne",
            "email": "a00000001@tec.mx"
        }
    ]
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

### GET /student/login?email&?password

Log in for student account

#### Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| email     | string | yes      | student email    |
| password  | string | yes      | student password |

#### Responses

- 200

```json
{
  "status": "success",
  "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTAwMDAwMDAyIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2ODQ3MzQ1MTcsImV4cCI6MTY4NTMzOTMxN30.S2zf_63Ue4pm0uZH9HcuKKDy2DGWsKQs19AG9JQYY2A",
  "data": {
    "id": "a00000002",
    "role": "student",
    "first_name": "John",
    "last_name": "Wayne",
    "email": "a00000002@tec.mx"
  }
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

### POST /student/register

Sign up for student

#### Request body example

```json
{
  "student_id": "a01551112",
  "first_name": "Pedro",
  "last_name": "Romero",
  "email": "a01552374@tec.mx",
  "password": "12345"
}
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "Student succcessfully created"
}
```

- 400

```json
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---

### GET /student/:student_id/class

Returns all classes from a student

#### Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| student_id | string | yes      | student id  |

#### Responses

- 200

```json
{
  "status": "success",
  "data": [
    {
      "class_id": "CodeCl1",
      "pending": false,
      "is_finished": false,
      "days": ["LU", "JU"],
      "start_time": "10:00:00",
      "end_time": "11:30:00",
      "subject_name": "Materia de 1er semestre",
      "teacher_name": "Emily Johnson"
    },
    {
      "class_id": "CodeCl2",
      "pending": false,
      "is_finished": false,
      "days": ["MA", "VI"],
      "start_time": "09:00:00",
      "end_time": "10:00:00",
      "subject_name": "Materia de 1er semestre",
      "teacher_name": "Matthew Smith"
    }
  ]
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

<br>
<br>

## Subject

### GET /subject

Returns all the subjects

#### Responses

- 200

```json
Status: "success"
Data: {
    "status": "success",
    "data": [
        {
            "subject_id": "CS10101",
            "subject_name": "Materia de 1er semestre"
        },
        {
            "subject_id": "IT10201",
            "subject_name": "Materia de 2do semestre"
        },
        {
            "subject_id": "SE20101",
            "subject_name": "Software Engineering Principles"
        }
    ]
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

### GET /subject/:subject_id/class

Returns all modules from a subject

#### Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| subject_id | string | yes      | subject id  |

#### Responses

- 200

```json
{
  "status": "success",
  "data": [
    {
      "module_id": 1,
      "title": "Modulo 1 Test",
      "subject_id": "T001"
    },
    {
      "module_id": 2,
      "title": "Modulo 2 Test",
      "subject_id": "T001"
    },
    {
      "module_id": 3,
      "title": "Modulo 3 Test",
      "subject_id": "T001"
    }
  ]
}
```

- 400

```json
Status: "error"
Data: "Invalid request"
```

- 500

```json
Status: "failed"
Data: "Internal server error"
```

---

### POST /subject

Creates a subject

#### Request body example

```json
{
  "subject_id": "T001",
  "subject_name": "Test subject"
}
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "Subject succcessfully created"
}
```

- 400

```json
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---

<br>
<br>

## Module

### POST /module

Creates a module

#### Request body example

```json
{
  "title": "Modulo 3 Test",
  "subject_id": "T001"
}
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "Module succcessfully created"
}
```

- 400

```json
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---

<br>
<br>

## Challenge

### POST /challenge

Creates a challenge

#### Request body example

```json
{
  "title": "Modulo 3 Test",
  "subject_id": "T001"
}
```

#### Responses

- 200

```json
{
  "status": "success",
  "data": "Challenge succcessfully created"
}
```

- 400

```json
Status: "success"
Data: "Invalid request"
```

- 500

```json
Status: "success"
Data: "Internal server error"
```

---
