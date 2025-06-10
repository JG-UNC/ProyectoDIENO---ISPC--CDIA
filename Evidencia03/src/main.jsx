import React from 'react'

import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    // Inserta el componente App dentro del div con id="root" que está en public/index.html.
    // Toda la aplicación se ve desde ahí.
  </React.StrictMode>
)

/*
- Este archivo es el punto de entrada de la app React.
- Conecta el HTML (index.html) con los componentes de React.
- Todo lo que se ve en la pantalla viene desde App.jsx, que a su vez incluye:
    • ProductList.jsx – muestra productos.
    • StatsPanel.jsx – muestra estadísticas.
    • ChartsPanel.jsx – muestra gráficos.

RELACIÓN ENTRE ARCHIVOS:
- App.jsx → se importa aquí.
- App.jsx importa sus propios componentes (listas, filtros, estadísticas).
- index.css también se carga aquí para aplicar estilos globales.

USO DEL <React.StrictMode>:
- Ayuda a detectar problemas potenciales durante el desarrollo.
- No afecta la app en producción.
*/
// Este archivo es esencial para iniciar la aplicación React y conectar todos los componentes.
// Es el primer archivo que se ejecuta al cargar la app en el navegador.
// No contiene lógica de negocio, solo configura el entorno y renderiza el componente principal.
