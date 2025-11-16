import React, { useEffect, useState, useCallback } from "react";
import { api } from "../../config/api";
import { useSelector } from "react-redux";
import formatCurrency from "../../config/formatCurrency";

const PrediccionCategoria = () => {
  const { auth } = useSelector((store) => store);
  const jwt = auth.jwt || localStorage.getItem("jwt");

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ price: 0.0, isVegetarian: false, isSeasonal: false, quantity: 1 });

  // UI state
  const [lastPrediction, setLastPrediction] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // Función para archivar/desarchivar predicciones
  const handleArchiveToggle = async (itemId, currentArchived) => {
    try {
      setLoading(true);
      await api.patch(`/api/categoria/predicciones/${itemId}`, {
        archived: !currentArchived
      }, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      await fetchList(); // Recargar la lista después de archivar/desarchivar
      // Mostrar mensaje de éxito temporal
      setError(`Predicción ${!currentArchived ? 'archivada' : 'restaurada'} correctamente`);
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al actualizar la predicción');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta predicción? Esta acción no se puede deshacer.')) {
      return;
    }
    try {
      setLoading(true);
      await api.delete(`/api/categoria/predicciones/${itemId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      await fetchList(); // Recargar la lista después de eliminar
      setError('Predicción eliminada correctamente');
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al eliminar la predicción');
    } finally {
      setLoading(false);
    }
  };

  

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/categoria/predicciones`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setList(data || []);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [jwt]);

  useEffect(() => {
    if (jwt) fetchList();
  }, [jwt, fetchList]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const body = {
        price: parseFloat(form.price),
        isVegetarian: !!form.isVegetarian,
        isSeasonal: !!form.isSeasonal,
        quantity: parseInt(form.quantity, 10),
      };
      const { data } = await api.post(`/api/categoria/prediccion`, body, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      // después de crear, recargar la lista
      await fetchList();
      // mostrar resultado en la UI similar a diseño esperado
      setLastPrediction(data);
      setShowSaved(true);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const parseConfidencePercent = (conf) => {
    if (conf === null || conf === undefined) return null;
    if (typeof conf === 'string') {
      const m = conf.match(/([0-9]+(\.[0-9]+)?)/);
      if (m) return Number(m[1]);
      return null;
    }
    if (typeof conf === 'number') {
      // si está en 0..1
      return conf > 0 && conf <= 1 ? conf * 100 : conf;
    }
    return null;
  };

  const confidenceLevel = (percent) => {
    if (percent === null) return 'unknown';
    if (percent < 60) return 'low';
    if (percent < 85) return 'medium';
    return 'high';
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-2 text-center text-white">Predicción de Categoría de Plato</h2>
          <p className="text-sm text-gray-300 mb-4 text-center">Ingrese características del plato y obtenga una predicción.</p>
          {error && <div className="text-red-600 text-sm mb-4 text-center">Error: {typeof error === 'string' ? error : JSON.stringify(error)}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">Precio del plato:</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-gray-100 placeholder-gray-400"
                placeholder="$40.000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">¿Es vegetariano?</label>
                <select
                  name="isVegetarian"
                  value={form.isVegetarian ? 'true' : 'false'}
                  onChange={(e) => setForm(f => ({...f, isVegetarian: e.target.value === 'true'}))}
                  className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-gray-100"
                >
                  <option value="false">No</option>
                  <option value="true">Sí</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">¿Es de temporada?</label>
                <select
                  name="isSeasonal"
                  value={form.isSeasonal ? 'true' : 'false'}
                  onChange={(e) => setForm(f => ({...f, isSeasonal: e.target.value === 'true'}))}
                  className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-gray-100"
                >
                  <option value="false">No</option>
                  <option value="true">Sí</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">Cantidad:</label>
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="border border-gray-600 p-2 w-32 rounded bg-gray-700 text-gray-100 placeholder-gray-400"
                placeholder="2"
              />
            </div>

            <div>
              <button disabled={loading} type="submit" className="w-full px-4 py-2 bg-[#fb881385] hover:bg-[#fb8813] text-white rounded">
                {loading ? "Ejecutando..." : "Predecir Categoría"}
              </button>
            </div>
          </form>
        </div>

        {/* Resultado de predicción */}
        {lastPrediction && (
          <div className="bg-gray-900 border border-gray-700 rounded p-4 mb-4 text-gray-200">
            <h3 className="text-lg font-semibold text-center mb-2 text-white">Predicción de Categoría</h3>
            <p className="text-center">La categoría predicha para este plato es: <span className="text-blue-300 font-bold">{lastPrediction.predictedCategory}</span>.</p>
            <p className="text-sm text-gray-300 mt-3 text-center">Esto significa que sus características (precio, ingredientes y tipo) se asemejan a los de platos típicos de esta categoría.</p>

            <div className="mt-3 text-center">
              {(() => {
                const pct = parseConfidencePercent(lastPrediction.confidence);
                const lvl = confidenceLevel(pct);
                const pctStr = pct !== null ? `(${pct.toFixed(2)}%)` : '';
                let colorClass = 'text-yellow-300';
                if (lvl === 'low') colorClass = 'text-yellow-300';
                if (lvl === 'medium') colorClass = 'text-blue-300';
                if (lvl === 'high') colorClass = 'text-green-300';
                return (
                  <p className="mt-2 text-sm">El nivel de confianza de esta predicción es <span className={`${colorClass} font-semibold`}>{lvl === 'low' ? 'baja' : lvl === 'medium' ? 'media' : 'alta'}</span> {pctStr}.</p>
                );
              })()}
            </div>

            <p className="text-xs text-gray-500 mt-2 text-center">Recomendación: Use esta predicción con cautela. Puede haber factores no considerados.</p>
          </div>
        )}

        <div className="mb-4">
          <button onClick={() => setShowSaved(s => !s)} className="w-full px-4 py-2 rounded text-white bg-[#fb881385] hover:bg-[#fb8813]">
            {showSaved ? 'Ocultar Predicciones Guardadas' : 'Ver Predicciones Guardadas'}
          </button>
        </div>

        {showSaved && (
          <div className="bg-gray-900 rounded shadow p-4 border border-gray-700 text-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-white">Predicciones Guardadas</h4>
              <button
                onClick={() => setShowArchived(prev => !prev)}
                className="px-3 py-1 text-sm rounded bg-[#fb881385] hover:bg-[#fb8813] text-white"
              >
                {showArchived ? 'Ver Activas' : 'Ver Archivadas'}
              </button>
            </div>

            {loading && <div>Cargando...</div>}
            {!loading && list.length === 0 && <div>No hay predicciones {showArchived ? 'archivadas' : 'activas'}.</div>}
            {!loading && list.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-sm">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border px-2 py-1 border-gray-700">ID</th>
                      <th className="border px-2 py-1 border-gray-700">Precio</th>
                      <th className="border px-2 py-1 border-gray-700">Vegetariano</th>
                      <th className="border px-2 py-1 border-gray-700">Estacional</th>
                      <th className="border px-2 py-1 border-gray-700">Cantidad</th>
                      <th className="border px-2 py-1 border-gray-700">Categoría</th>
                      <th className="border px-2 py-1 border-gray-700">Confianza</th>
                      <th className="border px-2 py-1 border-gray-700">Fecha</th>
                      <th className="border px-2 py-1 border-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.filter(item => item.archived === showArchived).map((item) => (
                      <tr key={item.id} className="even:bg-gray-900 odd:bg-gray-950">
                        <td className="border px-2 py-1 border-gray-700">{item.id}</td>
                        <td className="border px-2 py-1 border-gray-700">{formatCurrency(item.price)}</td>
                        <td className="border px-2 py-1 border-gray-700">{item.isVegetarian ? 'Sí' : 'No'}</td>
                        <td className="border px-2 py-1 border-gray-700">{item.isSeasonal ? 'Sí' : 'No'}</td>
                        <td className="border px-2 py-1 border-gray-700">{item.quantity}</td>
                        <td className="border px-2 py-1 border-gray-700">{item.predictedCategory}</td>
                        <td className="border px-2 py-1 border-gray-700">{item.confidence}</td>
                        <td className="border px-2 py-1 border-gray-700">{item.date || item.createdAt || item.createdDate || item.fecha || ''}</td>
                        <td className="border px-2 py-1 border-gray-700">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleArchiveToggle(item.id, item.archived)}
                              className="px-2 py-1 text-xs rounded bg-[#fb881385] hover:bg-[#fb8813] text-white"
                            >
                              {item.archived ? 'Restaurar' : 'Archivar'}
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="px-2 py-1 text-xs rounded bg-red-500/60 hover:bg-red-500 text-white"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrediccionCategoria;
