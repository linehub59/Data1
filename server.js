const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config()

const app = express();

app.use(cors( {
  origin: "*"
}));
app.use(express.json());
app.use(bodyParser.json());



// Routes
app.use("/api/dashboard", require("./routes/dashboardRoute"));
app.use("/api/data", require("./routes/dataRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/transactions", require("./routes/transactionsRoute"));
app.use("/api/profile", require("./routes/profileRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});