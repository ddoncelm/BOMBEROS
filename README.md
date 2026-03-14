# 🔥 Bomberos Marbella — App de Oposiciones

Aplicación web progresiva (PWA) para entrenar el examen de acceso al Cuerpo de Bomberos del municipio de Marbella.

## ✨ Características

- 📋 **Simulacro y práctica libre** — Formato real del examen (3 opciones a/b/c)
- 🗺️ **Mapa real por calles** — OSRM + OpenStreetMap, respeta sentidos de circulación
- 📱 **PWA instalable** — Android, iOS y PC como app nativa
- 🔌 **Offline** — Funciona sin internet tras la primera carga
- 🔒 **Contraseña configurable desde GitHub** — Edita `config.js` en el repo
- 📄 **Importar preguntas** — Sube PDF o TXT con nuevas preguntas
- 📍 **Por zonas** — San Pedro, Nueva Andalucía, Benahavís, Elviria, Istán...
- 91 preguntas en el banco inicial (ampliable)

---

## 🔑 Cambiar la contraseña de acceso

**Sin tocar código.** Solo edita `config.js` en GitHub:

1. Abre `config.js` en GitHub
2. Haz clic en el lápiz ✏️ (Edit this file)
3. Cambia `password: "Bomberos24"` por tu nueva clave
4. Haz clic en **Commit changes**
5. Netlify lo despliega automáticamente en ~30 segundos

```js
window.APP_CONFIG = {
  password: "TuNuevaClaveAqui",   // ← cambia esto
  municipio: "Marbella",
  defaultQuestions: 20,
  defaultTimer: 45,
  showMap: true
};
```

---

## 🚀 Despliegue en Netlify

### 1. Subir a GitHub

```bash
git init
git add .
git commit -m "Bomberos Marbella v5"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/bomberos-marbella.git
git push -u origin main
```

### 2. Conectar con Netlify

1. [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Selecciona el repositorio
3. Build command: *(vacío)*
4. Publish directory: `.`
5. **Deploy site**

---

## 📄 Importar preguntas

La app acepta ficheros **TXT** con este formato (un bloque por pregunta, separados por línea en blanco):

```
Desde C/ Castilla puedo acceder a:
a) Extremadura, Ancla, Córdoba
b) Málaga, Extremadura, Ancla
c) Extremadura, Ancla, Sevilla
Respuesta: a

La Rotonda José Tineo Gil conecta con:
a) A-397, C/ Toledo, C/ Dr. Espinosa
b) C/ Toledo, C/ Álamo, C/ Naranjos
c) C/ Toledo únicamente
Respuesta: a
```

Para **PDF**, el navegador extrae el texto automáticamente si el PDF no está escaneado.

---

## 📁 Estructura del proyecto

```
bomberos-marbella/
├── index.html       ← App completa
├── config.js        ← ⭐ Edita aquí la contraseña
├── manifest.json    ← PWA
├── sw.js            ← Service Worker (offline)
├── netlify.toml     ← Configuración Netlify
├── icons/           ← Iconos PWA
└── README.md
```

## 🔧 Tecnologías

- HTML5 + CSS3 + JavaScript vanilla
- [Leaflet.js](https://leafletjs.com/) — Mapas interactivos
- [OSRM](https://project-osrm.org/) — Routing real por calles
- OpenStreetMap — Datos cartográficos libres
- Service Worker — Funcionamiento offline
- Web App Manifest — PWA instalable
