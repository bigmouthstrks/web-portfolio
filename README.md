# 🧪 Dr. Benjamin Caceres - Portfolio Terminal

Un portafolio web con estética inspirada en **Half-Life**, diseñado específicamente para un **Mobile Software Engineer**. Combina el minimalismo industrial, la estética retro-futurista y elementos post-apocalípticos para crear una experiencia única.

## 🎨 Características Visuales

### Paleta de Colores Half-Life
- **Base:** `#0F0F0F` (negro industrial), `#1A1A1A` (gris carbón)
- **Acentos HEV:** `#FF6A00` (naranjo característico)
- **Indicadores:** `#00FF80` (verde fosforescente), `#00C8FF` (azul neón)
- **Textos:** `#FFFFFF`, `#8C8C8C` (gris metálico)

### Tipografía Futurista
- **Orbitron:** Para títulos y elementos principales
- **Roboto Mono:** Para terminales y código
- Efectos de texto con sombras luminosas y animaciones

## 🚀 Funcionalidades

### ✨ Animaciones y Efectos
- **Terminal de Inicio:** Animación tipo Black Mesa con texto que aparece progresivamente
- **Cursor Personalizado:** Punto naranjo que deja estela luminosa
- **Efectos Hover:** Glow effects en tarjetas y botones
- **Barras de Progreso:** Animaciones tipo HUD de HEV Suit
- **Sonidos:** Efectos de audio sutiles para interacciones

### 📱 Diseño Responsive
- Optimizado para móviles, tablets y desktop
- Menú hamburguesa para dispositivos móviles
- Grid adaptativo para proyectos y habilidades
- Tipografía escalable

### 🎯 Secciones Principales

#### 🏠 Home / Terminal
- Terminal interactivo estilo Black Mesa
- Estadísticas animadas del desarrollador
- Botones de navegación con efectos

#### 👨‍💻 About Me
- Perfil estilo credencial de Black Mesa
- ID Card con información del desarrollador
- Highlights de experiencia y habilidades

#### 🧪 Projects
- Tarjetas de proyecto estilo cápsulas de laboratorio
- Estados: `ACTIVE`, `EXPERIMENTAL`, `ARCHIVED`
- Efectos hover con overlay de información
- Tecnologías utilizadas con tags estilizados

#### ⚡ Skills & Expertise
- HUD estilo HEV Suit con barras de progreso animadas
- Categorías: Mobile Development, Backend & Data, Tools & Frameworks
- Efectos shimmer en las barras de progreso

#### 📡 Contact
- Formulario con estética de consola
- Terminal de comunicación segura
- Información de contacto con iconos

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica
- **CSS3:** Animaciones, grid, flexbox, variables CSS
- **JavaScript ES6+:** Interactividad, efectos de sonido, animaciones
- **Fonts:** Google Fonts (Orbitron, Roboto Mono)
- **Icons:** Font Awesome 6

## 🎮 Características Interactivas

### ⌨️ Atajos de Teclado
- `1-5`: Navegación rápida entre secciones
- `ESC`: Cerrar menú móvil

### 🎵 Efectos de Sonido
- Clicks de botones
- Hover effects
- Animaciones de barras de habilidades
- Envío de formularios

### 🎨 Efectos Visuales
- Glitch effect aleatorio cada 10 segundos
- Parallax scrolling
- Typing effects
- Scroll animations con Intersection Observer

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Adaptaciones Móviles
- Menú hamburguesa
- Grid de una columna
- Tipografía reducida
- Padding optimizado

## 🚀 Instalación y Uso

1. **Clonar el repositorio:**
```bash
git clone [tu-repositorio]
cd portfolio
```

2. **Abrir en navegador:**
```bash
# Opción 1: Servidor local
python -m http.server 8000

# Opción 2: Live Server (VS Code)
# Instalar extensión "Live Server" y hacer clic derecho en index.html
```

3. **Personalizar contenido:**
- Editar `index.html` para cambiar información personal
- Modificar `styles.css` para ajustar colores y estilos
- Actualizar `script.js` para nuevas funcionalidades

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `:root`:
```css
:root {
    --color-orange: #TU_COLOR_PRINCIPAL;
    --color-green: #TU_COLOR_SECUNDARIO;
    /* ... */
}
```

### Añadir Proyectos
Modifica la sección `#projects` en `index.html`:
```html
<div class="project-card">
    <div class="project-header">
        <span class="project-title">TU PROYECTO</span>
        <span class="project-status active">ACTIVE</span>
    </div>
    <!-- ... contenido del proyecto ... -->
</div>
```

### Modificar Habilidades
Actualiza la sección `#skills` con tus tecnologías:
```html
<div class="skill-item">
    <span class="skill-name">TU_TECNOLOGIA</span>
    <div class="skill-bar">
        <div class="skill-fill" data-level="85"></div>
        <span class="skill-level">85%</span>
    </div>
</div>
```

## 🔧 Optimizaciones

### Performance
- Lazy loading de imágenes
- Debounce en eventos de scroll
- Throttle en animaciones
- Intersection Observer para animaciones

### Accesibilidad
- Skip links para navegación por teclado
- Landmarks ARIA
- Focus management
- Contraste de colores optimizado

### SEO
- Meta tags optimizados
- Estructura semántica HTML5
- Alt text en imágenes
- Sitemap y robots.txt (si se despliega)

## 📈 Próximas Mejoras

- [ ] Integración con CMS para gestión de contenido
- [ ] Modo oscuro/claro
- [ ] Internacionalización (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Integración con APIs de GitHub/GitLab
- [ ] Sistema de blog integrado
- [ ] Analytics y métricas de rendimiento

## 🎮 Easter Eggs

- Efecto glitch aleatorio en títulos
- Sonidos de interfaz estilo Half-Life
- Cursor personalizado con estela luminosa
- Animaciones de terminal auténticas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para tu portafolio personal.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**Desarrollado con ❤️ por Dr. Benjamin Caceres**
*Black Mesa Research Facility - Sector C*

> "El futuro del desarrollo móvil está en nuestras manos. ¡Hagámoslo brillar!"
