const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456', // The code in User.js will encrypt this automatically
    isAdmin: true,      // THIS IS IMPORTANT
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
    isAdmin: false,     // Regular customer
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '123456',
    isAdmin: false,
  },
];

module.exports = users;