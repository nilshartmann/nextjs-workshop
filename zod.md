# Zod

* "TypeScript-first schema validation with static type inference"
* https://zod.dev/
---
### TypeScript vs. JavaScript
<!-- .slide: class="left" --> 
- Im folgenden ist mit **TypeScript** das Typsystem von TypeScript gemeint, das nur zur Buildzeit vorhanden ist
- Mit **JavaScript** ist der Code gemeint, den wir in JavaScript oder TypeScript schreiben, und der dann auch im Browser (als JavaScript) ausgeführt wird
* ```typescript
  // "TypeScript": zur Laufzeit weg
  type User = { lastname: string, firstname?: string }
  
  // "JavaScript"
  function login() {
    return { lastname: "Meier", firstname: null };
  }
  ```
---
### Problem: TypeScript-Typen sind zur Laufzeit weg

- Wenn man ein Objekt beschrieben hat, kann man das zur **Laufzeit** nicht mit TypeScript überprüfen
  - Hat uns der Server zur Laufzeit wirklich ein Objekt geschickt, das aussieht wie ein `User`?
- Für "echte" Validierungen sind TypeScript-Typen auch zu ungenau:
  - keine Wertebegrenzungen (bzw. nur sehr eingeschränkt)
  - Längen-Begrenzungen gibt es nicht
- Wenn man Validierung zur Laufzeit benötigt, kommt man um (JavaScript-)Code, der zur Laufzeit ausgeführt wird, nicht drumherum
- Also müssen die Validierungsregeln in JavaScript beschrieben werden. 
- Dann sind diese aber redundant: in TypeScript (statische Typbeschreibung), in JavaScript zur Validierung während der Laufzeit

---
### Zod: Typen in JavaScript beschreiben und TS-Typen ableiten

* Aus dieser Not macht Zod eine Tugend:
* Wir beschreiben die Objekte in JavaScript...
* ...und können von der Beschreibung TypeScript Typen ableiten lassen
* ```typescript
  import { z } from "zod";
  
  const User = z.object({
    firstName: z.string(),
    lastName: z.string().nullish()
  });
  
  type IUser = z.infer<typeof User>
  ```
* Mit dem `User`-Objekt von zod können wir nun zur Laufzeit ein Objekt validieren
* Wenn das Objekt dem User-Schema entspricht, ist alles gut, sonst gibt es einen Fehler
* ```typescript
  const mayOrMayNotBeAUser = readUserFromServer();
  
  const user = User.parse(mayOrMayNotBeAUser);
  ```
* Die `parse`-Funktion fungiert gleichzeit als **Type Predicate Function**, so dass TypeScript
 danach auch weiß, wie `user` aussieht, unabhängig davon, was in `parse` übergeben wurde
* ```typescript
  declare function readUserFromServer(): unknown;
  
  const user = User.parse(readUserFromServer());
  //     ^? --> IUser
  
  ```
---
### Komplexe Regeln
* Mit Zod kann man die typischen Datentypen verwenden (Objekte, Arrays, string, number, boolean etc)
* Auch aus TypeScript bekannte Möglichkeiten wie `unions`, `extends`, `omit` oder `brand-Types` werden unterstützt
* Darüberhin kann man auch die gültigen Wertemengen und andere Constraints beschreiben
* ```typescript
  import { z } from "zod";
  
  const User = z.object({
    login: z.string().min(5),
    email: z.string().email(),
    status: z.string().emoji(), // 😊
    age: z.number().min(18).max(123)
  })
  ```
* Die `parse`-Funktion gibt dann detailierte Fehler, wenn ein überprüftes Objekt nicht diesen Regeln entspricht. 
* Das funktioniert mittlerweile auch für das Validieren von Formularen in [React Hook Form
](https://react-hook-form.com/) mit dem [zod-Resolver](https://github.com/react-hook-form/resolvers#zod)  