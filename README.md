# DespensApp Landing

Landing estática para presentar DespensApp: una app doméstica para organizar despensa, recetas, plan semanal y lista de la compra.

## Qué incluye

- Hero con la propuesta principal de DespensApp.
- Secciones de problema, flujo de uso, funcionalidades, privacidad, demo guiada e instalación.
- Mockups hechos con HTML/CSS, sin imágenes externas.
- Icono SVG local en `assets/despensapp-icon.svg`.
- Interacciones ligeras con JavaScript nativo: menú móvil, tabs de demo y tabs de instalación.

## Estructura

```text
.
├── index.html
├── styles.css
├── app.js
├── assets/
│   └── despensapp-icon.svg
├── README.md
└── AGENTS.md
```

## Cómo verla

No hay dependencias ni proceso de build. Puedes abrir `index.html` directamente en el navegador.

Si prefieres servirla en local:

```bash
python3 -m http.server 8080
```

Y abrir:

```text
http://localhost:8080
```

## Mantenimiento

- Mantener HTML, CSS y JS nativo, sin librerías externas.
- Evitar lenguaje técnico en textos visibles: no hablar de PWA, backend, IndexedDB, JSON o service workers.
- Explicar beneficios concretos: planificar, saber qué hay, comprar lo necesario, crear copia de seguridad e instalarla en el móvil.
- Usar el icono local de `assets/despensapp-icon.svg` para marca, favicon y vistas simuladas.
- Mantener el CTA principal apuntando a:

```text
https://pablogarcor.github.io/js-despensapp/
```

## Verificación recomendada

```bash
node --check app.js
```

También conviene revisar manualmente:

- ancho móvil cercano a 320px;
- menú móvil;
- tabs de demo;
- tabs de instalación;
- que el título `DespensApp` no se parta;
- que no haya referencias a CDNs o librerías externas.
