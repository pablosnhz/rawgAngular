# Rawg

# Resumen

Inicie con la aplicacion haciendo uso de la estructura de la misma con carpetas divididas lo que nos va a dar margen para el uso Componentes compartidos, Signals, Interceptor , Peticiones HTTP, las Routes con LazyLoading, uso de Pipes, Modulos, el service que trae la informacion como tambien el Interceptor que nos hace la autenticacion para acceder a los datos y mostrarlos en pantalla sin olvidarnos de la Interface para los datos, para el diseño estoy utilizando Tailwind y para el flujo de datos rxJS.

# Explicacion

Para empezar genere las carpetas para tener un mejor orden genere dos servicios para empezar el auto destroy para no estar especificandolo cada vez que lo necesito sino que lo genere un servicio el cual se encarga del mismo una vez el alguna peticion de no se use mas.
Despues el service principal, dentro del enviroment declare tanto la apikey como la url de la api, sabiendo los datos que iba a devolver de tipo SearchResult en base a eso cree la interface para traer los datos de 'Games'.

Hice uso del signal para tomar los datos del servicio, el cual al signal llame $games, lo recibo donde me suscribi para asi usarlo mediante un JsonPipe y asi mostrar los datos por el template.

Para realizar la autenticacion y asi poder acceder a los datos lo hice por medio de un Interceptor donde hice la clonacion y sin cambiar nada agregue a key para tener acceso a los datos.

Defini las rutas con lazyLoading component para que se llamen unicamente cuando se hagan uso de los mismos.

Para hacer la busqueda filtrada la hice con un behaviorSubject el cual recibe el valor del input y trayendo los datos asi mostrar los resultados de una vez llamados por el input. Para hacer la busqueda para las cards lo hice por su ID mediante el uso de un Resolver definido en las routes como un resolve y asi un ActivatedRoute que me tome el resolve 'game' que hice uso en el route, para asi en el gameCard al seleccionar un juego me mandaba a su Detail por ID.

Herencia de componentes por medio del super para amplificar la logica, como tambien los template, esto lo hicimos por medio del super vinculando la clase padre del template en los otros para simplificar la logica y hacer las busquedas por filtro ya sea de la pagina principal que al hacer la busqueda va a devolver los juegos del momento mientras que si hacemos la busqueda por allgames va a traer todos los juegos del title que pongamos.
De que forma generamos esto, definimos dentro del interface un filtro para todas las busquedas, ya sea search, title, page size, ordering y metacritic para hacer las busquedas llevando el override del searchGames a los templates que vinculamos mediante el template y el override, sin olvidarnos que tanto en en los components que realizan busqueda usamos el extends del abstract.
