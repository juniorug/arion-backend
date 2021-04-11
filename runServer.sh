#!/bin/bash

rm -Rf wallet
mkdir wallet
node enrolladmin.js && node registerEnrollClientUser.js
node server.js
