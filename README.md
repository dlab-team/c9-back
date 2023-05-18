# c9-back

Una vez descargado el Repo, se procede a realizar la instalación de las dependencias con:

`npm install`

Luego, se debe levantar el docker para que corra la base de datos:

`docker compose up -d` o en ubuntu (linux) `sudo docker compose up -d`

Ya con la base de datos corriendo en la imagen de docker, se procede a generar las migraciones SOLO SI ES NECESARIO (SI YA EXISTEN MIGRACIONES SALTAR AL SIGUIENTE COMANDO):

`npm run migration:generate`

luego, se corren las migraciones:

`npm run migration:run`

para finalmente correr el script de las seed:

`npm run seed`

Con esto, correremos las migraciones y se poblará la base de datos con la data generada en los seeds.

Y finalmente, para correr el servidor, se procede a ejecutar:

`npm run dev`

## Información extra

- en caso de necesitar borrar la base de datos para hacer cambios a nivel estructural o correr mas seeds, se pueden dropear las tablas y despoblar la base de datos con:

`npm run db:drop`

- Además, a nivel de estructura, typeORM crea una Entity User, un UserController y las routes de User del CRUD básico, por lo que, esta información no se borrará aún para que, en caso de que les sirva, puedan generar el CRUD de la Entity Publication usando como guía las routes de User.

- También, dentro del archivo .env se debe configurar la url del backend o directamente copiar esto en el .env:

* POSTGRES_HOST=localhost
* POSTGRES_USER=postgres
* POSTGRES_PASSWORD=postgres
* POSTGRES_DB=postgres
* POSTGRES_PORT=5432
* NODE_ENV=development
* PORT=3000
* SECRET=security-key
* FRONT_URL=http://localhost:3001
* MAIL_HOST=
* MAIL_PORT=
* MAIL_USER=
* MAIL_PASS=
* PASSWORD_SEED_UNO= (las password se deben rellenar con la clave que se estime conveniente)
* PASSWORD_SEED_DOS=
* PASSWORD_SEED_TRES=
* PASSWORD_SEED_CUARTA=
* PASSWORD_SEED_QUINTA=
