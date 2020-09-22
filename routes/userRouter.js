const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    let {
      email,
      password,
      passwordCheck,
      displayName,
      organization,
    } = req.body;

    //validation
    if (
      !email ||
      !password ||
      !passwordCheck ||
      !displayName ||
      !organization
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "Password needs to be at least 5 characters long." });
    }
    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Passwords do not match." });
    }
    if (organization < 5) {
      return res
        .status(400)
        .json({ msg: "Organization name must be at least 5 characters long." });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ msg: "Account already exists" });
    }

    if (!displayName.match("^[a-zA-Z0-9-_ ]*$")) {
      return res.status(400).json({
        msg: "Display name must be letters, hyphen and underscore only.",
      });
    }

    if (organization.length < 5 || organization.length > 10) {
      return res.status(400).json({
        msg:
          "Organization length must be longer than 5 characters and shorter than 10 characters.",
      });
    }

    if (displayName.length < 3 || displayName.length > 10) {
      return res.status(400).json({
        msg:
          "Username must be longer than 3 characters and shorter than 10 characters.",
      });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
      organization,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Account does not exists." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email, //hide email info
        displayName: user.displayName,
        organization: user.organization,
      },
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  // first execute 'auth' before async
  // require middleware
  // /middleware/auth.js
  try {
    const deleteUser = await User.findByIdAndDelete(req.user);
    res.json(deleteUser);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.route("/usernameUpdate/:id").post((req, res) => {
  try {
    let { displayName } = req.body;
    if (displayName.length < 3 || displayName.length > 10) {
      return res.status(400).json({
        msg:
          "Username must be longer than 3 characters and shorter than 10 characters.",
      });
    }

    if (!displayName.match("^[a-zA-Z0-9-_ ]*$")) {
      return res.status(400).json({
        msg: "Display name must be letters, hyphen and underscore only.",
      });
    }

    User.findById(req.params.id)
      .then((user) => {
        user.displayName = req.body.displayName;

        user
          .save()
          .then(() => res.json("Username updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/passwordUpdate/:id", async (req, res) => {
  try {
    let { password } = req.body;
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 5 characters long." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    User.findById(req.params.id)
      .then((user) => {
        user.password = passwordHash;

        user
          .save()
          .then(() => res.json("Password updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// router.post("/tokenIsValid", async (req, res) => {
//   // show different screen if not logged in
//   try {
//     const token = req.header("x-auth-token");
//     if (!token) return res.json(false);

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     if (!verified) return res.json(false);

//     const user = await User.findById(verified.id);
//     if (!user) return res.json(false);

//     return res.json(true);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    displayName: user.displayName,
  });
});

router.route("/lists").get((req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
