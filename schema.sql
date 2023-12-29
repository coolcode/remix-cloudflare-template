DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, created TEXT);
INSERT INTO users (id, name, created) VALUES (1, 'Alice', '2023-12-29'), (2, 'Bob', '');