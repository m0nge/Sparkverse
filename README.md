# 🌌✨ Particle Physics Studio

Un generador de arte generativo interactivo con física realista en tiempo real. Crea visualizaciones espectaculares con tu cursor y explora infinitas posibilidades creativas. 🎨🚀

## 🎯 Descripción

Particle Physics Studio es una aplicación web interactiva que te permite crear arte generativo impresionante usando un sistema avanzado de partículas con física realista. Simplemente haz clic y arrastra para pintar con partículas dinámicas que responden a la gravedad, se mueven en espirales, explotan, o crean efectos de galaxias. Perfecto para artistas digitales, diseñadores, desarrolladores creativos, o cualquiera que quiera experimentar con visualizaciones asombrosas.

## ✨ Características

- 🎨 **6 Modos de Emisión**: Flow, Explosion, Gravity, Spiral, Fireworks y Galaxy
- ⚙️ **Física en Tiempo Real**: Gravedad, velocidad, fricción y fuerzas personalizables
- 🌈 **Modo Rainbow**: Partículas con colores que cambian automáticamente
- ✨ **Efectos Visuales**: Glow, conexiones entre partículas, repulsión del mouse
- 🎛️ **Control Total**: Ajusta tamaño, velocidad, dispersión, cantidad y más
- 💾 **Exporta tu Arte**: Guarda tus creaciones como imágenes PNG
- 📱 **Soporte Táctil**: Funciona perfectamente en tablets y smartphones
- 🎲 **Configuración Aleatoria**: Descubre combinaciones únicas con un clic
- 📊 **Estadísticas en Vivo**: Monitor de FPS y contador de partículas
- 🚀 **Alto Rendimiento**: 60 FPS constantes con miles de partículas

## 🛠️ Tecnologías

- **Canvas API**: Renderizado de gráficos 2D de alto rendimiento
- **JavaScript Vanilla**: Física y animaciones sin frameworks
- **HTML5**: Estructura semántica moderna
- **CSS3**: Diseño con glassmorphism y gradientes
- **Programación Orientada a Objetos**: Sistema de clases para partículas

## 🚀 Cómo Usar

### Creación Básica
1. **Haz clic y arrastra** en cualquier parte del canvas negro
2. **Las partículas** aparecerán siguiendo tu cursor
3. **Experimenta** con los diferentes modos y configuraciones
4. **Guarda** tu obra maestra cuando termines

### Modos de Emisión

#### 🌊 Flow
Partículas que fluyen suavemente hacia arriba. Perfecto para efectos de humo o corrientes de aire.

#### 💥 Explosion
Explosión radial desde el punto de clic. Ideal para efectos de impacto o fuegos artificiales.

#### 🪐 Gravity
Las partículas caen con gravedad realista. Simula lluvia, nieve o confeti.

#### 🌀 Spiral
Movimiento en espiral hipnótico. Crea patrones únicos y abstractos.

#### 🎆 Fireworks
Trayectorias parabólicas como fuegos artificiales reales. Espectacular para celebraciones.

#### 🌌 Galaxy
Gravitación hacia el centro como un agujeo negro. Efectos cósmicos impresionantes.

## 📦 Instalación

### Opción 1: Descarga Directa
1. Descarga el archivo `index.html`
2. Ábrelo en tu navegador (Chrome o Firefox recomendados)
3. ¡Empieza a crear! 🎨

### Opción 2: Clonar Repositorio
```bash
git clone https://github.com/tuusuario/particle-physics-studio.git
cd particle-physics-studio
```
Luego abre `index.html` en tu navegador.

### Opción 3: Live Server
Si tienes VS Code:
1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

## 📁 Estructura del Proyecto

```
particle-physics-studio/
└── index.html      # Aplicación completa
```

¡Todo en un solo archivo! Máxima portabilidad y facilidad de uso. 🎯

## 🎛️ Controles Detallados

### Physics (Física)

**Particle Size (1-10px)**
- Tamaño de cada partícula individual
- Valores pequeños: efectos sutiles y delicados
- Valores grandes: impacto visual más fuerte

**Speed (1-20)**
- Velocidad inicial de las partículas
- Afecta qué tan rápido se mueven desde el origen
- Combínalo con diferentes modos para efectos únicos

**Gravity (0-2)**
- Fuerza de gravedad aplicada a las partículas
- 0: Sin gravedad (flotan libremente)
- 2: Gravedad fuerte (caen rápido)

