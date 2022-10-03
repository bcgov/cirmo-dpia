#!/usr/bin/make

# Credit: @Fosol, @asanchezr for creating and maintaining the bcgov/PIMS 
SHELL := /usr/bin/env bash

ifneq ($(OS),Windows_NT)
POSIXSHELL := 1
else
POSIXSHELL :=
endif

export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)
export API_SERVICE=dpia-api
export FRONTEND_SERVICE=dpia-webapp

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: help

##############################################################################
# Setup Commands
##############################################################################

api-setup-local-env:
	@echo "+\n++ Make: Preparing project for local environment...\n+"
	@cp src/backend/.config/.env.local src/backend/.env

api-setup-development-env:
	@echo "+\n++ Make: Preparing project for dev environment...\n+"
	@cp src/backend/.config/.env.dev src/backend/.env

api-setup-staging-env:
	@echo "+\n++ Make: Preparing project for staging environment...\n+"
	@cp src/backend/.config/.env.staging src/backend/.env

api-setup-production-env:
	@echo "+\n++ Make: Preparing project for production environment...\n+"
	@cp src/backend/.config/.env.production src/backend/.env	


##############################################################################
# Docker helper commands
##############################################################################

restart: ## Restart local docker environment (n=service name)
	$(info Restart local docker environment)
	@make stop n=$(n)
	@make up n=$(n)

refresh: ## Recreates local docker environment (n=service name)
	$(info Recreates local docker environment)
	@make stop n=$(n)
	@make build n=$(n)
	@make up n=$(n)

up: ## Runs the local containers (n=service name)
	@echo "$(P) Running client and server..."
	@docker-compose up -d $(n)

down: ## Stops the local containers and removes them
	@echo "$(P) Stopping and removing client and server..."
	@docker-compose down

stop: ## Stops the local containers
	@echo "$(P) Stopping client and server..."
	@docker-compose stop ${n}

build: ## Builds the local containers (n=service name)
	@echo "$(P) Building images..."
	@docker-compose build --no-cache $(n)

rebuild: ## Build the local contains (n=service name) and then start them after building
	@make build n=$(n)
	@make up n=$(n)

##############################################################################
# Local environment helper commands
##############################################################################

restart-local: ## Restart local docker environment (n=service name)
	$(info Restart local docker environment)
	@make stop-local n=$(n)
	@make up-local n=$(n)

refresh-local: ## Recreates local docker environment (n=service name)
	$(info Recreates local docker environment)
	@make stop-local n=$(n)
	@make build-local n=$(n)
	@make up-local n=$(n)

up-local: ## Runs the local containers (n=service name)
	@echo "$(P) Running client and server..."
	@docker-compose -f docker-compose.dev.yaml up -d $(n)

down-local: ## Stops the local containers and removes them
	@echo "$(P) Stopping client and server..."
	@docker-compose -f docker-compose.dev.yaml down

stop-local: ## Stops the local containers
	@echo "$(P) Stopping client and server..."
	@docker-compose -f docker-compose.dev.yaml stop ${n}

build-local: ## Builds the local containers (n=service name)
	@echo "$(P) Building images..."
	@docker-compose -f docker-compose.dev.yaml build --no-cache $(n)

rebuild-local: ## Build the local contains (n=service name) and then start them after building
	@make build n=$(n)
	@make up-local n=$(n)

exec: ## Access the development workspace (n=service name)
	@echo "Shelling into local application..."
	@docker exec -it $(n) bash

logs: ## Access application logs (n=service name)
	@echo "Watching logging output for local development container..."
	@docker logs -f $(shell docker inspect --format="{{.Id}}" ${n})

##############################################################################
# Local development commands
##############################################################################

build-local:
	@echo "+\n++ Building local development Docker image...\n+"
	@make build-local n=$(API_SERVICE)
	@make build-local n=$(FRONTEND_SERVICE)

run-local:
	@echo "+\n++ Running development container locally\n+"
	@make up-local n=$(API_SERVICE)
	@make up-local n=$(FRONTEND_SERVICE)

restart-local:
	@echo "+\n++ Restart local development...\n+"
	@make restart-local n=$(API_SERVICE)
	@make restart-local n=$(FRONTEND_SERVICE)

refresh-local:
	@echo "+\n++ Refresh local development...\n+"
	@make refresh-local n=$(API_SERVICE)
	@make refresh-local n=$(FRONTEND_SERVICE)

rebuild-local:
	@echo "+\n++ Rebuild local development...\n+"
	@make rebuild-local n=$(API_SERVICE)
	@make rebuild-local n=$(FRONTEND_SERVICE)

close-local:
	@echo "+\n++ Closing local development container\n+"
	@make down-local

api-workspace:
	@echo "Shelling into local API application..."
	@make exec n=$(API_SERVICE)

frontend-workspace:
	@echo "Shelling into local Frontend application..."
	@make exec n=$(FRONTEND_SERVICE)

api-logs:
	@echo "Watching logging output for local API development container..."
	@make logs n=$(API_SERVICE)

frontend-logs:
	@echo "Watching logging output for local API development container..."
	@make logs n=$(FRONTEND_SERVICE)
