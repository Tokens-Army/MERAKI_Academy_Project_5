CREATE TABLE users(
  id SERIAL NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);
INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ('mohammad','alawneh','mohammad@gmail.com','12345678',2) RETURNING *;
INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ('ali','ikmail','ali@gmail.com','12345678',2) RETURNING *;
INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ('saad','habashneh','saad@gmail.com','12345678',2) RETURNING *;
INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ('ahmed','ahmed','ahmed@gmail.com','12345678',1) RETURNING *;
INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ('yousef','yousef','yousef@gmail.com','12345678',1) RETURNING *;

CREATE TABLE employees (
  id SERIAL NOT NULL,
  name VARCHAR(255),
  img TEXT,
  phoneNum VARCHAR(255),
  PRIMARY KEY (id)
);
INSERT INTO employees (name, img,  phoneNum) VALUES ('YOUSEF AlShereif','https://randomuser.me/api/portraits/med/men/45.jpg','+96258828787') RETURNING *;
INSERT INTO employees (name, img,  phoneNum) VALUES ('Aleksi Aleksi','https://randomuser.me/api/portraits/med/men/95.jpg','+96258828787') RETURNING *;
INSERT INTO employees (name, img,  phoneNum) VALUES ('Jameel Yaser','https://randomuser.me/api/portraits/med/men/64.jpg','+96258828787') RETURNING *;


