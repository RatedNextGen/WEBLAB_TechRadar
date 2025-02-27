# Fazit und Reflexion

## Fazit
Während der Entwicklung des TechRadar-Projekts konnten viele wichtige Erfahrungen gesammelt werden. Besonders positiv war die Entscheidung, ein **NX Monorepo** zu nutzen, da es geholfen hat, den Code übersichtlich zu strukturieren und Wiederverwendbarkeit zu fördern. Es bot die Möglichkeit, in die Monorepo-Welt einzutauchen, und ich werde es sicherlich für weitere Projekte in Erwägung ziehen.
Die Kombination aus **Angular für das Frontend** und **Express.js für das Backend** hat sich als praktikabel erwiesen. Durch die gemeinsame Nutzung von **DTOs und Models** konnte eine einheitliche Datenstruktur geschaffen und Duplikate vermieden werden.

Ein großer Pluspunkt war die Implementierung der **JWT-Authentifizierung mit httpOnly-Cookies**, da sie die Sicherheit verbessert hat. Zudem haben **automatisierte Tests** geholfen, die Codequalität zu sichern. Auch die Nutzung von **GitHub Actions für CI** hat sich als hilfreich erwiesen, um eine konstante Codeüberprüfung zu gewährleisten.

## Reflexion
Natürlich gab es während des Projekts auch einige Herausforderungen, aus denen ich viel gelernt habe:

### Technische Herausforderungen
- **Validierung:** Aktuell ist die Validierung zum Teil redundant aufgebaut. Ich denke, dass sie in gewissem Maße konsolidiert werden könnte.
- **Testing:** Zunächst hatte ich Probleme mit dem Schreiben der Tests, da der Service-Layer abhängig von der Datenbank war. Ich habe dies durch das Prinzip der **Dependency Inversion (DIP)** entkoppelt und dann gemockt. Abgesehen davon war es für mich neu, in ExpressJS und Angular mit Jest Tests zu schreiben. Nach einiger Zeit hatte ich jedoch den Dreh raus.

### Arbeitsweise
Statt gleich grosse Features (in Form der geforderten Stories) umzusetzen, habe ich die Stories noch einmal in Frontend- und Backend-Stories unterteilt. Im Nachhinein denke ich, dass dies keine schlechte Idee war, jedoch hätte ich die Reihenfolge, in der ich die Stories gestartet habe, überdenken sollen. Es kam manchmal vor, dass ich eine Story angefangen habe, für die ich jedoch eine Funktion aus einer noch nicht umgesetzten Story benötigte.

### Verbesserungspotenziale
- **Mehr Tests:** Besonders im Backend könnten noch mehr Tests geschrieben werden.
- **Besseres Styling:** Statt plain CSS und Angular Material hätte ich gerne auch mal etwas mit Tailwind oder Bootstrap ausprobiert. Dadurch kam ein schönes, einheitliches UI leider etwas zu kurz.

### Fazit der Reflexion
Insgesamt bin ich sehr zufrieden mit dem Projekt und konnte viel mitnehmen – insbesondere im Bereich Testing habe ich viel Neues gelernt. NX werde ich für zukünftige Projekte definitiv wieder nutzen!