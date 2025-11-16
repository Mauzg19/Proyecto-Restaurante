# Casos de Estudio (Resumen)

Este documento contiene los casos de estudio resumidos para las páginas más importantes del proyecto "Proyecto Restaurante". Se generaron a partir del código fuente del frontend y de la plantilla de caso de uso / casos de prueba que proporcionaste.

---

## CU001 — Home (Página principal / Búsqueda)

- Código: CU001
- Nombre: Home — Página principal / Búsqueda
- Actor: Cliente (usuario no autenticado / autenticado)

Descripción del caso de uso:

Permitir al usuario explorar restaurantes, buscar por ciudad/servicio y navegar a la página de un restaurante para ver su menú.

Precondiciones:

- El backend responde a las APIs de restaurantes.
- Catálogo de restaurantes poblado.
- Si el usuario está logueado, existe `jwt` en `localStorage` (opcional).

Flujo de eventos (principal):

1. El usuario abre la aplicación en `/` (Home).
2. El sistema carga lista de restaurantes mediante `getAllRestaurantsAction`.
3. El sistema muestra tarjetas de restaurantes con nombre, ciudad, categoría y mini-imagen.
4. Usuario utiliza el buscador o filtros.
5. El sistema filtra la lista según la búsqueda.
6. Usuario selecciona una tarjeta de restaurante.
7. El sistema navega a `/restaurant/:city/:title/:id`.
8. El sistema carga la página del restaurante (ver CU002).

Flujo excepcional:

- No hay restaurantes disponibles: mostrar mensaje "No hay restaurantes".
- Error en la API: mostrar notificación de error y permitir reintento.

Caso de prueba principal (Ciclo 1 — condiciones normales):

- Descripción: Verificar que la búsqueda y navegación a restaurante funcionan.
- Precondiciones: Backend accesible; datos en DB.
- Pasos:
  1. Abrir `/`.
  2. Introducir término de búsqueda y pulsar buscar.
  3. Seleccionar una tarjeta de restaurante resultante.
- Resultados esperados:
  - Se muestra lista filtrada correctamente.
  - Al seleccionar, se navega a la página del restaurante y aparecen sus datos.

Referencias en el repo:

- `frontend-react/src/customers/pages/Home` (HomePage)
- `frontend-react/src/Routers/CustomerRoutes.jsx`
- `frontend-react/src/App.js`

---

## CU002 — Restaurant / Menú (página de pedido)

- Código: CU002
- Nombre: Restaurant — Página de Menú y detalles
- Actor: Cliente (usuario no autenticado / autenticado)

Descripción del caso de uso:

Mostrar detalles del restaurante (imágenes, dirección, horario), listar items del menú y permitir filtrar por tipo/categoría para añadir productos al carrito.

Precondiciones:

- Restaurante con `id` existe en la base de datos.
- API de `getRestaurantById`, `getMenuItemsByRestaurantId` y `getRestaurantsCategory` funcionando.
- Si el usuario está autenticado, `jwt` disponible.

Flujo de eventos (principal):

1. Usuario navega a `/restaurant/:city/:title/:id`.
2. El sistema obtiene `id` de la ruta y ejecuta las acciones Redux para restaurante y menú.
3. El sistema muestra galería de imágenes, nombre, descripción, dirección, horario, filtros y lista de `MenuItemCard`.
4. Usuario aplica filtros (se actualiza query string).
5. El sistema actualiza los items mostrados.
6. Usuario añade un `MenuItemCard` al carrito.
7. Usuario va a `/cart` para revisar pedido.

Flujo excepcional:

- Restaurante no existe: mostrar mensaje y redirigir a Home.
- No hay items para los filtros: mostrar mensaje "No hay productos".

Caso de prueba principal:

- Descripción: Verificar carga del restaurante, funcionamiento de filtros y añadir al carrito.
- Precondiciones: API OK; restaurante con items.
- Pasos:
  1. Abrir `/restaurant/.../:id`.
  2. Confirmar que se muestran imágenes y datos.
  3. Aplicar filtro `Vegetarian`.
  4. Añadir 1 item al carrito.
- Resultados esperados:
  - Items se filtran correctamente.
  - Mensaje confirma adición al carrito.

Referencias en el repo:

- `frontend-react/src/customers/pages/Restaurant/Restaurant.jsx`
- `frontend-react/src/customers/components/MenuItem/MenuItemCard.jsx`
- `frontend-react/src/State/Customers/Menu/menu.action.js`

---

## CU003 — Carrito y Checkout

- Código: CU003
- Nombre: Carrito y proceso de pago (Checkout)
- Actor: Cliente autenticado / invitado

Descripción del caso de uso:

Permitir al usuario revisar items añadidos, actualizar cantidades, eliminar items y completar el pago.

Precondiciones:

- Carrito disponible en sesión o en backend.
- Integración con pasarela de pago o simulador.

Flujo de eventos (principal):

1. Usuario navega a `/cart`.
2. El sistema recupera el carrito (`findCart`).
3. Muestra lista de items, totales y opciones editar/eliminar.
4. Usuario procede al pago y se crea la orden.
5. Tras pago exitoso, se muestra `/payment/success/:id`.

Flujo excepcional:

- Carrito vacío: mostrar mensaje y sugerir restaurantes.
- Error en creación de orden/pago: mostrar mensaje y permitir reintento.

Caso de prueba principal:

