CREATE TABLE IF NOT EXISTS customers (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS drivers (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    vehicle VARCHAR(255) NOT NULL,
    tax INTEGER NOT NULL,
    min_order INTEGER NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS rides (
    id INT NOT NULL AUTO_INCREMENT,
    driver_id INT NOT NULL,
    customer_id INT NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    distance DECIMAL NOT NULL,
    value DECIMAL NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (driver_id) REFERENCES drivers (id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS reviews (
    id INT NOT NULL AUTO_INCREMENT,
    ride_id INT NOT NULL,
    driver_id INT NOT NULL,
    customer_id INT NOT NULL,
    rating INTEGER NOT NULL,
    comment VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    Foreign Key (customer_id) REFERENCES customers (id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES drivers (id) ON DELETE CASCADE,
    Foreign Key (ride_id) REFERENCES rides (id) ON DELETE CASCADE
) ENGINE = InnoDB;