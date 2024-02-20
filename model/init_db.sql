--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists plants;
DROP TABLE if exists users;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE plants(
    id INT NOT NULL AUTO_INCREMENT,
    plant_api_id INT NOT NULL, 
    scientific_name VARCHAR(100) NOT NULL, 
    common_name VARCHAR(100),
    photo VARCHAR(255), 
    PRIMARY KEY (id)
);


CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL, 
    email VARCHAR(255), 
    PRIMARY KEY (id)
);

CREATE TABLE users_plants(
    id INT NOT NULL AUTO_INCREMENT,
    plant_id INT NOT NULL, 
    user_id INT NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES plants(id)
    FOREIGN KEY (user_id) REFERENCES users(id)
    PRIMARY KEY (id)
);