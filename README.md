# c9-back

Backend para C9

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

## Variables de entorno

```bash
cp .env.example .env
```

dentro del archivo .env se debe configurar la url del backend

```bash
POSTGRES_HOST=localhost
POSTGRES_USER=root
POSTGRES_PASSWORD=toor
POSTGRES_DB=database
POSTGRES_PORT=5432

NODE_ENV=development

PORT=3000
SECRET=security-key

FRONT_URL=http://localhost:3001

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
```
