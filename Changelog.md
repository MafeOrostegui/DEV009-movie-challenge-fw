# Changelog

## 1.1.1 - 2023-10-25

### Sprint learnings

* Aprendí a usar Output.
* Aprendí de EventEmitte.
* Aprendí a usar RealTime Database y Firestore con Angular.
* Aprendí a implementar un searchBar que se activa en cuanto escribe el usuario 3 carácteres o más.

### Added

* Componente de searchBar, searchResults, categoryCards, categoryResults.
* Servicio para guardar la búsqueda y mantenerla hasta que el usuario decida borrarla.
* Petición para obtener la base de datos que creé.
* Componente Libreria para mostrar las listas del usuario.
* Servicio Firestore para añadir elementos a las colecciones del usuario y para mostrarlas.

### Changed

* No se cambión nada que ya tuviese antes.

### Fixed

*  Tenía problemas con unas tarjetas que creé para mostrar los diferentes generos, al final la mejor opción fue usar Realtime Database.

### Removed

No removí ningún componente.

### Commit Log

* modified search results type
* SEARCH PAGE DETAILS
* Implement search service enhancements, search input history, and user experience improvements for filters
* incorporation of gender name to improve user experience
* Fetching Images for Genres in Realtime Database
* Add new feature for category management
* Categories component with style improvements
* Changes services Firestore
* Category cards component modification


## 1.1.0 - 2023-10-17

### Sprint learnings

* Aprendí a usar mejor ngClass.
* Aprendí de la función goBack.
* Aprendí de activated route, some y NavigationEnd.
* Aprendí de OnChanges para rastrear cambios en el id de la película y así poder mostrar una nueva película.

### Added

* Componente de perfil.
* Componente de dropdown para el usuario y acceder a su cuenta.
* Petición para acceder a los detalles de las peliculas y su respectivo componente, tanto de la tarjeta movie como la página donde se visualiza.
* Petición para las imágenes que la Api provee de cada pelicula y así mejorar la interfaz en cuanto al diseño.
* Componente del botón para volver atrás luego de que el usuario ingresa a los detalles de una pelicula.

### Changed

* Se modularizó más el componente de header, el componente de menu y se separaron botones para usar su funcionalidad en otras rutas. 

### Fixed

* Descubrí que funcionalidades cómo la de salir de sesión era usado en 2 lugares de la app, por lo cual tuvo que modularizarse; además ocurrieron errores en la configuración inicial de firebase por lo cuál se estudió y finalmente se actualizó a le versión pertinente. 

### Removed

* No removí ningún componente, ni tampoco las páginas ya existentes.

### Commit Log

* Style Profile
* Create profile module and refactor sign-out button function
* Back button style
* Style Header
* Style Header
* Add icon User
* Style Header
* Style header
* Style Menu
* Add feature
* Refactor
* Creation of back button component and logic to make it visible
* Refactor component menu and navbar
* Services
* Component NavBar
* Services
* Authentication Services and Logic Update for Header to Change When User is Logged In
* Style Movie Info
* Movie info component design update
* Style Movie Info
* Enhanced movie component detail visualization
* Style Movie Info

## 1.0.1 - 2023-10-10

### Sprint learnings

* Aprendí a crear un formulario reactivo.
* Aprendí a configurar el proyecto para usar Firebase.
* Aprendí a reutilizar el formulario.

### Added

* Configuré el formulario para poder reutilizarlo tanto en el formulario de login como de sign Up.
* Realicé las peticiones para usar los servicios de Firebase.
* Creé una directiva para poder manejar un requisito de la autenticación.
* Creé un componente Home.

### Changed

* Cambié la lógica del formulario un par de veces.

### Fixed

* No 

### Removed

* Removí el componente de landing page mobile

### Commit Log

* Refactoring of movie request and movie component to allow filtering by genre.
* Menu Component
* Add dynamic styling to Movies component using ngClass
* Modularization of Movies and Creation of 
* Movie Interface
* Incorporated header component reuse in multiple sections of the application
* Added error component and updated authentication component
* Add authentication function
* Firebase configuration for authentication, login implementation, and creating an account with Firebase. Directive to confirm password

## 1.0.0 - 2023-10-04

### Sprint learnings

* Aprendí a crear componentes.
* Aprendí a realizar solicitudes con Angular.
* Aprendí del uso de los estilos con Tailwind y SCSS.

### Added

* Configuré las rutas para mostrar otro landing page en caso de que sea visitada la app desde una pantalla superior a los 611px de ancho.
* Realicé la petición de las peliculas más populares.
* Usé Tailwind para parte de los estilos de las peliculas y también del video que visualiza algunas de ellas.

### Changed

* Cambié parte del diseño del componente Landing page para desktop.

### Fixed

* No 

### Removed

* No removí ningún componente.

### Commit Log

* Create the landing page with an appealing design diplaying complete
* Creation of landing page for mobile and desktop version, with some styles. Creation of the service folder.
* Changelog update 
* Initial Setup 
