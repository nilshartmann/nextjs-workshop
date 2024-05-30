# Workshop: Fullstack Anwendungen mit React und Next.js

Dieses Repository (https://github.com/nilshartmann/nextjs-workshop) enthält den Source-Code für die Beispiel-Anwendung sowie den Workspace für unsere Übungen. Bitte klone dir das Repository lokal auf deinen Computer.

Im folgenden findest Du beschrieben, wie du den Workspace einrichtest und die Anwendung für die Übung startest.

![Screenshot of example application](screenshot.png)

## Voraussetzungen

> Um sicherzustellen, dass der Workspace bei dir funktioniert, möchte ich dich bitten, schon im Vorfeld die hier beschriebene Installation durchzuführen.
>
> Bitte stelle aber trotzdem sicher, dass dein Computer auch während des Workshops Zugriff auf das Internet hat, um insbesondere von GitHub Repositories zu klonen bzw. updates zu machen (Git pull) und um npm Pakete installieren zu können. (Hindernisse können hier zum Beispiel VPNs, Firewalls, Firmen-Proxy oder -Sicherheitsrichtlinien sein)

Auf deinem Computer benötigst Du folgende Software:

- Node.js (mind. Version 18)
- Einen Node Package Manager, am besten pnpm
- Docker bzw. docker-compose (Ausnahmen siehe unten)
- Eine Entwicklungsumgebung, mit der du JavaScript bzw. TypeScript entwickeln kannst (z.B. Visual Studio Code, WebStorm oder IntelliJ).

### Aufbau der Anwendung

Die Anwendung besteht aus zwei Teilen, die beide das Backend darstellen:

1. Wir haben ein Backend, das unsere Daten und unsere Geschäftslogik enthält. Die Daten werden mit einer einfachen HTTP API zur Verfügung gestellt (du kannst es dir wie einen externen Dienst vorstellen, den wir in unserer Anwendung integrieren wollen). Dieses Backend bezeichne ich im folgenden einfach nur als **das Backend**. Das Backend ist "fertig" und wird im Workshop nicht weiterentwickelt.
2. Das zweite Backend ist die Node.js-Anwendung. Diese fungiert hier als eine Art "Backend for frontend". Die Anwendung kommuniziert mit dem Backend und stellt das Frontend für den Browser zur Verfügung. Diese Anwendung bezeichne ich im folgenden als **Node.js**-Anwendung. Diese Anwendung werden wir in den Übungen weiterentwickeln bzw. vervollständigen.

### Voraussetzungen für das Backend

Es gibt mehrere Möglichkeiten, wie Du das Backend starten und verwenden kannst. Im folgenden sind die einzelnen Varianten beschrieben. Weiter unten findest Du jeweils beschrieben, wie du sie verwenden kannst.

**Variante 1**: Starten per docker-compose

Das Backend gibt es als fertig gebautes Docker Image. Wenn Du Docker auf deinem Laptop installiert hast, ist die einfachste Möglichkeit, das Backend zu verwenden, über das hier enthaltene docker-compose-File den Backend-Prozess samt Datenbank zu starten. Das [Image der Backend-Anwendung liegt in der GitHub Container Registry](https://github.com/nilshartmann/nextjs-workshop/pkgs/container/nextjs-workshop). Das bedeutet, dein Laptop bzw. Docker muss in der Lage sein, Images aus der Docker und der GitHub Registry zu installieren.

In dieser Variante muss der Port `8080` verfügbar sein.

> [!TIP]
>
> **Wenn Du `docker-compose` auf deinem Laptop hast, ist dies die einfachste Variante**, das Backend zu starten.

**Variante 2**: Verwenden der gehosteten Variante in der Cloud

Ich werde das Backend während des Workshops auch in der Cloud starten. Du kannst die Next.js-Anwendung dann so konfigurieren, dass sie die Instanz in der Cloud verwendet.

- Wenn Du kein Docker auf deinem Laptop hast, oder das Docker Image nicht installieren kannst/darfst, ist diese Variante die einfachste.
- Aber: das gehostete Backend ist nicht das schnellste.
- Wenn mehrere von euch das Backend nutzen, kommt ihr euch bei schreibenden Operationen eventuell in die Quere. Das sollte technisch kein Problem sein. Du darfst dich nur nicht wundern, wenn Likes und Kommentare bei dir erscheinen, die Du nicht gegeben hast 😉.

**Variante 3**: Starten des Java-Prozesses aus deiner IDE bzw. über die Kommandozeile.

Dieses ist der aufwändigste Weg und macht aus meiner Sicht nur Sinn, wenn Du selber auch Java entwickelst und dir die Implementierung ansehen oder verändern möchtest. Du brauchst dann ein JDK 21 und Docker auf deinem Laptop. Dein Laptop muss in der Lage sein, über Gradle und Docker Pakete bzw. Images zu installieren.

In dieser Variante müssen die Ports `8080` und `8432` verfügbar sein.

**Variante 4**: GitPod

[GitPod](https://gitpod.io) ist eine vollständige Online Entwicklungsumgebung. Voraussetzung hierfür ist ein GitHub und ein GitPod-Account, die beide kostenlos sind. Du kannst das komplette Repository über GitHub in GitPod starten. Dann kannst Du entweder vollständig in GitPod arbeiten (Web, VS Code oder IntelliJ) oder Du verwendest Du nur das Backend, das in GitPod läuft, wenn Du den Workspace in GitPod gestartet hast.

- Diese Variante ist am besten, wenn Du auf deinem Laptop nichts installieren kannst (auch keine npm-Packages)
- Du benötigst nur Internet-Zugriff (Web) und einen GitHub- und GitPod-Account, die beide kostenlos sind und die Du nach dem Workshop auch wieder löschen könntest.

### Voraussetzungen für die Next.js-Anwendung

Die Next.JS-Anwendung benötigt Node.JS (mindestens Version 18). Die Pakete werden mit [pnpm](https://pnpm.io/installation) installiert. Dabei handelt es sich um einen alternativen Package-Manager zur npm, den Du über Node.js selbst aktivieren kannst. Wenn das bei dir nicht funktioniert, sollte auch npm oder yarn funktionieren. Ich habe die Installation aber nur mit pnpm getestet.

Dein Laptop muss mit dem Package Manager in der Lage sein, npm Packages runterzuladen und zu installieren.

Die Next.js-Anwendung läuft auf Port `8100`. Dieser Port muss also bei dir frei sein.

## Installation und Starten des Backends

- Zu den **Voraussetzungen** der einzelnen Varianten, s.o.

### Variante 1: Starten des Backends per docker-compose

Du kannst das fertige Backend samt Datenbank starten, in dem Du das `docker-compose-backend.yaml`-File im Root-Verzeichnis des Workspaces startest:

```
docker-compose -f docker-compose-backend.yaml up -d
```

In dem Compose-File sind der Backend-Prozess und die Datenbank beschrieben, so dass Du nichts weiter starten musst.

Wenn das Backend gestartet ist, kannst Du einmal `localhost:8080/api/recipes` im Browser öffnen. Dort sollte eine JSON-Liste mit Rezepten zurückgeliefert werden.

### Variante 2: Verwenden des Backends in der Cloud

In dieser Variante musst Du das Backend nicht starten. Stattdessen legst Du eine `.env`-Datei im Verzeichnis `workspace` an und trägst dort den Servernamen ein. Den Servernamen gebe ich dir während des Workshops (falls ich das vergesse, einfach fragen). Ich würde dich bitten, mit dem Server sorgsam umzugehen, der steht mehr oder weniger schutzlos im Internet 😉.

```
# workspace/.env

RECIPIFY_BACKEND=Der-Hostname-kommt-von-Nils-im-Workshop
```

Zum Testen der Verbindung kannst Du einmal den Cloud-Hostnamen mit dem Pfad `/api/recipes` im Browser öffnen aufrufen (https://Der-Hostname-kommt-von-Nils-im-Workshop/api/recipes).

### Variante 3: Starten des Java-Prozesses in deiner IDE

Das Java-Projekt wird mit Gradle gebaut. Wenn Du das Projekt in deiner IDE öffnest, sollte diese also in der Lage sein, Gradle-Projekte zu importieren. Das geht bei IntelliJ z.B. automatisch. Nach dem Importieren und compilieren startest Du die Spring Boot `main`-Klasse `nh.recipify.BackendApplication`.

Diese Klasse sorgt auch automatisch dafür, dass ein Docker-Container mit einer Postgres Datenbank gestartet wird. Voraussetzung dafür ist, dass Du docker-compose auf einem Computer installiert hast.

- Wenn Du IntelliJ verwendest, kannst Du die Run Configuration `01 - Run BackendApplication (with DB)` zum Starten verwenden.

> Falls Spring Boot das docker-compose-File nicht findet, mit dem die Datenbank gestartet wird, und du eine entsprechende Fehlermeldung im Log siehst, musst Du die Datei `backend/src/main/resources/application.properties` anpassen. Darin gibt es eine Property `spring.docker.compose.file`, die auf die Datei `docker-compose-backend.yaml` im Root-Verzeichnis des Repositories zeigen muss. Du kannst hier einfach den vollqualifizierten Pfad eintragen, in dem bei dir die `docker-compose-backend.yaml`-liegt.

Wenn das Backend gestartet ist, kannst Du einmal `localhost:8080/api/recipes` im Browser öffnen. Dort sollte eine JSON-Liste mit Rezepten zurückgeliefert werden.

### Variante 4: GitPod

Um den kompletten Workspace in GitPod zu starten, gibt es zwei Möglichkeiten.

- Du kannst einfach [mit diesem Link GitPod mit dem Workspace starten](https://gitpod.io/#https://github.com/nilshartmann/nextjs-workshop)
- Du öffnest die Seite https://github.com/nilshartmann/nextjs-workshop im Browser und klickst dort auf `Open`.
- Hinweis: grundsätzlich kannst Du den Workspace über Gitpod auch in einer lokalen IDE öffnen. Dazu wirst Du beim Starten von GitPod befragt. Dafür müssen aber bestimmte Voraussetzungen erfüllt sein. Weitere Informationen findest du [hier in der GitPod Dokumentation](https://www.gitpod.io/docs/references/ides-and-editors)

## Starten der Next.js-Anwendung

Die Next.js-Anwendung existiert zweimal:

1. Eine "Workspace-Version" (Verzeichnis: `workspace`). **Hier werden wir während des Workshops arbeiten und die Übungen machen**.
2. Eine "fertige" Version (Verzeichnis `frontend_nextjs`), die Du dir bei Interesse ansehen kannst. Diese Version ist weitgehend identisch mit der fertigen "Workspace-Version", enthält aber noch ein paar Features, die über unseren Workshop hinausgehen. Wenn Du diesen Stand zum ausprobieren starten möchtest, sind dieselben Schritte wie für die "Workspace-Version" erforderlich. Du führst die Schritte dann aber im Verzeichnis `frontend_nextjs` aus.

### (Optional) Schritt 1: Installation von pnpm

Grundsätzlich sollte die Installation der npm-Packages mit npm und yarn funktionieren.

Ich habe aber mit [pnpm](https://pnpm.io/) getestet. Falls du noch kein pnpm installiert hast, solltest du das jetzt tun. Dazu gibt es [mehrere Wege](https://pnpm.io/installation). Am einfachsten geht es über [Node.js corepacks](https://nodejs.org/docs/latest-v20.x/api/corepack.html).

Dazu führst Du einfach auf der Kommandozeile folgenden Befehl aus (`corepacks` ist Bestandteil von Node.js):

```
corepacks enable
```

### Schritt 2: Installation der npm-Packages

Wir arbeiten im Verzeichnis `workspace`. In diesem Verzeichnis auf der Kommandozeile bitte folgenden Befehl ausführen:

```
pnpm install
```

(Alternative npm oder yarn verwenden)

### Schritt 3: Starten der Next.js-Anwendung

Die Next.js-Anwendung kannst Du ebenfalls im `workspace`-Verzeichnis starten, in dem Du dort das `dev`-Script ausführst:

```
pnpm dev
```

Die Anwendung startet nun und sollte nach kurzer Zeit auf http://localhost:8100 laufen. Wenn du diese URL in deinem Browser öffnest, müsste dort die Meldung `This page could not be found.` erscheinen, da die Routen für die Anwendung noch fehlen (diese werden wir im Workshop entwickeln).

### Hinweise zum Next.js Cache

Next.js hat ein sehr aggressives Caching eingebaut. Deswegen kann es manchmal sein, dass Du Änderungen nicht sofort siehst. Deswegen hilft es manchmal:

- Im Browser "hard refresh" machen (Cmd+Shift+R bzw. Ctrl+Shift+R bei Firefox z.B.). Dann verwirft Firefox Dateien im Cache.
- Das Verzeichnis `workspace/.next` löschen und Next.js neustarten

Dieses Verhalten wird sich übrigens in [Next.js 15 ändern](https://nextjs.org/blog/next-15-rc#caching-updates), denn dort ist das Caching nicht mehr an allen Stellen per Default eingeschaltet.

## Fragen, Kommentare, Feedback

Wenn Du Fragen oder Probleme hast, sprich mich gerne an.

Wenn Du nach dem Workshop mit mir in Kontakt bleiben möchtest, findest Du hier meine [Kontaktdaten](https://nilshartmann.net/kontakt).

Ich wünsche dir nun viel Spaß in unserem Workshop!
