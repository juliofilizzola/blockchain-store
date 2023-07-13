install:
	yarn

start-docker:
	docker-compose up

generate-db:
	yarn prisma generate

deploy-db:
	yarn prisma migrate deploy && yarn prisma migrate dev

run-seed:
	yarn prisma db seed

start-dev:
	yarn start:dev