import React from 'react';
import TicketCard from './TicketCard';
import { QR } from '../../assets/images';

const TicketContainer = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex justify-center flex-wrap gap-6'>
        <TicketCard
          origen="Santiago"
          destino="Nueva York"
          reserva="A12345"
          fecha="12/09/2024"
          sucursal="Santiago Central"
          embarque="10:00 AM"
          duracion="10h"
          tipo_viaje="Ida"
          partida="08:00 AM"
          llegada="06:00 PM"
          transportes="Aéreo"
          qr={QR}
          nombre_pasajero="Juan Pérez"
        />
        <TicketCard
          origen="Londres"
          destino="Paris"
          reserva="B67890"
          fecha="14/09/2024"
          sucursal="Londres Heathrow"
          embarque="12:00 PM"
          duracion="2h"
          tipo_viaje="Ida y vuelta"
          partida="11:00 AM"
          llegada="01:00 PM"
          transportes="Aéreo"
          qr={QR}
          nombre_pasajero="Ana Gómez"
        />
        <TicketCard
          origen="Londres"
          destino="Paris"
          reserva="B67890"
          fecha="14/09/2024"
          sucursal="Londres Heathrow"
          embarque="12:00 PM"
          duracion="2h"
          tipo_viaje="Ida y vuelta"
          partida="11:00 AM"
          llegada="01:00 PM"
          transportes="Aéreo"
          qr={QR}
          nombre_pasajero="Ana Gómez"
        />
      </div>
    </div>
  );
}

export default TicketContainer;
