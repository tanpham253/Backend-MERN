$${\color{red}////////}$$

# Stack
<img src="https://img.shields.io/badge/MongoDB-47A248?logo=Mongodb&logoColor=white&style=for-the-badge" /><img src="https://img.shields.io/badge/Express-000000?logo=Express&logoColor=white&style=for-the-badge" /><img src="https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=white&style=for-the-badge" /><img src="https://img.shields.io/badge/Node-5FA04E?logo=nodedotjs&logoColor=white&style=for-the-badge" />
# Dependencies
<img src="https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white&style=for-the-badge" /><img src="https://img.shields.io/badge/Dotenv-ECD53F?logo=dotenv&logoColor=white&style=for-the-badge" />

# Initiate project
Initiate:
```
pnpm init
```
Install ExpressJs:
```
pnpm install express  --save
```
Install TypeScript:
```
pnpm i -D typescript  @types/express @types/node ts-node-dev
```
Install dotenv:
```
npm install express dotenv --save
```
# Create Directory
![Dir](public/images/dir.png)

# Config
Create tsconfig.json:
```
npx tsc --init
```
Edit tsconfig.json:
```
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "dist/",
    "strict": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*", "server.ts", "index.d.ts"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```
Edit package.json:
```
"scripts": {
    "build": "npx tsc -p",
    "start": "node app.ts",
    "dev": "ts-node-dev --respawn --transpile-only src/app.ts"
  },
```
# Development Process
Init
Create http responses (test with response text and static object)