const dotenv = require('dotenv'); 
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const connectDB = require('./configs/mongoDB_config');

const stockOverviewRoute = require("./routes/stockOverview.route");
const userRoute = require("./routes/user.route");
const dailyPricelistRoute = require("./routes/dailyPricelist.route");
const dailyMarketSumRoute = require("./routes/dailyMarketSum.route");
const app = express();


dotenv.config(); 
connectDB();

const port = process.env.PORT || 3000; 

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({credentials:true, origin:'*', optionsSuccessStatus: 200}));


app.get('/', (req, res) => {
  res.send("Hello from the API")
})

// routes
app.use("/api/stockMarket", stockOverviewRoute);
app.use("/api/users", userRoute);
app.use("/api/dailyPricelists", dailyPricelistRoute);
app.use("/api/dailyMarketSummary", dailyMarketSumRoute);

// mongoose
//   .connect(
//     process.env.URI
//   )
//   .then(() => {
//     console.log("Connected to database!");
//     app.listen(port, () => {
//       console.log("Server is running on port 3000");
//     });
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

  app.listen(
    port,
    console.log(
      `Server running on port ${port}`
    )
  )