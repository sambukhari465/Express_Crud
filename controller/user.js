const jwt = require("jsonwebtoken");
// ================================Create array of Objects==================================
const data = [
  {
    id: 1,
    name: "younas",
    age: "24",
    email: "younas@gmail.com",
    password: 12345,
  },
  { id: 2, name: "sami", age: "24", email: "sami@gmail.com", password: 12345 },
  {
    id: 3,
    name: "talha",
    age: "24",
    email: "talha@gmail.com",
    password: 12345,
  },
];

// ===============================User Create and Existing Part===========================
exports.createUser = (req, res) => {
  try {
    const { id } = req.body;
    const user = data.find((item) => item.id === id);
    if (user) {
      return res.send("user allready exist");
    } else {
      data.push(req.body);
      return res.send(data);
    }
  } catch (error) {
    console.log("server error", error);
    return res.json({ error: "Internal server error" });
  }
};
// ====================================Get All User Data=====================================
exports.getAllUser = (req, res) => {
  return res.send(data);
};

// =============================Get One User Data with Params=================================
exports.getOneUser = (req, res) => {
  const findUser = data.find((item) => item.id === parseInt(req.params.id));
  return res.send(findUser);
};

// ==============================Delete User Data With Params==================================
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const newData = data.filter((item) => item.id !== parseInt(id));
  return res.send(newData);
};
// ==============================Updata User Data With Params===================================
exports.updateUser = (req, res) => {
  const { id, name, age, email } = req.body;
  const findUser = data.find((item) => item.id === parseInt(req.params.id));
  if (findUser) {
    if (id) {
      findUser.id = id;
    }
    if (name) {
      findUser.name = name;
    }
    if (age) {
      findUser.age = age;
    }
    if (email) {
      findUser.email = email;
    }
  }

  res.send(data);
};

// ====================================JWT token Genrate=====================================
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const newData = data.find(
    (item) => item.email === email && item.password === password
  );
  if (!newData) {
    return res.send("not match");
  }
  const token = jwt.sign({ email }, "secretkey");
  res.json({ token });
};

// ====================================Jwt token Verify=====================================
exports.verifyToken = (req, res, next) => {
  const token = req.headers.token;
  const decode = jwt.verify(token, "secretkey");
  if(decode){
    next()
  }
};