- Descripción: Verificar que el carrito muestra items y que la creación de orden funciona.
- Precondiciones: Carrito con items; pasarela en modo prueba.
- Pasos:
  1. Abrir `/cart`.
  2. Aumentar cantidad y pulsar Checkout.
  3. Completar pago en simulador.
- Resultados esperados:
  - Totales actualizados correctamente.
  - Orden creada y `payment/success` mostrado.

Referencias en el repo:

- `frontend-react/src/customers/pages/Cart/Cart.jsx`
- `frontend-react/src/State/Customers/Cart/cart.action.js`
- `frontend-react/src/customers/pages/PaymentSuccess/PaymentSuccess.jsx`

---

## CU004 — Perfil de usuario (My Profile)

- Código: CU004
- Nombre: Perfil de usuario — Gestión de cuenta y direcciones
- Actor: Usuario autenticado

Descripción del caso de uso:

Permitir al usuario ver y editar su información, direcciones, ver pedidos y cambiar contraseña.

Precondiciones:

- Usuario autenticado (JWT en `localStorage`).
- Endpoints de usuario funcionales.

Flujo de eventos (principal):

1. Usuario navega a `/my-profile`.
2. El sistema valida JWT y obtiene datos (`getUser`).
3. Muestra información personal, direcciones y órdenes.
4. Usuario edita datos y guarda.

Flujo excepcional:

- JWT inválido/expirado: solicitar re-login.
- Error al actualizar: mostrar mensaje.

Caso de prueba principal:

- Descripción: Editar dirección y verificar persistencia.
- Precondiciones: Usuario logueado.
- Pasos:
  1. Abrir `/my-profile`.
  2. Editar dirección y guardar.
  3. Recargar la página.
- Resultados esperados:
  - Dirección actualizada en UI y DB.

Referencias en el repo:

- `frontend-react/src/customers/pages/Profile/*`
- `frontend-react/src/State/Authentication/*`

---

## CU005 — Admin Dashboard (gestión restaurantes)

- Código: CU005
- Nombre: Admin Dashboard — Gestión de restaurantes
- Actor: Propietario de restaurante (ROLE_RESTAURANT_OWNER)

Descripción del caso de uso:

Interfaz para que el propietario administre su(s) restaurantes, vea métricas y acceda a CRUD de restaurantes y menú.

Precondiciones:

- Usuario autenticado con rol `ROLE_RESTAURANT_OWNER`.
- Backend con endpoints para restauranteros (`getRestaurantByUserId`).

Flujo de eventos (principal):

1. Admin inicia sesión y navega a `/admin/restaurant/*`.
2. Dashboard muestra tarjetas de restaurantes del usuario (`restaurant.usersRestaurant`).
3. Si no hay restaurantes, se ofrece crear uno (`AddRestaurantCard`).
4. Admin puede editar restaurante, subir imágenes (`UploadToCloudnary`) y acceder a Power BI.

Flujo excepcional:

- Usuario sin rol: acceso denegado.
- Error al cargar restaurantes: mostrar mensaje.

Caso de prueba principal:

- Descripción: Verificar que el dashboard muestra restaurantes del usuario.
- Precondiciones: Usuario con rol `ROLE_RESTAURANT_OWNER` y al menos 1 restaurante.
- Pasos:
  1. Login como propietario.
  2. Ir a `/admin/restaurant/`.
- Resultados esperados:
  - Se muestran restaurantes; se puede navegar a secciones de administración.

Referencias en el repo:

- `frontend-react/src/Admin/Dashboard/AdminDashboard.jsx`
- `frontend-react/src/Admin/AddRestaurants/*`
- `frontend-react/src/Admin/utils/UploadToCloudnary.js`

---

## CU006 — Admin Orders (gestión y filtrado de órdenes)

- Código: CU006
- Nombre: Admin Orders — Visualizar y filtrar órdenes del restaurante
- Actor: Propietario de restaurante (ROLE_RESTAURANT_OWNER)

Descripción del caso de uso:

Permitir al admin ver todas las órdenes del restaurante, filtrarlas por estado y revisar detalles.

Precondiciones:

- Usuario autenticado con rol correcto.
- Backend con endpoint `fetchRestaurantsOrder`.

Flujo de eventos (principal):

1. Admin accede a la sección de órdenes.
2. El sistema obtiene órdenes con `fetchRestaurantsOrder({restaurantId, orderStatus, jwt})`.
3. Se muestran filtros de estado; al cambiar, se actualiza `location.search`.

Flujo excepcional:

- No hay órdenes: mostrar mensaje.
- Error en API: mostrar error y permitir reintento.

Caso de prueba principal:

- Descripción: Filtrar órdenes por estado y visualizar tabla.
- Precondiciones: Base de datos con órdenes en distintos estados.
- Pasos:
  1. Abrir la sección de órdenes como admin.
  2. Cambiar filtro a "Pendiente".
- Resultados esperados:
  - Sólo órdenes con estado PENDING se muestran.
  - La URL incluye `?order_status=PENDING`.

Referencias en el repo:

- `frontend-react/src/Admin/Orders/RestaurantsOrder.jsx`
- `frontend-react/src/Admin/Orders/OrderTable.jsx`
- `frontend-react/src/State/Admin/Order/restaurants.order.action.js`

---

### Notas finales

- Archivo generado automáticamente a partir del análisis del frontend y de la plantilla de casos de prueba proporcionada por el usuario.
- Siguientes pasos sugeridos: revisión por el autor para ajustar pasos, añadir casos de prueba adicionales o exportar a PDF.
