// ===== DATOS EDITABLES: conceptos, preguntas (árbol) y resultados =====
const CONCEPTOS = {
  esq: "Esquema rígido vs. flexible", acid: "ACID vs. BASE", join: "JOIN vs. referencias e incrustación",
  norm: "Normalización vs. desnormalización", ref: "Integridad referencial", esc: "Escalabilidad vertical vs. horizontal",
  rep: "Replicación vs. particionamiento", cons: "Consistencia fuerte vs. eventual", cap: "CAP: disponibilidad",
  lat: "PACELC: latencia", clave: "Consultas relacionales vs. acceso por clave"
};

// Cada pregunta: c = concepto del informe, q = pregunta, h = ayuda, o = [texto, ejemplo, siguiente]
// "siguiente" es otra pregunta o un resultado (clave de RES).
const P = {
 q1:{c:"esq",q:"¿Cómo son los datos que vas a guardar?",h:"Piensa en lo que más se parece a tu proyecto.",o:[
  ["Muy ordenados, siempre con los mismos campos","Una factura, una ficha de empleado","sA"],
  ["Cada registro puede traer datos distintos","Productos: un celular y una polera no comparten características","dA"],
  ["Lo importante son las conexiones entre las cosas","Amigos de amigos, rutas, recomendaciones","gA"],
  ["Datos simples que busco por un nombre o código","Sesión de usuario, contador de visitas, carrito","kA"],
  ["Eventos que llegan sin parar, en cantidades enormes","Sensores, registros de actividad, historial","wA"]]},

 // ---- Datos ordenados
 sA:{c:"acid",q:"Si un dato queda mal aunque sea un instante, ¿qué tan grave es?",h:"Los sistemas ACID garantizan que todo se guarde completo o nada.",o:[
  ["Muy grave: hay dinero, stock o reservas de por medio","Una transferencia bancaria","sB"],
  ["No es grave, puede tardar unos segundos en actualizarse","Contador de «me gusta»","sC"]]},
 sB:{c:"join",q:"¿Necesitarás cruzar mucha información con consultas que cambian todo el tiempo?",h:"Los JOIN combinan tablas al momento de consultar.",o:[
  ["Sí, reportes variados que no sé de antemano","Clientes con pedidos, pagos y productos","sD"],
  ["No, siempre pediré lo mismo","Siempre «los pedidos de este cliente»","sE"]]},
 sD:{c:"ref",q:"¿Quieres que la propia base impida relaciones inválidas?",h:"Integridad referencial: no existir un pedido sin cliente.",o:[
  ["Sí, que la base me proteja de errores","Una reserva de un vuelo que no existe","sF"],
  ["No, mi aplicación se encarga de eso","Yo valido en el código","sE"]]},
 sF:{c:"esc",q:"¿Cómo crecerá tu sistema?",h:"Vertical: un servidor más potente. Horizontal: más servidores.",o:[
  ["Un servidor potente con copias de respaldo me alcanza","Una empresa con miles de usuarios","SQL"],
  ["Muchísimos usuarios, necesito repartirlo en varios servidores","Una app masiva","sG"]]},
 sG:{c:"rep",q:"¿Los datos de cada usuario pueden vivir separados de los demás?",h:"Para repartir (sharding) hace falta una buena clave de reparto.",o:[
  ["Sí, cada usuario es independiente","Cada cuenta tiene sus propios datos","DynamoDB"],
  ["No, todo se cruza con todo","Reportes globales","SQL"]]},
 sE:{c:"clave",q:"¿Tus consultas serán siempre las mismas y las conoces de antemano?",h:"Si son fijas, se pueden diseñar para ir directo a los datos.",o:[
  ["Sí, son fijas y conocidas","Buscar por ID de pedido","sH"],
  ["No, irán apareciendo nuevas","Preguntas nuevas del negocio","sF"]]},
 sH:{c:"esc",q:"¿Tendrás tantos usuarios que un solo servidor no alcance?",h:"La escalabilidad horizontal reparte datos y solicitudes.",o:[
  ["No, uno basta","Negocio local","SQL"],
  ["Sí, muchos usuarios en varios servidores","Millones de pedidos","sI"]]},
 sI:{c:"rep",q:"¿Quién administrará los servidores?",h:"Un servicio administrado reduce el trabajo operativo.",o:[
  ["Prefiero que lo administre la nube","Sin mantener servidores","DynamoDB"],
  ["Yo administro mi propia infraestructura","Servidores propios","MongoDB"]]},
 sC:{c:"clave",q:"¿Siempre pedirás los datos por un código, o harás búsquedas variadas?",h:"Acceso por clave vs. consultas relacionales.",o:[
  ["Búsquedas variadas combinando información","Filtrar por fecha, cliente y producto","sJ"],
  ["Siempre por código o identificador","Buscar por ID","sK"]]},
 sJ:{c:"esq",q:"¿La estructura de tus datos cambiará mucho con el tiempo?",h:"Un esquema flexible se adapta sin migraciones.",o:[
  ["No, será estable","Los mismos campos siempre","SQL"],
  ["Sí, irán apareciendo campos nuevos","Un producto nuevo trae atributos nuevos","MongoDB"]]},
 sK:{c:"esc",q:"¿Cuántos usuarios esperas?",h:"Decide entre un servidor o varios trabajando juntos.",o:[
  ["Pocos o moderados","Una app interna","SQL"],
  ["Muchísimos, en varios servidores","Una app masiva","sL"]]},
 sL:{c:"rep",q:"¿Quién administrará los servidores?",h:"Administrado por la nube o por ti.",o:[
  ["La nube","Sin administrar servidores","DynamoDB"],
  ["Yo mismo","Infraestructura propia","sM"]]},
 sM:{c:"norm",q:"¿Escribirás datos sin parar, en cantidades enormes?",h:"Cassandra se diseña según las consultas y duplica datos.",o:[
  ["Sí, millones de escrituras","Registros continuos","Cassandra"],
  ["No, más bien lecturas y datos organizados","Catálogo","MongoDB"]]},

 // ---- Documentos
 dA:{c:"join",q:"¿Cómo se leerán esos datos?",h:"Incrustar guarda todo junto; referenciar guarda un identificador.",o:[
  ["Todo junto, como un paquete completo","Un pedido con sus productos dentro","dB"],
  ["Datos compartidos por muchos y que cambian seguido","El mismo cliente en millones de pedidos","dC"]]},
 dB:{c:"norm",q:"¿Aceptas repetir información si eso hace las lecturas más rápidas?",h:"Desnormalizar duplica datos a cambio de velocidad.",o:[
  ["Sí, prefiero rapidez al leer","Guardar el precio del día de la compra","dD"],
  ["No, quiero una sola copia de cada dato","Evitar duplicados","dC"]]},
 dC:{c:"ref",q:"¿Necesitas que la base vigile las relaciones y haga reportes cruzados?",h:"Los JOIN y las claves foráneas son terreno de SQL.",o:[
  ["Sí, relaciones vigiladas y reportes variados","Contabilidad","sD"],
  ["No, puedo manejarlo desde mi aplicación","Relaciones simples","dD"]]},
 dD:{c:"rep",q:"¿Tus usuarios deben poder trabajar sin internet y sincronizar después?",h:"Replicación bidireccional entre dispositivos y servidor.",o:[
  ["Sí, trabajar sin conexión y sincronizar","App de campo","CouchDB"],
  ["No, siempre estarán conectados","App web normal","dE"]]},
 dE:{c:"esc",q:"¿Cuánto crecerá tu sistema?",h:"Piensa en usuarios y volumen de datos.",o:[
  ["Mucho, necesito repartirlo en varios servidores","Millones de usuarios","dF"],
  ["Moderado","Miles de usuarios","dG"]]},
 dF:{c:"rep",q:"¿Quién administrará los servidores?",h:"Servicio administrado vs. infraestructura propia.",o:[
  ["Que lo administre la nube, accediendo por clave","Sin servidores propios","DynamoDB"],
  ["Yo, con consultas más variadas","Infraestructura propia","MongoDB"]]},
 dG:{c:"cons",q:"¿Qué prefieres para tus datos?",h:"Consistencia fuerte: siempre al día. Eventual: puede tardar un poco.",o:[
  ["Siempre actualizados, con todo-o-nada al guardar","Inventario de tienda","MongoDB"],
  ["Pueden tardar en sincronizar entre copias","Notas, contenido","CouchDB"]]},

 // ---- Grafos
 gA:{c:"join",q:"¿Cuántos «saltos» de conexión necesitas recorrer?",h:"Muchos JOIN seguidos se vuelven pesados; los grafos recorren directo.",o:[
  ["Varios niveles: amigos de amigos, rutas","¿Quién conoce a quién?","gB"],
  ["Solo un nivel","Un cliente y sus pedidos","gC"]]},
 gB:{c:"clave",q:"¿Qué quieres obtener de esas conexiones?",h:"Recorrer relaciones es el fuerte de los grafos.",o:[
  ["Recomendaciones, detectar fraude, rutas, redes","«Quizá conozcas a…»","gE"],
  ["Solo guardar y mostrar listas","Lista de contactos","gC"],
  ["Detectar fraude o conexiones ocultas","Cuentas relacionadas entre sí","gD"]]},
 gE:{c:"lat",q:"¿Las respuestas deben llegar mientras el usuario espera?",h:"Latencia: tiempo entre pedir y recibir.",o:[
  ["Sí, en tiempo real","Recomendar mientras navega","gD"],
  ["No, es análisis ocasional","Un informe mensual","SQL"]]},
 gD:{c:"esc",q:"¿Qué es más importante para ti?",h:"Los grafos destacan en conexiones, no en repartir datos masivamente.",o:[
  ["Entender y explorar las conexiones","Análisis de redes","Neo4j"],
  ["Repartir enormes volúmenes sin que nunca se caiga","Registros masivos","Cassandra"]]},
 gC:{c:"esq",q:"¿Tus datos son ordenados, con relaciones simples?",h:"Si no hay recorridos complejos, no hace falta un grafo.",o:[
  ["Sí, ordenados y simples","Clientes y pedidos","sB"],
  ["No, son variables","Contenido mixto","dB"]]},

 // ---- Clave-valor
 kA:{c:"clave",q:"¿Cuánto tiempo deben vivir esos datos?",h:"Temporal: se pueden recalcular. Permanente: no deben perderse.",o:[
  ["Temporales","Sesiones, caché","kB"],
  ["Permanentes","Perfil, carrito, progreso","kC"]]},
 kB:{c:"lat",q:"¿Qué tan rápida debe ser la respuesta?",h:"Redis vive en memoria RAM.",o:[
  ["Casi instantánea, en milisegundos","Tabla de posiciones","kD"],
  ["Muestro resúmenes ya preparados para no recalcular","Resumen de un perfil","kE"],
  ["Una velocidad normal me sirve","Página común","kC"]]},
 kD:{c:"esc",q:"¿Todos esos datos caben en la memoria de uno o pocos servidores?",h:"Escalar verticalmente: más RAM en el servidor.",o:[
  ["Sí","Sesiones activas","kE"],
  ["No, son enormes","Terabytes","kC"]]},
 kE:{c:"cons",q:"Si se cae el servidor, ¿se pueden perder unos segundos de datos?",h:"Durabilidad vs. velocidad.",o:[
  ["Sí, se pueden recalcular","Una caché","Redis"],
  ["No, deben conservarse","Datos valiosos","kC"]]},
 kC:{c:"cap",q:"¿El sistema debe estar activo las 24 horas aunque falle un servidor?",h:"CAP: disponibilidad durante fallos de red o nodos.",o:[
  ["Sí, no puede caerse","Progreso de jugadores en línea","kF"],
  ["Puede tener pausas cortas","Sistema interno","kG"]]},
 kF:{c:"rep",q:"¿Quién administrará los servidores?",h:"Replicación y distribución administradas o propias.",o:[
  ["La nube","Sin mantener servidores","DynamoDB"],
  ["Yo, repartido en varias regiones","Infraestructura propia","kH"]]},
 kH:{c:"rep",q:"¿Tus usuarios están en varias regiones o países?",h:"Replicar copias entre centros de datos.",o:[
  ["Sí, varios centros de datos","Usuarios globales","Cassandra"],
  ["No, una sola región","Servicio local","MongoDB"]]},
 kG:{c:"esq",q:"¿Necesitarás buscar por otros datos además del código?",h:"El acceso por clave tiene sus límites.",o:[
  ["Sí, búsquedas más variadas","Buscar por nombre o categoría","MongoDB"],
  ["No, solo por código","Siempre por ID","DynamoDB"]]},

 // ---- Columnas anchas / eventos
 wA:{c:"cap",q:"¿Qué ocurre si tu sistema se detiene un rato?",h:"CAP: ¿priorizas siempre responder?",o:[
  ["Es grave: debe estar activo las 24 horas","Servicio de streaming","wB"],
  ["Pueden haber pausas cortas","Reportes internos","wE"]]},
 wB:{c:"rep",q:"¿Tus servidores o usuarios están en varios países?",h:"La replicación mantiene copias en varios lugares.",o:[
  ["Sí, en varios centros de datos","Usuarios en todo el mundo","wD"],
  ["No, en un solo lugar","Una región","wE"]]},
 wD:{c:"cons",q:"¿Se acepta ver datos de hace unos segundos?",h:"Consistencia eventual.",o:[
  ["Sí, unos segundos de retraso son aceptables","Estadísticas","wF"],
  ["No, deben ser exactos al instante","Saldos","wE"]]},
 wF:{c:"rep",q:"¿Quién administrará los servidores?",h:"Servicio administrado o infraestructura propia.",o:[
  ["Que los administre la nube","Sin servidores propios","DynamoDB"],
  ["Yo los administro","Servidores propios","Cassandra"]]},
 wE:{c:"esc",q:"¿Cuántos datos entrarán por día?",h:"La escalabilidad horizontal agrega servidores.",o:[
  ["Cantidades enormes, millones de escrituras","Telemetría de millones de dispositivos","wH"],
  ["Cantidades moderadas","Miles al día","wI"]]},
 wH:{c:"norm",q:"¿Ya sabes qué consultas harás?",h:"Cassandra diseña las tablas según cada consulta.",o:[
  ["Sí, son conocidas y fijas","«Los últimos eventos de un sensor»","Cassandra"],
  ["No, las iré descubriendo","Exploración libre","MongoDB"]]},
 wI:{c:"esq",q:"¿Los datos cambian de estructura con frecuencia?",h:"Esquema flexible vs. predefinido.",o:[
  ["Sí","Campos nuevos seguido","MongoDB"],
  ["No, son siempre iguales","Mismo formato","SQL"]]}
};

