#!/usr/bin/make

# Credit: @Fosol, @asanchezr for creating and maintaining the bcgov/PIMS 
SHELL := /usr/bin/env bash

ifneq ($(OS),Windows_NT)
POSIXSHELL := 1
else
POSIXSHELL :=
endif

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: help

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
	@echo "$(P) Stopping client and server..."
	@docker-compose down

build: ## Builds the local containers (n=service name)
	@echo "$(P) Building images..."
	@docker-compose build --no-cache $(n)

rebuild: ## Build the local contains (n=service name) and then start them after building
	@make build n=$(n)
	@make up n=$(n)
