🌴 Nic Explore - Turismo en Nicaragua

Aplicación móvil para descubrir y planificar tu viaje ideal por Nicaragua. Conecta con los mejores servicios turísticos y comparte experiencias con otros viajeros.
🚀 Características Principales

    📱 App Móvil: Desarrollada con React Native y Expo

    🏨 Reservas Integradas: Hoteles, tours, restaurantes y más

    🗺️ Mapa Interactivo: Ubicaciones y puntos de interés

    👥 Comunidad Turística: Comparte experiencias y recomendaciones

    💳 Pagos Seguros: Múltiples métodos de pago disponibles

🛠️ Tecnologías

    Frontend: React Native + TypeScript

    Framework: Expo SDK

    Gestión de Estado: Tankstack / Zustand

    Navegación: Expo Router

    UI Components: React Native Elements / Custom

📋 Prerrequisitos

    Node.js 20+

    npm o yarn

    Expo CLI

    Dispositivo móvil con Expo Go o emulador

🚀 Instalación Rápida
bash

# Clonar el repositorio

git clone https://github.com/tu-usuario/nic-explore-frontend.git

# Entrar al directorio

cd nic-explore-frontend

# Instalar dependencias

npm install

# Iniciar la aplicación

npx expo start

📱 Ejecución

Después de ejecutar npx expo start:

    Expo Go App: Escanea el código QR con la app Expo Go desde tu móvil

    Emulador: Presiona a para Android o i para iOS en el emulador

    Web: Presiona w para abrir en el navegador

🏗️ Estructura del Proyecto
text

src/
├── app/ # Configuración principal de la app y enrutado
├── assets/ # Recursos (imágenes, fuentes, íconos)
├── components/ # Componentes reutilizables
├── features/ # Funcionalidades específicas (módulos)
├── providers/ # Proveedores de contexto/estado global
├── services/ # Conexión con APIs y servicios externos
├── test/ # Configuración y archivos de testing
├── theme/ # Configuración de temas y estilos
├── types/ # Definiciones TypeScript
└── utils/ # Funciones auxiliares y helpers

🔧 Configuración

Crea un .env con tus configuraciones:
env
API_URL=tu_api_url
MAPS_API_KEY=tu_api_key
