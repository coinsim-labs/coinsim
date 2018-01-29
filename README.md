
### What is this repository for? ###

* Social Trading Simulator
* Service to train Tradingbots

### How do I get set up? ###

* clone repository
* cd ./coinsim-gruppe9
* docker-compose build
* docker-compose up -d
* docker exec -it coinsimgruppe9_web_1 python mockdata.py 
	* create mockdata for testuser
* open http://localhost/ in browser
	* username: "user", password: "user"
	* For API documentation: http://localhost/api/v1/docs/

### Who do I talk to? ###

* Gruppe9 von SCC – Tim Schmittmann, Felix Cornelius, Thomas Bruhn