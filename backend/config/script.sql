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
--Luego se crea la tabla de centro, verificar primero si la ruta es hacia el centro o hacia otro lado
create table centro(
	id serial primary key,
	nombre_centro varchar(100) not null,
	fecha_apertura_productiva date,
	fecha_cierre_productivo date,
	jefe_centro varchar(50),
	etapa_ciclo_cultivo text,
	estructura text default 'Estructura 1'
	ponton_id integer references ponton(id) on delete cascade,
	--ruta_id integer references rutas(id) on delete cascade
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
--Luego la tabla vehiculos
create table vehiculos(
	id serial primary key,
	proveedor varchar(225) not null,
	num_tripulantes integer not null,
	tipo_vehiculo varchar(225) not null,
	tipo_servicio varchar(225) not null,
	capacidad_total integer not null,
	capacidad_operacional integer not null,
	estado varchar(50) not null,
	documentacion_ok boolean default true,
	velocidad_promedio numeric(10, 2) not null
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
    created_at TIMESTAMPTZ DEFAULT NOW()
);