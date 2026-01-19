const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const users = require('./data/users');       // <--- Import Users data
const products = require('./data/products'); // <--- Import Products data
const User = require('./models/User');       // <--- Import User Model
const Product = require('./models/Product'); // <--- Import Product Model

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();


    const createdUsers = await User.create(users); 


    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();