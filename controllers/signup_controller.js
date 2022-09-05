const User = require("../models/user.model");
const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const user_find = await User.findOne({ email: email });
    if (user_find != null) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const newUser = new User({ first_name, last_name, email, password });

    try {
      const usersave = await newUser.save();
      return res.json("User added!");
    } catch (err) {
      return res.status(400).json("Error:" + err);
    }

    // newUser
    //   .save()
    //   .then(() => res.json("User added!"))
    //   .catch((err) => res.status(400).json("Error:" + err));
  } catch (err) {
    return res.status(500).json({ message: "some error occured" });
  }
};
module.exports = { signup: signup };
