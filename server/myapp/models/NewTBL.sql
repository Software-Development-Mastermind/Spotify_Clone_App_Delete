CREATE TABLE NewTBL (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(120) NOT NULL
);

INSERT INTO NewTBL (username, email, password) VALUES ('testuser', 'test@email.com', 'password123');

SELECT * FROM NewTBL;
