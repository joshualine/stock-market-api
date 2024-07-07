const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const connectDB = require('./configs/mongoDB_config');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');


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
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: '*', optionsSuccessStatus: 200 }));

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'index.html'));
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  res.json({ message: 'File uploaded successfully' });

  // try {
  //   // Create a transporter object using the default SMTP transport
    

  //   const newFileName = req.body.fileName || req.file.originalname; // Get the new file name from the request
  //   const newFileNameFirst = req.body.fileNameFirst

  //   let transporter = nodemailer.createTransport({
  //     host: 'smtp.office365.com',
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: 'jchinwendu@capitalbancorpgroup.com', // replace with your custom email
  //       pass: process.env.MAILPASS  // replace with your email password
  //     }
  //   });

  //   // Setup email data with unicode symbols
  //   let mailOptions = {
  //     from: '"Form Upload" jchinwendu@capitalbancorpgroup.com', // sender address
  //     to: 'joshuachinwendu@gmail.com', // list of receivers
  //     // to: 'jchinwendu@capitalbancorpgroup.com', // list of receivers
  //     // to: process.env.RECEIVER, // list of receivers
  //     subject: 'FIDELITY PUBLIC OFFER FORM', // Subject line
  //     text: 'Kindly find attached the completed form for Fidelity public offer', // plain text body
  //     attachments: [
  //       {
  //         // filename: req.file.originalname,
  //         filename: newFileName +"_"+ newFileNameFirst +"_"+"form"+ ".pdf",
  //         path: req.file.path
  //       }
  //     ]
  //   };

  //   // Send mail with defined transport object
  //   let info = await transporter.sendMail(mailOptions);

  //   console.log('Message sent: %s', info.messageId);
  //   res.json({ message: 'File uploaded and email sent successfully' });
  

  //   // Optionally, delete the file after sending the email
  //   // fs.unlinkSync(req.file.path);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'An error occurred while uploading the file and sending the email' });
  // }
});


// app.get('/', (req, res) => {
//   res.send("Hello from the API")
// })

// routes
app.use("/api/stockMarket", stockOverviewRoute);
app.use("/api/users", userRoute);
app.use("/api/dailyPricelists", dailyPricelistRoute);
app.use("/api/dailyMarketSummary", dailyMarketSumRoute);

// app.use(express.static(__dirname + '/public'));


app.listen(
  port,
  console.log(
    `Server running on port ${port}`
  )
)