export const generarContraseña = (nombre) => {
  const nombreLimpio = nombre.toLowerCase().replace(/\s+/g, "");
  const randomNum = Math.floor(Math.random() * 1000);
  const caracteres = "!@#$%^&*";
  const caracterEspecial =
    caracteres[Math.floor(Math.random() * caracteres.length)];
  return `${nombreLimpio}${caracterEspecial}${randomNum}`;
};
