CREATE TABLE `developer`.`media` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `artist` VARCHAR(255) NOT NULL,
  `released` VARCHAR(255) NOT NULL,
  `genre` VARCHAR(255) NOT NULL,
  `ean` VARCHAR(255) NOT NULL,
  `label` VARCHAR(255) NOT NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'general media table';
