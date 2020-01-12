# Node Calculator

A plain Node - React solution for a calculator, where the backend stores the memory.
The backend has 3 endpoints: 
- GET `/mem`: returns the current memory (default 0).
- POST `/mem`: sets the current memory.
- POST `/mod_mem`: Summation/subtraction from memory.
Works with keyboard keys too, including backspace, enter, comma and dot (The last two does the same decimal).

## Install

- Install packages `yarn install` / `npm install`.
- Build frontend `yarn run build`.
- Start server `yarn run start-server`.

## Run development

- Start frontend dev server `yarn run start-front`.
- Start server `yarn run start-server`.
- The frontend webpack-dev-server will proxy the `mem` and `mod_mem` paths to `localhost:3000`  
where the server run.
