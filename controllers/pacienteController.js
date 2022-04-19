import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;

  try {
    const pacienteGuardado = await paciente.save();

    res.json(pacienteGuardado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPacientes = async (req, res) => {
  // const paciente = await Paciente.find({ veterinario: req.veterinario._id });
  const paciente = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);

  res.json(paciente);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.json({
      msg: "Paciente no encontrado",
    });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({
      msg: "Accion no válida",
    });
  }

  try {
    res.json({
      paciente,
    });
  } catch (error) {
    res.status(404).json({
      msg: "error",
    });
  }
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.json({
      msg: "Paciente no encontrado",
    });
  }
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({
      msg: "Accion no válida",
    });
  }

  // acxtualizar paciente
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;
  try {
    const pacienteActualizado = await paciente.save();
    res.json({
      pacienteActualizado,
    });
  } catch (e) {
    const error = new Error("El ID es incorrecto");
    res.json({
      msg: error.message,
    });
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.json({
      msg: "Paciente no encontrado",
    });
  }
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({
      msg: "Accion no válida",
    });
  }

  try {
    await paciente.deleteOne();
    res.json({
      msg: "paciente eliminado",
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
