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

api-setup-env:
	@echo "+\n++ Make: Preparing environment for the project...\n+"
	@cp src/backend/.config/.env.local src/backend/.env

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
	@docker-compose -f docker-compose.local.yaml up -d $(n)

down: ## Stops the local containers and removes them
	@echo "$(P) Stopping and removing client and server..."
	@docker-compose -f docker-compose.local.yaml down

stop: ## Stops the local containers
	@echo "$(P) Stopping client and server..."
	@docker-compose -f docker-compose.local.yaml stop ${n}

build: ## Builds the local containers (n=service name)
	@echo "$(P) Building images..."
	@docker-compose -f docker-compose.local.yaml build --no-cache $(n)

rebuild: ## Build the local contains (n=service name) and then start them after building
	@make build n=$(n)
	@make up n=$(n)

exec: ## Access the development workspace (n=service name)
	@echo "Shelling into local application..."
	@docker exec -it $(n) sh

logs: ## Access application logs (n=service name)
	@echo "Watching logging output for local development container..."
	@docker logs -f $(shell docker inspect --format="{{.Id}}" ${n})

##############################################################################
# APP commands
##############################################################################

app-run:
	@echo "+\n++ Running app containers...\n+"
	@make up n=$(API_SERVICE)
	@make up n=$(FRONTEND_SERVICE)

app-build:
	@echo "+\n++ Building app images...\n+"
	@make build n=$(API_SERVICE)
	@make build n=$(FRONTEND_SERVICE)

app-restart:
	@echo "+\n++ Restarting app containers...\n+"
	@make restart n=$(API_SERVICE)
	@make restart n=$(FRONTEND_SERVICE)

app-rebuild:
	@echo "+\n++ Rebuilding app containers...\n+"
	@make rebuild n=$(API_SERVICE)
	@make rebuild n=$(FRONTEND_SERVICE)

api-workspace:
	@echo "+\n++ Shelling into the API application...\n+"
	@make exec n=$(API_SERVICE)

frontend-workspace:
	@echo "+\n++ Shelling into the Frontend application...\n+"
	@make exec n=$(FRONTEND_SERVICE)

api-logs:
	@echo "+\n++ Watching logging output for the API container...\n+"
	@make logs n=$(API_SERVICE)

frontend-logs:
	@echo "+\n++ Watching logging output for the Frontend container...\n+"
	@make logs n=$(FRONTEND_SERVICE)
