import React, { useState, useEffect } from "react";

const EditModal = ({ isOpen, onClose, entityData, entityType, onUpdate }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (entityData) setFormData(entityData);
  }, [entityData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(entityData.id, formData);
    onClose();
  };

  if (!isOpen || !entityData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Editar {entityType}
        </h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 capitalize">{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
