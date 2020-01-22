# Project fRiend Loan Payment Calculator

Microservice focused on frontend functionality and appearance.

Screen capture demonstrating some of the functionality:

![Imgur Image](./fec.gif)


## Setup to run locally

Install node ^10.15.3 and webpack ^6.13.4 if not already installed.

Clone repo to local machine.

Config local database 'dev' authentication in:

![database/auth.js](database/auth.js)

From within the root directory of repo run the following commands:

```sh
npm install
npm run seed:dev
npm run build
npm run start
```

Navigate to link in a web browser.
>http://localhost:3001


Optionally add an 'id' query key, value between 1 and 100.
>http://localhost:3001?id=7


