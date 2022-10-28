let movieModel = require("../model/Movie");

const createMovie = async function (req, res) {
  try {
    
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res
        .status(401)
        .send({ msg: "u are not allowed to  add movie" });
    }
    const newMovie = new movieModel(req.body);
    const savedMovie = await newMovie.save();
    return res.status(201).json(savedMovie);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateMovie = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res.status(401).send({ msg: "u are not allowed to  update movie" });
    }

    const updatedMovie = await movieModel.findByIdAndUpdate(
      req.params.movieId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedMovie);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getMovie = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res
        .status(401)
        .send({ msg: "u are not allowed to get these details" });
    }
    const movieDetails = await movieModel.findById(req.params.movieId);
    return res.status(200).json(movieDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getAllMovie = async function (req, res) {
  try {
    

    
    const movieDetails = await movieModel.find();
    return res.status(200).json(movieDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


const deleteMovie = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res
        .status(401)
        .send({ msg: "u are not allowed to delete these movie" });
    }
    await movieModel.findByIdAndDelete(req.params.movieId);
    res.status(200).json("the movie is deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


module.exports.createMovie = createMovie;
module.exports.updateMovie = updateMovie;
module.exports.deleteMovie = deleteMovie;
module.exports.getMovie = getMovie;
