# Running api js

Steps for setting up and running api-js

1. First install `npm` dependencies 
```shell 
npm i
```

2. Create `.env` file at path `/apijs/.env` with content

```
DATABASE_URL="mysql://<username>:<password>@localhost:<port>/<dbName>"
```

3. Sync database with schema 
```
npx prisma db push
```

4. Generate prisma client
```
npx prisma generate
```
5. Finally start server with
```
npm run start
```





