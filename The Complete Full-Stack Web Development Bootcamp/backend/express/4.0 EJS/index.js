import express from "express";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(morgan("combined"));

app.get("/", (req, res) => {
  var date = new Date();
  var day = date.getDay();
  var dayString = "";
  var instruction = "";
  if (day == 0 || day == 6) {
    dayString = "the weekend";
    instruction = "Time to have Fun!";
  } else {
    dayString = "a weekday";
    instruction = "Time to work hard :(";
  }
  res.render(__dirname + "/views/index.ejs", {
    dayString: dayString,
    instruction: instruction,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
