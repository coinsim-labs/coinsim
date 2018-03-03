
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
		* Ausarbeitung der Anforderungen für Projekt
			* Nutzer hat Startguthaben
			* Nutzer kann Guthaben in Kryptowährungen umtauschen
				* Kurse sollen von fremder API geholt werden
			* Nutzer hat graphisch Ansprechende Übersicht zu:
				* Kryptowährungen
				* Eigenem Wallet
		* Auswahl der Technologien
			* Frontend: Angular2, Core UI als Template, Highstock/Highcharts für Graphen
			* Backend: Django, PostgresSQL
			* Für Authentifizierung JWTs
			* Docker
		* Feature wurden dokumentiert und zugewiesen mit Trello Board
		* (fast) wöchentliche Treffen um entstandene Fragen zu klären
		* 2 kleine "Hackathons" gehostet Tim
	* Schnittstellenbeschreibung des Web Service (
		* API documentation: http://localhost/api/v1/docs/
    * Bedienungsanleitung für Clients
		* Verweis auf "How do I get set up?" oben
	* Feedback + Kritik am Praktikum
		* Wir waren alle zufrieden mit dem Praktikum
		* Es war schön sich seine eigene Aufgabe auszudenken und über verwendete Technologien entscheiden zu können
		
* Gruppe9 von SCC – Tim Schmittmann, Felix Cornelius, Thomas Bruhn