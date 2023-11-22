const express = require("express");
const multer = require("multer");
const path = require("path")
const app = express();
const {
  createUser,
  deleteUser,
  getOneUser,
  updateUser,
  getAllUser,
  loginUser,
  verifyToken,
} = require("./controller/user");

app.use(express.json());

// ===========================Multer Use for Image upload================================
app.use('/', express.static(path.join(__dirname , 'images')))
const storage = multer.diskStorage({
  destination:function (req,file,cb) {
    cb(null, 'images')
  },
  filename: function(req,file,cb){
    cb(null, file.originalname)
  }
})
 
const upload = multer({storage})

// ================================All Routers==================================
app.post("/create", upload.single("image"), createUser);
app.get("/", verifyToken, getAllUser);
app.get("/get/:id", getOneUser);
app.delete("/delete/:id", deleteUser)
app.put("/update/:id", updateUser);
app.post("/login", loginUser);

app.listen(4005, () => {
  console.log(`Server run on port ${4005}`);
});
