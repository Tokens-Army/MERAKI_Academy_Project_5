-- Create a table called **services** in the database
CREATE TABLE services(
  id SERIAL NOT NULL,
  name VARCHAR(255),
  description text,
  img TEXT,
  price INT,
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);

INSERT INTO services (name, description, img, price) values ('Hand car wash', 'washing the car by hand, using a hose, a bucket, a sponge, and a soap solution. Hand car wash can help remove dirt, grime, bugs, and bird droppings from the car, as well as rinse off any residue or soap marks', 'https://www.1stclassmobiledetailing.com.au/wp-content/uploads/2019/03/hand-car-wash.jpg', 5) RETURNING *;
INSERT INTO services (name, description, img, price) values ('Car vacuuming', 'This service involves using a vacuum cleaner to remove dust, dirt, and debris from the interior of the car, including the seats, floor mats, carpets, and trunk. Car vacuuming can help improve the air quality and appearance of the car', 'https://thumbs.dreamstime.com/b/professional-car-vacuuming-vehicle-service-caucasian-worker-cleaning-cargo-area-inside-135721486.jpg', 3) RETURNING *;
INSERT INTO services (name, description, img, price) values ('Seat car cleaning', 'This service involves cleaning and sanitizing the seats of the car, using a steam cleaner, a shampooer, or a leather conditioner. Seat car cleaning can help remove stains, odors, bacteria, and allergens from the seats, as well as restore their color and texture', 'https://beautyntechs.com/wp-content/uploads/2021/08/Tips-for-your-car-seat-cleaning.jpg', 5) RETURNING *;
INSERT INTO services (name, description, img, price) values ('Car polishing', 'This service involves applying a protective layer of wax or polish to the exterior of the car, using a buffer or a cloth. Car polishing can help enhance the shine and gloss of the car, as well as protect it from scratches, oxidation, and UV damage', 'https://media.torque.com.sg/public/2019/08/car-polishing-machine-or-hand-better.jpg', 5) RETURNING *;

