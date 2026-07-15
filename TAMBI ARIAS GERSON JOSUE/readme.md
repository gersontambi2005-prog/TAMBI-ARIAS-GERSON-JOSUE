 Quito Coffee Roasters - Dashboard Interactivo

Esta es una aplicación web responsiva y dinámica diseñada para una tostadería artesanal de café de especialidad ubicada en el Centro Histórico de Quito. El sistema permite a los usuarios explorar el catálogo de productos, calcular los costos de envío en tiempo real según su ubicación, interactuar con un recomendador personalizado y consumir datos de APIs públicas.

Descripción del Proyecto

El proyecto consiste en un sistema interactivo de fidelización y compra creado para amantes del café de especialidad en Quito. Resuelve la necesidad de guiar a los usuarios inexpertos en su elección de café ideal mediante un recomendador automatizado de dos pasos, mientras provee una calculadora de presupuestos integrada que calcula valores de entrega locales y convierte el total de dólares (USD) a euros (EUR) consumiendo divisas en tiempo real de servicios externos.

 Características Principales

*   **HTML5 Semántico y Accesibilidad**: Estructura limpia estructurada con etiquetas nativas (`main`, `section`, `article`) y uso de atributos ARIA para un correcto desempeño con lectores de pantalla.
*   **Diseño con CSS Moderno**: Maquetación móvil-primero utilizando CSS Grid y Flexbox. Gestión de diseño limpia mediante variables de CSS para un mantenimiento cómodo de los colores de la marca.
*   **JavaScript Modular (ES6+)**: Organización del código siguiendo el patrón de módulos (import/export) para la separación limpia de lógica, asincronía basada en `async/await` y control estructurado de errores con bloques `try/catch`.
*   **Integración de APIs Públicas**:
    *   **Open-Meteo API**: Consulta y despliega la temperatura actual de la ciudad de Quito en tiempo real.
    *   **ExchangeRate API**: Consume el tipo de cambio oficial de dólares (USD) a euros (EUR) para cotizar el pedido alternativamente en otra moneda.
*   **Calculadora de Pedidos**: Procesamiento automático de subtotales, recargos y tarifas según la zona de destino de Quito y visualización de totales en tiempo real.
*   **Coffee Matchmaker**: Un breve cuestionario dinámico que procesa las preferencias del usuario para recomendarle el café del catálogo que mejor se adapte a su paladar.
*   **Modo Nocturno (Dark Mode)**: Un botón de control flotante que alterna la visualización cromática, almacenando de forma persistente la preferencia del usuario en el navegador a través de `localStorage`.

Tecnologías Utilizadas

*   **HTML5** (Estructuración semántica)
*   **CSS3** (Diseño responsivo, Grid, Flexbox y Variables)
*   **JavaScript ES6+** (Modularización, programación asíncrona, aserciones seguras)
*   **APIs REST Públicas** (Consumo de datos climatológicos e indicadores económicos externos)

Instalación y Configuración

Dado que el proyecto utiliza módulos nativos de JavaScript, las políticas de seguridad de los navegadores (CORS) impiden abrir el archivo `index.html` directamente haciendo doble clic desde tu sistema de archivos.

Sigue estos sencillos pasos para probar la aplicación de manera local:

1.  **Clonar este repositorio** en tu computadora:
    ```bash
    git clone [https://github.com/gersontambi2005-prog/TAMBI-ARIAS-GERSON-JOSUE.git](https://github.com/gersontambi2005-prog/TAMBI-ARIAS-GERSON-JOSUE.git)
    ```
2.  **Navegar a la carpeta** del proyecto:
    ```bash
    cd TAMBI-ARIAS-GERSON-JOSUE
    ```
3.  **Montar un servidor web de desarrollo**:
    *   **Método VS Code (Recomendado)**: Abre la carpeta del proyecto en Visual Studio Code, instala la extensión oficial llamada **Live Server** y haz clic en el botón inferior derecho **"Go Live"**.
    *   **Método Alternativo (Python)**: Si tienes Python en tu terminal, ejecuta:
        ```bash
        python -m http.server 8000
        ```
        Luego navega en tu explorador a la dirección `http://localhost:8000`.

Instrucciones de Uso

1.  **Explorar y Filtrar**: Escribe texto en la barra de búsqueda para ubicar un producto de café específico, o filtra usando el selector de origen nacional o internacional.
2.  **Recomendador de Café (Matchmaker)**: Responde a las breves preguntas sobre perfil de sabor e intensidad, y agrégalo de manera inmediata al pedido.
3.  **Calcular Pedido**: Elige una zona geográfica de destino (Norte, Centro, Sur, Valles). Se recalculará de forma dinámica el subtotal, costo del flete, total en dólares y su equivalente en euros.
4.  **Contacto**: Diligencia el formulario. El sistema cuenta con validadores de formato en tiempo real que prevendrán envíos de correos o números telefónicos mal estructurados.
5.  **Modo Nocturno**: Alterna entre el tema diurno y nocturno usando el control flotante (`🌙` / `☀️`) según tu preferencia.

 Uso Documentado del Asistente de IA (Gemini)

El desarrollo del proyecto contó con el apoyo colaborativo de Inteligencia Artificial para optimizar tiempos de estructuración y resolver trabas específicas relacionadas con la modularidad:

*   **Alcance y Scope de Funciones**: Al utilizar `type="module"`, las funciones declaradas en `main.js` no se comparten de forma global con el navegador por defecto. El asistente propuso la solución técnica de exponer de forma explícita las llamadas del Matchmaker (`seleccionarSabor`, `recomendarCafe` y `reiniciarQuiz`) al objeto global `window` para que el HTML pudiera procesar los atributos interactivos inline (`onclick`).
*   **Optimización de Eventos**: Sugirió el uso de clonación de nodos (`cloneNode`) para el botón de recomendación rápida. Esto limpia escuchadores de eventos anteriores de manera eficiente, evitando problemas de acumulación en la memoria si el usuario decide repetir el cuestionario múltiples veces.
*   **Estructura Semántica**: Estructuración inicial que cumple a cabalidad con las normativas estándar ARIA para un excelente puntaje de accesibilidad y etiquetado nativo.


*   **Nombre**: Gerson Josué Tambi Arias
*   **Institución**: ConQuito - Ruta de la empleabilidad 2026