const jwt = require("jsonwebtoken");
const data = [
  { id: 1, name: "younas", age: "24", email: "younas@gmail.com" },
  { id: 2, name: "sami", age: "24", email: "sami@gmail.com" },
  { id: 3, name: "talha", age: "24", email: "talha@gmail.com" },
];
exports.createUser = (req, res) => {
  try {
    const { id } = (req.body);
    const user = data.find((item) => item.id === id);
    if (user) {
      // return res.send(user);
        //  return res.send("user allready exist")
        console.log("User All Ready Exists")
        return res.json({ error: "User already exists" });
    } else {
      data.push(req.body);
      return res.send(data);
    }
  } catch (error) {
    console.log("server error", error);
    return res.json({ error: "Internal server error" });
  }
};
exports.getAllUser = (req, res) => {
    return res.send(data);
  };
exports.getOneUser = (req, res) => {
  const findUser = data.find((item) => item.id === parseInt(req.params.id));
  return res.send(findUser);
};
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const newData = data.filter((item) => item.id !== parseInt(id));
  return res.send(newData);
};
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
    // findUser.id = id;
    // findUser.name = name;
    // findUser.age = age;
    // findUser.email = email
  }
  // data.save(findUser)
  res.send(data);
};
