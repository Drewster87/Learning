//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 3000;
const app = express();

/**@type {boolean} */
var isUserAuthenticated = false;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.body["password"] == "myBean1234") {
    isUserAuthenticated = true;
  } else {
    isUserAuthenticated = false;
  }
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (isUserAuthenticated) {
    res.sendFile(__dirname + "/public/secret.html");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
