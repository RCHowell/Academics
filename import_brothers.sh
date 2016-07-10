#!/bin/bash
mongoimport -h 127.0.0.1 --port 3001 -d meteor -c brothers --type csv --file ./brother_data.csv --headerline
