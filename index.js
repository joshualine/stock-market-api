const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const connectDB = require('./configs/mongoDB_config');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const admin = require('firebase-admin');
const serviceAccount = require('./configs/firebase_config.js');
// const serviceAccount = require('./configs/firebase_config.json');


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
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: '*', optionsSuccessStatus: 200 }));

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'public-offer-project.appspot.com'
});

const bucket = admin.storage().bucket();
const upload = multer({ storage: multer.memoryStorage() });

// Configure Nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'joshuachinwendu@gmail.com',
//     pass: 'zsim wimu cntn nlxu'
//   }
// });
let transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SENDER_EMAIL, // replace with your custom email
    pass: process.env.EMAIL_PASSWORD  // replace with your email password
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  blobStream.on('error', (err) => res.status(500).send(err));
  
  blobStream.on('finish', () => {
    blob.makePublic().then(() => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      // Send email with attachment
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECEIVER_EMAIL,
        subject: 'File Upload',
        text: 'A file has been uploaded.',
        attachments: [
          {
            filename: req.file.originalname,
            path: publicUrl
          }
        ]
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.status(200).send(publicUrl);
      });

      // res.status(200).send(publicUrl);
    });
  });

  blobStream.end(req.file.buffer);
});

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// ----------------------------Begining---------------------------------------------------------
// Set storage engine
// const storage = multer.diskStorage({
//   destination: '/home/securitiesadmin/public_html/api/uploads',
//   filename: function(req, file, cb){
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// // Initialize upload
// const upload = multer({
//   storage: storage,
//   limits: {fileSize: 10000000}, // 10MB limit
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// }).single('myFile');

// // Check file type
// function checkFileType(file, cb){
//   const filetypes = /jpeg|jpg|png|gif|pdf/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if(mimetype && extname){
//     return cb(null, true);
//   } else {
//     cb('Error: Images and PDFs Only!');
//   }
// }

// // Route to handle file upload
// app.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//     if(err){
//       res.status(400).send(err);
//     } else {
//       if(req.file == undefined){
//         res.status(400).send('No file selected');
//       } else {
//         res.send({
//           message: 'File uploaded successfully',
//           file: `uploads/${req.file.filename}`
//         });
//       }
//     }
//   });
// });

// -------------------------------Ending--------------------------------------------------------



// routes
app.use("/api/stockMarket", stockOverviewRoute);
app.use("/api/users", userRoute);
app.use("/api/dailyPricelists", dailyPricelistRoute);
app.use("/api/dailyMarketSummary", dailyMarketSumRoute);


app.listen(
  port,
  console.log(
    `Server running on port ${port}`
  )
)
