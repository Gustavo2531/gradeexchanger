#!/bin/bash

# This script sets up the environment property for 
# mongo ds253918.mlab.com:53918/restauthgradeexchanger -u <dbuser> -p <dbpassword> 
#Mongo DB loopback connector. This property is used
# by REST server for connecting with the MongoDB 
# instance in the cloud | local

#1. Set up the REST server to multi user mode    true | false
export COMPOSER_MULTIUSER=true

# PLEASE CHANGE THIS TO point to your DB instance
# ================================================
# HOST = DB Server host,   PORT = Server port#
# database = Name of the database
# Credentials =>    user/password 
# connector   =>    We are using mongodb, it can be 
#                   any nosql database

export COMPOSER_DATASOURCES='{
    "db": {
        "name": "db",
        
        "host": "ds253918.mlab.com",
        "port": 53918,
       
        "database": "restauthgradeexchanger",

        "user": "test",
        "password": "test",

        "connector": "mongodb"  
    }
}'

# Execute the script for enabling authentication
./rs-auth-github.sh
