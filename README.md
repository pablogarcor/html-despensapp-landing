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
- Mantener el CTA principal apuntando a la app:

```text
https://app.despensapp.xyz/
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

## Despliegue

La landing se despliega en GitHub Pages con GitHub Actions cuando se suben cambios a la rama `master`.

El workflow está en:

```text
.github/workflows/deploy-pages.yml
```

Publica solo los archivos necesarios:

```text
index.html
styles.css
app.js
CNAME
assets/
```

El dominio personalizado configurado para la landing es:

```text
despensapp.xyz
```

La app instalable debe vivir en:

```text
app.despensapp.xyz
```

La instalación desde Chrome, Android o Safari se debe iniciar desde `https://app.despensapp.xyz/`, no desde la landing.

En la configuración del repositorio en GitHub, Pages debe estar configurado para desplegar desde `GitHub Actions` y el custom domain debe ser `despensapp.xyz`.

En Namecheap, usando `Advanced DNS`, el dominio raíz debe apuntar a GitHub Pages con estos registros:

```text
Type: A Record
Host: @
Value: 185.199.108.153

Type: A Record
Host: @
Value: 185.199.109.153

Type: A Record
Host: @
Value: 185.199.110.153

Type: A Record
Host: @
Value: 185.199.111.153
```

Para que `www.despensapp.xyz` también funcione:

```text
Type: CNAME
Host: www
Value: pablogarcor.github.io
```

Para que `app.despensapp.xyz` apunte a la app, configura el repositorio donde vive la app con custom domain `app.despensapp.xyz` y añade en Namecheap:

```text
Type: CNAME
Host: app
Value: pablogarcor.github.io
```

En ese repositorio de la app, su manifest y service worker deben estar servidos desde `https://app.despensapp.xyz/`.

Cuando GitHub detecte correctamente los DNS, activa `Enforce HTTPS` en la sección Pages del repositorio.
