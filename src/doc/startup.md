### populate db
```
pnpm run seed
```
### http requests
```
POST http://localhost:8080/api/v1/articles
Content-Type: application/json

{
    "title": "title",
    "keywords": "keywords",
    "description": "description",
    "content": "content",
    "date": "2003-08-21"
}
###
get http://localhost:8080/api/v1/articles
### id replace id with actual id
get http://localhost:8080/api/v1/articles/id
```
in src/rest-client/categories.http

# Internal issue 404 handle at app.ts

```
pnpm init
```

```
pnpm i express dotenv --save
```

```
pnpm i -D typescript @types/express @types/node ts-node-dev
```

```
npx tsc --init
```

### Nodemon work around for transpile and reload
may create memory leak because lack of options
https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change
```
npm install --save-dev ts-node nodemon
```
```
"dev": "nodemon src/server.ts",
"seed": "nodemon src/databases/seed.ts"
```


```
    "dev": "ts-node-dev --respawn --transpile-only src/app.ts",
    "build": "tsc",
    "start": "node build/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
    "seed": "ts-node-dev --respawn --transpile-only src/databases/seed.ts"
```


```
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./build/",
    "strict": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

Create server.ts to avoid crash
  Export app to server

API
  Create route for modules using express
  api -> app

Error handling
```
pnpm i http-errors
pnpm i @types/http-errors --save-dev
```
In app.ts

Define internal error in app.ts

Parse json body in app.ts for api
```
app.use(express.json()); // to parse json body
app.use(express.urlencoded({ extended: false })); // to parse urlencoded body
```
### Restful api

database -> service -> controller(& helper & response rule) -> routes -> app -> server

service use http-errors to response

Optional defy common response in helper

### MongoDB
use mongoose to interact with models
```
pnpm install mongoose --save
```

Connection in server.ts

Create 'code first'
Models of database in models folder

create route for model in app

Non controller db at test route

##### Remember Promise - Async/Await in db connections

including controller files and any file use connection

fake db json (random) fakerjs
```
pnpm add @faker-js/faker --save-dev
```
in test route

Create seeding

Problem in fakerjs: lorem min words fixed

Queries
https://mongoosejs.com/docs/queries.html
find=select

## pagination
start from controller
example in service product: find all function