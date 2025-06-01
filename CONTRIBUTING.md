# Guía de Contribución para StofliUI

¡Gracias por tu interés en contribuir a StofliUI! Esta guía te ayudará a entender el proceso para contribuir a este proyecto.

## Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
  - [Reportar Bugs](#reportar-bugs)
  - [Sugerir Mejoras](#sugerir-mejoras)
  - [Enviar Pull Requests](#enviar-pull-requests)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Código de Conducta

Este proyecto y todos los participantes están bajo un Código de Conducta. Al participar, se espera que respetes este código. Por favor, reporta comportamientos inaceptables.

## Cómo Contribuir

### Reportar Bugs

Los bugs se rastrean como [issues de GitHub](https://github.com/stt0k/StofliUI/issues).

Cuando reportes un bug, incluye:

- Un título claro y descriptivo
- Pasos para reproducir el problema
- Comportamiento esperado vs. comportamiento actual
- Capturas de pantalla (si aplica)
- Cualquier información relevante (navegador, sistema operativo, etc.)

### Sugerir Mejoras

Las mejoras también se rastrean como issues de GitHub. Incluye:

- Un título claro y descriptivo
- Descripción detallada de la mejora propuesta
- Explicación de por qué esta mejora sería útil
- Posibles implementaciones o diseños

### Enviar Pull Requests

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Realiza tus cambios
4. Asegúrate de que los tests pasen
5. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
6. Haz push a la rama (`git push origin feature/amazing-feature`)
7. Abre un Pull Request

## Estándares de Código

- Usa TypeScript para todos los componentes
- Sigue las convenciones de estilo de código existentes
- Mantén la compatibilidad con los modos claro y oscuro
- Asegúrate de que los componentes sean accesibles (WCAG 2.1 & ARIA)
- Documenta cualquier nueva funcionalidad

## Proceso de Desarrollo

1. Selecciona un issue para trabajar o crea uno nuevo
2. Discute el enfoque en el issue si es necesario
3. Implementa la solución
4. Añade tests si es aplicable
5. Actualiza la documentación
6. Envía un Pull Request

## Estructura del Proyecto

```
StofliUI/
├── app/                  # Aplicación Next.js
├── components/           # Componentes reutilizables
│   └── sections/         # Componentes de UI utilizados en la documentación
├── lib/                  # Utilidades y helpers
│   └── mdx-components.tsx # Importaciones de componentes para archivos MDX
├── data/                 # Archivos MDX para la documentación
│   └── docs/
│       ├── componentes/  # Documentación de componentes
│       ├── frameworks/   # Documentación de frameworks
│       └── primeros-pasos/ # Guías de inicio
├── public/               # Archivos estáticos
└── stofli-ui/            # Biblioteca de componentes principal para npm
    └── src/              # Código fuente de los componentes para el paquete
```

## Trabajando con Componentes

El proyecto tiene dos conjuntos de componentes:

1. **Componentes de documentación** (`components/sections/`): Estos componentes se utilizan en la aplicación de documentación y se importan en `lib/mdx-components.tsx` para ser utilizados en archivos MDX.

2. **Componentes del paquete npm** (`stofli-ui/src/`): Estos son los componentes que se distribuyen como paquete npm. Mantienen la misma funcionalidad que los componentes de documentación pero están optimizados para distribución.

Al desarrollar un nuevo componente, debes:

1. Crear el componente en `components/sections/` para la documentación
2. Crear una versión equivalente en `stofli-ui/src/` para el paquete npm
3. Importar el componente en `lib/mdx-components.tsx` para poder utilizarlo en la documentación MDX

## Trabajando con la Documentación

Los archivos de documentación están escritos en MDX y se encuentran en el directorio `data/docs/`. Para añadir o modificar la documentación:

1. Localiza el archivo MDX correspondiente o crea uno nuevo
2. Sigue el formato existente para mantener la consistencia
3. Ejecuta la aplicación localmente para verificar tus cambios
4. Asegúrate de que la navegación funcione correctamente

---

¡Gracias por contribuir a StofliUI! Tu apoyo es fundamental para mejorar esta biblioteca de componentes. 