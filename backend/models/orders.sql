CREATE TABLE orders(
  id SERIAL NOT NULL,
  user_id INT,
  service_id INT,
  created_at TIMESTAMP default now(),
  scheduled_time TIMESTAMP,
  order_status VARCHAR(255),
  employee_id INT,
  location text,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (service_id) REFERENCES services(id),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE order_accessories (
  id SERIAL NOT NULL,
  order_id INT,
  accessories_id INT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (accessories_id) REFERENCES accessories(id),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id)
);