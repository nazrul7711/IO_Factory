let userModel = require("../model/User");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let validator = require("../validator");
let movieModel = require("../model/Movie");
let producerModel = require("../model/Producer");
let actorModel = require("../model/Actor");

const createUser = async function (req, res) {
  try {
    let password = req.body.password;
    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const addMovie = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res.status(401).send({ msg: "u are not allwoed to add movie" });
    }
    const newMovie = new movieModel(req.body);
    const savedMovie = await newMovie.save();
    const updatedMovie = await userModel.updateOne(
      { _id: userId },
      { $push: { movies: savedMovie._id } }
    );

    if (updatedMovie) {
      res.status(200).send("movie updated successfully");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("sth in server went wrong");
  }
};

const loginUser = async function (req, res) {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("the user with this password does not exist");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid Email or Password.");
    }
    const accessToken = jwt.sign({ id: user._id }, "IO_Factory", {
      expiresIn: "7d",
    });
    res.status(200).json({ accessToken ,id:user._id});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateUser = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res.status(401).send({ msg: "u are not allowed to update user" });
    }

    const ifUserPresent = await userModel.findOne({
      _id: userId,
    });

    //if not return error
    if (!ifUserPresent) {
      return res
        .status(404)
        .send({ status: false, msg: "no such user id in our records" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.userId,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteUser = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res.status(401).send({ msg: "u are not allowed to delete user" });
    }

    const ifUserPresent = await userModel.findOne({
      _id: userId,
    });

    if (!ifUserPresent) {
      res
        .status(404)
        .send({ status: false, msg: "no such user id in our records" });
    }
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const showMovie = async (req, res) => {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res
        .status(401)
        .send({ msg: "u are not allowed to get these  movie detail" });
    }

    const movies = await userModel.findById(accountIdFromToken);
    let moviesList = movies.movies;
    // console.log(moviesList[0].toString())
    let movieData = [];
    for (let i = 0; i < moviesList.length; i++) {
      let empObj = {};
      let movie = await movieModel.findById(moviesList[i].toString(), {
        name: 1,
        yearOfRelease: 1,
        producer: 1,
        actors: 1,
        _id: 1,
      });
      let producer = await producerModel.findById(movie.producer, { name: 1 ,_id:0});
      let actorsList = [];
      for (let i = 0; i < movie.actors.length; i++) {
        let actor = await actorModel.findById(movie.actors[i].toString(), {
          name: 1,
          _id: 0,
        });
        actorsList.push(actor.name);
      }
      empObj.movieName = movie.name;
      empObj.producerName = producer.name;
      empObj.yearOfRelease = movie.yearOfRelease;
      empObj.actors = actorsList;
      empObj.movieid= movie._id
      movieData.push(empObj)
      


    }
    res.status(200).json({data:movieData});
  } catch (err) {
    console.log(err);
    res.status(500).send("sth went wrong in the server");
  }
};

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.addMovie = addMovie;
module.exports.showMovie = showMovie;
