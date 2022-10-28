let express = require("express");
let app = express();
let mongoose = require("mongoose");
const router = require("./routes/route");
const cors = require("cors")

//using important middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//connecting with the database
mongoose
  .connect(
    "mongodb+srv://functionUp:UMZjiD9cN8Lb7RYo@cluster0.wew6u.mongodb.net/IO",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("mongo db connected");
  });

  //to mount router
  app.use("/", router);

  // to listen on port
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });


