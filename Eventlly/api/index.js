const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/Users");
const Owner=require("./models/Owners");
const Place=require("./models/Place");
const Booking=require("./models/Booking");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "adadadadadadada";

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
      // Check if the token is provided
      const token = req.cookies.token;
      if (!token) {
          return reject(new Error('JWT must be provided'));
      }

      // Verify the token
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) {
              return reject(err);
          }
          resolve(userData);
      });
  });
}

app.post("/register", async (req, res) => {
  const { firstname, lastname, username, email, password, phone } = req.body;
  try {
    const userDoc = await User.create({
      firstname,
      lastname,
      username,
      password: bcrypt.hashSync(password, bcryptSalt),
      email,
      phone,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { username: userDoc.username, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("password not okay");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        // Handle invalid or expired token
        res.clearCookie("token"); // Clear the token cookie
        return res.status(401).json({ error: "Unauthorized" });
      }
      try {
        const { username, email, firstname, lastname, _id } =
          await User.findById(userData.id);
        res.json({ username, email, firstname, lastname, _id });
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});


app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});


app.post("/upload-by-link", async (req, res) => {
  try {
    // Get the link from the request body
    const {link} = req.body;
    // Generate a unique filename
    const newName = 'photo' + Date.now() + '.jpg';
    // Download the image using the provided URL
    await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" + newName ,// Specify the destination path to save the image
    });
    // Send the filename back to the client
    res.json(newName);
} catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload', photosMiddleware.array('photos',100) ,(req, res) => {
  const uploadedFiles = [];
  req.files.forEach(file => {
    const { path, originalname } = file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath);
  });
  res.json(uploadedFiles.map(filename => filename.replace('uploads\\', '')));
});

app.post('/places',(req,res)=>{
 const {token} =req.cookies;
 const{title,address,addedPhotos,description,perks,extraInfo,minGuests,maxGuests,price,}=req.body;
 jwt.verify(token,jwtSecret,{},async(err,userData)=>{
  if(err) throw err;
  const PlaceDoc= await Place.create({
    owner: userData.id,price,
    title,address,photos:addedPhotos,description,perks,extraInfo,minGuests,maxGuests,
  });
  res.json(PlaceDoc);
 });
});

app.get('/user-places',(req,res)=>{
  const {token} =req.cookies;
  jwt.verify(token,jwtSecret,{},async(err,userData)=>{
    const{id}=userData;
    res.json(await Place.find({owner:id}));
  });
});

app.get('/places/:id', async (req,res)=>{
  const {id} =req.params;
  res.json(await Place.findById(id));
});

app.put('/places/:id', async (req, res) => {
  const { id } = req.params;
  const { title, address, addedPhotos, description, perks, extraInfo, minGuests, maxGuests,price, } = req.body;

  // Verify the token
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
          return res.status(401).json({ error: 'Unauthorized' });
      }

      // Find the place document
      const placeDoc = await Place.findById(id);
      if (!placeDoc) {
          return res.status(404).json({ error: 'Place not found' });
      }

      // Check ownership
      if (userData.id !== placeDoc.owner.toString()) {
          return res.status(403).json({ error: 'Forbidden' });
      }

      // Update the place document
      placeDoc.set({
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          minGuests,
          maxGuests,
          price,
      });

      await placeDoc.save();
      res.json(placeDoc);
  });
});

app.get('/places', async (req, res) => {
  res.json(await Place.find());
});

app.post('/bookings', async (req, res) => {
    const userData= await getUserDataFromReq(req);
    const{place,fromDate,toDate,numberOfGuests,name,mobile,price,}=req.body;
     Booking.create({
      place,fromDate,toDate,numberOfGuests,name,mobile,price,user:userData.id,
    }).then((doc)=>{
      res.json(doc);
    }).catch((err)=>{
      throw err;
    });
});



app.get('/bookings', async (req, res) => {
  const userData=await getUserDataFromReq(req);
  res.json( await Booking.find({user:userData.id}).populate('place')); 
});

app.listen(4000);
