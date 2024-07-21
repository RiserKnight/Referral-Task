Make appropriate changes in .env file

npm i

npx prisma migrate dev --name add_enrollment_date

npx prisma generate

npm start

Post Request eg. Postman

http://localhost:3000/store

body > raw > json

{
"yourName": "Jhon",
"yourEmail": "john@example.com",
"friendsName": "Jane Smith",
"friendsEmail": "riser.aayush@gmail.com",
"courseID": 105
}
