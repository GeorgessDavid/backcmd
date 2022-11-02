CREATE DATABASE `dh-grupo3`;

CREATE TABLE `Usuario` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `apellido` VARCHAR(30) NOT NULL ,
  `dni` VARCHAR(30) NOT NULL ,
  `email` VARCHAR(30) NOT NULL ,
  `clave` VARCHAR(30) NOT NULL ,
  `matricula` VARCHAR(30) ,
  `sexo` BIT NOT NULL ,
  `domicilio` VARCHAR(30) NOT NULL ,
  `telefono` VARCHAR(30),
  `Obra_Social_id` INT,
  `Rol_id` INT NOT NULL ,
 PRIMARY KEY (`id`)
);

CREATE TABLE `Rol` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(30) NOT NULL ,
 PRIMARY KEY (`id`)
);

CREATE TABLE `Especialidad` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(30) NOT NULL ,
 PRIMARY KEY (`id`)
);

CREATE TABLE `Profesional_Especialidad` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `Profesional_id` INT NOT NULL ,
  `Especialidad_id` INT NOT NULL ,
 PRIMARY KEY (`id`)
);

CREATE TABLE `Tramiento` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(30) NOT NULL ,
 PRIMARY KEY (`id`)
);

CREATE TABLE `Profesional_Tratamiento` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `Profesional_id` INT NOT NULL ,
  `Tratamiento_id` INT NOT NULL ,
 PRIMARY KEY (`id`)
);

CREATE TABLE `Turno` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `Paciente_id` INT NOT NULL,
  `Profesional_id` INT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_cancelacion` DATETIME,
  `fecha_turno` DATETIME NOT NULL,
  `Tratamiendo_id` INT,
 PRIMARY KEY (`id`)
);

CREATE TABLE `Planilla_horaria` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `dia_semana` VARCHAR(30) NOT NULL ,
  `hora_inicio` VARCHAR(30) NOT NULL ,
  `hora_fin` VARCHAR(30) NOT NULL ,
  `Profesional_id` INT NOT NULL ,
 PRIMARY KEY (`id`)
);

CREATE TABLE `Diagnostico` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `descripcion` longtext NOT NULL ,
  `fecha` DATETIME NOT NULL ,
  `nombre_adjunto` VARCHAR(30) ,
  `Paciente_id` INT NOT NULL ,
  `Profesional_id` INT NOT NULL ,
  `Turno_id` INT,
 PRIMARY KEY (`id`)
);

CREATE TABLE `Obras_sociales_adheridas` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(30) NOT NULL ,
  `Obra_social_id` INT NOT NULL ,
  `Profesional_id` INT NOT NULL ,
 PRIMARY KEY (`id`)
);

CREATE TABLE `Obra_social` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(30) NOT NULL ,
 PRIMARY KEY (`id`)
);

ALTER TABLE `Usuario` ADD FOREIGN KEY (Obra_Social_id) REFERENCES `Obra_social` (`id`);
ALTER TABLE `Usuario` ADD FOREIGN KEY (Rol_id) REFERENCES `Rol` (`id`);
ALTER TABLE `Profesional_Especialidad` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
ALTER TABLE `Profesional_Especialidad` ADD FOREIGN KEY (Especialidad_id) REFERENCES `Especialidad` (`id`);
ALTER TABLE `Profesional_Tratamiento` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
ALTER TABLE `Profesional_Tratamiento` ADD FOREIGN KEY (Tratamiento_id) REFERENCES `Tramiento` (`id`);
ALTER TABLE `Turno` ADD FOREIGN KEY (Paciente_id) REFERENCES `Usuario` (`id`);
ALTER TABLE `Turno` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
ALTER TABLE `Turno` ADD FOREIGN KEY (Tratamiendo_id) REFERENCES `Tramiento` (`id`);
ALTER TABLE `Planilla_horaria` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
ALTER TABLE `Diagnostico` ADD FOREIGN KEY (Paciente_id) REFERENCES `Usuario` (`id`);
ALTER TABLE `Diagnostico` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
ALTER TABLE `Diagnostico` ADD FOREIGN KEY (Turno_id) REFERENCES `Turno` (`id`);
ALTER TABLE `Obras_sociales_adheridas` ADD FOREIGN KEY (Obra_social_id) REFERENCES `Obra_social` (`id`);
ALTER TABLE `Obras_sociales_adheridas` ADD FOREIGN KEY (Profesional_id) REFERENCES `Usuario` (`id`);
