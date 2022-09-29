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
export FRONTEND_SERVICE=dpia-frontend

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: help

##############################################################################
# Setup Commands
##############################################################################

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
# Docker Development
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
# Development environment specefic commands
##############################################################################

restart-dev: ## Restart local docker environment (n=service name)
	$(info Restart local docker environment)
	@make stop-dev n=$(n)
	@make up-dev n=$(n)

refresh-dev: ## Recreates local docker environment (n=service name)
	$(info Recreates local docker environment)
	@make stop-dev n=$(n)
	@make build-dev n=$(n)
	@make up-dev n=$(n)

up-dev: ## Runs the local containers (n=service name)
	@echo "$(P) Running client and server..."
	@docker-compose -f docker-compose.dev.yaml up -d $(n)

down-dev: ## Stops the local containers and removes them
	@echo "$(P) Stopping client and server..."
	@docker-compose -f docker-compose.dev.yaml down

stop-dev: ## Stops the local containers
	@echo "$(P) Stopping client and server..."
	@docker-compose -f docker-compose.dev.yaml stop ${n}

build-dev: ## Builds the local containers (n=service name)
	@echo "$(P) Building images..."
	@docker-compose -f docker-compose.dev.yaml build --no-cache $(n)

rebuild-dev: ## Build the local contains (n=service name) and then start them after building
	@make build n=$(n)
	@make up-dev n=$(n)

exec: ## Access the development workspace (n=service name)
	@echo "Shelling into local application..."
	@docker exec -it $(n) bash

logs: ## Access application logs (n=service name)
	@echo "Watching logging output for local development container..."
	@docker logs -f $(shell docker inspect --format="{{.Id}}" ${n})

##############################################################################
# Local development commands
##############################################################################

build-local-development:
	@echo "+\n++ Building local development Docker image...\n+"
	@make build-dev n=$(API_SERVICE)
	@make build-dev n=$(FRONTEND_SERVICE)
	
build-local-production:
	@echo "+\n++ Building local production Docker image...\n+"
	@make build n=$(API_SERVICE)
	@make build n=$(FRONTEND_SERVICE)

run-local-development:
	@echo "+\n++ Running development container locally\n+"
	@make up-dev n=$(API_SERVICE)
	@make up-dev n=$(FRONTEND_SERVICE)

run-local-production:
	@echo "+\n++ Running production container locally\n+"
	@make up n=$(API_SERVICE)
	@make up n=$(FRONTEND_SERVICE)

restart-local-development:
	@echo "+\n++ Restart local development...\n+"
	@make restart-dev n=$(API_SERVICE)
	@make restart-dev n=$(FRONTEND_SERVICE)
	
restart-local-production:
	@echo "+\n++ Restart local production...\n+"
	@make restart n=$(API_SERVICE)
	@make restart n=$(FRONTEND_SERVICE)

refresh-local-development:
	@echo "+\n++ Refresh local development...\n+"
	@make refresh-dev n=$(API_SERVICE)
	@make refresh-dev n=$(FRONTEND_SERVICE)
	
refresh-local-production:
	@echo "+\n++ Refresh local production...\n+"
	@make refresh n=$(API_SERVICE)
	@make refresh n=$(FRONTEND_SERVICE)

rebuild-local-development:
	@echo "+\n++ Rebuild local development...\n+"
	@make rebuild-dev n=$(API_SERVICE)
	@make rebuild-dev n=$(FRONTEND_SERVICE)
	
rebuild-local-production:
	@echo "+\n++ Rebuild local production...\n+"
	@make rebuild n=$(API_SERVICE)
	@make rebuild n=$(FRONTEND_SERVICE)

close-local-development:
	@echo "+\n++ Closing local development container\n+"
	@make down-dev

close-local-production:
	@echo "+\n++ Closing local production container\n+"
	@make down

api-development-workspace:
	@echo "Shelling into local API application..."
	@make exec n=$(API_SERVICE)

frontend-development-workspace:
	@echo "Shelling into local Frontend application..."
	@make exec n=$(FRONTEND_SERVICE)

api-logs:
	@echo "Watching logging output for local API development container..."
	@make logs n=$(API_SERVICE)

frontend-logs:
	@echo "Watching logging output for local API development container..."
	@make logs n=$(FRONTEND_SERVICE)
