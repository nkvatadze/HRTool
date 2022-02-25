<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

# HR Tool

## Table of Contents

* [About](#about-app)
* [Technologies Used](#technologies-used-during-development)
* [Set Up Instructions](#setup-instructions)
* [Rest API](#rest-api)
    * [Get All Quotes](#quotes)

---

## About App:

Ever wondered why HR's do not get back with feedback on time? Out of many circumstances, one of the reasons can be - HR
lose the track of some candidates while performing a high volume recruitment cycle. We believe that solution lays in the
digitalisation of recruitment processes and therefore created a short brief designed for creating a software that helps
HRs' see status updates on every candidate in one place.

## Technologies used during development

System's backend side is written on Laravel framework and frontend side is on react.js. Style is mainly developed using
material UI

| Stack    | Version |
|----------|---------|
| PHP      | 8.x     |
| Laravel  | 9.x     |
| React    | 17.x    |
| composer | 2.x     |

## Setup Instructions

### Setup guide

- Clone the project and move to the directory

```console
user@pc:~$ git clone https://github.com/nkvatadze/HRTool.git hr-tool
user@pc:~$ cd hr-tool
```

- Install dependencies

```console
user@pc:~/hr-tool$ composer install --no-dev
```

- Copy .env.example file into .env

```console
user@pc:~/hr-tool$ cp .env.example .env
```

- Generate the application key

```console
user@pc:~/hr-tool$ php artisan key:generate
```

- Install npm & compile the assets

```console
user@pc:~/hr-tool$ npm install
user@pc:~/hr-tool$ npm run prod
```

- Create table and provide database credentials in .env fil

```console
DB_HOST={Your database's host}
DB_PORT={Your database's PORT}
DB_DATABASE={Your database's name}
DB_USERNAME={Your database's username}
DB_PASSWORD={Your database username's password}
```

- Run migrations & seed the tables

```console
user@pc:~/hr-tool$ php artisan migrate --seed
```

For running the server you can use the command

```console
user@pc:~/hr-tool$ php artisan serve
```

---

## Rest API

| HTTP Method | Endpoint                                  | Name                                    |
|-------------|-------------------------------------------|-----------------------------------------|
| GET         | [/api/candidates](#index)                 | Get all candidates (index)              |
| POST        | [/api/candidates](#store)                 | Create new candidate (store)            |
| GET         | [/api/candidates/{candidateId}](#show)    | Show candidate's information (show)     |
| PATCH       | [/api/candidates/{candidateId}](#update)  | Update candidate's information (update) |
| Delete      | [/api/candidates/{candidateId}](#destroy) | Delete candidate (destroy)              |
| GET         | [/api](#collection)                       | Get all collection data (index)         |

### Get All Candidates<a name="candidate.index" />

---

#### Headers

| Key    | Value            |
|--------|------------------|
| Accept | application/json |

#### Query Params

| Name     | Type    | Requirement | Values           |
|----------|---------|-------------|------------------|
| page     | integer | required    | greater then 0   | 
| per_page | integer | required    | greater then 0   | 
| search   | string  | optional    | string to search | 

#### Response 200

```json
{
    "candidates": [
        {
            "id": 29,
            "status_id": 2,
            "position_id": 2,
            "first_name": "Foo",
            "last_name": "Bar",
            "skills": [],
            "phones": [],
            "email": null,
            "years_of_experience": null,
            "min_salary": 10,
            "max_salary": 30,
            "linkedin_url": null,
            "has_cv": true,
            "created_at": 1645746895
        }
    ],
    "total": 1
}
```

### Create new candidate<a name="candidate.store" />

---

#### Headers

| Key    | Value            |
|--------|------------------|
| Accept | application/json |

#### Body Params

| Name                | Type    | Requirement | Values                                                         |
|---------------------|---------|-------------|----------------------------------------------------------------|
| first_name          | string  | required    | first name value                                               |
| last_name           | string  | required    | last name value                                                |
| position_id         | integer | required    | Possible position id from  [/api](#collection) endpoint        | 
| min_salary          | integer | optional    | Min Salary, min=0 / max=1000000                                | 
| max_salary          | integer | optional    | Max Salary, min=0 / max=1000000                                | 
| email               | string  | optional    | correct email                                                  | 
| years_of_experience | integer | optional    | Years of experience min=0 / max=100                            | 
| skills              | array   | optional    | Possible values of skill ids from  [/api](#candiates) endpoint | 
| phones              | array   | optional    | Array of phone number strings                                  | 
| linkedin_url        | string  | optional    | LinkedIn's URL, in correct url format                          | 
| cv                  | file    | optional    | CV file in pdf, doc, docx format                               | 

#### Response 201

```json
{}
```

### Show candidate's information<a name="candidate.show" />

---

#### Headers

| Key    | Value            |
|--------|------------------|
| Accept | application/json |

#### URL Params

| Name        | Type    | Requirement | Values               |
|-------------|---------|-------------|----------------------|
| candidateId | integer | required    | Valid candidate's id | 

#### Response 200

```json
{
    "id": 45,
    "status_id": 1,
    "position_id": 2,
    "first_name": "Foo",
    "last_name": "Bar",
    "skills": [
        1,
        2
    ],
    "phones": [
        "+995123123123",
        "12322332"
    ],
    "email": "nika@gmal.com",
    "years_of_experience": null,
    "min_salary": 2,
    "max_salary": 4,
    "linkedin_url": null,
    "has_cv": true,
    "created_at": 1645783950,
    "statuses": []
}
```

### Update candidate's information<a name="candidate.update" />

---

#### Headers

| Key    | Value            |
|--------|------------------|
| Accept | application/json |

#### Query Params

| Name           | Type    | Requirements | Values                                           |
|----------------|---------|--------------|--------------------------------------------------|
| status_id      | integer | required     | Valid status id from [/api](#candiates) endpoint | 
| status_comment | string  | required     | Status change comment                            | 

#### URL Params

| Name        | Type    | Requirement | Values               |
|-------------|---------|-------------|----------------------|
| candidateId | integer | required    | Valid candidate's id | 

#### Response 201

```json
{
    "id": 14,
    "name": "First Contact",
    "candidate_id": 43,
    "status_id": 2,
    "comment": "3asda",
    "created_at": 1645786423
}
```

### Delete Candidates<a name="candidate.destroy" />

---

#### Headers

| Key    | Value            |
|--------|------------------|
| Accept | application/json |

#### URL Params

| Name        | Type    | Requirement | Values               |
|-------------|---------|-------------|----------------------|
| candidateId | integer | required    | Valid candidate's id | 


#### Response 204

```json
{}
```


### Get all collection data<a name="collection.index" />

---

#### Headers

| Key    | Value            |
|--------|------------------|
| Accept | application/json |


#### Response 200

```json
{
    "statuses": [
        {
            "id": 1,
            "name": "Initial"
        },
        {
            "id": 2,
            "name": "First Contact"
        },
        {
            "id": 3,
            "name": "Interview"
        },
        {
            "id": 4,
            "name": "Tech Assignment"
        },
        {
            "id": 5,
            "name": "Rejected"
        },
        {
            "id": 6,
            "name": "Hired"
        }
    ],
    "positions": [
        {
            "id": 1,
            "name": "Laravel Developer"
        },
        {
            "id": 2,
            "name": "PHP developer"
        },
        {
            "id": 3,
            "name": "Node.js Developer"
        },
        {
            "id": 4,
            "name": "React.js Developer"
        },
        {
            "id": 5,
            "name": "Vue.js developer"
        },
        {
            "id": 6,
            "name": "Human Resources"
        },
        {
            "id": 7,
            "name": "Software Engineer"
        },
        {
            "id": 8,
            "name": "Python Developer"
        }
    ],
    "skills": [
        {
            "id": 1,
            "name": "Laravel"
        },
        {
            "id": 2,
            "name": "PHP"
        },
        {
            "id": 3,
            "name": "Node.js"
        },
        {
            "id": 4,
            "name": "Vue.js"
        },
        {
            "id": 5,
            "name": "React"
        },
        {
            "id": 6,
            "name": "MySQL"
        },
        {
            "id": 7,
            "name": "Javascript"
        },
        {
            "id": 8,
            "name": "Python"
        },
        {
            "id": 9,
            "name": "Django"
        },
        {
            "id": 10,
            "name": "CSS"
        },
        {
            "id": 11,
            "name": "HTML"
        }
    ]
}
```
