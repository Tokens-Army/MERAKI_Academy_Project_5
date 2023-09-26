  CREATE TABLE accessories (
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL UNIQUE,
  price INT,
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);


INSERT INTO accessories (name, description, img, price) values ('Phone holder', 'You should not handle your phone while driving specially while using location , try this product and make your drive more safer and easier', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1671221173-51LnGAR9h6L._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=980:*', 8) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Mirror screen protector', 'Protect your mirror from water and damage', 'https://m.media-amazon.com/images/I/61uT8J0LaKL.jpg', 6) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Car air condition outlet decoration', 'Contains 10 pieces It is placed on the vents of the air conditioner, to give an aesthetic image, Fits all types of cars', 'https://doublem-jo.com/cdn/shop/products/5c0e27004bf12f4ac1027ba1-large_500x.jpg?v=1588722272', 3) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Car front bumper lip body kit', 'Protect your car from damage , Easy to install, Long service life and durability ,Practical and beautiful', 'https://doublem-jo.com/cdn/shop/products/2_c9ad79d4-f587-4044-8982-45a097bd9886_500x.jpg?v=1603205692', 12) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Rainproof blades', 'Rainproof blades help prevent rain from forming, providing you with a clearer rear view and a safer driving, On a sunny day the blades reduce dust attached to the rear view mirror', 'https://doublem-jo.com/cdn/shop/products/1582635180677_1576066125270_58d0a0d15dbcd6534d915269-0-large_400x.jpg?v=1588171709', 3) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('No. 1 Car Mat', 'Keeps the car clean from dirt, Protects the car floor from damage and damage, Make your car look more sparkling, Keep your vehicle clean for longer periods of time by using a variety , of heavy-duty floor mats for the front and rear seats of your vehicle', 'https://doublem-jo.com/cdn/shop/products/1582637612118_1575973260050_autokoberce-gumove-no.1-sada-2x-predni-2x-zadni-vy-0.jpg.big_400x.jpg?v=1588027865', 10) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Scraper wipers for car windows', 'Practical and modern design ensures effective water removal from glass ,It lasts for a relatively long time,The water skimmed without making, any noise', 'https://doublem-jo.com/cdn/shop/products/0f6144337af26ca1ded4ae4716bc3955_500x.jpg?v=1604521950', 3) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Car Bumper Protector', 'It protects against scratching and gives aesthetic appeal to the Timbun, It can be used on all types of cars ,High grade anti-scrape rubber, Is soft and strong, Decoration for your car, and make your car more unique', 'https://doublem-jo.com/cdn/shop/products/HTB1c8mZmOMnBKNjSZFoq6zOSFXad_500x.jpg?v=1620214323', 5) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Car Storage Bag', 'Car luggage carrier, Small size, large capacity, Easy to install, just hang on the car air outlet, You can store pens, mobile phone, glasses, cigarettes, cards and other, things, keep your car clean', 'https://doublem-jo.com/cdn/shop/products/1582362768741_1574160459942_5dbbfc5c3e1f100f0085194b-0-large_400x.jpg?v=1587817315', 5) RETURNING *;
INSERT INTO accessories (name, description, img, price) values ('Car Rearview Auxiliary Blind Spot Mirror', '360 degree car blind spot mirror, Wide angle adjustable and swivel, Clarifies the vision for the driver and facilitates the process of, driving when backing and overtaking', 'https://doublem-jo.com/cdn/shop/products/5f083758fb7f653716e8c7eb-large_500x.jpg?v=1602497781', 7) RETURNING *;
