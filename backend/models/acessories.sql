  CREATE TABLE accessories (
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL UNIQUE,
  price INT,
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);
  
  
  {
            "id": 2,
            "name": "Andobil Phone holder",
            "description": "You should not handle your phone while driving specially while using location , try this product and make your drive more safer and easier",
            "img": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1671221173-51LnGAR9h6L._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
            "price": 9,
            "is_deleted": 0
        },
        {
            "id": 4,
            "name": "Mirror screen protector",
            "description": "Protect your mirror from water and damage",
            "img": "https://m.media-amazon.com/images/I/61uT8J0LaKL.jpg",
            "price": 3,
            "is_deleted": 0
        },
        {
            "id": 3,
            "name": "Mirror screen protector",
            "description": "Protect your mirror from water and damage",
            "img": "https://m.media-amazon.com/images/I/61uT8J0LaKL.jpg",
            "price": 6,
            "is_deleted": 0
        },
        {
            "id": 5,
            "name": "Car air condition outlet decoration",
            "description": "Contains 10 pieces It is placed on the vents of the air conditioner, to give an aesthetic image, Fits all types of cars",
            "img": "https://doublem-jo.com/cdn/shop/products/5c0e27004bf12f4ac1027ba1-large_500x.jpg?v=1588722272",
            "price": 2,
            "is_deleted": 0
        },
        {
            "id": 6,
            "name": "Car front bumper lip body kit",
            "description": "Protect your car from damage , Easy to install, Long service life and durability ,Practical and beautiful",
            "img": "https://doublem-jo.com/cdn/shop/products/2_c9ad79d4-f587-4044-8982-45a097bd9886_500x.jpg?v=1603205692",
            "price": 12,
            "is_deleted": 0
        },
        {
            "id": 7,
            "name": "Rainproof blades",
            "description": "Rainproof blades help prevent rain from forming, providing you with a clearer rear view and a safer driving, On a sunny day the blades reduce dust attached to the rear view mirror.",
            "img": "https://doublem-jo.com/cdn/shop/products/1582635180677_1576066125270_58d0a0d15dbcd6534d915269-0-large_400x.jpg?v=1588171709",
            "price": 3,
            "is_deleted": 0
        },
        {
            "id": 8,
            "name": "No. 1 Car Mat",
            "description": "Keeps the car clean from dirt, Protects the car floor from damage and damage, Make your car look more sparkling, Keep your vehicle clean for longer periods of time by using a variety , of heavy-duty floor mats for the front and rear seats of your vehicle.",
            "img": "https://doublem-jo.com/cdn/shop/products/1582637612118_1575973260050_autokoberce-gumove-no.1-sada-2x-predni-2x-zadni-vy-0.jpg.big_400x.jpg?v=1588027865",
            "price": 10,
            "is_deleted": 0
        },
        {
            "id": 9,
            "name": "Scraper wipers for car windows",
            "description": "Practical and modern design ensures effective water removal from glass ,It lasts for a relatively long time,The water skimmed without making, any noise",
            "img": "https://doublem-jo.com/cdn/shop/products/0f6144337af26ca1ded4ae4716bc3955_500x.jpg?v=1604521950",
            "price": 3,
            "is_deleted": 0
        },
        {
            "id": 10,
            "name": "Car Bumper Protector",
            "description": "It protects against scratching and gives aesthetic appeal to the Timbun, It can be used on all types of cars ,High grade anti-scrape rubber, Is soft and strong, Decoration for your car, and make your car more unique",
            "img": "https://doublem-jo.com/cdn/shop/products/HTB1c8mZmOMnBKNjSZFoq6zOSFXad_500x.jpg?v=1620214323",
            "price": 5,
            "is_deleted": 0
        }