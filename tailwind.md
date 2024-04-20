# Tailwind

* "CSS"-Utility-Ansatz: man schreibt seine "Styles" als CSS-Klassennamen
* ```tsx
  function Layout() {
    return <div className={"bg-white antialiased space-x-4"}>
      <main className={"d-flex"}>
        <input className={"w-full rounded bg-grey-2 p-2 "} />
      <main>
    </div>
  }
  ```
* Hype-Kurve sehr steil gerade
* Funktioniert mit allen React-Ansätzen (Vite, Next.js, ...) und Editoren/IDEs zusammen
  * Syntax-Highlighting, Code-Completion
* Funktioniert relativ gut mit AI/LLM :-)
---
### Tailwind: Hilfreiche Bibliotheken
  * [clsx](https://www.npmjs.com/package/clsx)
    * Damit kann man komplexe Listen von Klassen zusammenbauen (erspart z.B. `if/else` oder String Operationen)
    * ```typescript
      const className = clsx(
          "font-sans antialiased",
          theme === "dark" ? "bg-black" : "bg-light",
          largeFont && "text-4xl"
      );  
      ```
    * Das ist unabhängig von Tailwind, aber mit Tailwind sehr nützlich:
      * String-Operationen zum bauen von Klassennamen funktioniert nicht (`bg${theme}`), weil die Klassen dann nicht von Tailwind erkannt werden und im Build entfernt werden 
    * Man kann in VS Code und IntelliJ einstellen, dass die Tools wissen, dass es sich bei den Klassen um Tailwind-Klassen handeln, dann bekommt man auch Vorschau und Code completion
    * IntelliJ:
    * ```json
      "experimental": {
        "configFile": null,
        "classRegex": [ ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^\"'`]*)(?:'|\"|`)"]]
      }
      ```
    * [VS Code Support](https://www.npmjs.com/package/clsx#tailwind-support)
---
### Tailwind: Hilfreiche Bibliotheken
  * [tailwind-merge](https://www.npmjs.com/package/tailwind-merge): Kann CSS-Klassen semantisch zusammenführen, wenn man z.B. Default-Klassen an einer Komponenten von außen veränderbar machen möchte
    * Kann man gemeinsam mit `clsx` verwenden (oder als Alternative)
  * [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss): Sortiert die Tailwind CSS Klassen anhand der vom Tailwind-Team vorgeschlagenen Reihenfolge (funktioniert z.B. in `className` oder auch mit `clsx`)
    