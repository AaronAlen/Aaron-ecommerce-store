const products = require("../schema/productSchema");
const users = require("../schema/userSchema");
const sendEmail = require("../utils/email");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const fs = require("fs")
const path = require("path");
const html = require("../utils/html");

const createUser = async (req, res) => {
  let { name, email, password, access } = req.body;
  let user = await users.findOne({ email });

  if (!user) {
    const hashPasword = await bcrypt.hash(password, 10);
    user = { name, email, password: hashPasword, access };
    await users.create(user);
    const text = html()
    sendEmail(email,"registeration successful", text)
    res.status(201).json({ message: "user created successfully" });
  } else res.json({ message: "user already exist" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await users.findOne({ email });
  if (!user) return res.status(500).json({ message: "user not exist" });
  if (await bcrypt.compare(password, user.password)) {
    const token = generateToken(user);
    res.status(200).json({ message: "login successfully", token });
  } else res.status(500).json({ message: "incorrect password" });
};

const createProduct = async (req, res) => {
  try {
    let data = req.body
    const imageFilter = req.files?.map((file) => file.path);
    console.log(imageFilter);
    let variants;
    if (data.variants) variants = JSON.parse(data.variants);
    console.log(variants);
    data = await products.create({
      ...req.body,
      variants,
      images: imageFilter,
    });

    res.status(200).json({
      message: "data created",
      data,
    });
  } catch (error) {
    req.files.forEach(file => fs.unlinkSync(file.path))
    res.json({
      message: error.message,
    });
  }
};

const createProducts = async (req, res) => {
  try {
    let data = req.body
    const imageFilter = req.files.image?.map((file) => file.path);
    const thumpnail = req.files.thumpnail?.map((file) => file.path);

    console.log(imageFilter);
    let variants;
    if (data.variants) variants = JSON.parse(data.variants);
    console.log(variants);
    data = await products.create({
      ...req.body,
      variants,
      thumpnail,
      images: imageFilter
    });

    res.status(200).json({
      message: "data created",
      data,
    });
  } catch (error) {
    req.files.thumpnail.forEach(file => fs.unlinkSync(file.path))
    req.files.image.forEach(file => fs.unlinkSync(file.path))
    res.json({
      message: error.message,
    });
  }
};

const updateProducts = async (req, res)=>{
  try{
    const data = await products.findById(req.params.id)
    const path = data.images[0]
    data.images[0] = req.files[0].path
    await data.save()
    if(fs.existsSync(path))fs.unlinkSync(path)
    res.json({message : "image updated successfully"})
  }catch(error){
    if(fs.existsSync(req.files[0].path))fs.unlinkSync(req.files[0].path)
    console.log(error.message);
  }
}



const get = async(req, res)=>{
    const datas = await products.find().skip((req.query.page-1)*req.query.limit).limit(req.query.limit).lean()
    console.log(datas);
    res.json({
      messages : "data fetched",
      datas,
      length : datas.length
    })
}
const getone = async(req, res)=>{
    const datas = await products.findById(req.params.id)
    res.json({
      messages : "one data fetched",
      datas
    })
}

const updateProduct = async (req, res) => {
  const data = await products.findOne(
    { name: req.body.name },
    { name: 1, email: 1, access: 1 },
  );
  data.name = req.body.new_name;
  data.save();
  console.log("saved");
  res.json({ message: "updated", data });
};

const deleteProduct = async (req, res) => {
  await products.findOneAndDelete({ name: req.body.name });
  res.json({
    message: "deleted",
  });
};

const filter = async(req, res)=>{
  console.log(req.body);
}

module.exports = {
  createUser,
  login,
  createProduct,
  createProducts,
  updateProducts,
  updateProduct,
  deleteProduct,
  get,
  getone,
  filter
};
