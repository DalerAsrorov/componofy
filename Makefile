
.PHONY: default

clean:
	docker rm componofy

build:
	docker build . --tag=componofy:latest

shell:
	docker run -p 1234:3001 -v $(PWD):/componofy -it componofy:latest bash

run-client:
	docker run -p 1235:3000 -it componofy:latest yarn start:dev

run-server:
	docker run -p 1234:3001 -it componofy:latest yarn start:api

stop:
	docker stop -t 0 componofy