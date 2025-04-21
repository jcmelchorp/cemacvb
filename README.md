# CEMAC VB

CEMAC VB es una aplicación web diseñada como un sitio de información y una plataforma de gestión para el proceso de inscripción de nuevos socios del **CEMAC (Club de Exploraciones de México) Veracruz-Boca del Río A.C.**.

## Descripción

La aplicación tiene como objetivo facilitar la inscripción de nuevos socios, proporcionando una interfaz intuitiva y eficiente para gestionar los datos de los miembros. Además, sirve como un portal informativo para los interesados en unirse al club.

### Características principales:
- **Gestión de inscripciones:** Registro y administración de nuevos socios.
- **Autenticación segura:** Implementada con Firebase Authentication.
- **Base de datos en tiempo real:** Utiliza Firestore para almacenar y sincronizar datos.
- **Estado global:** Manejo del estado de la aplicación con NgRx.
- **Interfaz moderna:** Construida con Angular 17 para una experiencia de usuario fluida y responsiva.

## Tecnologías utilizadas

- **Angular 17:** Framework principal para el desarrollo de la interfaz de usuario.
- **Firebase:**
  - **Authentication:** Para la gestión de usuarios y sesiones.
  - **Firestore:** Base de datos NoSQL para almacenamiento de datos.
- **NgRx:** Para la gestión del estado global de la aplicación.

## Implementación demo

Puedes explorar una implementación demo de la aplicación en el siguiente enlace:  
[https://cemacvb.web.app](https://cemacvb.web.app)

### Vista previa

#### Página de inicio
![Vista previa de la página de inicio](https://via.placeholder.com/800x400?text=Vista+de+Inicio)

#### Formulario de inscripción
![Vista previa del formulario de inscripción](https://via.placeholder.com/800x400?text=Formulario+de+Inscripción)

#### Panel de administración
![Vista previa del panel de administración](https://via.placeholder.com/800x400?text=Panel+de+Administración)

## Instalación y configuración

Sigue estos pasos para ejecutar el proyecto localmente:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/cemacvb.git
   cd cemacvb
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura Firebase:
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
   - Habilita **Authentication** y configura Firestore.
   - Descarga el archivo `firebaseConfig` y colócalo en el proyecto.

4. Ejecuta la aplicación:
   ```bash
   ng serve
   ```

5. Accede a la aplicación en tu navegador:
   ```
   http://localhost:4200
   ```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---
Desarrollado con ❤️ por el equipo de CEMAC VB.
