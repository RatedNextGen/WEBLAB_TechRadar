# WEBLAB_TechRadar

[![Code Coverage](https://codecov.io/gh/RatedNextGen/WEBLAB_TechRadar/branch/main/graph/badge.svg)](https://codecov.io/gh/RatedNextGen/WEBLAB_TechRadar)
[![CI](https://github.com/ratednextgen/WEBLAB_TechRadar/actions/workflows/ci.yml/badge.svg)](https://codecov.io/gh/RatedNextGen/WEBLAB_TechRadar)

# Project description and documentation

- [Projektbeschreibung](docs/project_description.md)
- [Projektdokumentation](docs/ar42/project_documentation.md)
- [Reflexio und Fazit](docs/reflection_fazit.md)

# How to Start the TechRadar Project

## Prerequisites

Before starting the project, make sure you have the following installed:

- **Node.js** (Recommended: 20+)
- **MongoDB** (Ensure a local/dockerized or cloud-based MongoDB instance is running)
- **Git** (For cloning the repository)

## 1. Clone the Repository

```sh
git clone https://github.com/RatedNextGen/WEBLAB_TechRadar.git
cd WEBLAB_TechRadar/tech-radar
```

## 2. Install dependencies

```sh
npm install
```

## (optional) 3.Create .env file within tech-radar folder

Set a jwt secret

```sh
JWT_SECRET=your-secret-key
```

## 4.Start projects
```sh
 nx serve ui
 nx serve api
``` 
The backend has a small script that provisions a set of users and some technologies on every start.
For more info checkout the [config](tech-radar/apps/api/src/config/database.ts).

## 4.Open browser projects

```sh
 localhost:4200
```

## 5. Enter login credentials

| Email            | Password    |
|------------------|-------------|
| cto@hslu.ch      | cto123      |
| techlead@hslu.ch | techlead123 |
| employee@hslu.ch | employee123 |

## That's it!