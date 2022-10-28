let producerModel = require("../model/Producer");

const createProducer = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res
        .status(401)
        .send({ msg: "u are not allowed to add this producer" });
    }
    const newProducer = new producerModel(req.body);
    const savedProducer = await newProducer.save();
    return res.status(201).json(savedProducer);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateProducer = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res
        .status(401)
        .send({ msg: "u are not allowed to update this producer" });
    }

    const updatedProducer = await producerModel.findByIdAndUpdate(
      req.params.producerId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedProducer);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getProducer = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res
        .status(401)
        .send({ msg: "u are not allowed to get these details" });
    }
    const producerDetails = await producerModel.findById(req.params.producerId);
    return res.status(200).json(producerDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteProducer = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res
        .status(401)
        .send({ msg: "u are not allowed to delete this record" });
    }
    await producerModel.findByIdAndDelete(req.params.producerId);
    res.status(200).json("the producer is deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports.createProducer = createProducer;
module.exports.updateProducer = updateProducer;
module.exports.deleteProducer = deleteProducer;
module.exports.getProducer = getProducer;
