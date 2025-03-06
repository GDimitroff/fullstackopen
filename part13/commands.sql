CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) 
VALUES ('John Doe', 'https://example.com/first-blog', 'Getting Started with PostgreSQL', 5);

INSERT INTO blogs (url, title) 
VALUES ('https://example.com/second-blog', 'Deploying Apps on Fly.io');