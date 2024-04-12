import express from "express";
const app = express();

var i;

app.get("/", (req, res) => {
  res.send("Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
