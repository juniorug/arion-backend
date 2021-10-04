#!/bin/bash

rm -Rf wallet
mkdir wallet
node enrollAdmin.js && node registerUser.js
node server.js
