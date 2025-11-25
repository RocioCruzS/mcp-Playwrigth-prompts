# Allure Report Integration

## 🎯 ¿Qué es Allure?

Allure es un framework de reportes flexible y ligero que genera reportes visuales e interactivos con:
- 📊 Gráficos y estadísticas detalladas
- 🔍 Detalles de cada test (pasos, screenshots, videos)
- 📈 Tendencias históricas
- 🏷️ Categorización y etiquetas
- 📸 Screenshots y attachments automáticos

## 🚀 Comandos Disponibles

### Generar Reporte Allure
```bash
npm run allure:generate
```
Genera el reporte Allure desde los resultados de pruebas.

### Ver Reporte Allure Localmente
```bash
npm run allure:open
```
Abre el reporte generado en tu navegador.

### Servir Reporte (Genera y Abre)
```bash
npm run allure:serve
```
Genera el reporte y lo abre en un servidor local.

### Limpiar Todo
```bash
npm run clean
```
Elimina todos los reportes y resultados (Playwright, Allure, videos).

## 📋 Flujo de Trabajo

### Desarrollo Local

1. **Ejecutar tests:**
   ```bash
   npm run test:chromium
   ```

2. **Ver reporte Allure:**
   ```bash
   npm run allure:serve
   ```
   Esto abre automáticamente el reporte en `http://localhost:PORT`

### En GitHub Actions

1. **Push tu código** → Se ejecutan los tests automáticamente
2. **El workflow:**
   - ✅ Ejecuta los tests
   - 📊 Genera reporte Allure
   - 🚀 Despliega a GitHub Pages
   - 📢 Envía URL a Slack
   - 💾 Guarda artifacts

3. **Ver reporte:**
   - **URL pública:** Aparece en el console log del workflow
   - **Slack:** Click en "Go to Report"
   - **Formato:** `https://<usuario>.github.io/<repo>/allure-report/<run-number>`

## 📊 Estructura de Reportes

Ahora tienes **2 tipos de reportes**:

### 1. **Allure Report** (Principal - en GitHub Pages)
- 📍 Ubicación: `allure-report/`
- 🌐 URL pública: `https://RocioCruzS.github.io/mcp-Playwrigth-prompts/allure-report/<run-number>`
- 📦 Artifact: `allure-report` (30 días)
- 🎨 Características:
  - Dashboard interactivo
  - Gráficos de estadísticas
  - Timeline de ejecución
  - Categorización de errores
  - Screenshots integrados

### 2. **Playwright HTML Report** (Secundario - solo artifact)
- 📍 Ubicación: `playwright-report/`
- 📦 Artifact: `playwright-report` (30 días)
- 🎨 Características:
  - Reporte simple y rápido
  - Vista de tests
  - Trazas de ejecución

### 3. **Allure Results** (Raw Data)
- 📍 Ubicación: `allure-results/`
- 📦 Artifact: `allure-results` (30 días)
- 💾 JSON files con datos crudos de las pruebas

## 🎨 Personalización de Allure

En `playwright.config.js`, puedes personalizar el reporte:

```javascript
reporter: [
  ['html'],
  ['allure-playwright', {
    outputFolder: 'allure-results',
    detail: true,              // Detalles completos
    suiteTitle: true,          // Mostrar títulos de suites
    // Opciones adicionales:
    // categories: [...],      // Categorías personalizadas
    // environmentInfo: {...}, // Info del ambiente
  }],
]
```

## 🏷️ Agregar Metadata a Tests

Puedes agregar metadata a tus tests para un mejor reporte:

```javascript
import { test } from '@playwright/test';

test.describe('Login Tests @smoke', () => {
  test('should login successfully @critical', async ({ page }) => {
    // Test code...
  });
});
```

Las etiquetas `@smoke`, `@critical` aparecerán en Allure.

## 📸 Screenshots y Attachments

Allure captura automáticamente:
- ✅ Screenshots en fallos
- ✅ Videos de ejecución
- ✅ Logs de console
- ✅ Network requests (si está habilitado)

## 🔗 URLs Importantes

### Producción (GitHub Pages)
```
https://RocioCruzS.github.io/mcp-Playwrigth-prompts/allure-report/<run-number>
```

### Local
```
http://localhost:<port>  (después de npm run allure:serve)
```

## 📝 Ejemplo de Ejecución Completa

```bash
# 1. Limpiar resultados anteriores
npm run clean

# 2. Ejecutar tests
npm run test:ci

# 3. Generar y ver reporte Allure
npm run allure:serve

# Esto abrirá automáticamente el reporte en tu navegador 🎉
```

## 🐛 Troubleshooting

### No se genera el reporte Allure
```bash
# Verifica que existan resultados
ls allure-results/

# Regenera el reporte
npm run allure:generate
```

### Error: "allure command not found"
```bash
# Reinstala las dependencias
npm install
```

### Reporte vacío
- Asegúrate de ejecutar los tests primero
- Verifica que `allure-results/` tenga archivos JSON

### URL de GitHub Pages devuelve 404
1. Ejecuta el workflow al menos una vez
2. Habilita GitHub Pages en Settings → Pages → gh-pages branch
3. Espera 1-2 minutos para el despliegue

## 💡 Tips

- 🎯 Usa `allure:serve` durante desarrollo (más rápido)
- 📊 Revisa el dashboard de Allure para ver tendencias
- 🏷️ Usa etiquetas (@smoke, @regression) para filtrar tests
- 📸 Los screenshots y videos se adjuntan automáticamente
- 🔄 El workflow limpia resultados anteriores antes de cada run
