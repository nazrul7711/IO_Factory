let actorModel = require("../model/Actor");


//here the idea is that the specific user can modify the detail of any actor or movie
const createActor = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;
    if (accountIdFromToken !== userId) {
      return res.status(401).send({ msg: "u are not allowed to add an actor" });
    }
    const newActor = new actorModel(req.body)
    const savedActor = await newActor.save()
    return res.status(201).json(savedActor) 

    
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
};

const updateActor = async function (req, res) {
  try {

    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res.status(401).send({ msg: "u are not allowed to update actor" });
    }
    const updatedActor = await actorModel.findByIdAndUpdate(
      req.params.actorId,
      {
        $set:req.body
      },
      {
        new:true
      }
    )
    return res.status(200).json(updatedActor)
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
};

const getActor = async function(req,res){
  try{
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res.status(401).send({ msg: "u are not allowed to get these details" });
    }
    const actorDetails = await actorModel.findById(req.params.actorId)
    return res.status(200).json(actorDetails)

  }
  catch(err){
    console.log(err)
    res.status(500).json(err)

  }
}

const deleteActor = async function (req, res) {
  try {
    let accountIdFromToken = req.user;
    let userId = req.params.userId;

    if (accountIdFromToken !== userId) {
      return res
        .status(401)
        .send({ msg: "u are not allowed to delete this detail" });
    }
    await actorModel.findByIdAndDelete(req.body.actorId)
    res.status(200).json("the actor is deleted")

  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
};

module.exports.createActor = createActor;
module.exports.updateActor = updateActor
module.exports.deleteActor = deleteActor;
module.exports.getActor = getActor