const RES = {
 SQL:{n:"Una base de datos relacional (SQL)",t:"Para tu caso no hace falta NoSQL",ic:"🗄️",col:"#4a6fa5",
  r:["Tus respuestas apuntan a datos ordenados, relaciones importantes o transacciones estrictas, que es el terreno de SQL según el informe.","SQL garantiza transacciones ACID, integridad referencial con claves foráneas y JOIN para consultas flexibles.","Puede crecer verticalmente y también con replicación y particionamiento, así que cubre tu caso sin complicarte."],
  e:[],s:"https://www.postgresql.org/docs/current/",nota:"Esta guía no recomienda un motor SQL concreto. Si quieres, vuelve a empezar y cambia alguna respuesta para ver qué NoSQL encajaría."},
 MongoDB:{n:"MongoDB",t:"Base de datos documental",ic:"🍃",col:"#13aa52",
  r:["Esquema flexible: cada documento puede traer campos distintos y, si lo necesitas, puedes validar la estructura.","Permite incrustar datos relacionados (una sola consulta) o usar referencias, según cómo los leas.","Escala horizontalmente con sharding y mantiene réplicas; además soporta transacciones ACID multidocumento."],
  e:[["Victoria’s Secret","Comercio electrónico (diapositivas)"],["Forbes","Plataforma de contenidos"]],s:"https://www.mongodb.com/docs/manual/data-modeling/embedding/"},
 Neo4j:{n:"Neo4j",t:"Base de datos de grafos",ic:"🕸️",col:"#4581c3",
  r:["Su fuerte son las relaciones complejas entre entidades, representadas como nodos y conexiones.","Recorre relaciones de varios niveles sin encadenar muchos JOIN.","Es ideal para recomendaciones, redes y detección de conexiones; su ventaja es el análisis, no el reparto masivo."],
  e:[["BASF","Análisis de cadena de valor (diapositivas)"],["NASA","Grafo de conocimiento de lecciones aprendidas"],["Walmart","Recomendaciones de productos"]],s:"https://neo4j.com/docs/"},
 Redis:{n:"Redis",t:"Clave-valor en memoria",ic:"⚡",col:"#d82c20",
  r:["Acceso directo por clave y latencia muy baja, porque trabaja en memoria.","Guarda datos ya preparados (desnormalización), ideal para cachés, sesiones y contadores.","Es la mejor opción cuando los datos son temporales o recalculables."],
  e:[["Axis Bank","Pagos digitales (diapositivas)"],["X (Twitter)","Líneas de tiempo"],["Stack Overflow","Caché y contadores"]],s:"https://redis.io/docs/"},
 Cassandra:{n:"Apache Cassandra",t:"Columnas anchas",ic:"👁️",col:"#1287b1",
  r:["Escalabilidad horizontal: se agregan nodos para crecer sin depender de un solo servidor.","Alta disponibilidad y tolerancia a particiones: sigue funcionando aunque fallen nodos.","Consistencia configurable por operación; excelente para escrituras masivas con consultas conocidas."],
  e:[["Netflix","Servicios digitales (diapositivas)"],["Apple","Servicios a gran escala"]],s:"https://cassandra.apache.org/doc/latest/cassandra/architecture/overview.html"},
 CouchDB:{n:"Apache CouchDB",t:"Documental con sincronización",ic:"🛋️",col:"#e42528",
  r:["Replicación bidireccional: los datos se sincronizan entre servidor y dispositivos.","Consistencia eventual, adecuada cuando se tolera un pequeño retraso.","Funciona bien en entornos desconectados (offline) que sincronizan después."],
  e:[["BBC","Uso documentado histórico (diapositivas)"],["CERN","Experimentos científicos"]],s:"https://docs.couchdb.org/"},
 DynamoDB:{n:"Amazon DynamoDB",t:"Clave-valor y documental administrada",ic:"📦",col:"#f29100",
  r:["Acceso por clave de partición y de ordenamiento, pensado para consultas conocidas.","Escalabilidad horizontal administrada: AWS gestiona la distribución y la replicación.","Permite lecturas eventualmente consistentes o fuertemente consistentes, según lo necesites."],
  e:[["Ubisoft","Progreso y datos de jugadores (diapositivas)"],["Amazon","Carrito y servicios propios"],["Duolingo","Datos de usuarios"]],s:"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html"}
};
