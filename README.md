# Rawg

Haciendo uso de Signals, RxJS, Interceptors, Tailwind, Pipes, LazyLoading, Peticiones HTTP,

Para empezar genere las carpetas para tener un mejor orden genere dos servicios para empezar el auto destroy para no estar especificandolo cada vez que lo necesito sino que lo genere un servicio el cual se encarga del mismo una vez el alguna peticion de no se use mas.
Despues el service principal, dentro del enviroment declare tanto la apikey como la url de la api, sabiendo los datos que iba a devolver de tipo SearchResult en base a eso cree la interface para traer los datos de 'Games'.

Hice uso del signal para tomar los datos del servicio, el cual al signal llame $games, lo recibo donde me suscribi para asi usarlo mediante un JsonPipe y asi mostrar los datos por el template.

Para realizar la autenticacion y asi poder acceder a los datos lo hice mediante un Interceptor donde mediante la clonacion y sin cambiar nada agregue a key para tener acceso a los datos.

Defini las rutas por medio de lazyLoading component para que se llamen unicamente cuando se hagan uso de los mismos.
