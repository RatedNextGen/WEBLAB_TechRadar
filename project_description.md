# Technologie-Radar – Ergänzende Projektbeschreibung

Die allgemeine Projektbeschreibung ist hier zu finden: https://github.com/web-programming-lab/web-programming-lab-projekt/blob/main/Technologie-Radar.md

## Technologie-Stack
Für die Umsetzung des Projekts ist folgender Technologie-Stack vorgesehen:
* **Frontend**: Angular
* **Backend**: ExpressJS
* **Datenbank**: MongoDB
* **Containerisierung**: Docker
* **VCS**: GitHub Repo: https://github.com/RatedNextGen/WEBLAB_TechRadar

## Architektur & Containerisierung
Das Projekt wird so strukturiert, dass es mit Docker gestartet werden kann. Dafür sind folgende Container vorgesehen:
* UI-Container: Beinhaltet das Angular-Frontend
* Backend-Container: Hosten der ExpressJS-Anwendung
* Datenbank-Container: MongoDB zur Datenspeicherung

## CI/CD & Automatisierung
Für die Entwicklung und Qualitätssicherung werden einfache Build- und Test-Stages mit GitHub Actions eingerichtet.
* Automatisierte Builds zur Sicherstellung der Konsistenz
* Tests zur Validierung der Codequalität
* **Kein** Deployment der Artefakte vorgesehen

