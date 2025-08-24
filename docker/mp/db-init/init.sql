CREATE DATABASE mp_casos_db;
GO

USE mp_casos_db;
GO

-- mp_casos_db.dbo.casos definition

-- Drop table

-- DROP TABLE mp_casos_db.dbo.casos;

CREATE TABLE casos (
	id uniqueidentifier DEFAULT newid() NOT NULL,
	numero_caso varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	nombre varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	descripcion text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	usuario_asignado_id uniqueidentifier NULL,
	fiscalia_id uniqueidentifier NULL,
	fecha_creacion datetimeoffset(0) DEFAULT sysutcdatetime() NOT NULL,
	usuario_creacion uniqueidentifier NULL,
	fecha_modificacion datetimeoffset(0) DEFAULT sysutcdatetime() NOT NULL,
	usuario_modificacion uniqueidentifier NOT NULL,
	estado varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'pendiente' NULL,
	CONSTRAINT casos_pk PRIMARY KEY (id),
	CONSTRAINT casos_unique UNIQUE (numero_caso)
);


-- mp_casos_db.dbo.fiscalias definition

-- Drop table

-- DROP TABLE mp_casos_db.dbo.fiscalias;

CREATE TABLE fiscalias (
	id uniqueidentifier DEFAULT newid() NOT NULL,
	nombre varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ubicacion varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	descripcion varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	activa bit DEFAULT 1 NOT NULL,
	fecha_creacion datetimeoffset(0) DEFAULT sysutcdatetime() NOT NULL,
	usuario_creacion uniqueidentifier NOT NULL,
	fecha_modificacion datetimeoffset(0) DEFAULT sysutcdatetime() NOT NULL,
	usuario_modificacion uniqueidentifier NOT NULL,
	CONSTRAINT ficalias_pk PRIMARY KEY (id)
);


-- mp_casos_db.dbo.log_asignacion_casos definition

-- Drop table

-- DROP TABLE mp_casos_db.dbo.log_asignacion_casos;

CREATE TABLE log_asignacion_casos (
	id uniqueidentifier NOT NULL,
	caso_id uniqueidentifier NOT NULL,
	fiscal_anterior_id uniqueidentifier NULL,
	fiscal_nuevo_id uniqueidentifier NOT NULL,
	fecha datetimeoffset(0) DEFAULT sysutcdatetime() NOT NULL,
	motivo nvarchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	usuario_intento uniqueidentifier NOT NULL,
	resultado tinyint NOT NULL,
	resultado_mensaje varchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT log_asignacion_casos_pk PRIMARY KEY (id)
);


-- mp_casos_db.dbo.usuarios definition

-- Drop table

-- DROP TABLE mp_casos_db.dbo.usuarios;

CREATE TABLE usuarios (
	id uniqueidentifier DEFAULT newid() NOT NULL,
	nombre nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	correo varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	rol varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	fecha_creacion datetimeoffset(0) DEFAULT sysutcdatetime() NOT NULL,
	usuario_creacion uniqueidentifier NOT NULL,
	fecha_modificacion datetimeoffset(0) DEFAULT sysutcdatetime() NOT NULL,
	usuario_modificacion uniqueidentifier NOT NULL,
	activo bit DEFAULT 1 NOT NULL,
	fiscalia_id uniqueidentifier NULL,
	contrasena varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT usuarios_pk PRIMARY KEY (id),
	CONSTRAINT usuarios_unique UNIQUE (correo)
);


-- mp_casos_db.dbo.casos foreign keys

ALTER TABLE mp_casos_db.dbo.casos ADD CONSTRAINT casos_fiscalias_FK FOREIGN KEY (fiscalia_id) REFERENCES fiscalias(id);
ALTER TABLE mp_casos_db.dbo.casos ADD CONSTRAINT casos_usuarios_FK FOREIGN KEY (usuario_creacion) REFERENCES usuarios(id);
ALTER TABLE mp_casos_db.dbo.casos ADD CONSTRAINT casos_usuarios_FK_1 FOREIGN KEY (usuario_modificacion) REFERENCES usuarios(id);
ALTER TABLE mp_casos_db.dbo.casos ADD CONSTRAINT casos_usuarios_FK_2 FOREIGN KEY (usuario_asignado_id) REFERENCES usuarios(id);


-- mp_casos_db.dbo.fiscalias foreign keys

ALTER TABLE mp_casos_db.dbo.fiscalias ADD CONSTRAINT ficalias_usuarios_FK FOREIGN KEY (usuario_creacion) REFERENCES usuarios(id);
ALTER TABLE mp_casos_db.dbo.fiscalias ADD CONSTRAINT ficalias_usuarios_FK_1 FOREIGN KEY (usuario_modificacion) REFERENCES usuarios(id);


