ALTER TABLE reviews DROP FOREIGN KEY reviews_ibfk_1;

ALTER TABLE reviews DROP FOREIGN KEY reviews_ibfk_2;

ALTER TABLE reviews DROP FOREIGN KEY reviews_ibfk_3;

ALTER TABLE rides DROP FOREIGN KEY rides_ibfk_1;

ALTER TABLE rides DROP FOREIGN KEY rides_ibfk_2;

DROP Table IF EXISTS reviews;

DROP Table IF EXISTS rides;

DROP Table IF EXISTS customers;

DROP Table IF EXISTS drivers;