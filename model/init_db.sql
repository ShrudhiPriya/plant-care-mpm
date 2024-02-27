--
-- Drop Tables
--
SET
    foreign_key_checks = 0;

DROP TABLE if exists plants;

DROP TABLE if exists users;

DROP TABLE if exists users_favourite_plants;

SET
    foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE plants(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    plant_api_id BIGINT NOT NULL,
    scientific_name VARCHAR(255) NOT NULL,
    common_name VARCHAR(255) NOT NULL,
    medium_image VARCHAR(255),
    plant_type VARCHAR(255),
    indoor TINYINT(1),
    poisonous_to_humans TINYINT(1),
    poisonous_to_pets TINYINT(1),
    plant_description VARCHAR(1000),
    edible_fruit TINYINT(1),
    edible_leaf TINYINT(1),
    flowers TINYINT(1),
    watering VARCHAR(255),
    propagation VARCHAR(255),
    sunlight VARCHAR(255),
    pruning_month VARCHAR(255),
    watering_description VARCHAR(1000),
    sunlight_description VARCHAR(1000),
    pruning_description VARCHAR(1000)
);

CREATE TABLE users_favourite_plants(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plant_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(plant_id) REFERENCES plants(id)
);