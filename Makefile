generate-db:
	yarn prisma generate

deploy-db:
	yarn prisma migrate deploy && yarn prisma migrate dev

start-docker:
	docker-compose up

start-dev:
	yarn start:dev