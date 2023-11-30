const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Users, Admins, followCourse } = require('../models');


module.exports = {
  login: async (req, res) => { 
  try {
    const data = req.body

    const admin = await Admins.findOne({ where: { email: data.email } });
    console.log(admin);
    if (admin) {
      if (bcrypt.compareSync(data.password, admin.password)) {
      const token = jwt.sign({ admin: admin }, "oljhcsaouhbgoq", {
       expiresIn: '1h',
      })
        
      return res.json({
        message: "anda berhasil login admin",
        token
      });
    }
      return res.json({
        message: "akun anda admin"
      });
    }

    const user = await Users.findOne({ where: { email: data.email } });

    if (!user) {
      return res.json({
        message: "anda tuh siapaa??"
      });
    }

    if (bcrypt.compareSync(data.password, user.password)) {
      const token = jwt.sign({ user: user }, "oljhcsaouhbgoq", {
       expiresIn: '1h',
     })
      return res.json({
        message: "anda berhasil login",
        token
      });
    }

    return res.json({
      message: "password anda salah"
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server Error" });
  }
  },

  createUser: async (req, res) => { 
  try {
    const data = req.body
    console.log(data);
    
    const existingUser = await Users.findOne({
      where:
      {
        email: data.email,
      }
    });
    
    if (existingUser) {
      return res.json({
        message: 'Email already registered',
      });
    }
  
    const deletedUser = await Users.findOne({
      where: {
        id: { [Op.ne]: null }, // Query for non-null IDs (assuming null means not deleted)
      },
      order: [['id', 'DESC']],
    });

    let newUserId;

    if (deletedUser) {
      // Increment the ID of the deleted user to get a new ID
      newUserId = deletedUser.id + 1;
    } else {

    }

    const saltRounds = 10
    const hashPassword = bcrypt.hashSync(data.password, saltRounds)

    await Users.create({
      id: newUserId,
      name: data.name,
      username: data.username,
      email: data.email,
      alamat: data.alamat,
      password: hashPassword,
    })

    return res.json({
      message: "berhasil regis"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"})
  } 
  },

  getAllUser: async (req, res) => {
    try {
      // Mengambil semua data pengguna dari model User
      const users = await Users.findAll({include: followCourse});
      console.log(users)

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil data pengguna",
        error: error.message,
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await Users.findOne({
        where: { id },
        include: followCourse,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

}

  