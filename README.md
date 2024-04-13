# Rawg

# Resumen

Inicie con la aplicacion haciendo el uso de carpetas divididas para una mejor estructura lo que nos va a dar margen para el uso de compartir logica como tambien el compartir componentes, tambien voy a estar usando Signals, Interceptor , Peticiones HTTP, las Rutas aplicando LazyLoading, Herencia de componentes con un componente abstracto, uso de Pipes, Modulos, el service que trae la informacion como tambien el Interceptor que nos hace la autenticacion para acceder a los datos y mostrarlos en pantalla sin olvidarnos de la Interface para los datos, para el diseño estoy utilizando Tailwind y para el flujo de datos RxJS.

# Explicacion

ESTRUCTURA
Para empezar genere las carpetas para tener un mejor orden, genere dos servicios para empezar el auto destroy para no estar especificandolo cada vez que lo necesito sino que lo genere en un servicio el cual se encarga del mismo aplicandolo con takeUntil para evitar fugas de memoria.
Despues el service principal, dentro del enviroment declare tanto la apikey como la url de la api, sabiendo los datos que iba a devolver de tipo SearchResult en base a eso cree la interface para traer los datos de 'Games'.

SIGNALS
Hice uso del signal para tomar los datos del servicio, el cual al signal llame $games, lo recibo donde me suscribi para asi usarlo mediante un JsonPipe y asi mostrar los datos por el template, detectando asi las actualizacion y cambios relevantas.

USO DE INTERCEPTOR
Para realizar la autenticacion y asi poder acceder a los datos lo hice por medio de un Interceptor donde hice la clonacion pasando los parametros y sin cambiar nada agregue a key para tener acceso a los datos.

LAZY LOADING EN ROUTES
Defini las rutas con lazyLoading para que se llamen unicamente cuando se hagan uso de los mismos.

GAMES DETAILS POR ID
Para hacer la busqueda filtrada la hice con un behaviorSubject el cual recibe el valor del input trayendo los datos, asi mostrar los resultados de una vez llamados por el input. Para hacer la busqueda para las cards lo hice por su ID mediante el uso de un Resolver definido en las routes como un resolve y asi un ActivatedRoute que me tome el resolve 'game' que hice uso en el route, para asi en el gameCard al seleccionar un juego me mandaba a su Detail por ID.
Para hacer el buscador, emitimos un observable cada vez que se tipea tiene un debounce de 500, emite y el padre, la clase abstracta hicimos la suscripcion, se hace un switchMap y se lanza la suscripcion de busqueda.

COMPONENTE ABSTRACTO CON HERENCIA
Herencia de componentes por medio del super para amplificar la logica, como tambien los template, esto lo hicimos por medio del super vinculando la clase padre del template en los otros para simplificar la logica y hacer las busquedas por filtro ya sea de la pagina principal que al hacer la busqueda va a devolver los juegos del momento mientras que si hacemos la busqueda por allgames va a traer todos los juegos del title que pongamos.
De que forma generamos esto, definimos dentro del interface un filtro para todas las busquedas, ya sea search, title, page size, ordering y metacritic para hacer las busquedas llevando el override del searchGames a los templates que vinculamos mediante el template y el override, sin olvidar que en los components que realizan busqueda usamos el extends del abstract.

BUSQUEDA FILTRADA EN UN SELECT
Para las busquedas por filtros en el orderBy del select lo hice mediante un ReactiveForm, el cual dentro de una funcion en el group que declare el 'ordering', este ordering lo tomamos del interface de filtros, el cual esta funcion va a estar iniciada dentro del onInit, iniciado con el form: formGroup en el ts para vinculardo en el template para el formGroup y para el controlName pasamos lo que buscaria el ordering... como tambien la funcion para subscribirnos a los cambios del form el cual vamos a detectar si llegan los inputs del select 'ordering' por medio de un console, a su vez llamando a esta funcion dentro donde inicie el form Group, para devolver los cambios por filtro, realizamos una funcion el cual va a tener los query como el filters, en el switchMap del searchGames llamamos al searchFilters y nos suscribimos a los resultados devueltos de la primera funcion que nos trae el search por filtros del principio. inicializando estas funciones en el onInit, tambien tuve problemas por el tema de llamado de funciones, no el llamado sino el ordenamiento de las funciones en el onInit. Para finalizar por medio de condicionales le di prioridad a mostrarse el select exclusivamente en el all games donde van a estar las busquedas filtradas por el OrderBy.
Basicamente con esto creamos funciones para las cuales hicimos un form para definir los campos del select con el formChanges, para el cambio de filtros de busqueda el FiltersChange que nos trae los resultados y el queryChanges es para los el input de campo de busqueda.

INFINITE SCROLL
Para el infinite scroll instale el npm con la version actual que uso en Angular, el metodo scroll lo voy a manejar por mi componente abstracto el cual va a tener mediante el next que recibimos por el network que seria el data.next que seteamos en el filtro que nos devuelve el results.

Tuve problemas con el funcionamiento del scroll infinito si bien lo tomaba y todo parecia bien, al navegar entre template se veia reflejados los mismos resultados en los mismos como tambien en consola esperando otros resultados para mostrar, logre acomodarlo separandolo por funciones diferentes por una parte el funcionamiento del scroll y por otro el resultado por pantalla que vienen por filtros.

estuve ajustando temas del responsive agregándole el masonry, como también agregue el infinite scroll, tanto esto como filtros y la query de la búsqueda vienen de un componente abstracto donde comparto lógica especificándole parámetros por medio del override.
