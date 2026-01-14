# Documentación de la API - E-commerce Backend

## Información General

**Versión:** 1.0.0  
**Base URL:** `http://localhost:8080`  
**Tecnologías:** Node.js, Express.js 5.2.1, MongoDB, Mongoose 9.1.3  
**Paginación:** mongoose-paginate-v2 1.9.1

---

## Tabla de Contenidos

1. [Productos](#productos)
2. [Carritos](#carritos)
3. [Modelos de Datos](#modelos-de-datos)
4. [Códigos de Estado](#códigos-de-estado)
5. [Formato de Respuestas](#formato-de-respuestas)

---

## Productos

### 1. Obtener todos los productos

Obtiene una lista paginada de todos los productos disponibles.

**Endpoint:** `GET /api/products`

**Query Parameters:**

| Parámetro | Tipo   | Requerido | Default | Descripción                    |
|-----------|--------|-----------|---------|--------------------------------|
| limit     | Number | No        | 8       | Cantidad de productos por página |
| page      | Number | No        | 1       | Número de página a solicitar    |

**Ejemplo de Request:**
```http
GET /api/products?limit=10&page=2
```

**Respuesta Exitosa (200 OK):**
```json
{
  "status": "success",
  "payload": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Zapatillas Nike Air Max",
      "description": "Zapatillas deportivas de alta calidad",
      "code": "NIKE001",
      "price": 15999.99,
      "category": "Calzados",
      "thumbnails": "nike-air-max.jpg",
      "stock": 25,
      "status": true
    }
  ],
  "totalPages": 5,
  "prevPage": 1,
  "nextPage": 3,
  "page": 2,
  "hasPrevPage": true,
  "hasNextPage": true,
  "prevLink": "http://localhost:8080/api/products?limit=10&page=1",
  "nextLink": "http://localhost:8080/api/products?limit=10&page=3"
}
```

**Respuesta de Error (500):**
```json
{
  "status": "error",
  "message": "Error al obtener los productos"
}
```

---

### 2. Crear un producto

Crea un nuevo producto en la base de datos.

**Endpoint:** `POST /api/products`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Remera Adidas Original",
  "description": "Remera deportiva de algodón premium",
  "code": "ADIDAS001",
  "price": 4999.99,
  "category": "Indumentaria",
  "thumbnails": "adidas-remera.jpg",
  "stock": 50,
  "status": true
}
```

**Campos del Body:**

| Campo       | Tipo    | Requerido | Validación                                    |
|-------------|---------|-----------|-----------------------------------------------|
| title       | String  | Sí        | 5-100 caracteres                              |
| description | String  | Sí        | 10-500 caracteres                             |
| code        | String  | Sí        | Único, se convierte a mayúsculas              |
| price       | Number  | Sí        | Mínimo 0                                      |
| category    | String  | Sí        | Valores: "Calzados", "Indumentaria", "Accesorios" |
| thumbnails  | String  | No        | Default: "product.jpg"                        |
| stock       | Number  | Sí        | Mínimo 0                                      |
| status      | Boolean | No        | Default: true                                 |

**Respuesta Exitosa (201 Created):**
```json
{
  "status": "success",
  "payload": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Remera Adidas Original",
    "description": "Remera deportiva de algodón premium",
    "code": "ADIDAS001",
    "price": 4999.99,
    "category": "Indumentaria",
    "thumbnails": "adidas-remera.jpg",
    "stock": 50,
    "status": true
  }
}
```

**Respuesta de Error (500):**
```json
{
  "status": "error",
  "message": "Error al obtener los productos"
}
```

---

### 3. Actualizar un producto

Actualiza los datos de un producto existente por su ID.

**Endpoint:** `PUT /api/products/:pid`

**Parámetros de URL:**

| Parámetro | Descripción        |
|-----------|--------------------|
| pid       | ID del producto    |

**Headers:**
```
Content-Type: application/json
```

**Body (campos opcionales):**
```json
{
  "price": 5499.99,
  "stock": 45,
  "status": true
}
```

**Ejemplo de Request:**
```http
PUT /api/products/507f1f77bcf86cd799439011
```

**Respuesta Exitosa (200 OK):**
```json
{
  "status": "success",
  "payload": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Remera Adidas Original",
    "description": "Remera deportiva de algodón premium",
    "code": "ADIDAS001",
    "price": 5499.99,
    "category": "Indumentaria",
    "thumbnails": "adidas-remera.jpg",
    "stock": 45,
    "status": true
  }
}
```

**Respuesta de Error (404):**
```json
{
  "status": "error",
  "message": "Producto no encontrado"
}
```

**Respuesta de Error (500):**
```json
{
  "status": "error",
  "message": "Error al editar el producto"
}
```

---

### 4. Eliminar un producto

Elimina un producto de la base de datos por su ID.

**Endpoint:** `DELETE /api/products/:pid`

**Parámetros de URL:**

| Parámetro | Descripción        |
|-----------|--------------------|
| pid       | ID del producto    |

**Ejemplo de Request:**
```http
DELETE /api/products/507f1f77bcf86cd799439011
```

**Respuesta Exitosa (200 OK):**
```json
{
  "status": "success",
  "message": "Producto eliminado correctamente",
  "playlopad": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Remera Adidas Original",
    "code": "ADIDAS001"
  }
}
```

**Respuesta de Error (404):**
```json
{
  "status": "error",
  "message": "Producto no encontrado"
}
```

**Respuesta de Error (500):**
```json
{
  "status": "error",
  "message": "Error al eliminar el producto"
}
```

---

## Carritos

### 1. Crear un carrito

Crea un nuevo carrito de compras vacío.

**Endpoint:** `POST /api/carts`

**Ejemplo de Request:**
```http
POST /api/carts
```

**Respuesta Exitosa (201 Created):**
```json
{
  "status": "success",
  "payload": {
    "_id": "507f1f77bcf86cd799439022",
    "products": [],
    "createdAt": "2026-01-13T10:30:00.000Z",
    "updatedAt": "2026-01-13T10:30:00.000Z"
  }
}
```

**Respuesta de Error (500):**
```json
{
  "status": "error",
  "message": "Error al crear el carrito"
}
```

---

### 2. Agregar producto al carrito

Agrega un producto al carrito especificado. Si el producto ya existe, incrementa su cantidad.

**Endpoint:** `POST /api/carts/:cid/product/:pid`

**Parámetros de URL:**

| Parámetro | Descripción        |
|-----------|--------------------|
| cid       | ID del carrito     |
| pid       | ID del producto    |

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "quantity": 2
}
```

**Campos del Body:**

| Campo    | Tipo   | Requerido | Descripción                    |
|----------|--------|-----------|--------------------------------|
| quantity | Number | Sí        | Cantidad de productos a agregar |

**Ejemplo de Request:**
```http
POST /api/carts/507f1f77bcf86cd799439022/product/507f1f77bcf86cd799439011
```

**Respuesta Exitosa (200 OK):**
```json
{
  "status": "success",
  "payload": {
    "_id": "507f1f77bcf86cd799439022",
    "products": [
      {
        "product": "507f1f77bcf86cd799439011",
        "quantity": 2,
        "_id": "507f1f77bcf86cd799439033"
      }
    ],
    "createdAt": "2026-01-13T10:30:00.000Z",
    "updatedAt": "2026-01-13T10:35:00.000Z"
  }
}
```

**Respuesta de Error (404) - Producto no encontrado:**
```json
{
  "status": "error",
  "message": "Producto no encontrado"
}
```

**Respuesta de Error (404) - Carrito no encontrado:**
```json
{
  "status": "error",
  "message": "Carrito no encontrado"
}
```

**Respuesta de Error (500):**
```json
{
  "status": "error",
  "message": "Error al agregar producto al carrito"
}
```

---

### 3. Obtener productos del carrito

Obtiene todos los productos de un carrito específico con información poblada.

**Endpoint:** `GET /api/carts/:cid`

**Parámetros de URL:**

| Parámetro | Descripción        |
|-----------|--------------------|
| cid       | ID del carrito     |

**Ejemplo de Request:**
```http
GET /api/carts/507f1f77bcf86cd799439022
```

**Respuesta Exitosa (200 OK):**
```json
{
  "status": "success",
  "payload": [
    {
      "product": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Zapatillas Nike Air Max",
        "description": "Zapatillas deportivas de alta calidad",
        "code": "NIKE001",
        "price": 15999.99,
        "category": "Calzados",
        "thumbnails": "nike-air-max.jpg",
        "stock": 25,
        "status": true
      },
      "quantity": 2,
      "_id": "507f1f77bcf86cd799439033"
    }
  ]
}
```

**Respuesta de Error (404):**
```json
{
  "status": "error",
  "message": "Carrito no encontrado"
}
```

**Respuesta de Error (500):**
```json
{
  "status": "error",
  "message": "Error al obtener productos del carrito"
}
```

---

## Modelos de Datos

### Modelo de Producto

```javascript
{
  _id: ObjectId,
  title: String,        // 5-100 caracteres, requerido
  description: String,  // 10-500 caracteres, requerido
  code: String,         // Único, mayúsculas, requerido
  price: Number,        // Mínimo 0, requerido
  category: String,     // "Calzados" | "Indumentaria" | "Accesorios", requerido
  thumbnails: String,   // Default: "product.jpg"
  stock: Number,        // Mínimo 0, requerido
  status: Boolean       // Default: true
}
```

**Índices:**
- `title`: índice de texto
- `code`: índice único
- `category`: índice
- `price`: índice

---

### Modelo de Carrito

```javascript
{
  _id: ObjectId,
  products: [
    {
      product: ObjectId,  // Referencia a ProductModel
      quantity: Number,
      _id: ObjectId
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Códigos de Estado

| Código | Descripción                                    |
|--------|------------------------------------------------|
| 200    | OK - Solicitud exitosa                         |
| 201    | Created - Recurso creado exitosamente          |
| 404    | Not Found - Recurso no encontrado              |
| 500    | Internal Server Error - Error del servidor     |

---

## Formato de Respuestas

### Respuesta Exitosa Estándar

```json
{
  "status": "success",
  "payload": { /* datos solicitados */ }
}
```

### Respuesta de Error Estándar

```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

### Respuesta de Paginación (GET /api/products)

```json
{
  "status": "success",
  "payload": [ /* array de productos */ ],
  "totalPages": Number,
  "prevPage": Number | null,
  "nextPage": Number | null,
  "page": Number,
  "hasPrevPage": Boolean,
  "hasNextPage": Boolean,
  "prevLink": String | null,
  "nextLink": String | null
}
```

---

## Categorías Permitidas

- **Calzados**
- **Indumentaria**
- **Accesorios**

---

## Notas Adicionales

### Paginación
- El sistema utiliza `mongoose-paginate-v2` para manejar la paginación
- Los valores por defecto son: `limit=8` y `page=1`
- Los links de navegación se generan automáticamente con la URL completa

### Validaciones
- Todos los códigos de productos se convierten automáticamente a mayúsculas
- Los espacios en blanco se eliminan de los campos con `trim: true`
- Se recomienda implementar validación con la librería **zod** antes de crear productos


### Referencias
- Los carritos utilizan referencias de MongoDB para vincular productos
- Al obtener productos del carrito, se utiliza `.populate()` para obtener la información completa del producto

---

## Ejemplos de Uso

### Flujo completo: Crear carrito y agregar productos

```javascript
// 1. Crear un carrito
POST /api/carts
Response: { status: "success", payload: { _id: "abc123", products: [] } }

// 2. Agregar un producto al carrito
POST /api/carts/abc123/product/prod456
Body: { "quantity": 2 }
Response: { status: "success", payload: { _id: "abc123", products: [...] } }

// 3. Obtener productos del carrito
GET /api/carts/abc123
Response: { status: "success", payload: [ /* productos completos */ ] }
```

### Flujo completo: Gestión de productos

```javascript
// 1. Listar productos con paginación
GET /api/products?limit=5&page=1

// 2. Crear un nuevo producto
POST /api/products
Body: { title: "...", description: "...", code: "...", price: 999, ... }

// 3. Actualizar el precio
PUT /api/products/prod456
Body: { price: 1299 }

// 4. Eliminar producto
DELETE /api/products/prod456
```

---

**Última actualización:** 13 de enero de 2026  
**Versión de la documentación:** 1.0.0
