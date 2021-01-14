const express = require("express")
const app = express()

const { db } = require("./db/database")

app.use(express.json())
app.use("/recipes", require("./routes/recipes"))
app.use("/nutritions", require("./routes/nutritions"))
app.use("/ratings", require("./routes/ratings"))
app.use("/ingredints", require("./routes/ingredients"))

// Test
db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) =>  console.log(err))

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => res.send("HELLO"))

app.listen(PORT, console.log("Started on port: ", PORT))