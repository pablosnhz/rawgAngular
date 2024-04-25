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

CATEGORIA POR GENRES, REUTILIZACION DE SUBRUTAS
el simplechanges detecta los cambios del input, se refrescan los datos siempre y cuando haya cambios, aunque tambien estoy viendo el uso de reuseStrategy. porque esto? tengo el problema al iterar sobre los generos que toma las rutas las cuales cambian e incluso se plasma en pantalla el override del titulo pero no el componente por generos, sabiendo que por id podemos navegar por ellos porque no es que pasamos de id a id directamente sino que tenemos que volver a otra ruta para cargar el nuevo id pero en cambio al iterar sobre los genres de manera que pasamos directamente de uno a otro no refleja esos cambios, tengo dos opciones para manejar esto y funcione bien, por medio del ngonchanges o por el uso del reuseStrategy. El cual hice uso del mismo aplicando el reuseStrategy mediante un provide para aplicarlo en la ruta con un data y asi aplicar la actualizacion hacia la reutilizacion.

Aplicamos el initializer para agregar dentro del modulo principal el initializer y la funcion que va a tomar los datos del servicio para que cargue primero los datos y luego lo que veria reflejado en pantalla.

LOGIN Y PROFILE
Para empezar vinculamos los dos componentes para hacer uso del lazyloading con las routes, solucione un tema que tenia con las rutas con el redirect, para solucionarlo en la ruta main agregue en redirect dentro del auth donde defino tambien el lazyloading.
Para el diseño me base me oriente con el original y para el sistema de login crees dos funciones una para iniciar el form por medio de un formGroup con sus parametros y validatores, la otra funcion para controlar errores, en el caso de que todo pase bien recibe por consola el submit de que todo corre bien.
Para los formularios de usuarios cree tanto la interface como la funcion la cual almaneca los datos dentro del sessionStorage y si se "recuerda la contraseña" se va a guardar en la localStorage, como tambien dos servicios uno para el login con los parametros de usuarios, que con este mismo luego vamos a recuperar el nombre del usuario para mostrarlo por pantalla y el otro donde se van a setear los datos para el almacenamiento en storage como tambien para el logout y limpiar los campos una vez el usuario decida cerrar la sesion, aplicamos un initializer aca tambien para asegurar de que el usuario sea valido para luego mostrar los datos.
Generamos los redirects y los guards para asegurar las rutas y poder navegar sobre ellas siempre y cuando el user este loggeado.

El profile comparte los componentes del asideBar y del topBar tal como los componentes heredados, para no vincular de cierta forma el sistema de login con toda la logica en el mismo componente padre heredado, lo hice por separado del componente heredado y vinculando el sistema del profile para compartir el aside y el topbar en el route principal incluyendole el guard, teniendo asi separado el componente heredado, del sistema de login con el profile.

Con esto ya podemos navegar por la rutas siempre y cuando el usuario este registrado, en el caso de no estarlo con el guard le negamos el acceso y nos redirecciona a la pantalla principal pero sin ningun usuario loggeado.
