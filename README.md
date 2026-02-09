## Start with Docker

## Install Prisma and its tools

`npm/pnpm install prisma tsx @types/pg --save-dev`
`npm/pnpm install @prisma/client @prisma/adapter-pg dotenv pg`

## Init Prisma

`npx prisma init`

- This will create `prisma/schema.prisma` and `prisma.config.ts`
- You can change the `prisma/schema.prisma` for output path generated path but can leave as default.
- We need generated prismaClient for Creating Prisma Client Singleton in `/lib/prisma.ts`.

or use the command to specify where you want generated output: `npx prisma init --db --output ../app/generated/prisma`

## Create and migrate Schema

- Create todo Schema in `prisma/schema.prisma`
- Migrate the schema `npx prisma migrate dev --name init`
  - create sql migrations files in `prisma/migrations`

## Generate Prisma Client

`npx prisma generate`

- This will generate the prisma client in the folder specified in `prisma/schema.prisma` output
- Now using the generated client create singleton prisma client instance in `lib/prisma.ts` also uses pg-adapter there.

## Using Docker Image for Postgres

- create `docker-compose.yml` file and write the services you want to use and their specifications.
- run: `docker-compose up -d` to run all the spcified image in container in docker and can be accessed