**Spread (0-360°)**
- Ángulo de dispersión de las partículas
- 0°: Línea recta
- 360°: Dispersión completa en todas direcciones

### Visual

**Color Mode**
- Color Picker: Elige cualquier color personalizado
- Rainbow: Modo arcoíris automático con transición de colores

**Trail Length (0-100%)**
- Cuánto tiempo persiste el rastro de las partículas
- 0%: Sin rastro (solo partículas)
- 100%: Rastro largo y persistente

**Particle Count (1-20 per frame)**
- Cantidad de partículas creadas por frame cuando haces clic
- Valores altos = más densidad y performance intensivo

### Effects (Efectos)

**Glow Effect**
- Añade resplandor brillante alrededor de cada partícula
- Crea un efecto luminoso y mágico

**Connect Particles**
- Dibuja líneas entre partículas cercanas
- Crea efectos de constelaciones y redes
- Mejor con pocas partículas (< 200)

**Mouse Repulsion**
- Las partículas huyen del cursor
- Radio de repulsión: 100px
- Perfecto para interacciones dinámicas

## 💡 Casos de Uso

- 🎨 **Arte Digital**: Crea obras únicas de arte generativo
- 🎮 **Desarrollo de Juegos**: Prototipa sistemas de partículas
- 🎓 **Educación**: Enseña física y programación de forma visual
- 🎬 **Motion Graphics**: Genera efectos para videos
- 🌐 **Web Design**: Backgrounds interactivos para sitios web
- 💻 **Portfolio**: Demuestra habilidades técnicas avanzadas
- 🧘 **Relajación**: Experimenta con patrones meditativos

## 💡 Implementación Técnica

### Sistema de Partículas
Cada partícula es una instancia de la clase `Particle` con propiedades:
```javascript
- Posición (x, y)
- Velocidad (vx, vy)
- Vida útil (life)
- Color
- Tamaño
- Modo de comportamiento
```

### Física Aplicada
```javascript
// Fricción del aire
this.vx *= 0.99;
this.vy *= 0.99;

// Gravedad
this.vy += settings.gravity;

// Fuerza centrípeta (Galaxy mode)
const force = dist * 0.0001;
this.vx += (dx / dist) * force;
```

### Optimizaciones
- Array filtering para eliminar partículas muertas
- RequestAnimationFrame para animaciones suaves
- Límite de conexiones cuando hay muchas partículas
- Clear selectivo con alpha para trails

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+
- ✅ Navegadores móviles (iOS Safari, Chrome Mobile)
- ⚠️ IE11: No compatible

### Ideas para Contribuir
- 🎨 Nuevos modos de emisión (Vortex, Tornado, Wave)
- 🎵 Sincronización con audio
- 💾 Guardar/cargar presets
- 📹 Exportar como video o GIF
- 🎨 Más opciones de color (gradientes, texturas)
- ⌨️ Atajos de teclado
- 🎯 Modos de dibujo (línea, círculo, polígono)
- 🌟 Efectos de post-procesamiento
- 🎮 Modo automático (sin interacción)

## 🏆 Logros Técnicos

Este proyecto demuestra:
- ✅ Programación orientada a objetos avanzada
- ✅ Implementación de física realista
- ✅ Optimización de performance para miles de objetos
- ✅ Manejo de eventos complejo (mouse, touch)
- ✅ Algoritmos de matemáticas aplicadas
- ✅ Diseño de UI/UX profesional
- ✅ Canvas API a nivel experto
- ✅ Código limpio y mantenible

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - siéntete libre de usarlo, modificarlo y compartirlo.

## 👨‍💻 Autor

Desarrollado con 💜 y muchas partículas por **Daniela Monge**

## 🎮 Demo en Vivo

[Ver Demo](#) ← ¡Crea tu arte ahora!

## 📸 Capturas de Pantalla

<img width="1539" height="762" alt="image" src="https://github.com/user-attachments/assets/62a7daa3-d714-479b-8a9a-abc4328903bd" />

## 🐛 Reportar Bugs

Si encuentras algún bug, por favor abre un [issue]

## ⭐ Dale una Estrella

Si este proyecto te inspiró o te ayudó a aprender algo nuevo, ¡no olvides darle una ⭐ en GitHub!

---

**Recuerda**: No hay límites en la creatividad. Experimenta, prueba, rompe reglas y crea algo único. 🚀