-- mp_casos_db.dbo.log_asignacion_casos foreign keys

ALTER TABLE mp_casos_db.dbo.log_asignacion_casos ADD CONSTRAINT log_asignacion_casos_casos_FK FOREIGN KEY (caso_id) REFERENCES casos(id);
ALTER TABLE mp_casos_db.dbo.log_asignacion_casos ADD CONSTRAINT log_asignacion_casos_usuarios_FK FOREIGN KEY (fiscal_anterior_id) REFERENCES usuarios(id);
ALTER TABLE mp_casos_db.dbo.log_asignacion_casos ADD CONSTRAINT log_asignacion_casos_usuarios_FK_1 FOREIGN KEY (fiscal_nuevo_id) REFERENCES usuarios(id);
ALTER TABLE mp_casos_db.dbo.log_asignacion_casos ADD CONSTRAINT log_asignacion_casos_usuarios_FK_2 FOREIGN KEY (usuario_intento) REFERENCES usuarios(id);


-- mp_casos_db.dbo.usuarios foreign keys

ALTER TABLE mp_casos_db.dbo.usuarios ADD CONSTRAINT usuarios_ficalias_FK FOREIGN KEY (fiscalia_id) REFERENCES fiscalias(id);
ALTER TABLE mp_casos_db.dbo.usuarios ADD CONSTRAINT usuarios_usuarios_FK FOREIGN KEY (usuario_creacion) REFERENCES usuarios(id);
ALTER TABLE mp_casos_db.dbo.usuarios ADD CONSTRAINT usuarios_usuarios_FK_1 FOREIGN KEY (usuario_modificacion) REFERENCES usuarios(id);
GO


-- Usuarios
INSERT INTO usuarios (id, nombre, correo, rol, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion, activo, fiscalia_id, contrasena) VALUES('00000000-0000-0000-0000-000000000000', 'Fiscal Admin', 'fiscal@mp.gob.gt', 'ADMIN_SYSTEM', '2025-07-27 21:50:31.000', '00000000-0000-0000-0000-000000000000', '2025-07-27 21:50:31.000', '00000000-0000-0000-0000-000000000000', 1, NULL, '$2b$10$eXUQxwsPGOLIwdpGmCK9te4ILPDeVuS/sgtuGjcEgzmXG1qf2NQ1q');

-- Fiscalia
INSERT INTO fiscalias (id, nombre, ubicacion, descripcion, activa, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion) VALUES('D4604377-D30D-4A6C-AF07-8F4D40EB0189', 'Fiscalía Contra el Crimen Organizado', 'Ciudad de Guatemala', NULL, 1, '2025-07-28 01:36:00.000', '00000000-0000-0000-0000-000000000000', '2025-07-28 01:36:00.000', '00000000-0000-0000-0000-000000000000');
INSERT INTO usuarios (id, nombre, correo, rol, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion, activo, fiscalia_id, contrasena) VALUES('8A8DD011-A79C-4A40-BEF0-730B51483734', 'Fiscal de Guate', 'fiscal_1@mp.gob.gt', 'FISCAL', '2025-07-28 01:50:11.000', '00000000-0000-0000-0000-000000000000', '2025-07-28 01:50:11.000', '00000000-0000-0000-0000-000000000000', 1, 'D4604377-D30D-4A6C-AF07-8F4D40EB0189', '$2b$10$eXUQxwsPGOLIwdpGmCK9te4ILPDeVuS/sgtuGjcEgzmXG1qf2NQ1q');

-- Casos
INSERT INTO casos (id, numero_caso, nombre, descripcion, usuario_asignado_id, fiscalia_id, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion, estado) VALUES('A888112F-5CC5-4FEE-8A4C-DD8A1F38C6AC', 'CASO-2025-001', 'Caso de corrupción en entidad X', NULL, NULL, 'D4604377-D30D-4A6C-AF07-8F4D40EB0189', '2025-07-28 01:38:46.000', '00000000-0000-0000-0000-000000000000', '2025-07-28 01:38:46.000', '00000000-0000-0000-0000-000000000000', 'pendiente');
INSERT INTO casos (id, numero_caso, nombre, descripcion, usuario_asignado_id, fiscalia_id, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion, estado) VALUES('A888112F-0000-4FEE-8A4C-DD8A1F38C6AC', 'CASO-2025-002', 'Caso de corrupción en entidad Z', NULL, NULL, 'D4604377-D30D-4A6C-AF07-8F4D40EB0189', '2025-07-28 01:38:46.000', '00000000-0000-0000-0000-000000000000', '2025-07-28 01:38:46.000', '00000000-0000-0000-0000-000000000000', 'pendiente');
GO