const express = require("express");
const app = express();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const {createUser, deleteUser, getOneUser, updateUser, getAllUser} = require('./controller/user')

app.use(express.json());

app.post('/create', createUser)
app.get('/', getAllUser)
app.get('/get/:id', getOneUser)
app.delete('/delete/:id', deleteUser)
app.put('/update/:id', updateUser)

app.listen(4005, ()=>{
    console.log(`Server run on port ${4005}`)
})