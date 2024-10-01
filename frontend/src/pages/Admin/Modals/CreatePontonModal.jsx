import React, { useState } from "react";
import { usePontones } from "../../../Context/PontonesContext";
import { useConcesion } from "../../../Context/ConcesionesContext";

const CreatePontonModal = () => {
  const { crearPonton } = usePontones();
  const { concesiones, loading: loadingConcesiones } = useConcesion();

  //Estado para crear el nuevo ponton
  const [nuevoPonton, setNuevoPonton] = useState({
    nombre_ponton: "",
    ubicacion: "",
    concesion_id: 0,
    fecha_apertura_operacional:"",
    fecha_cierre_operacional:"",
    tipo_ponton:"",
    habitabilidad_general:"",
    habitabilidad_interna:"",
    habitabilidad_externa:"",
  });
  //Manejar cambios en el formulario
  const handleInputChange = (e)=>{
    const { name, value } = e.target
    setNuevoPonton({
        ...nuevoPonton,
        [name]:value
    })
  }
  //Crear nueva zona
  const handleCreate = async()=>{
    
  }
  return <div></div>;
};

export default CreatePontonModal;
