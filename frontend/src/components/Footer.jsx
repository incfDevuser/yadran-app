import { appStore, facebook, googlePlay, instagram, twitter } from "../assets/icons";

const Footer = () => {
  return (
    <>
      <div className="mt-40 flex flex-col gap-5 px-8">
        <div className="flex justify-between items-start flex-col md:flex-row gap-7">
          <div className="flex justify-start items-start">
            <h1 className="text-[#605DEC] font-bold text-2xl">TripTrack</h1>
          </div>
          <ul className="flex flex-col items-start justify-start gap-3">
            <h2 className="text-[#6E7491] font-bold text-lg">Acerca de</h2>
            <li className="footerLi">Sobre TripTrack</li>
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
            <li className="footerLi">TripTrack para Android</li>
            <li className="footerLi">TripTrack para iOS</li>
            <li className="footerLi">Sitio móvil</li>
            <img src={appStore} alt="appStore" className="" />
            <img src={googlePlay} alt="googlePlay" />
          </ul>
        </div>
        <div className="border-t-2 border-[#CBD4E6] py-8 flex justify-between items-center">
          <div className="flex items-center justify-center gap-3">
            <img src={twitter} alt="twitter" className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7" />
            <img src={instagram} alt="instagram" className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7" />
            <img src={facebook} alt="facebook" className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7" />
          </div>
          <p className="text-[#7C8DB0] text-sm sm:text-base">&copy; 2023 TripTrack, Inc.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
