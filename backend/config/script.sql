--Tabla de jurisdicciones, es la tabla que se crea primero
create table jurisdiccion(
	id serial primary key,
	nombre_jurisdiccion varchar(100) not null,
	ubicacion_geografica text not null,
	sectores varchar(225) not null,
	estado varchar(50) not null,
	tipo_embarcacion varchar(225) not null,
	contacto varchar(225) not null,
	integracion text not null,
	fecha_ultima_modificacion timestamp default current_timestamp
);
--Luego se crea la tabla de zonas
create table zonas(
	id serial primary key,
	nombre_zona varchar(100) not null,
	ubicacion_geografica varchar(225) not null,
	pais varchar(25) not null default 'Chile',
	region varchar(25) not null,
	fecha_apertura date,
	fecha_cierre date,
	jurisdiccion_id integer references jurisdiccion(id) on delete cascade,
	estado_zona varchar(20) not null,
	descripcion text,
);
--Luego se crea la tabla de concesion
create table concesion(
	id serial primary key,
	vigencia date not null,
	zona_id integer references zonas(id) on delete cascade,
	jurisdiccion_id integer references jurisdiccion(id) on delete cascade,
	nombre_concesion varchar(100) not null
);
--Luego se crea la tabla de ponton
create table ponton(
	id serial primary key,
	nombre_ponton varchar(100) not null,
	ubicacion varchar(225) not null,
	concesion_id integer references concesion(id) on delete cascade,
	fecha_apertura_operacional date,
	fecha_cierre_operacional date,
	tipo_ponton varchar(100) not null,
	habitabilidad_general varchar(225),
	habitabilidad_interna varchar(225),
	habitabilidad_externa varchar(225)
);
--Luego se crea la tabla base
create table base(
	id serial primary key,
	nombre_base varchar(100) not null,
	jefe_base varchar(50) not null,
	ponton_id integer references ponton(id) on delete cascade
);
--Luego se crea la tabla puerto
create table puerto(
	id serial primary key,
	nombre_puerto varchar(100) not null,
	ubicacion_puerto varchar(100) not null,
	localidad varchar (100) not null,
	jurisdiccion_id integer references jurisdiccion(id) on delete cascade,
	estado varchar (100) not null default 'Abierto'
);
--Luego se crea la tabla aeropuerto
create table aeropuerto(
	id serial primary key,
	nombre_aeropuerto varchar(100) not null,
	ubicacion_aeropuerto varchar(100) not null,
	localidad varchar (100) not null,
	jurisdiccion_id integer references jurisdiccion(id) on delete cascade,
	estado varchar (100) not null default 'Abierto'
);
--Tabla de proveedores
create table proveedores(
	id serial primary key,
	nombre_proveedor varchar(100) not null,
	rut varchar(100) not null,
	encargado varchar(100) not null,
	contacto varchar(100) not null,
	email_encargado varchar(100) not null,
	telefono_encargado varchar(11) not null,
	representante_interno varchar(100),
	estado varchar(100),
	tipo_servicio varchar(100) not null,
	ciclo_cultivo varchar(100),
	tarea_realizar varchar(100),
	fecha_termino_servicio date,
	frencuencia_servicio varchar(100),
	descripcion_servicio varchar(100),
	cantidad_usuarios_autorizados integer
) --Luego la tabla vehiculos
create table vehiculos(
	id serial primary key,
	proveedor_id integer references proveedor(id) on delete cascade,
	num_tripulantes integer not null,
	tipo_vehiculo varchar(225) not null,
	tipo_servicio varchar(225) not null,
	capacidad_total integer not null,
	capacidad_operacional integer not null,
	estado varchar(50) not null,
	documentacion_ok boolean default true,
	velocidad_promedio numeric(10, 2) not null,
	chofer_id integer references chofereres(id) on delete cascade
);
--Luego la tabla rutas, primero consultar si es que la ruta va asociada al centro.
create table rutas(
	id serial primary key,
	nombre_ruta varchar(225) not null,
	zona varchar(225) not null,
	origen varchar(225) not null,
	destino varchar(225) not null,
	escalas varchar(225),
	tiempo_estimado integer not null,
	mov_interno boolean default false,
	fecha_agendamiento date not null
);
--Luego la tabla trayectos
CREATE TABLE trayectos (
	id SERIAL PRIMARY KEY,
	ruta_id INTEGER REFERENCES rutas(id) ON DELETE CASCADE,
	origen VARCHAR(255) NOT NULL,
	destino VARCHAR(255) NOT NULL,
	duracion_estimada INTERVAL,
	orden INTEGER NOT NULL,
	estado varchar(50) default 'Pendiente',
	created_at TIMESTAMPTZ DEFAULT NOW(),
	vehiculo_id integer references vehiculos(id) on delete cascade
);
--Luego se crea la tabla de centro
create table centro(
	id serial primary key,
	nombre_centro varchar(100) not null,
	fecha_apertura_productiva date,
	fecha_cierre_productivo date,
	jefe_centro varchar(50),
	etapa_ciclo_cultivo text,
	estructura text default 'Estructura 1',
	ponton_id integer references ponton(id) on delete cascade,
	ruta_id integer references rutas(id) on delete cascade
);
create table roles(
	id seria primary key,
	nombre_rol varchar(50),
	descripcion varchar(225)
),
create table usuarios(
	id serial primary key,
	nombre varchar(200),
	rut varchar(20),
	genero varchar(30),
	telefono varchar(20),
	google_id varchar(100) not null,
	-- El email debe ser unico
	email varchar(100) not null,
	fecha_nacimiento date,
	ciudad_origen varchar(100),
	estado varchar(100),
	isadmin boolean,
	rol_id integer references roles(id) on delete cascade
),
create table viajes(
	id serial primary key,
	nombre varchar(225),
	descripcion varchar(225),
	ruta_id integer references rutas(id) on delete cascade,
	-- faltan los created y los updated
	created_at TIMESTAMPTZ DEFAULT NOW(),
	updated_at TIMESTAMPTZ DEFAULT NOW()
) create table usuarios_viajes(
	id serial primary key,
	usuario_id integer references usuarios(id) on delete cascade,
	viaje_id integer references viajes(id) on delete cascade,
	fecha_inicio date,
	fecha_fin date,
	comentario_usuario text,
	estado varchar(50),
	-- faltan los created y los updates
	created_at TIMESTAMPTZ DEFAULT NOW(),
	updated_at TIMESTAMPTZ DEFAULT NOW()
),
create table vuelos(
	id serial primary key,
	numero_vuelo varchar(50),
	aerolinea varchar(100),
	aeropuerto_salida varchar(100),
	codigo_iata_salida varchar(10),
	horario_salida timestamp,
	aeropuerto_llegada varchar(100),
	codigo_iata_llegada varchar(10),
	horario_llegada timestamp,
	duracion_estimada integer,
	estado_vuelo varchar(50)
) CREATE TABLE vehiculo_usuarios (
	id SERIAL PRIMARY KEY,
	vehiculo_id INTEGER REFERENCES vehiculos(id) ON DELETE CASCADE,
	usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
	trayecto_id INTEGER REFERENCES trayectos(id) ON DELETE CASCADE,
	estado VARCHAR(50) DEFAULT 'Pendiente',
	-- Pendiente, Confirmado
	fecha_confirmacion TIMESTAMPTZ,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Tabla de choferes
CREATE TABLE choferes (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	telefono VARCHAR(15),
	email VARCHAR(255) UNIQUE,
	vehiculo_id INTEGER REFERENCES vehiculos(id) ON DELETE CASCADE,
	estado VARCHAR(50) DEFAULT 'Activo',
	created_at TIMESTAMPTZ DEFAULT NOW(),
	updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Tabla para asignar choferes a trayectos
CREATE TABLE chofer_trayecto (
	id SERIAL PRIMARY KEY,
	chofer_id INTEGER REFERENCES choferes(id) ON DELETE CASCADE,
	trayecto_id INTEGER REFERENCES trayectos(id) ON DELETE CASCADE,
	qr_validacion VARCHAR(255),
	-- Código QR para validar usuarios
	estado VARCHAR(50) DEFAULT 'Pendiente',
	-- Pendiente, Confirmado
	fecha_confirmacion TIMESTAMPTZ,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE centro
ADD COLUMN latitud DECIMAL(10, 8),
	ADD COLUMN longitud DECIMAL(11, 8);
create table lanchas(
	id serial primary key,
	nombre varchar(100) not null,
	capacidad int not null,
	disponible boolean default true
);
create table movimientosintercentro (
	id SERIAL PRIMARY KEY,
	fecha TIMESTAMP NOT NULL,
	centro_origen_id INT REFERENCES Centro(id) on delete cascade,
	centro_destino_id INT REFERENCES Centro(id) on delete cascade,
	lancha_id INT REFERENCES Lanchas(id),
	estado VARCHAR(20) DEFAULT 'pendiente',
	--Si el movimiento esta terminado, limpiar la lista de usuarios que esta en la lancha
	comentarios TEXT
);
create table usuariosmovimientosintercentro (
	id SERIAL PRIMARY KEY,
	movimiento_id INT REFERENCES MovimientosIntercentro(id) on delete cascade,
	usuario_id INT REFERENCES Usuarios(id) on delete cascade,
	trabajador_id int REFERENCES estado VARCHAR(20) DEFAULT 'pendiente',
	--Aprobado o rechazado, en la lista de la lancha solo se muestran los usuarios con estado "Aprobado" y "Pendiente", la que es tan rechazados no.
	comentario text
);
create table usuarios_pontones(
	id serial primary key,
	ponton_id references ponton(id) on delete
	set null,
		usuario_id references usuarios(id) on delete
	set null,
		trabajador_id references trabajadores(id) on delete
	set null,
		estado varchar(200) default "Pediente"
) CREATE TABLE notificaciones (
	id SERIAL PRIMARY KEY,
	titulo VARCHAR(255) NOT NULL,
	descripcion TEXT NOT NULL,
	tipo VARCHAR(50) NOT NULL,
	fecha_creacion TIMESTAMP DEFAULT NOW()
);
CREATE TABLE notificaciones_usuarios (
	id SERIAL PRIMARY KEY,
	usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
	notificacion_id INTEGER NOT NULL REFERENCES notificaciones(id) ON DELETE CASCADE,
	leida BOOLEAN DEFAULT FALSE,
	fecha_recibida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE ponton
ADD COLUMN qr_code TEXT;
