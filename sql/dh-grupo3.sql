-- CREACIÓN DE BASE DE DATOS

CREATE DATABASE IF NOT EXISTS Clinica_db;
USE Clinica_db;

-- CREACIÓN DE TABLAS 

CREATE TABLE `Usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `alias` varchar(30) NOT NULL ,
  `nombre` varchar(30) NOT NULL ,
  `apellido` varchar(30) NOT NULL ,
  `dni` varchar(12) NOT NULL ,
  `email` varchar(50) NOT NULL ,
  `clave` varchar(500) NOT NULL ,
  `matricula` varchar(10) ,
  `sexo` bit NOT NULL ,
  `domicilio` varchar(50) NOT NULL ,
  `telefono` varchar(20) NOT NULL ,
  `imagen` varchar(80) ,
  `Obra_Social_id` INT ,
  `Rol_id` INT NOT NULL , 
 PRIMARY KEY (`id`)
)
COLLATE='utf8mb4_general_ci'
;

CREATE TABLE `Rol` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) NOT NULL , 
 PRIMARY KEY (`id`)
)
COLLATE='utf8mb4_general_ci'
;

CREATE TABLE `Especialidad` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;

CREATE TABLE `Profesional_Especialidad` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `Profesional_id` INT NOT NULL ,
  `Especialidad_id` INT NOT NULL , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;

CREATE TABLE `Tratamiento` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;

CREATE TABLE `Profesional_Tratamiento` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `Profesional_id` INT NOT NULL ,
  `Tratamiento_id` INT NOT NULL , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;

CREATE TABLE `Turno` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `Paciente_id` INT NOT NULL ,
  `Profesional_id` INT NOT NULL ,
  `fecha_creacion` datetime NOT NULL ,
  `fecha_cancelacion` datetime ,
  `fecha_turno` datetime NOT NULL ,
  `Tratamiento_id` INT , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;
 

CREATE TABLE `Planilla_Horaria` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `dia_semana` varchar(50) NOT NULL ,
  `hora_inicio` varchar(50) NOT NULL ,
  `hora_fin` varchar(50) NOT NULL ,
  `Profesional_id` INT NOT NULL , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;

CREATE TABLE `Diagnostico` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL ,
  `fecha` datetime NOT NULL ,
  `nombre_adjunto` varchar(50) ,
  `Paciente_id` INT NOT NULL ,
  `Profesional_id` INT NOT NULL ,
  `Turno_id` INT , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;

CREATE TABLE `Obra_Social_Adherida` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL ,
  `Obra_Social_id` INT NOT NULL ,
  `Profesional_id` INT NOT NULL , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;

CREATE TABLE `Obra_Social` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;
 

CREATE TABLE `Clinica` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL ,
  `direccion` varchar(50) NOT NULL , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;

CREATE TABLE `Trabajador_Clinica` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `fechaInicio` datetime NOT NULL ,
  `fechaFin` datetime ,
  `Usuario_id` INT ,
  `Clinica_id` INT , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;
 

CREATE TABLE `Registro_Caja` (
  `id`  INT NOT NULL AUTO_INCREMENT,
  `descripcion` text ,
  `ingreso` bit NOT NULL ,
  `monto` decimal ,
  `Usuario_id` INT ,
  `Clinica_id` INT , 
 PRIMARY KEY (`id`)
) 
COLLATE='utf8mb4_general_ci'
;


-- RELACION FK 

ALTER TABLE `Usuario` ADD FOREIGN KEY (Obra_Social_id) REFERENCES `Obra_Social` (`id`);
				
ALTER TABLE `Usuario` ADD FOREIGN KEY (Rol_id) REFERENCES `Rol` (`id`);
				
ALTER TABLE `Profesional_Especialidad` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
				
ALTER TABLE `Profesional_Especialidad` ADD FOREIGN KEY (Especialidad_id) REFERENCES `Especialidad` (`id`);
				
ALTER TABLE `Profesional_Tratamiento` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
				
ALTER TABLE `Profesional_Tratamiento` ADD FOREIGN KEY (Tratamiento_id) REFERENCES `Tramiento` (`id`);
				
ALTER TABLE `Turno` ADD FOREIGN KEY (Paciente_id) REFERENCES `Usuario` (`id`);
				
ALTER TABLE `Turno` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
				
ALTER TABLE `Turno` ADD FOREIGN KEY (Tratamiento_id) REFERENCES `Tramiento` (`id`);
				
ALTER TABLE `Planilla_Horaria` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
				
ALTER TABLE `Diagnostico` ADD FOREIGN KEY (Paciente_id) REFERENCES `Usuario` (`id`);
				
ALTER TABLE `Diagnostico` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
				
ALTER TABLE `Diagnostico` ADD FOREIGN KEY (Turno_id) REFERENCES `Turno` (`id`);
				
ALTER TABLE `Obra_Social_Adherida` ADD FOREIGN KEY (Obra_Social_id) REFERENCES `Obra_Social` (`id`);
				
ALTER TABLE `Obra_Social_Adherida` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
				
ALTER TABLE `Trabajador_Clinica` ADD FOREIGN KEY (Usuario_id) REFERENCES `Usuario` (`id`);
				
ALTER TABLE `Trabajador_Clinica` ADD FOREIGN KEY (Clinica_id) REFERENCES `Clinica` (`id`);
				
ALTER TABLE `Registro_Caja` ADD FOREIGN KEY (Usuario_id) REFERENCES `Usuario` (`id`);
				
ALTER TABLE `Registro_Caja` ADD FOREIGN KEY (Clinica_id) REFERENCES `Clinica` (`id`);