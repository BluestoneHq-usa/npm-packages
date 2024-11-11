#!/usr/bin/env node
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readline = require('readline');
const { exec, spawn } = require('child_process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const loadingAnimation = () => {
    let loading = ['Loading', 'Loading.', 'Loading..', 'Loading...'];
    let i = 0;

    return setInterval(() => {
        process.stdout.write(`\r${loading[i++ % loading.length]}   `);
    }, 500);
};

const execShellCommand = (cmd) => new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.warn(error);
            reject(error);
        }
        resolve(stdout ? stdout : stderr);
    });
});

const projectSetup = async (pname) => {
    console.log("Initializing Project...");
    const loading = loadingAnimation();

    try {
        await execShellCommand(`mkdir ${pname}`);
        await execShellCommand(`mkdir ${pname}/client ${pname}/server`);
        console.log("Done 2");
        // Client setup
        await execShellCommand(`cd ${pname}/client && npm create vite@latest . -- --template react-ts`);
        console.log("Done 3");
        await execShellCommand(`cd ${pname}/client && npm i`);
        console.log("Done 4");
        await execShellCommand(`cd ${pname}/client && npm install -D tailwindcss postcss autoprefixer`);
        console.log("Done 5");
        await execShellCommand(`cd ${pname}/client && npx tailwindcss init -p`);
        console.log("Done 6");
        await execShellCommand(`cd ${pname}/client && npm install react-router-dom`);
        console.log("Done 7");
        await execShellCommand(`cd ${pname}/client && mkdir components hooks pages types`);
        console.log("Done 8");
        await execShellCommand(`echo "/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: []
};" > ${pname}/client/tailwind.config.js`);

        console.log("Done 9");
        await execShellCommand(`echo "@tailwind base; @tailwind components; @tailwind utilities;" > ${pname}/client/src/index.css`);
        console.log("Done 10");
        // Server setup

        await execShellCommand(`cd ${pname}/server && npm init -y`);
        console.log("Done 11");
        await execShellCommand(`cd ${pname}/server && npm i typescript`)
        console.log("Issue Solved.")
        await execShellCommand(`cd ${pname}/server && npx tsc --init`);
        console.log("Done 12");
        await execShellCommand(`cd ${pname}/server && npm i @types/node -D`);
        console.log("Done 13");
        await execShellCommand(`cd ${pname}/server && npm install ts-node -D`);
        console.log("Done 14");
        await execShellCommand(`echo '{
            "name": "${pname}",
            "version": "1.0.0",
            "description": "",
            "main": "server.ts",
            "scripts": {
              "test": "echo \\\"Error: no test specified\\\" && exit 1",
              "watch": "tsc -w",
              "start": "nodemon src/server.ts --trace-warnings",
              "dev": "npm-run-all --parallel watch start",
              "build": "tsc"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "devDependencies": {
              "@types/aws-sdk": "^2.7.0",
              "@types/bcrypt": "^5.0.2",  
              "@types/cookie-parser": "^1.4.7",
              "@types/cookies": "^0.9.0",
              "@types/dotenv": "^8.2.0",
              "@types/jsonwebtoken": "^9.0.6",
              "@types/multer": "^1.4.11",
              "@types/node": "^20.12.7",
              "@types/node-cron": "^3.0.11",
              "@types/uuid": "^9.0.8",
              "@types/validator": "^13.11.10",
              "@types/winston": "^2.4.4",
              "cookie-parser": "^1.4.6",
              "cookies": "^0.9.1",
              "joi": "^17.12.3",
              "ts-node": "^10.9.2",
              "typescript": "^5.6.2",
              "winston": "^3.13.0"
            },
            "dependencies": {
              "@aws-sdk/client-dynamodb": "^3.645.0",
              "@aws-sdk/lib-dynamodb": "^3.637.0",
              "@smithy/node-http-handler": "^3.2.4",
              "@types/cors": "^2.8.17",
              "@types/express": "^4.17.21",
              "@types/http-errors": "^2.0.4",
              "@types/express-session": "^1.18.0",
              "aws-sdk": "^2.1691.0",
              "axios": "^1.7.2",
              "bcrypt": "^5.1.1",
              "body-parser": "^1.20.2",
              "cors": "^2.8.5",
              "dotenv": "^16.4.5",
              "express": "^4.19.2",
              "express-async-handler": "^1.2.0",
              "express-session": "^1.18.0",
              "http-errors": "^2.0.0",
              "jsonwebtoken": "^9.0.2",
              "multer": "^1.4.5-lts.1",
              "nodemon": "^3.1.4",
              "npm-run-all": "^4.1.5"
            }
          }
          
          ' > ${pname}/server/package.json`);
        console.log("Done 15");
        await execShellCommand(`echo '
            {
  "compilerOptions": {
    "target": "ES6",
    "skipLibCheck": true,
    "module": "commonjs",
    "baseUrl": "./",
    "paths": {
      "*": ["node_modules/*"]
    },
    "typeRoots": [
      "./node_modules/@types",
      "./types"
    ],
    "types": [
      "node",
      "express",
      "express-session"
    ],
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "typeRoots": ["./src/types", "./node_modules/@types"]
  },
  "include": ["**/*"],
  "exclude": ["node_modules"]
}

            ' > ${pname}/server/tsconfig.json`);
        console.log("Done 16");
        await execShellCommand(`cd ${pname}/server && npm install`)
        console.log("Done 17");
        await execShellCommand(`cd ${pname}/server && mkdir src types`);
        console.log("Done 18");
        await execShellCommand(`cd ${pname}/server/src && mkdir config controllers middlewares models repositories routes services utils validators`);
        console.log("Done 19");
        await execShellCommand(`cd ${pname}/server/src && touch server.ts`);
        console.log("Done 20");
        await execShellCommand(`code ${pname}`);
        console.log("Done 21");
    } catch (error) {
        console.error("Error initializing project:", error);
    } finally {
        clearInterval(loading);
        console.log("\nInitialization Complete!\n");
    }
};

rl.question("Project Name: ", (pname) => {
    projectSetup(pname);
    rl.close();
});
