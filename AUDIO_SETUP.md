# Half-Life 2 Audio Setup

Para completar la experiencia auténtica de Half-Life 2, necesitas añadir los siguientes archivos de audio a la carpeta `assets/audio/`:

## Archivos requeridos:

### Música de fondo:
- `apprehension_and_evasion.mp3` - Música principal del juego
- `apprehension_and_evasion.ogg` - Versión alternativa (recomendada para mejor compatibilidad)

### Sonidos de menú:
- `menu_hover.mp3` - Sonido al pasar el mouse sobre elementos
- `menu_hover.ogg` - Versión alternativa
- `menu_click.mp3` - Sonido al hacer clic
- `menu_click.ogg` - Versión alternativa
- `menu_select.mp3` - Sonido de selección
- `menu_select.ogg` - Versión alternativa

## Cómo obtener los archivos:

### Opción 1: Steam (Legal)
1. Instala Half-Life 2 a través de Steam
2. Los archivos de audio están en: `Steam/steamapps/common/Half-Life 2/hl2/sound/`
3. Busca los archivos de música y menú

### Opción 2: Repositorios de audio
- Busca "Half-Life 2 soundtrack" en sitios de música libre
- Asegúrate de que sea para uso personal/portafolio

### Opción 3: Crear sonidos similares
Si no puedes obtener los archivos originales, puedes:
1. Usar sintetizadores para crear sonidos similares
2. Buscar librerías de sonidos retro-futuristas
3. Usar herramientas como Audacity para crear efectos

## Estructura de archivos:
```
assets/
└── audio/
    ├── apprehension_and_evasion.mp3
    ├── apprehension_and_evasion.ogg
    ├── menu_hover.mp3
    ├── menu_hover.ogg
    ├── menu_click.mp3
    ├── menu_click.ogg
    ├── menu_select.mp3
    └── menu_select.ogg
```

## Notas importantes:
- Los archivos .ogg son preferibles para mejor compresión
- Mantén los archivos pequeños (< 5MB cada uno)
- Asegúrate de tener los permisos necesarios para usar el audio
- El sistema funciona sin audio, pero la experiencia será limitada

## Fallback:
Si no tienes los archivos de audio, el sitio funcionará normalmente pero:
- No habrá música de fondo
- No habrá sonidos de menú
- El botón de audio no funcionará
- Se mostrará un error en la consola del navegador
