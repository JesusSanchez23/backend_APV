import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conectarDB = async () => {
  try {
    // conectarse a la db, la url la extraje de MONgoDB Atlas
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${db.connection.host}:${db.connection.port}`;

    console.log("Mongo DB conectado en:", url);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default conectarDB;
