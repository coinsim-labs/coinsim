
### What is this repository for? ###

* Social Trading Simulator
* Service to train Tradingbots

### How do I get set up? ###

* `git clone https://bitbucket.org/tudresden/coinsim-gruppe9.git && cd coinsim-gruppe9`
* Windows only: `move env.win env`
* `docker-compose build`
* `docker-compose up -d`
* `docker exec -it coinsimgruppe9_web_1 python mockdata.py` (creates mockdata for testuser)
* Open http://localhost/ in browser
	* Login with username: "user", password: "user"
	* For API documentation: http://localhost/api/v1/docs/

### Note to Windows users
Make sure you clone the repo "as-is" and have git `core.autocrlf` set to `false`. 
Otherwise you will get into problems because of Windows-style line endings.
You can set it manually with `git config --global core.autocrlf false`

### Who do I talk to? ###

* Gruppe9 von SCC – Tim Schmittmann, Felix Cornelius, Thomas Bruhn