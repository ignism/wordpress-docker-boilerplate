#!/usr/bin/env bash

# copy config files
cp ./config/html/.htaccess ./server/html/; cp ./config/html/index.php ./server/html/; cp ./config/public/wp-config.php ./server/public/;

# config theme
node config/theme-config.js;