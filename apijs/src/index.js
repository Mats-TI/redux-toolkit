const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use("/", require("./topics"));
app.use("/", require("./categories"));
app.listen(8085, () => {
  console.log("Listening on Port 8085");
});
