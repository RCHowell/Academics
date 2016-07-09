#!/bin/bash
mongoimport -h 127.0.0.1 --port 3001 -d meteor -c binders --type csv --file ./binder_data.csv --headerline
