 Informe de Uso de Inteligencia Artificial

Durante el desarrollo de la plataforma Quito Coffee Roasters, utilicé un asistente de Inteligencia Artificial como recurso de apoyo técnico y metodológico. El enfoque no fue simplemente generar código de manera automática, sino colaborar con la herramienta para resolver problemas de lógica, estructurar el proyecto de forma eficiente y aprender mejores prácticas de desarrollo frontend.

Puntos clave de asistencia técnica

*   **Estructura y semántica**: Planteamiento de un esquema HTML inicial que cumpliera con los estándares de accesibilidad ARIA y el uso correcto de etiquetas semánticas.
*   **Diseño responsivo**: Creación de una guía de estilos basada en variables de CSS que permitiera una transición fluida al modo nocturno sin duplicar código innecesariamente.
*   **Consumo de servicios asíncronos**: Estructuración de funciones limpias en JavaScript para conectar las APIs de clima y tasas de cambio de forma segura utilizando try/catch para mitigar posibles caídas de los servicios externos.
*   **Integración de módulos y alcance de funciones**: Uno de los mayores desafíos técnicos ocurrió al usar scripts de tipo módulo (`type="module"`), ya que las funciones de la encuesta interactiva no eran reconocidas por el HTML debido al aislamiento nativo del módulo. Con el apoyo de la IA, entendí cómo exponer explícitamente estas funciones al objeto global `window` de forma segura.
*   **Optimización del DOM**: Uso de la clonación de nodos (`cloneNode`) en el recomendador de café para limpiar los escuchadores de eventos antiguos y evitar problemas de rendimiento o duplicación de acciones al repetir el cuestionario.

Reflexión sobre el proceso

Trabajar con un asistente de IA aceleró la resolución de errores comunes de sintaxis y me dio claridad sobre cómo estructurar un proyecto modular desde cero. La experiencia me permitió concentrarme en la lógica del carrito de compras y en la experiencia de usuario, asegurando al mismo tiempo que el código final cumpla con criterios de calidad técnica, orden y mantenibilidad exigidos en el desarrollo profesional.

**Desarrollado por:** Gerson Josué Tambi Arias  
**Institución:** ConQuito - Ruta de la empleabilidad 2026