import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FlightCard } from "../../container";
import { hawaiian } from "../../assets/logo";
import { creditCard } from "../../assets/icons";
import { map1 } from "../../assets/images";
import { ConfirmShop } from "../../components";

const Confirm = () => {
    const[close, setClose] = useState(true)

    return (
      <>
        <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-10">
          <div className="w-full lg:w-[756px] flex flex-col items-start gap-16">
            { close && (
              <div className="w-full lg:w-[704px] h-[64px] border-2 border-[#007B65] bg-[#EAFFFB] rounded p-2 hidden md:flex items-center justify-center">
                <p className="w-full h-full flex items-center justify-start text-[#007B65] text-xs sm:text-base">¡Tu vuelo ha sido reservado con éxito! Tu número de confirmación es #381029404387</p>
                <MdOutlineClose className="text-[#52527A] font-medium cursor-pointer" onClick={() => setClose(false)}/>
              </div>
            )}
    
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h1 className="titleh1">¡Buen viaje, Sophia!</h1>
              <p className="text-[#6E7491] text-base sm:text-lg font-semibold">Número de confirmación: #381029404387</p>
              <p className="text-[#7C8DB0] text-sm sm:text-base font-medium">¡Gracias por reservar tu viaje con Tripma! A continuación, se muestra un resumen de tu viaje al aeropuerto de Narita en Tokio, Japón. Hemos enviado una copia de tu confirmación de reserva a tu dirección de correo electrónico. También puedes encontrar esta página nuevamente en <span className="text-[#605DEC]">Mis viajes.</span></p>
            </div>
    
            <div className="w-full flex flex-col items-start justify-start gap-4">
              <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Resumen del vuelo</h1>
              <div className="w-full flex flex-col items-start gap-2">
                <p className="text-[#7C8DB0] text-base sm:text-lg font-semibold">Salida el 25 de febrero de 2023</p>
                <div className="w-full cursor-pointer border-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]">
                  <FlightCard
                    img={hawaiian}
                    duration="16h 45m"
                    name="Hawaiian Airlines"
                    time="7:00 AM - 4:15 PM"
                    stop="1 parada"
                    hnl="2h 45m en HNL"
                    price="$624"
                    trip="ida y vuelta"
                  />
                </div>
                <p className="text-[#7C8DB0] text-sm sm:text-base font-normal">Asiento 9F (económica, ventana), 1 maleta facturada</p>
              </div>
    
              <div className="w-full flex flex-col items-start gap-2 mt-8">
                <p className="text-[#7C8DB0] text-base sm:text-lg font-semibold">Llegada el 21 de marzo de 2023</p>
                <div className="w-full cursor-pointer border-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]">
                  <FlightCard
                    img={hawaiian}
                    duration="16h 45m"
                    name="Hawaiian Airlines"
                    time="7:00 AM - 4:15 PM"
                    stop="1 parada"
                    hnl="2h 45m en HNL"
                    price="$624"
                    trip="ida y vuelta"
                  />
                </div>
                <p className="text-[#7C8DB0] text-sm sm:text-base font-normal">Asiento 4F (negocios, ventana), 1 maleta facturada</p>
              </div>
            </div>
    
            <div className="w-full flex flex-col items-start gap-5">
              <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Desglose de precios</h1>
              <div className="w-full h-full sm:w-[400px] flex flex-col items-start gap-3">
                <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                  <p>Vuelo de salida</p>
                  <p>$251.50</p>
                </div>
                <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                  <p>Vuelo de llegada</p>
                  <p>$251.50</p>
                </div>
                <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                  <p>Tarifas de equipaje</p>
                  <p>$0</p>
                </div>
                <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                  <p>Mejora de asiento (negocios)</p>
                  <p>$199</p>
                </div>
                <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                  <p>Subtotal</p>
                  <p>$702</p>
                </div>
                <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base gap-3">
                  <p>Impuestos (9.4%)</p>
                  <p>$66</p>
                </div>
                <hr className="w-full mt-5" />
                <div className="flex items-center justify-between w-full text-[#36374A] text-sm sm:text-base gap-3">
                  <p>Monto pagado</p>
                  <p>$768</p>
                </div>
                <hr className="w-full" />
              </div>
            </div>
    
            <div className="w-full h-full flex flex-col items-start justify-start gap-5">
              <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Método de pago</h1>
              <div className="w-[300px] h-[188px]">
                <img src={creditCard} alt="" className="w-full h-full object-contain" />
              </div>
            </div>
    
            <div className="w-full h-full flex flex-col items-start justify-start gap-4">
              <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Comparte tu itinerario de viaje</h1>
              <p className="text-[#7C8DB0] text-base sm:text-lg font-normal">Puedes enviar tu itinerario por correo electrónico a cualquier persona ingresando su dirección de correo electrónico aquí.</p>
              <form className="w-full h-full flex flex-col items-start justify-start gap-5 mt-5">
                <input
                  type="text"
                  placeholder="Dirección de correo electrónico"
                  className="w-full sm:w-[400px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
                <input
                  type="text"
                  placeholder="Dirección de correo electrónico"
                  className="w-full sm:w-[400px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
                <input
                  type="text"
                  placeholder="Dirección de correo electrónico"
                  className="w-full sm:w-[400px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
              </form>
              <div className="flex justify-center items-center mt-2">
                <button className="bg-[#605DEC] text-[#FAFAFA] text-base px-2 py-3 rounded hover:bg-white border-[1px] border-[#605DEC] hover:text-[#605DEC] transition-all duration-200">Enviar itinerario por correo electrónico</button>
              </div>
            </div>
    
            <div className="w-full h-full flex flex-col items-start justify-start gap-4">
              <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Ruta de vuelo</h1>
              <div className="w-full h-full md:w-[750px] md:h-[400px]">
                <img src={map1} alt="" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
    
          <div className="w-full sm:w-[400px] h-full flex flex-col items-start gap-28">
            <ConfirmShop />
          </div>
        </div>
      </>
    )
    }
    
    export default Confirm;
    