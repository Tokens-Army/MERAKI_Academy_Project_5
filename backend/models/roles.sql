CREATE TABLE roles (
  id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
INSERT INTO roles (role) VALUES ('User') RETURNING *;
INSERT INTO roles (role) VALUES ('Admin') RETURNING *;

CREATE TABLE permissions (
  id SERIAL NOT NULL,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
INSERT INTO permissions (permission) VALUES ('ADD_ORDER') RETURNING *;
INSERT INTO permissions (permission) VALUES ('CREATE_SERVICE') RETURNING *;
INSERT INTO permissions (permission) VALUES ('CREATE_ACCESSORY') RETURNING *;


CREATE TABLE role_permission (
  id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  PRIMARY KEY (id)
);
INSERT INTO role_permission (role_id, permission_id) VALUES (1,1) RETURNING *;
INSERT INTO role_permission (role_id, permission_id) VALUES (2,2) RETURNING *;
INSERT INTO role_permission (role_id, permission_id) VALUES (2,3) RETURNING *;

