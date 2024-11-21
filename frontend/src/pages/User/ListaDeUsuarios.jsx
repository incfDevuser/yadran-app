import React, { useEffect } from "react";
import { useUsuario } from "../../Context/UsuarioContext";
import { useRoles } from "../../Context/RolesContext";
import { Card, Badge, Icon, Text, Grid } from "@tremor/react";
import { UserIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

const ListaDeUsuarios = () => {
  const { listaUsuarios, loading, error, obtenerUsuarios } = useUsuario();
  const { roles, obtenerRoles, asignarRol } = useRoles();

  useEffect(() => {
    obtenerUsuarios();
    obtenerRoles(); // Obtener los roles disponibles
  }, []);

  const handleAsignarRol = async (usuarioId, rolId) => {
    await asignarRol({ usuarioId, rolId });
    obtenerUsuarios(); // Actualizar la lista después de asignar un rol
  };

  if (loading) return <Text className="text-center text-gray-700">Cargando usuarios...</Text>;
  if (error) return <Text className="text-center text-red-500">Error: {error}</Text>;

  return (
    <div className="mt-5">
      <Grid numCols={1} numColsMd={2} numColsLg={3} gap={6} className="gap-6">
        {listaUsuarios.map((usuario) => (
          <Card
            key={usuario.id}
            className="p-5 border border-gray-300 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <Icon icon={UserIcon} className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <Text className="text-lg font-semibold text-gray-800">
                  {usuario.nombre}
                </Text>
                <Text className="text-sm text-gray-500 italic">
                  {usuario.email}
                </Text>
              </div>
            </div>
            <div className="mb-4 flex items-center space-x-3">
              <Badge
                color="blue"
                className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-lg"
              >
                {usuario.nombre_rol}
              </Badge>
              {usuario.isadmin && (
                <Badge
                  color="green"
                  className="text-xs bg-green-100 text-green-600 px-3 py-1 flex items-center gap-1 rounded-lg"
                >
                  <Icon icon={ShieldCheckIcon} className="w-4 h-4" />
                </Badge>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm text-gray-700">Cambiar Rol</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-2 py-1 mt-1"
                value={usuario.rolId || ""}
                onChange={(e) => handleAsignarRol(usuario.id, e.target.value)}
              >
                <option value="">Selecciona un rol</option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.nombre_rol}
                  </option>
                ))}
              </select>
            </div>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default ListaDeUsuarios;
