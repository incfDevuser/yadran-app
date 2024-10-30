import React, { useEffect } from "react";
import { useUsuario } from "../../Context/UsuarioContext";
import { Card, Badge, Icon, Text, Title, Grid } from "@tremor/react";
import { UserIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

const ListaDeUsuarios = () => {
  const { listaUsuarios, loading, error, obtenerUsuarios } = useUsuario();

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  if (loading) return <Text>Cargando usuarios...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <div>
      <Grid
        numCols={1}
        numColsMd={2}
        numColsLg={3}
        gap={6}
        className="flex flex-col gap-2"
      >
        {listaUsuarios.map((usuario) => (
          <Card
            key={usuario.id}
            className="p-5 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Icon icon={UserIcon} className="w-6 h-6 text-blue-500" />
              <div>
                <Text className="text-xl font-semibold text-gray-800">
                  {usuario.nombre}
                </Text>
                <Text className="text-sm text-gray-500">{usuario.email}</Text>
              </div>
            </div>
            <div className="mb-4 flex items-center space-x-2">
              <Badge
                color="blue"
                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
              >
                {usuario.nombre_rol}
              </Badge>
              {usuario.isadmin && (
                <Badge
                  color="green"
                  className="text-xs bg-green-100 text-green-600 px-2 py-1  flex flex-row justify-center items-center rounded-full"
                >
                  <div className="flex justify-center items-center gap-2">
                  <p>Admin</p>
                  <Icon icon={ShieldCheckIcon} />
                  </div>
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-600 mt-2">
              <p>
                <span className="font-semibold">Fecha de Creación:</span>{" "}
                {new Date(usuario.fecha_creacion).toLocaleDateString("es-CL")}
              </p>
            </div>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default ListaDeUsuarios;
