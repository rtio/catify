.PHONY: docker
## Run docker-build, followed by docker-compose
docker: build compose

.PHONY: build
## Build catify docker image for
build:
	docker build -t catify:local .

.PHONY: compose
## Run catify locally with docker-compose
compose:
	docker compose up -d

.PHONY: lint
## Run catify lint in a container
lint:
	docker compose run catify yarn lint

.PHONY: test
## Run catify tests
test:
	yarn test
