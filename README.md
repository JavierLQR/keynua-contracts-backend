# ⚙️ Keynua Contract Creator — Backend

API desarrollada con **NestJS + TypeScript + Axios + Swagger**, que se conecta al servicio de **Keynua** para crear contratos digitales, enviando los documentos, firmantes y configuraciones desde el frontend.

---

## 🚀 Tecnologías principales

- 🧠 **NestJS 11**
- ⚡ **TypeScript**
- 📦 **Axios (HTTP Client)**
- 🧩 **Class Validator + Class Transformer**
- 🔒 **Helmet + CORS**
- 📘 **Swagger (Documentación API)**
- 🧰 **PNPM (Package Manager)**

---

## 📁 Estructura del proyecto

```
src/
├── app.module.ts
├── main.ts
├── common/
│   ├── utils/
│   │   ├── axios-error.ts
│   │   └── clear-base64.ts
├── config/
│   ├── app/
│   │   └── config.app.ts
│   ├── swagger/
│   │   └── config.swagger.app.ts
├── modules/
│   └── contracts/
│       ├── contracts.controller.ts
│       ├── contracts.service.ts
│       ├── dto/
│       │   └── create-contract.dto.ts
│       ├── entities/
│       │   └── contract.entity.ts
│       └── tests/
│           └── contracts.service.spec.ts
└── main.ts
```

---

## ⚙️ Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/JavierLQR/keynua-contracts-backend
cd keynua-contracts-backend
```

### 2️⃣ Instalar dependencias

```bash
pnpm install
```

### 3️⃣ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con lo siguiente:


```bash
# Puerto local
PORT=4000
NODE_ENV=development

# Keynua API
BASE_URL_KEYNUA=https://api.stg.keynua.com/contracts/v1
API_KEY_KEYNUA=msXm2X0QJV5ppfaCMgHZo4FBhS2rR4YT368bA19s
API_TOKEN_KEYNUA=YjA3MmU0MTctYWM0OS00MzU1LTlhMzMtNzkzMTMxMjE4YmE1OjllMjk4Mzc5YmQwODRjYjNhNWY4YTlmMTA0NTA4MTkwOmJkZWU1NzNjZDE0Nzc4NjFjZTNhNDEzNTE0ZTA0M2NhMDI3NjhhNmU2NTAwMzlhMGY5ZjY5NThhZDY0ODQwNjQ
```

> ⚠️ **Aviso importante:**  
> Estas credenciales (`API_KEY_KEYNUA` y `API_TOKEN_KEYNUA`) son **provisionales** y se eliminarán en un tiempo.  
> Puedes utilizarlas temporalmente para pruebas locales y de integración, pero **no deben subirse a GitHub ni usarse en producción**.

---

## 🧩 Scripts disponibles

| Comando | Descripción |
|----------|--------------|
| `pnpm start:dev` | Inicia el servidor en modo desarrollo |
| `pnpm build` | Compila el proyecto con TypeScript |
| `pnpm start:prod` | Inicia la aplicación en modo producción |
| `pnpm test` | Ejecuta los tests unitarios (Jest) |

---

## 🧠 Flujo general

1. **El frontend envía los datos** (documentos, firmantes, flags, etc.) al endpoint:
   ```
   POST /api-v1/contracts/create
   ```

2. **El backend construye el payload** compatible con el API de Keynua:
   - Limpia los PDFs (remueve prefijo base64 con `clearBase64`)
   - Ajusta teléfonos (`replace(/[^0-9]/g, '')`)
   - Añade `flags.chosenNotificationOptions`

3. **La API se comunica con Keynua** usando `Axios` y devuelve la respuesta completa:
   ```json
   {
     "message": "Contract created successfully",
     "data": { "id": "..." },
     "statusCode": 201
   }
   ```

4. El frontend redirige al detalle del contrato usando el `id`.

---

## 📘 Documentación Swagger

Una vez el servidor esté corriendo, abre:

👉 [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

Allí podrás probar los endpoints:
- **POST /contracts/create** → Crear un nuevo contrato  
- **GET /contracts/:id** → (opcional, si lo implementas después)

---

## 🧪 Ejemplo de request

```json
{
  "title": "Contrato de Servicios",
  "description": "Acuerdo de prestación de servicios de desarrollo web.",
  "reference": "REF-2025-001",
  "expirationInHours": 24,
  "chosenNotificationOptions": ["email"],
  "documents": [
    {
      "name": "contrato.pdf",
      "base64": "data:application/pdf;base64,JVBERi0xLjQKJ..."
    }
  ],
  "users": [
    {
      "name": "Javier Rojas",
      "email": "javier.fullstack.qr@gmail.com",
      "phone": "51931022090",
      "groups": ["signers"]
    }
  ]
}
```

---

## 🔍 Test unitario de servicio

El archivo `contracts.service.spec.ts` contiene pruebas para:

- Verificar que `ContractsService` esté definido.
- Mockear `HttpService` y simular respuestas exitosas y fallidas.
- Probar `buildPayload()` y `create()` con datos simulados.

Ejecuta los tests con:

```bash
pnpm test
```

---

## 🔐 Seguridad y middlewares

- **Helmet:** protege cabeceras HTTP.  
- **CORS:** configurado para `http://localhost:3000`.  
- **ValidationPipe:** limpia y transforma la data entrante.  
- **Swagger:** documenta todos los endpoints.

---


## 🧑‍💻 Autor

**Desarrollado por:** Javier Rojas
📧 [javier.fullstack.qr@gmail.com](mailto:javier.fullstack.qr@gmail.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/javier-rojas-287989209/) · [GitHub](https://github.com/JavierLQR?tab=repositories)

---

## 🛠️ Licencia

Este proyecto es de uso educativo y demostrativo — no oficial de Keynua.  
Puedes modificarlo o extenderlo libremente para pruebas técnicas o portafolio.