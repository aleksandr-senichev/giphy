# Giphy Panel - React Plugin

It is the simple react giphy-panel plugin for the Grafana platform.
From the tech point that I've tried to do it as simple as possible, 
therefore the React app doesn't have any side state managers 
and it doesn't follow presentational and container components strategy.

# Initial react boilerplate with linter, prettier for Grafana project
https://github.com/grafana/simple-react-panel

# Installation for dev
1. yarn or npm install
2. yarn build or npm run build

# Docker installation
docker run -d -p 3000:3000 --name=grafana -e "GF_INSTALL_PLUGINS=https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1TfrqG0fatQ2xzY0Rq5XQjcsfmU99zPiL;giphy-panel" asenichev/giphy-panel:demo