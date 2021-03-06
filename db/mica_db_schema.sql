-- MySQL Script generated by MySQL Workbench
-- Tue Nov 30 18:08:18 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema micadb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `micadb` ;

-- -----------------------------------------------------
-- Schema micadb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `micadb` DEFAULT CHARACTER SET utf8 ;
USE `micadb` ;

-- -----------------------------------------------------
-- Table `micadb`.`Buildings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `micadb`.`Buildings` ;

CREATE TABLE IF NOT EXISTS `micadb`.`Buildings` (
  `id_building` INT NOT NULL AUTO_INCREMENT,
  `building_name` VARCHAR(45) NOT NULL,
  `building_abv` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_building`),
  UNIQUE INDEX `id_building_UNIQUE` (`id_building` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `micadb`.`Equipment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `micadb`.`Equipment` ;

CREATE TABLE IF NOT EXISTS `micadb`.`Equipment` (
  `id_equipment` INT NOT NULL AUTO_INCREMENT,
  `equipment_name` VARCHAR(45) NOT NULL,
  `equipment_type` VARCHAR(45) NOT NULL,
  `mu_equipment_tag` VARCHAR(45) NOT NULL,
  `manufacturer` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_equipment`),
  UNIQUE INDEX `id_equipment_UNIQUE` (`id_equipment` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `micadb`.`Rooms`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `micadb`.`Rooms` ;

CREATE TABLE IF NOT EXISTS `micadb`.`Rooms` (
  `id_room` INT NOT NULL AUTO_INCREMENT,
  `room_number` INT NOT NULL,
  `Buildings_id_building` INT NOT NULL,
  `Equipment_id_equipment` INT NOT NULL,
  PRIMARY KEY (`id_room`, `Buildings_id_building`, `Equipment_id_equipment`),
  UNIQUE INDEX `id_room_UNIQUE` (`id_room` ASC) VISIBLE,
  INDEX `fk_Rooms_Buildings_idx` (`Buildings_id_building` ASC) VISIBLE,
  INDEX `fk_Rooms_Equipment1_idx` (`Equipment_id_equipment` ASC) VISIBLE,
  CONSTRAINT `fk_Rooms_Buildings`
    FOREIGN KEY (`Buildings_id_building`)
    REFERENCES `micadb`.`Buildings` (`id_building`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Rooms_Equipment1`
    FOREIGN KEY (`Equipment_id_equipment`)
    REFERENCES `micadb`.`Equipment` (`id_equipment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `micadb`.`Reports`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `micadb`.`Reports` ;

CREATE TABLE IF NOT EXISTS `micadb`.`Reports` (
  `id_reports` INT NOT NULL AUTO_INCREMENT,
  `status` TINYINT NULL,
  `notes` VARCHAR(650) NULL,
  `user` VARCHAR(45) NULL,
  `Equipment_id_equipment` INT NOT NULL,
  PRIMARY KEY (`id_reports`),
  INDEX `fk_Reports_Equipment1_idx` (`Equipment_id_equipment` ASC) VISIBLE,
  UNIQUE INDEX `id_reports_UNIQUE` (`id_reports` ASC) VISIBLE,
  CONSTRAINT `fk_Reports_Equipment1`
    FOREIGN KEY (`Equipment_id_equipment`)
    REFERENCES `micadb`.`Equipment` (`id_equipment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
