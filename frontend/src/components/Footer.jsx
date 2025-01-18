
const Footer = () => {
  return (
    <>
      <div className="mt-40 flex flex-col gap-5 px-8">
        <div className="flex justify-between items-start flex-col md:flex-row gap-7">
          <div className="flex justify-start items-start">
            <h1 className="text-[#605DEC] font-bold text-2xl">PersonalTrack</h1>
          </div>
          <ul className="flex flex-col items-start justify-start gap-3">
            <h2 className="text-[#6E7491] font-bold text-lg">Acerca de</h2>
            <li className="footerLi">Sobre PersonalTrack</li>
            <li className="footerLi">Cómo funciona</li>
            <li className="footerLi">Docs</li>
            <li className="footerLi">Yadran</li>
            <li className="footerLi">Intranet</li>
          </ul>
          <ul className="flex flex-col items-start justify-start gap-3">
            <h2 className="text-[#6E7491] font-bold text-lg">Asóciate con nosotros</h2>
            <li className="footerLi">Quiero ser un proveedor</li>
            <li className="footerLi">Programa de afiliados</li>
            <li className="footerLi">Gestion de emergencias </li>
            <li className="footerLi">Canal de denuncias</li>
            <li className="footerLi">Integraciones</li>
            <li className="footerLi">Comunidad</li>
            <li className="footerLi">Programa de lealtad</li>
          </ul>
          <ul className="flex flex-col items-start justify-start gap-3">
            <h2 className="text-[#6E7491] font-bold text-lg">Soporte</h2>
            <li className="footerLi">Centro de ayuda</li>
            <li className="footerLi">Contáctanos</li>
            <li className="footerLi">Política de privacidad</li>
            <li className="footerLi">Términos de servicio</li>
            <li className="footerLi">Confianza y seguridad</li>
            <li className="footerLi">Accesibilidad</li>
          </ul>
          <ul className="flex flex-col items-start justify-start gap-3">
            <h2 className="text-[#6E7491] font-bold text-lg">Descarga la app</h2>
            <li className="footerLi">PersonalTrack para Android</li>
            <li className="footerLi">PersonalTrack para iOS</li>
            <li className="footerLi">Sitio móvil</li>
          </ul>
        </div>
        <div className="border-t-2 border-[#CBD4E6] py-8 flex justify-between items-center">
          <p className="text-[#7C8DB0] text-sm sm:text-base">&copy; 2025 PersonalTrack, Inc.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
