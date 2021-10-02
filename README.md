

### Exemplo .ENV

~~~
DB_USER=root
DB_PASS=root
DB_NAME=users_sprint_2
DB_HOST=127.0.0.1
~~~

### Exemplo .ENV.TEST

~~~
DB_DIALECT=sqlite
~~~

### Requirements

[Node.js](https://nodejs.org/en/)

### Instaling

~~~
npm install
~~~

### Create necessary tables

~~~
npx sequelize db:migrate
~~~

### Running

~~~
# run test
npm run test

# run server for production
npm run start

# run server for development
npm run dev
~~~