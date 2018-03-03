
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

### Dokumentation ###
* Angaben zum Team, Vorgehensweise:
	* Team: Tim Schmittmann, Felix Cornelius, Thomas Bruhn
	* Vorgehensweise:
		* gemeinsame Ideenfindung
		* Ausarbeitung der Anforderungen f�r Projekt
			* Nutzer hat Startguthaben
			* Nutzer kann Guthaben in Kryptow�hrungen umtauschen
				* Kurse sollen von fremder API geholt werden
			* Nutzer hat graphisch Ansprechende �bersicht zu:
				* Kryptow�hrungen
				* Eigenem Wallet
		* Auswahl der Technologien
			* Frontend: Angular2, Core UI als Template, Highstock/Highcharts f�r Graphen
			* Backend: Django, PostgresSQL
			* F�r Livekurse � CryptoCompare API https://www.cryptocompare.com/api/
			* F�r Authentifizierung � JWTs https://www.jwt.io
			* F�r Container � Docker https://www.docker.com/
			* F�r Informationen zu Crypow�hrungen � CoinGecko https://www.coingecko.com/en
		* Feature wurden dokumentiert und zugewiesen mit Trello Board
		* (fast) w�chentliche Treffen um entstandene Fragen zu kl�ren
		* 2 kleine "Hackathons" gehostet Tim
	* Schnittstellenbeschreibung des Web Service (
		* API documentation: http://localhost/api/v1/docs/
    * Bedienungsanleitung f�r Clients
		* Verweis auf "How do I get set up?" oben
	* Feedback + Kritik am Praktikum
		* Wir waren alle zufrieden mit dem Praktikum
		* Es war sch�n sich seine eigene Aufgabe auszudenken und �ber verwendete Technologien entscheiden zu k�nnen
		
* Gruppe9 von SCC � Tim Schmittmann, Felix Cornelius, Thomas Bruhn