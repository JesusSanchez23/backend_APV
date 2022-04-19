import express, { request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import veterinarioRouter from "./routes/veterinarioRoutes.js";
import pacienteRouter from "./routes/pacienteRoutes.js";

// iniciamos express
const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // el origen del request esta permitido

      callback(null, true);
    } else {
      callback(new Error("No permitido por Cors"));
    }
  },
};

app.use(cors(corsOptions));
app.use("/api/veterinarios", veterinarioRouter);
app.use("/api/pacientes", pacienteRouter);

// variables
const port = process.env.PORT || 4000;
const host = process.env.HOST || "127.0.0.1";

app.listen(port, host, () => {
  console.log("Servidor funcionando en el puerto:", port, host);
});
