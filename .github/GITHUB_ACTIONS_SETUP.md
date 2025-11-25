# GitHub Actions Setup Guide

Este proyecto incluye dos workflows de GitHub Actions para CI/CD optimizados para pruebas de **SauceDemo**.

## 📋 Workflows Disponibles

### 1. **ESLint Workflow** (`lint.yml`)
- Se ejecuta en cada push y pull request
- Verifica la calidad del código con ESLint
- Branches: `main`, `development`, `feature/*`, `bugfix/*`

### 2. **Playwright Tests Workflow** (`playwright-tests.yml`)
- Ejecuta las pruebas E2E de Playwright en SauceDemo
- Genera reportes HTML interactivos
- Sube videos y screenshots de las pruebas
- Opción de notificaciones Slack
- Branches: `main`, `development`, `feature/*`

---

## 🔐 Configuración de Secretos

Para que los workflows funcionen correctamente, debes configurar los siguientes secretos en tu repositorio de GitHub:

### 🔑 Cómo Agregar Secretos

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. Navega a **Secrets and variables** → **Actions**
4. Haz clic en **New repository secret**
5. Agrega cada secreto listado abajo

---

## 🔑 Secretos Requeridos

### 1. `USERNAME`
- **Descripción:** Usuario para login en SauceDemo
- **Valor recomendado:** `standard_user`
- **Usado en:** Autenticación en las pruebas de Playwright

### 2. `PASSWORD`
- **Descripción:** Contraseña para login en SauceDemo
- **Valor recomendado:** `secret_sauce`
- **Usado en:** Autenticación en las pruebas de Playwright

### 3. `BASE_URL` (Opcional)
- **Descripción:** URL base de la aplicación a probar
- **Valor por defecto:** `https://www.saucedemo.com/`
- **Nota:** Solo configúralo si necesitas usar una URL diferente

---

## 🔔 Secretos Opcionales (Notificaciones Slack)

### 4. `SLACK_WEBHOOK_URL` (Opcional)
- **Descripción:** Webhook URL para enviar notificaciones de resultados
- **Cómo obtenerlo:**
  1. Ve a https://api.slack.com/apps
  2. Crea una nueva app o selecciona una existente
  3. Navega a **Incoming Webhooks**
  4. Activa Incoming Webhooks
  5. Haz clic en **Add New Webhook to Workspace**
  6. Selecciona el canal para las notificaciones
  7. Copia la Webhook URL
- **Ejemplo:** `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX`

### Variables de Repositorio (No secretos)

Ve a: **Settings** → **Secrets and variables** → **Actions** → **Variables tab**

### 5. `ENABLE_SLACK_NOTIFICATIONS`
- **Descripción:** Habilitar/deshabilitar notificaciones Slack
- **Valores posibles:** `true` o `false`
- **Tipo:** Variable (no secreto)
- **Nota:** Solo necesario si configuraste `SLACK_WEBHOOK_URL`

---

## 🚀 Habilitar GitHub Pages (Para reportes)

Para ver los reportes de Playwright en línea:

1. Ve a **Settings** → **Pages**
2. En **Source**, selecciona:
   - Branch: **gh-pages**
   - Folder: **/ (root)**
3. Haz clic en **Save**

Los reportes estarán disponibles en:
```
https://<tu-usuario>.github.io/<nombre-repo>/playwright-report/<numero-ejecucion>
```

Ejemplo:
```
https://RocioCruzS.github.io/mcp-Playwrigth-prompts/playwright-report/42
```

---

## ✅ Checklist de Verificación

- [ ] Secreto `USERNAME` configurado
- [ ] Secreto `PASSWORD` configurado
- [ ] (Opcional) Secreto `SLACK_WEBHOOK_URL` configurado
- [ ] (Opcional) Variable `ENABLE_SLACK_NOTIFICATIONS` configurada
- [ ] GitHub Pages habilitado con branch `gh-pages`
- [ ] Workflows existen en `.github/workflows/`

---

## 🧪 Ejecución Manual del Workflow

Puedes ejecutar las pruebas manualmente:

1. Ve a la pestaña **Actions**
2. Selecciona el workflow **Playwright Tests**
3. Haz clic en **Run workflow**
4. Selecciona la branch deseada
5. Haz clic en **Run workflow**

---

## 📊 Artifacts Generados

Cada ejecución de pruebas genera:

