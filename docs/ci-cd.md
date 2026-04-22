# CI/CD — Cloudflare Deployment Pipeline

## Overview

Este proyecto usa **GitHub Actions** para automatizar el despliegue de dos componentes en Cloudflare:

| Componente | Servicio Cloudflare | Trigger |
|---|---|---|
| Sitio web (Astro) | Cloudflare Pages | Push a `main` |
| Contact Form Worker | Cloudflare Workers | Manual (`wrangler deploy`) |

---

## Arquitectura

```
┌─────────────┐     push to main     ┌──────────────────┐
│  Developer   │ ───────────────────► │  GitHub Actions   │
└─────────────┘                      │  (deploy.yml)     │
                                     └────────┬─────────┘
                                              │
                              ┌───────────────┼───────────────┐
                              ▼               ▼               ▼
                        ┌──────────┐   ┌────────────┐  ┌─────────────┐
                        │ Checkout  │   │ npm ci     │  │ npm run     │
                        │           │   │ npm build  │  │ build       │
                        └──────────┘   └────────────┘  └──────┬──────┘
                                                               │
                                                               ▼
                                                      ┌─────────────────┐
                                                      │ Cloudflare Pages│
                                                      │ Action @v1      │
                                                      └────────┬────────┘
                                                               │
                                                               ▼
                                                      ┌─────────────────┐
                                                      │ web-resume      │
                                                      │ (Cloudflare)    │
                                                      └─────────────────┘
```

---

## Pipeline: Cloudflare Pages (`deploy.yml`)

### Trigger

- **Push** a la rama `main`
- **Manual** via `workflow_dispatch` (desde la UI de GitHub Actions)

### Jobs

| Paso | Descripción |
|---|---|
| **Checkout** | Clona el repositorio (`actions/checkout@v4`) |
| **Setup Node** | Configura Node.js 22 con cache de npm |
| **Install** | `npm ci` — instalación limpia y determinista |
| **Build** | `npm run build` — genera el sitio estático en `dist/` |
| **Deploy** | `cloudflare/pages-action@v1` — sube `dist/` a Cloudflare Pages |

### Secrets Requeridos

| Secret | Descripción |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token de API con permisos de edición en Pages |
| `CLOUDFLARE_ACCOUNT_ID` | ID de la cuenta de Cloudflare |
| `GITHUB_TOKEN` | Automático (proveído por GitHub Actions) |

### Configuración del Deploy

```yaml
projectName: web-resume
directory: dist
```

---

## Contact Form Worker

El formulario de contacto corre como un **Cloudflare Worker** independiente, no como parte del pipeline de CI/CD.

### Estructura

```
workers/
└── contact-form/
    ├── wrangler.toml    # Configuración del worker
    └── index.ts         # Código del worker
```

### Funcionamiento

1. Recibe POST requests con `{ name, email, message }`
2. Valida y sanitiza los datos
3. Envía un embed formateado a un **Discord Webhook**
4. Responde con CORS habilitado para consumo desde el frontend

### Deploy Manual

```bash
cd workers/contact-form
wrangler deploy
```

### Secrets Requeridos

| Secret | Comando para configurar |
|---|---|
| `DISCORD_WEBHOOK_URL` | `wrangler secret put DISCORD_WEBHOOK_URL` |

---

## Analytics

El sitio usa **Umami Cloud** para tracking de visitas. El script se carga en `BaseLayout.astro` y se despliega como parte del build de Astro.

```html
<script defer src="https://cloud.umami.is/script.js"
  data-website-id="cdf23fde-ef38-499b-894f-11cae7098224">
</script>
```

No requiere configuración adicional en el pipeline — es un script del lado del cliente.

---

## Setup de Secrets en GitHub

1. Ir a **Settings → Secrets and variables → Actions** del repositorio
2. Agregar:
   - `CLOUDFLARE_API_TOKEN` — crear desde [Cloudflare Dashboard → API Tokens](https://dash.cloudflare.com/profile/api-tokens) con permiso `Edit` en Pages
   - `CLOUDFLARE_ACCOUNT_ID` — disponible en el dashboard de Cloudflare (URL o sección Account)

---

## Flujo Completo de Desarrollo

```
1. Desarrollo local
   ├── npm run dev          # Preview del sitio Astro
   └── npm run build        # Verificar build

2. Commit + Push
   └── git push origin main # Trigger automático del pipeline

3. CI/CD (GitHub Actions)
   ├── Build del sitio
   └── Deploy a Cloudflare Pages

4. Verificación
   ├── GitHub Actions tab   # Status del deploy
   └── Cloudflare Dashboard # Preview URL + production URL

5. Worker (cuando se modifica)
   ├── cd workers/contact-form
   ├── wrangler deploy
   └── wrangler secret put DISCORD_WEBHOOK_URL
```
