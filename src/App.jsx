import React, { useState, useEffect } from 'react';
import { obtenerDatosVisualizacion, procesarDatos } from './services/dataService';
import { TarjetaMetrica } from './components/TarjetaMetrica';
import { TablaDatos } from './components/TablaDatos';
import { PanelAnalitico } from './components/PanelAnalitico';

function App() {
  const [metricas, setMetricas] = useState({
    totalProductos: 0,
    totalVentas: 0,
    promedioPrecio: 0
  });
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerDatosVisualizacion()
      .then((datosRaw) => {
        const datosProcesados = procesarDatos(datosRaw);
        setListaProductos(datosProcesados.datosTabla);
        setMetricas({
          totalProductos: datosProcesados.totalProductos,
          totalVentas: datosProcesados.totalVentas,
          promedioPrecio: datosProcesados.promedioPrecio
        });
        setCargando(false);
      })
      .catch((error) => {
        console.error('Error al cargar datos:', error);
        setCargando(false);
      });
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <h2>Práctica 3 - Dashboard Modular e Integración con API de Ciencia de Datos</h2>
      <hr style={{ marginBottom: '20px', borderColor: '#cbd5e1' }} />

      {/* Bloque Práctica 3.2 */}
      {cargando ? (
        <p>Cargando información local...</p>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <TarjetaMetrica titulo="Total de Productos" valor={metricas.totalProductos} />
            <TarjetaMetrica titulo="Total Ventas Realizadas" valor={metricas.totalVentas} unidad="uds." />
            <TarjetaMetrica titulo="Precio Promedio" valor={`$${metricas.promedioPrecio}`} />
          </div>
          <h3>Dataset Local</h3>
          <TablaDatos datos={listaProductos} />
        </>
      )}

      {/* Bloque Práctica 3.3 (API Externa) */}
      <PanelAnalitico />
    </div>
  );
}

export default App;