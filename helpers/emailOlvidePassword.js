import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // enviar email
  const { email, nombre, token } = datos;
  const info = await transporter.sendMail({
    from: "APV - Administrador de pacientes Veterinadia",
    to: email,
    subject: "Restablece tu Password en APV",
    text: "Restablece tu Password",
    html: `<p>Hola ${nombre} Haz solicitado reestablecer tu password</p>
          <p>Para continuar ingresa al en el siguiente enlace:
          <a href=${process.env.FRONTEND_URL}/olvide-password/${token}>Reestablecer password</a></p>

          <p>Si tu no soliictaste esta operación, te recomendamos cambiar tus contraseñas :)</p>
    
    `,
  });

  console.log("Mensaje enviado %s", info.messageId);
};

export default emailOlvidePassword;
