#!/bin/bash

rm -Rf wallet/*
node enrolladmin.js && node registerEnrollClientUser.js
node server.js
