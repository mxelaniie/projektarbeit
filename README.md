Projekbeschreibung
Diese Webapplikation analysiert den Anteil von Kindern im Vergleich zu erwachsenen Fussgängern an der Bahnhofstrasse (Nord, Mitte, Süd) sowie an der Lintheschergasse in Zürich.

Fragestellung:
Wann ist der Anteil der Kinder im Vergleich zu den erwachsenen Fussgängern am grössten?

Funktionalität

- Header
  - Auswahl von Standort und Jahr
  - Anzeige der durchschnittlichen Temperatur
  - Auswahl des Designs (Standard oder Dunkel)
- MainArea (Hauptansicht)
  - Balkendiagramm: Kinderanteil pro Monat
  - Tooltip beim Überfahren der Balken mit:
    - Monat
    - Anzahl Kinder
    - Anzahl Erwachsene
    - Kinderanteil in Prozent
- Sidebar
  - Höchster Kinderanteil im ausgewählten Jahr
  - Durchschnittlicher Kinderanteil im Jahr
  - Monat mit den meisten Kindern
  - Monat mit den meisten Erwachsenen
  - Gesamtanzahl Kinder und Erwachsene
  - Interaktive Karte zur Standortauswahl (Klick wechselt den Standort)

Projektstruktur
Das Projekt besteht aus zwei Komponenten:

- Backend (FastAPI): CSV-Datenimport und Bereitstellung von Datenabfragen
- Frontend (React + Vite): Interaktive Visualisierung sowie Filter- und Auswahlmöglichkeiten

Anwendung starten:
Backend starten: uvicorn main:app --reload (Bsp. http://localhost:8000/analyse/kinder_anteil?analyseort=Bahnhofstrasse%20(Mitte))
Frontend Starten: npm run dev

Datenquelle
Die verwendeten Daten stammen aus dem Data Portal der Stadt Zürich: https://data.stadt-zuerich.ch/dataset/hystreet_fussgaengerfrequenzen.
Die Daten weisen z.T. Lücken auf. Die Gründe dafür sind der Beschreibugn zum Datensatz zu entnehmen.

Nutzung

1. Backend starten
2. Frontend starten
3. Standort und Jahr auswählen
4. Durchschnittstemperatur anzeigen oder ausblenden
5. Design wählen
6. Diagramm, Sidebar und Karte analysieren
7. Tooltip durch hovern über Elemente
