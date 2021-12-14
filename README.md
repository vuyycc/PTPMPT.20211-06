# Phát triển phầm mềm phân tán - Nhóm 6 - Xây dựng Game Caro Online

## Description
- The server stores information about the game. Everyone will sign up and sign in to their account to play the game. After successful login, the user can create a table or choose any table to play and can also view the player rankings.
During the game, players can chat (1:1) with each other through the box text chat or voice chat.
Using Nodejs, Reactjs, Socket IO.

## Members
- Trần Đoàn Vũ
- Ngô Đình Long
- Lê Thị Liên

# The project is using
- Font-end: ReactJS, Material UI
- Back-end: NodeJS, ExpressJS
- Database: MySQL

## The project has the following screens:
- Screens SignIn/SignUp.
- Sreens Home: Can create tables, search and select playing table.
- Screens Rank: Show the 10 players with the top score.
- Screens Game Match: Show chess board, box chat, box voice chat.

# Docker
## Go into server folder
$ cd server
## Install dependencies
$npm install
## 1: Running docker:
If you want to run separate be and ui, just go to folder
docker build -t [name] . ** After build **
docker run -dp 3000:8080 [name] 
Run docker-compose
Just run
docker-compose up -d at the folder contain the dockercompose.yml
After
If you can use, maybe the database is not ready

run "docker ps" to find the db container
"docker exec -it [container name] bash" to enter the command line
"mysql -u root -p"
"admin"
"create database carodb;"
"exit;"
"exit"
"docker-compose restart"
"docker-compose stop".
