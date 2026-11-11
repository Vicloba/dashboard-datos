import datasetLocal from '../data/dataset.json';
import apiClient from './apiClient';

// --- FUNCIONES DE LA PRÁCTICA ANTERIOR ---
export const obtenerDatosVisualizacion = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(datasetLocal);
    }, 500);
  });
};

export const procesarDatos = (datos) => {
  if (!datos || datos.length === 0) {
    return {
      datosTabla: [],
      totalProductos: 0,
      totalVentas: 0,
      promedioPrecio: 0
    };
  }

  const totalProductos = datos.length;
  const totalVentas = datos.reduce((acc, curr) => acc + curr.ventas, 0);
  const sumaPrecios = datos.reduce((acc, curr) => acc + parseFloat(curr.precio), 0);
  const promedioPrecio = (sumaPrecios / totalProductos).toFixed(2);

  return {
    datosTabla: datos,
    totalProductos,
    totalVentas,
    promedioPrecio
  };
};

// --- FUNCIÓN PRÁCTICA 3: SERIE DE TIEMPO / PREDICCIÓN ANALÍTICA ---
export const obtenerSerieDeTiempo = async (latitud = 24.02, longitud = -104.65) => {
  try {
    const lat = parseFloat(latitud);
    const lon = parseFloat(longitud);

    // Petición directa a la API de Open-Meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&forecast_days=1`;
    const response = await apiClient.get(url);

    const data = response.data;

    if (!data || !data.hourly || !data.hourly.time) {
      throw new Error('La respuesta de la API no contiene el campo hourly esperado.');
    }

    const horas = data.hourly.time;
    const temperaturas = data.hourly.temperature_2m;

    // Mapeo limpio para renderizado UI
    const serieLimpia = horas.slice(0, 10).map((hora, index) => ({
      id: index + 1,
      nombre: `Registro ${hora.split('T')[1]}`,
      categoria: 'Temperatura',
      precio: temperaturas[index],
      ventas: Math.round(temperaturas[index])
    }));

    const sumaTemps = temperaturas.reduce((acc, curr) => acc + curr, 0);
    const tempPromedio = (sumaTemps / temperaturas.length).toFixed(1);

    return {
      datosTabla: serieLimpia,
      totalRegistros: serieLimpia.length,
      tempPromedio: tempPromedio,
      tempMaxima: Math.max(...temperaturas)
    };
  } catch (error) {
    if (error.response) {
      throw new Error(`Error del servidor (${error.response.status}): ${error.response.data?.reason || 'Consulta inválida'}`);
    } else if (error.request) {
      throw new Error('Error de conexión: No se pudo establecer comunicación con la API externa.');
    } else {
      throw new Error(`Error al procesar la solicitud: ${error.message}`);
    }
  }
};