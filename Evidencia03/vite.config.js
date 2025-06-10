import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})


// Punto de partida para cualquier personalización de Vite en el proyecto.
// Se conecta con: package.json (scripts) y main.jsx (punto de entrada del proyecto).