1. **playwright-report**
   - Reporte HTML interactivo de Playwright
   - Disponible por 30 días
   - También publicado en GitHub Pages

2. **test-videos**
   - Videos de todas las pruebas ejecutadas
   - Screenshots y trazas en caso de fallos
   - Disponible por 7 días

---

## 🔄 Triggers de los Workflows

### ESLint (`lint.yml`)
- **Push a:** `main`, `development`, `feature/*`, `bugfix/*`
- **Pull request a:** `main`, `develop`

### Playwright Tests (`playwright-tests.yml`)
- **Push a:** `main`, `development`, `feature/*`
- **Pull request a:** `main`, `develop`
- **Manual:** workflow_dispatch

---

## ⚙️ Configuración del Entorno CI

Los workflows están optimizados con:

- ✅ Node.js 18.x
- ✅ Solo navegador Chromium (más rápido)
- ✅ Cache de dependencias npm
- ✅ Timeout de 60 minutos para tests
- ✅ Timeout de 10 minutos para lint
- ✅ Continue-on-error para generar reportes incluso con fallos
- ✅ Videos y screenshots automáticos

---

## 📝 Ejemplo de Configuración Completa

### Configuración paso a paso:

```bash
# 1. En GitHub Settings → Secrets and variables → Actions → Secrets
USERNAME = standard_user
PASSWORD = secret_sauce

# 2. (Opcional) Para notificaciones Slack
SLACK_WEBHOOK_URL = https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# 3. En Variables tab (no Secrets)
ENABLE_SLACK_NOTIFICATIONS = true

# 4. Habilitar GitHub Pages
# Settings → Pages → Source: gh-pages, folder: /

# 5. Push tu código
git add .
git commit -m "Setup GitHub Actions workflows"
git push origin main

# 6. Los workflows se ejecutarán automáticamente ✨
```

---

## 📧 Ejemplo de Notificación Slack

Después de la ejecución, recibirás un mensaje así:

```
SauceDemo E2E Tests

Result: ✅ PASSED
Environment: https://www.saucedemo.com/
> GitHub Branch: main

[View Report] [View Workflow]
```

---

## 🐛 Troubleshooting

### ❌ Error: "Process completed with exit code 1"
- **Causa:** Secretos no configurados correctamente
- **Solución:** Verifica que `USERNAME` y `PASSWORD` estén en Secrets

### ❌ No se generan reportes en GitHub Pages
- **Causa:** GitHub Pages no habilitado
- **Solución:**
  1. Ejecuta el workflow al menos una vez (crea la branch `gh-pages`)
  2. Habilita GitHub Pages en Settings
  3. Espera 1-2 minutos para el despliegue

### ❌ Notificaciones Slack no funcionan
- **Causa:** Webhook inválido o variable mal configurada
- **Solución:**
  1. Verifica que `SLACK_WEBHOOK_URL` sea un secreto válido
  2. Verifica que `ENABLE_SLACK_NOTIFICATIONS` = `true` (como Variable, no Secreto)
  3. Prueba el webhook manualmente:
     ```bash
     curl -X POST -H 'Content-type: application/json' \
     --data '{"text":"Test"}' \
     TU_WEBHOOK_URL
     ```

### ❌ Tests fallan con errores de autenticación
- **Causa:** Credenciales incorrectas
- **Solución:**
  - Para SauceDemo, usa: `standard_user` / `secret_sauce`
  - Verifica que no haya espacios extra en los secretos

### ❌ Error: "npm ci failed"
- **Causa:** package-lock.json desactualizado
- **Solución:**
  ```bash
  rm package-lock.json
  npm install
  git add package-lock.json
  git commit -m "Update package-lock"
  git push
  ```

---

## 📚 Recursos Adicionales

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Guide](https://playwright.dev/docs/ci)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [SauceDemo Test Site](https://www.saucedemo.com/)

---

## 📝 Notas Importantes

- 🔒 Los secretos están encriptados y solo disponibles para GitHub Actions
- 🚫 Nunca commites secretos al repositorio
- 🔄 Puedes actualizar secretos sin afectar ejecuciones anteriores
- 💻 Para desarrollo local, usa el archivo `.env` (ya está en `.gitignore`)
- 🎥 Los videos se guardan solo cuando hay fallos o en modo CI
- 📸 Screenshots se capturan automáticamente en fallos
