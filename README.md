# c9-back
Backend para C9

Una vez descargado el Repo, se procede a realizar la instalación de las dependencias con:

`npm install`

Luego, se debe levantar el docker para que corra la base de datos:

`docker compose up -d` o en ubuntu (linux) `sudo docker compose up -d`

Ya con la base de datos corriendo en la imagen de docker, se procede a generar las migraciones:

`npm run migration:generate`

luego, se corren las migraciones:

`npm run migration:run`

para finalmente correr el script de las seed:

`npm run seed`.

Con esto, correremos las migraciones y se poblará la base de datos con la data generada en los seeds.

Y finalmente, para correr el servidor, se procede a ejecutar:

`npm run dev`

## Información extra

* en caso de necesitar borrar la base de datos para hacer cambios a nivel estructural o correr mas seeds, se pueden dropear las tablas y despoblar la base de datos con:

`npm run db:drop`

* Además, a nivel de estructura, typeORM crea una Entity User, un UserController y las routes de User del CRUD básico, por lo que, esta información no se borrará aún para que, en caso de que les sirva, puedan generar el CRUD de la Entity Publication usando como guía las routes de User.