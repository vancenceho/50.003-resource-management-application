# Dell Technologies Request & Resource Management Web Application

## 🖥️ 50.003 Elements of Software Construction Project - TEAM 4

| Name                    |   ID    | Roles                 |
| :---------------------- | :-----: | :-------------------- |
| Megha Pusti             | 1007128 | Front-End Development |
| Vancence Ho             | 1007239 | Full-Stack Development|
| Koo Rou Zhen            | 1007038 | Back-End Development  |
| Swasti Arya             | 1007235 | Front-End Development |
| Hetavi Shah             | 1007034 | Front-End Development |
| Shrinidhi Arul Prakasam | 1007007 | Front-End Development |

### 🚀 Getting Started

#### Prerequisities

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

#### Installation

1. Clone the repository:

```shell
git clone https://github.com/vancenceho/50.003-resource-management-application.git
```

2. Navigate to project directory:

```shell
cd 50.003-resource-management-application
```

3. Install dependencies:

```shell
npm i
```

4. Launch backend API server  

``` shell
cd backend-service

docker-compose up
```

check if the docker containers are pulled and up running through Docker Desktop

```shell
npm start
```

> go to `localhost:3000` to see if **Express.js** server is running  
> go to the following to view different containers: 
>> `localhost:8080` : `Swagger` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(API Documentation & Testing)  
>> `localhost:8081` : `mongo-express` &nbsp;(MongoDB UI)

once all backend frameworks has been live

5. Launch the frontend web application

```shell
cd frontend-service/react-res-management-app

npm start
```

`REACT` should host the web application home web page on `localhost:3000/3001` defined in `.ENV`, depending if you have **Express.js** ran.

<br>

#

### 🙏 Acknowledgements

This project was part of the [50.003 - Elements of Software Construction](https://istd.sutd.edu.sg/undergraduate/courses/50003-elements-of-software-construction/) module during Summer 2024 under the **Information Systems Technology & Design (ISTD)** faculty at **SUTD** in collaboration with **Dell Technologies Singapore**. 

All contents of the project are credited to:  
Copyright &copy; 2024 _Dell Technologies Singapore_ 

All other form of documentation in the project and course are credited to:   
Copyright &copy; 2024 _TEAM 4_ &nbsp; | &nbsp; ISTD &nbsp; | &nbsp; SUTD

#
