import express from "express";
import {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacienteController.js";
import chechAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(chechAuth, agregarPaciente)
  .get(chechAuth, obtenerPacientes);

router
  .route("/:id")
  .get(chechAuth, obtenerPaciente)
  .put(chechAuth, actualizarPaciente)
  .delete(chechAuth, eliminarPaciente);

export default router;
