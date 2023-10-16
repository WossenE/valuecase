#!/bin/bash
docker run -p 6432:5432 --rm --name bananas-are-healthy -e POSTGRES_PASSWORD=carrots-are-healthy postgres
