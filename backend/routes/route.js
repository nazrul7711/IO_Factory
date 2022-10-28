let express = require("express");
let actorController = require("../controllers/actorController");
let movieController = require("../controllers/movieController");
let userController = require("../controllers/userController");
let producerController = require("../controllers/producerController");
let middleware = require("../middleware/auth")

let router = express.Router();

//user Routes
router.post("/registerUser", userController.createUser);
router.post("/loginUser", userController.loginUser);
router.put("/updateUser/:userId",middleware.tokenValidator,
  userController.updateUser
);
router.delete("/deleteUser/:userId",middleware.tokenValidator,userController.deleteUser
);
router.post("/addMovie/:userId",middleware.tokenValidator,userController.addMovie)
router.post("/showMovie/:userId",middleware.tokenValidator,userController.showMovie)


//actor Routes
router.post("/createActor",middleware.tokenValidator,actorController.createActor)
router.put("/updateActor/:userId/:actorId",middleware.tokenValidator,actorController.updateActor)
router.get("/getActor/:userId/:actorId",middleware.tokenValidator,actorController.getActor)
router.delete("/deleteActor/:userId/:actorId",middleware.tokenValidator,actorController.deleteActor)

//movie routes
router.post("/createMovie/:userId",middleware.tokenValidator,movieController.createMovie)
router.put("/updateMovie/:userId/:movieId",middleware.tokenValidator,movieController.updateMovie)
router.get("/getMovie/:userId/:movieId",middleware.tokenValidator,movieController.getMovie)
router.delete("/deleteMovie/:userId/:movieId",middleware.tokenValidator,movieController.deleteMovie)

//producer routes 
router.post("/createProducer/:userId",middleware.tokenValidator,producerController.createProducer)
router.put("/updateProducer/:userId/:producerId",middleware.tokenValidator,producerController.updateProducer)
router.get("/getProducer/:userId/:producerId",middleware.tokenValidator,producerController.getProducer)
router.delete("/deleteProducer/:userId/:producerId",middleware.tokenValidator,producerController.deleteProducer)



module.exports  = router
