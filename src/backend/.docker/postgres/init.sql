/*
  init DB script, creating database, user and user grant to newly created database for DPIA project
/*

CREATE DATABASE dpia;
CREATE USER dpia_user WITH ENCRYPTED PASSWORD 'CHANGE_ME';
GRANT ALL PRIVILEGES ON DATABASE dpia TO dpia_user;
