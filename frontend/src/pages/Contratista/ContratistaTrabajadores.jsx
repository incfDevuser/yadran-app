import React from 'react'
import ListaTrabajadores from './ListaTrabajadores'
import ListaSolicitudes from './ListaSolicitudes'

const ContratistaTrabajadores = () => {
  return (
    <div>
        {/* Seccion para agregar trabajador, un boton que abre un modal */}

        {/* Renderizado de Lista de Trabajadores */}
        <ListaTrabajadores/>

        {/* Renderizado de solicitudes de mis trabajadores */}
        <ListaSolicitudes/>

    </div>
  )
}

export default ContratistaTrabajadores
