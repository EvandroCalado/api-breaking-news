import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("wait connect do the database");

  mongoose
    .connect(
      "mongodb+srv://evandro:24122006@cluster0.gwodtve.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
