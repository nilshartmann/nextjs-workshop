# Neues in React (18)

---
### Neues in React (18)

* Letztes Update von React: Juni (!) 2022 (!!)
* ...es gibt aber mittlerweile einen "Canary Channel", auf dem Updates veröffentlicht werden, die für Bibliotheksanbieter gedacht sind
* auf diese Weise können die schon neue React-Features integrieren, bevor diese dann in einer stabilen Version erscheinen
  * Auf diesem Kanal ist recht viel los, insb. wegen den neuen Server-Features
---
### Neues in React (18)
## useId

* Ein Hook mit dem man eindeutige Ids generieren kann
* Zum Beispiel für `aria-labelledby` etc in Komponentenbibliotheken
* Das kann nützlich sein, wenn man SSR macht, und beim rendern aus Server- und Clientseite **dieselbe** "eindeutige" Id generiert werden soll
  * und deswegen z.B. eine zufällige uuid nicht funktioniert
* ```tsx
  export function Input({label}) {
    const labelId = useId();
  
    return <div>
      <label id={labelId}>{label}</label>
      <input htmlFor={id} />
    </div>
  }
  ```

---
### Neues in React 18
## Concurrent Mode
- Voraussetzung für Suspense
- Kann Rendern abbrechen
  - Braucht man Anwendungsfälle für...

---
### Neus in React 18
## useTransition
* Haben wir schon bei Next.js gesehen und sehen wir auch später nochmal
* 
---
### Neues in React 18
## useDeferedValue

* Habe bislang keine guten Anwendungsfälle daür gefunden
* Als Debounce/Throttling in der Beispiel-Anwendung nicht gut geeignet


---
## React SPA
# Modernes Datafetching

---
## React SPA
# Modernes Datafetching

### Themen

* `use`-Hook und `cache` API
* Suspense mit TanStack Query
* loader und actions mit dem React Router

---
### use-Hook und cache-API

* Auf dem Server können wir mittlerweile asynchrone Komponenten schreiben (RSC)
* Das geht auf dem Client nicht
* Um das arbeiten mit Promises zu vereinfachen, gibt es **künftig**:
  * [use-Hook](https://react.dev/reference/react/use)
  * [cache API](https://react.dev/reference/react/cache)
    * Die `cache` API ist wohl nur für serverseitigen Einsatz
---
### use-Hook

- Mit dem `use`-Hook kann man auf ein Promise warten. 
- Darum kann eine Suspene-Komponente mit einem Platzhalter liegen
* ```tsx
  async function loadBlogPost() { /* ... */ }
  
  function BlogPost() {
    const post = use(loadBlogPost());
    return <>...</>;
  }
  
  function BlogPostPage() {
    return <Suspense fallback={<h1>Posts loading...</h1>}>
      <BlogPost />
    </Suspense>
  }
  ```
- **Achtung!!**: Der Aufruf von `loadBlogPost` erzeugt bei jedem Rendern ein neues Promise! 
  - Damit kann man in eine Endlosschleife kommen
  - Dafür wahr wohl mal der `cache` gedacht, aber der ist jetzt nur noch für die Serverseite
---
### use-Hook: Mit Context
* Der `use`-Hook darf im Gegensatz zu anderen Hooks überall in einer Komponente verwendet werden
  * auch in if-Blöcken, Schleifen etc.
* Man kann mit dem `use`-Hook auf einen Context zugreifen. Das funktioniert genau wie `useContext`, nur dass der Hook überall verwendet werden kann:
* ```typescript
  function PostEditor() {
    const handleSave = async () => {
      await savePost();
  
      use(RouterContext).push();
    }
  }
  ```
---
## TanStack Query

* Grundlagen: "Klassische" TanStack Query API
* Queries mit Suspense
* Verwendung mit `useTransition`

---
## TanStack Query
* Beispiel-Anwendung
* Architektur
  * Klassische Single-Page-Anwendung: Frontend ist Frontend, Backend ist Backend (mit REST API)...

---
## TanStack Query
### Achtung!

* Es gibt diverse Parameter, die einstellen, was wann passieren soll
* Auch das ist nicht immer einfach zu verstehen und zu behalten
* Tipp: In jedem Fall die [Default-Options lesen](https://tanstack.com/query/v5/docs/react/guides/important-defaults) und immer wieder parat halten!
  * Insbesondere die `refetch`-Einstellungen können sehr verwirrend und überraschend sein
  * `refetchOnWindowFocus` mache ich z.B. mindestens während der Entwicklung aus
---
### Der QueryClient

* Zentrales Konfigurationsobject: `QueryClient`
* React-unabhängig
* Wird beim Starten der Anwendung initialisiert
* Oft reichen Default-Einstellung
* Es können aber z.B. globale Refetch-Policies eingestellt werden
* Das Objekt wird per QueryClientProvider in die Anwendung gereicht
* ```typescript
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  ```

---

### Laden von Daten: useQuery

* Queries werden mit dem [useQuery-Hook](https://tanstack.com/query/latest/docs/react/guides/queries) ausgeführt
* Der Hook erwartet ein Konfigurationsobjekt
  * `queryKey`: Array mit Query Keys (zur Interaktion mit dem Cache)
  * `queryFn`: Funktion zum Laden der Daten
  * Weitere Konfigurationen (optional)
* ```typescript
  import { useQuery } from "react-query";
  import { loadBlogPosts } from "./blog-api";
  function BlogListPage() {

    const result = useQuery({queryKey: ['posts'], queryFn: loadBlogPosts});

    // ...
  }
  ```
---
### Rückagebwert von `useQuery` (Query Ergebnis)

* `useQuery` liefert ein Objekt zurück:
* `isLoading`: Der Query lädt noch (und es sind keine Daten im Cache)
* `isSuccess`: Daten sind geladen
* `isError`: Es ist ein Fehler aufgetreten
* `data` enthält die geladenen Daten
* `error`: Fehlerobjekt aus der Query-Funktion
* Weitere [siehe Doku](https://tanstack.com/query/latest/docs/react/reference/useQuery)
* ```typescript
  function BlogPage({blogPostId}) {
    const result = useQuery(/* ... */);
  
    if (result.isLoading) {
      return <h1>Loading!</h1>
    }
  
    if (result.isError) {
      // result.error ist hier gesetzt
      return "Error: " + result.error;
    }
  
   if (result.isSuccess) {
     // data ist jetzt hier gesetzt
     return <BlogPost post={data} /> 
   } 
  
  }
  ```
---
### Query Keys

* Mit den [Query Keys](https://tanstack.com/query/latest/docs/react/guides/query-keys) wird ein Ergebnis im Cache gespeichert
* Ein Query Key besteht aus einem Array von Werten
* Üblicherweise ist es ein Name (z.B. "posts") und dann ggf. weitere Parameter, zum Beispiel die Id eines Posts ("P1")
  oder die Sortierreihenfolge
  * Also alle Daten, die den Query exakt beschreiben
* ```typescript
  import { useQuery } from "react-query";
  import { loadBlogPosts } from "./blog-api";

  function BlogPage({blogPostId}) {

    // Für jeden Aufruf mit einer neuen blogPostId
    //  wird das Ergebnis separat in den Cache gelegt
    const result = useQuery({
      queryKey: ['blogPost', blogPostId], 
      queryFn: () => loadPost(blogPostId)
    });

    // ...
  }
  ```
* Wenn ein Query mit denselben Query Keys in mehr als einer Komponente ausgeführt wird...
* ...stellt TanStack Query sicher, dass der Query nur einmal ausgeführt wird
* ...wenn sich das Ergebnis ändert, werden **alle** Komponenten, die den Query verwenden, automatisch aus dem Cache aktualisiert

---

### Query Function

* `useQuery` erwartet eine [Query-Function](https://tanstack.com/query/latest/docs/react/guides/query-functions), die den eigentlichen Request ausführt
* Die Signatur ist fast beliebig, die Funktion muss aber ein Promise zurückliefern:
* Wenn die Daten erfolgreich geladen wurden, muss das Promise mit den Daten "aufgelöst" werden
* Wenn es einen Fehler gab, muss die Funktion einen Fehler werfen
* ```typescript
  // async function gibt IMMER ein Promise zurück
  export async function loadBlogPost(postId) {
    const response = await fetch("http://localhost:7000/posts" + postId);

    if (!response.ok) {
      throw new Error("Could not load blog post: " + response.status);
    }

    return response.json();
  }
  ```


---
### Best Practices

* Queries werden oft in eigenen Hooks zusammengefasst. Dann braucht man Query-Key und -Funktion und weitere Einstellungen nicht jedesmal neu anzugeben
* ```tsx
  function useBlogPostQuery(blogPostId: string) {
    return useQuery({
      queryKey: ['blogPost', blogPostId], 
      queryFn: () => loadPost(blogPostId)
    });
  }
  
  function BlogPostPage() {
    const result = useBlogPostQuery("P1");
  
    // ...
  }
  ```
* Da Query Keys oft an mehr als einer Stelle gebraucht werden (z.B. invalidieren von Queries, dazu später mehr), legt man diese so ab, dass man Zugriff darauf hat. Man kann dafür auch eine "Factory-Funktion" bauen
* ```typescript
  export const blogPostPageQueryKey = (postId: string) => (['blogPost', blogPostId]);
  
  function useBlogPostQuery(blogPostId: string) {
    return useQuery({
      queryKey: blogPostPageQueryKey(postId), 
      queryFn: () => loadPost(blogPostId)
    });
  }
  ```
---
### Best Practices
* Die Query-Funktionen würde ich - sofern sie einigermaßen trivial sind - direkt in dem Custom-Hook implementieren (anders als in den Beispielen bislang sehen)
* ```typescript
  function useBlogPostQuery(blogPostId: string) {
    return useQuery({
      queryKey: blogPostPageQueryKey(postId), 
      queryFn: async () => {
        const r = fetch("...");
        // ...
      }
   });
  }  
  ```
* Validierung der Server-Antworten (und evtl. auch der Requests) mit Zod.
---
### Übung: Vorbereitung
* wir arbeiten jetzt in `spa/spa-workspace`
* hierin bitte Packages installieren und Anwendung starten
* `pnpm install`, `pnpm dev`
* Die Anwendung läuft auf http://localhost:3200

---
### Übung: Blog Teaser mit TanStack Query lesen
- Auf der Blog-Übersichtsseite fehlen die Daten 😱
- Implementiere bitte die `BlogListPage`-Komponente. Der Rumpf der Komponente ist schon in `BlogListPage.tsx` vorhanden. Es fehlt "nur" der Code zum Laden der Daten...
- **👮‍ CoPilot ist verboten!**
- Als Query-Funktion kannst Du `getBlogTeaserList` aus `backend-queries.ts` angeben
- Du kannst `useQuery` oder `useSuspenseQuery` verwenden
  - Bei `useSuspenseQuery` an den `Suspense`-Boundary danken!
- Zeige eine Warte-Meldung an, während die Daten geladen werden
  - Zum künstlichen Verzögern der Daten `getBlogTeaserListSlowdown` in  `backend-queries.ts` setzen

[//]: # (- Spiele mit den `refetchXyz`-Einstellungen am Query)

[//]: # (  - Untersuche dabei auch `isFetching`)

[//]: # (  - Dazu am besten: Übersichtsseite aufrufen, dann einen Blog-Post anklicken und mit "Home"-Button oben wieder auf Übersichtsseite zurück. Wann werden &#40;warum&#41; Server Calls ausgeführt?)



---
### TanStack Query: Mutations

* Mutations werden verwendet, um Daten zu schreiben
* Mutations haben keinen Cache-Key und werden auch nicht automatisch ausgeführt
* Die Mutation-Funktion entspricht der Query-Function (nur dass sie Daten schreibt und nicht liest)
* Auch der `useMutation`-Hook liefert Informationen über den Zustand der Mutation zurück
* Außerdem wird eine Funktion (`mutate`) zurückgeliefert, die die Mutation ausführt
* Übergeben wird der Funktion die zu schreibenden Daten
* ```typescript
  import { useMutation } from "react-query";
  import { savePost } from "./blog-api";

  function PostEditorPage() {
    const mutation = useMutation({
      mutationFn: savePost,
      onSuccess() {
        // optional: wird aufgerufen, wenn die Mutation erfolgreich war
        // ...
      }
    });

    if (mutation.status === "error") {
      return <h1>Error!</h1>;
    }

    if (mutation.status === "loading") {
      return <h1>Saving, please wait!</h1>;
    }

    return <PostEditor onSavePost={mutation.mutate} />;
  }
  ```
---
### Paramter für die mutation-Funktion

* Die `mutationFn` kann genau einen Parameter annehmen (oder keinen)
* Den Wert für diesen Parameter gibst Du beim Ausführen der Mutation an die `mutate`-Funktion
  * (diese ruft die `mutationFn` dann ihrerseits mit diesem Parameter auf)
* Damit kannst du z.B. die zu speichernden Daten übergeben
* Wenn Du mehrere Informationen übergeben willst, musst Du ein Objekt übergeben
* ```tsx
  function PostEditor() {
    const mutation = useMutation({
      mutationFn: ({ title, body }: NewPost) => {
        return addPost(title, body);
      }
      // ...
    });  
  
  
    const handleSave = () => {
      mutation.mutate({
        title: "...", body: "..."
      })
    }
  }
  ```

---
### MutateAsync

- Neben der `mutate`-Funktion gibt liefert `useMutation` eine `mutateAsync`-Funktion zurück
- Diese liefert ein Promise zurück, das mit dem Ergebnis der Mutation aufgelöst wird
- Das kannst Du in einer Komponente z.B. nutzen, um nach der erfolgreichen Mutation eine weitere Aktion auszulösen
* ```tsx
  function PostEditor() {
    const mutation = useMutation({ /* ... */ });
  
    const handleSave = async () => {
      const result = await mutation.mutateAsync(post, title);
      if (result.status === "success") {
        router.push("/blog");
      } 
    }
  }
   
  ```
---
### Aktualisieren von Daten

* Alle Query-Ergebnisse von `useQuery` werden automatisch gecached
* Alle Komponenten werden aktualisiert, wenn sich der Cache aktualisiert
* [Per Default](https://tanstack.com/query/latest/docs/react/guides/important-defaults) werden Queries automatisch neu ausgeführt:
  * Komponente wird (neu) gemounted
  * Browser-Fenster bekommt den Focus
  * Nachdem das Netzwerk offline war

---

### Manuelles Aktualisieren von Queries

* Queries können per API manuell erneut ausgeführt werden
* Das kann zum Beispiel nach einer Mutation sinnvoll sein, um die geänderten/gespeicherten Daten
  im Cache zu aktualisieren
* Dazu wird die Funktion [`invalidateQueries`](https://tanstack.com/query/latest/docs/react/reference/QueryClient#queryclientinvalidatequeries) oder [`refetchQueries`](https://tanstack.com/query/v5/docs/react/reference/QueryClient#queryclientrefetchqueries)vom `QueryClient` verwendet
* Übergeben werden die Query Keys, deren Queries erneut ausgeführt werden sollen
* ```typescript
  import { useMutation, useQueryClient } from "react-query";
  import { savePost } from "./blog-api";

  function PostEditorPage() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: savePost, 
      onSuccess() {
        // PostPage-Query als "veraltet" markieren,
        // beim nächsten Rendern einer Komponente, die darauf zugreift,
        // werden die Daten neu gelesen 
        queryClient.invalidateQueries(['posts']);
  
        // Queries unmittelbar neu ausführen 
        queryClient.refetchQueries(['posts']);
      }
    });

    // ...
  }
  ```

---

### Beispiel: Blog-Post *nicht* neuladen

* Ein einzelnes BlogPost kann im Cache verbleiben, da es sich in unserer App nicht ändert/nicht ändern kann
* Mit den `refetch`-Optionen kann die automatische Aktualisierung ausgeschaltet werden
* ```typescript
  function PostPage() {
    // ...
    const result = useQuery({queryKey: ["blogPost", postId], queryFn: () => loadBlogPost(postId!)}, {
      refetchOnMount: false,
      refetchOnWindowFocus: false
    });  

    // ...
  }
  ```

---

### Refetch

* Das von `useQuery` zurückgeliefert Objekt enthält auch eine `refetch`-Funktion um einen Query
  manuell neu auszuführen
* ```typescript
  function PostListPage() {
    const result = useQuery({queryKey: ['posts'], queryFn: readPosts}, {
      // nicht automatisch aktualisieren
      refetchOnMount: false, refetchOnWindowFocus: false
    })

    // ... result.status === loading, status === error ... 

    return <div>
      <button onClick={refetch}>Reload Posts</button>
      <PostList posts={data} />
    </div>
  }
  ```
---
### Übung: Mutation

* Vervollständige die `PostEditor`-Komponente
* In der `handleSave`-Funktion soll eine Mutation ausgeführt werden, die du implementieren musst
  * Die Mutation kann als `queryFn` die Funktion `addPost` aus `server-actions.ts` verwenden, um das Post auf dem Server zu speichern
  * Wenn die Mutation fehlschlägt, sollte im PostEditor eine Fehlermeldung angezeigt werden
    * Das kannst Du testen, in dem du einen `title` eingibst bzw. speicherst, der weniger als fünf Zeichen lang ist.
    * Wenn der Benutzer nach dem fehlerhaften Speichern Änderungen macht (Eingabe in eins der Eingabefelder) soll die Fehlermeldung wieder verschwinden 
  * Wenn die Mutation erfolgreich war, soll zur `/blog`-Übersichtsseite navigiert werden (dafür kannst Du [`useNaviagate`](https://beta.reactrouter.com/en/main/hooks/use-navigate) vom React Router verwenden)
  * Kannst Du einen Custom Hook für die Mutation schreiben (`useSavePostMutation`) ?
    * Die Navigation soll *nicht* Bestandteil des Hooks sein
  * Der neue, gespeicherte, Blog Post soll auf der `/blog`-Übersichtsseite natürlich dann auch sichtbar sein...

---
## TanStack Query mit Suspense

* Seit Version 5 bietet TanStack Query Support für [Suspense](https://tanstack.com/query/v5/docs/react/guides/suspense)
* Damit können wir - wie in Next.js gesehen - per `Suspense`-Komponente festlegen, an welcher Stelle in der Komponentenhierarchie auf ausstehende Daten gewartet werden soll
* Anstatt `useQuery` verwenden wir [`useSuspenseQuery`](https://tanstack.com/query/v5/docs/react/reference/useSuspenseQuery)
* Der Hook funktioniert sehr ähnlich zu `useQuery`, aber:
  * das Ergebnis enthält **immer** Daten (`data`), denn wenn es noch keine Daten gibt, wird solange die Suspense `placeholder`-Komponente angezeigt
* ```tsx
  function BlogListPage() {
    return <React.Suspense fallback={<h1>Posts loading...</h1>}>
      <BlogList />
    </React.Suspense>
  }
  
  function BlogListPage() {
    const { data } = useSuspenseQuery({
      queryFn: () => { /* ... */ },
      queryKey: ["blog-list"]
   });
  
   // data ist hier in jedem Fall definiert
   return <PostList posts={data} />
  }
  ```
---
## TanStack Query mit Suspense
<!-- .slide: class="left" -->
- Mit den default `refetch`-Einstellungen wird ein Query erneut ausgeführt, wenn eine Komponente gemounted wird, oder das Fenster den Focus bekommt
- Wenn der Query zu dem Zeitpunkt bereits einmal ausgeführt wurde, und sich Daten dafür im Cache befinden, werden zunächst diese alten Daten angezeigt
  - Der `placeholder` wird dann **nicht angezeigt**, da aus Supsene-Sicht auf keine Daten gewartet wird
- `useQuery` und `useSuspenseQuery`-Hook liefern das Property `isFetching` zurück, mit dem Du erkennen kannst, ob im Hintergrund gerade deine Daten aktualisiert werden
- Fehler werden über einen **Error Boundary** behandelt
- Damit kannst Du z.B. einen Loading Spinner oder einen anderen Hinweis anzeigen, wenn die Daten neu geladen werden
* ```tsx
  function BlogListPage() {
    const { data, isFetching } = useSuspenseQuery({
      queryFn: () => { /* ... */ },
      queryKey: ["blog-list"]
   });
  
   // data ist auch hier in jedem Fall definiert
   return <div>
     {isFetching && "Updating data..."}
     <PostList posts={data} />
    </div>
  }
  ```
---
### Übung: useSuspenseQuery

- Stelle die PostListPage auf `useSuspenseQuery` um
- Du musst außerdem ein `Suspense`-Boundary festlegen.
- Wenn Du den Aufruf des Queries verzögerst (`getBlogTeaserListSlowdown` in `backend-queries.ts`) und zwischen Blog Post-Ansicht und Übersichtsseite wechselt, was passiert dann?
- Stelle die beiden `useQuery`-Aufrufe in `BlogPostPage` und `CommentList` um, die ein einzelnes BlogPost bzw. dessen Kommentare darstellen
  - Für die beiden Queries ist in `BlogPostPageRoute` schon ein `Suspense`-Boundary definiert
  - Diese Komponente (`BlogPostPageRoute`) ist in der Router-Konfiguration für `/blog/:postId]` gemappt
- Was passiert, wenn Du dann um den Aufruf der `CommentList`-Komponente (k)ein `Suspense` legst?
- Zum besseren Testen kannst Du die Aufrufe des Backends in der Datei `backend-queries.ts` verzögern (s. Konstanten am Anfang der Datei):
  - `getBlogTeaserListSlowdown`: Blog Übersichtsseite
  - `getBlogPostSlowdown`: lesen eines Einzelnen Blog Posts
  - `getCommentsSlowdown`: Lesen der Kommentare zu einem Blogpost
  - Achtung: die Angaben sind etwas verschieden, aber du findest Beispiel in `backend-queries.ts`

---
### Prefetching von Queries

* In der `BlogPostPage` haben wir einen "Request-Wasserfall":
  1. die Artikel werden gelesen und
  2. **erst danach** wird die `CommentList` gerendert und darin werden die Kommentare gelesen
* Um die Darstellung zu beschleunigen, wäre es hilfreich, wenn beide Queries zeitgleich starten würden
---
### Prefetching von Queries
* Zum "Vorladen" von Daten können wir die Funktion [`QueryClient.ensureQueryData`](https://tanstack.com/query/v5/docs/react/reference/QueryClient#queryclientensurequerydata) verwenden
* Diese erwartet dieselben Angaben wie `use(Suspense)Query`, nämlich u.a. `queryKey` und `queryFn`
* Wenn sie ausgeführt wird, und für den angegeben `queryKey` noch keine Daten im Cache sind, lädt die Funktion die Daten im Hintergrund
* Damit können wir in der `BlogListPage` schon das Laden der Daten triggern. Wenn dann die `CommentList` gerendert wird, sind die Daten evtl. schon im Cache, aber zumindest läuft der Request schon
* ```tsx
  function BlogPostPage({ postId }: BlogPostPageProps) {
    // start early fetching of comments...
    const queryClient = useQueryClient();
  
    queryClient.ensureQueryData({
      queryKey: ["blogpost", postId, "comments"],
      queryFn: () => getComments(postId),
    });

    const { data: post } = useSuspenseQuery({
      queryKey: ["blogpost", postId],
      queryFn: () => getBlogPost(postId),
    });

    return (
      <div className={"space-y-4"}>
        <Post post={post} />
        <Suspense
          fallback={<LoadingIndicator>Comments loading...</LoadingIndicator>}
        >
          <CommentList postId={postId} />
        </Suspense>
      </div>
    );
  }
  ```


---
### Mutations mit Suspense

- Bei der Arbeit mit Mutations ändert sich gegenüber der "konventionellen" Variante zunächst nichts, wir nutzen weiterhin den `useMutation`-Hook.
- Allerdings können wir sicherstellen, dass nach der Mutation solange gewartet wird, bis der Cache aktualisiert wurde 
- Damit können wir erreichen, dass wir auf einer Seite (in dem Fall z.B. `PostEditor`) bleiben, bis die Ziel-Seite (Blog Übersichtsseite) vollständig neu gerendert wurde
- Aus Benutzer-Sicht sieht es dann so aus als ob es **ein** Vorgang wäre und nicht **zwei** (1. Speichern und 2. Neuladen der Posts)
- Dazu musst Du in der `onSuccess`-Methode einer Mutation so lange warten, bis auch das Aktualisieren des Caches abgeschlossen ist
  - Aus Sicht des Aufrufers der Mutatio mit `mutateAsync` sieht es dann auch wie **eine** Operation aus
---
### Mutations mit Suspense
<!-- .slide: class="left" -->
- wenn Du den Cache der Ziel-Seite (bzw. dessen Query) mit `invalidateQueries` nur invalidierst oder aus dem Cache entfernst, werden die Daten nicht neu geladen, sondern erst, wenn der Query wieder "benötigt" wird
  - Das ist dann erst auf der Ziel-Seite der Fall, so dass hier die Ziel.Seite **sofort** aufgerufen und der `placeholder` angezeigt wird (oder `isRefetching: true` ist)
  - wenn Du stattdessen in `onSuccess` `await refetchQueries()` verwendest, wird der Query sofort ausgeführt und `onSuccess` kehrt erst zurück, wenn die Daten geladen und der Cache aktualisiert wurde
* ```tsx
  export default function PostEditor() {
  
    const queryClient = useQueryClient();
  
    const addPostMutation = useMutation({
      mutationFn: ({ title, body }) => { /* ... */ },
      onSuccess: async (data) => {
    
        // await ist wichtig! 
        await queryClient.refetchQueries({
          queryKey: ["blog-list"],
        });
      },
    });
  
    // mutateAsync wie gesehen
  }
  ```

---
# React Router
## mit loader und action-Funktionen

---
## Beispiel-Anwendung
* Identisches Setup wie TanStack Query: Frontend ist Frontend, Backend ist Backend

---
## React Router

* Seit Version 6 vom React Router gibt es in React Router das Konzept eines **DataRouters**
* Diese kombinieren das Routing mit dem [Data-Fetching](https://reactrouter.com/en/main/start/overview#data-loading) (und [Data-Mutating](https://reactrouter.com/en/main/start/overview#data-mutations))
* Das ganze ist aus Remix hervorgegangen bzw. geht auch wieder dorthin zurück
  * (Für Remix 3 ist ein [Migrationspfad](https://github.com/remix-run/remix/discussions/7638) von SPA mit React Router nach Fullstack Remix geplant)
* Mitterweile ist der herkömmliche **BrowserRouter** auch ein **DataRouter**, d.h. unterstüzt das Laden von Daten

---
### React Router

* Traditionell werden im React Router URL (Segmente) auf Komponenten abgebildet.
* ```tsx
  const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "blog", children: [
          { path: "add", element: <AddRouteLayout />, children: [{ index: true, element: <PostEditor /> }], },
          { element: <BlogContentLayout />, children: [
               { path: "post/:postId", element: <BlogPostPageRoute /> },
             ],
           },
         ],
       },
     ],
    },
  ]);
  ```
---
### Loader-Funktionen

* Zusätzlich zu den "normalen" Routing-Angaben kann man pro Route eine [`loader`-Funktion](https://reactrouter.com/en/main/route/loader#loader) angeben
* Diese ist dafür zuständig, die Daten für eine Route zu laden
* Erst wenn die Funktion die Daten geladen (und an den React Router zurückgegeben) hat, wird die Route dann gerendert
* Die geladenen Daten kann man in den Komponenten mit [`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data) abfragen
* ```tsx
  const router = createBrowserRouter(
    /* ... */
    {  path: "post/:postId",
       element: <BlogPostPageRoute />,
       loader: blogPageLoader,
     }
  );
  
  async function blogPageLoader({params}) {
    const post = await fetch(`http://localhost:7020/post/${params.postId}`);
    // ...
    return post ;
  }
  
  function BlogPostPage() {
    const post = useLoaderData();
  
    // render Post
  }
  ```
---
### Signatur einer Loader-Funktion

* Für die `loader`-Funktionen gibt es den TypeScript-Typen `LoaderFunction`. Dieser beschreibt, wie Signatur und Rückgabe-Wert aussehen müssen.
* Als Parameter werden euch an die loader-Funktion übergeben:
  * `params`: die URL-Parameter bei variablen Segmenten (`postId`)
  * `request`: Eine Instanz des `fetch` [`request`-Objektes](https://developer.mozilla.org/en-US/docs/Web/API/Request). Über diesen bekommt ihr u.a. Zugriff auf die aktuelle URL, um z.B. die SearchParameter auszulesen
    * Bin nicht ganz sicher, was ich davon halten soll
  * ```tsx
    export const blogPageLoader: LoaderFunction = ({ params, request }) => {
    const postId = params.postId
    const url = new URL(request.url);
    const includeComments = url.searchParams.get("include_comments");

    return fetch( /* ... */)
    }
    ```

---
### Loader mit TanStack Query
* Innerhalb der `loader`-Funktion kannst Du den `QueryClient` von TanStack Query verwenden, um darüber deine Daten zu laden
* Dann kann deine Anwendung auch von den Cache-Features von TanStack Query profitieren
* Da eine `loader`-Funktion kein React Hook ist, kannst Du nicht mit `useQuery` oder `useQueryClient` arbeiten
* Stattdessen stellst Du die `QueryClient`-Instanz über einen Modul export zur Verfügung:
* ```typescript
  const queryClient = new QueryClient(/* ... */);
  export {queryClient};
  ```
* In deinen `loader`-Funktionen kannst Du auf den `QueryClient` zugreifen und mit `fetchQuery` die Daten laden
* `fetchQuery` funktioniert im Grunde wie `useQuery` nur "ohne Komponente"
* ```typescript
  import {queryClient} from "./query-client";
  
  export function blogListPageLoader() {
    return queryClient.fetchQuery({
      queryKey: ["blog-list"],
      queryFn: () => fetch( /* ... */ ),
    })
  }
  ```

---
### Übung: Vorbereitung
* Wir arbeiten im Verzeichnis `datarouter/datarouter-workspace`
* Dieses Verzeichnis in Editor/IDE öffnen
* Darin Packages installieren und Vite starten:
  * `pnpm install` 
  * `pnpm dev`
* Die Anwendung läuft auf http://localhost:3300
---
### Übung: eine Loader-Funktion (PostListPage)
* In der `PostListPage` fehlt die loader-Funktion!
* Bitte implementiere die `loader`-Funktion (kannst Du direkt in `BlogListPage.tsx` machen)
  * Verwende den `QueryClient` von TanStack Query
  * Zum Laden der Daten mit der `queryFn`-Funktion kannst Du `getBlogTeaserList` aus `backen-queries.ts` verwenden
* Gib die `loader`-Funktion in der Routen-Beschreibung in `main.tsx` an
* Zeige die mit der `loader`-Funktion gelesenen Blog-Psts in der `BlogListPage`-Komponente an
* Hinweis: in `shared/api/types.ts` findest Du TypeScript-Typen für die Objekte, die über die API gelesen werden (z.B. `BlogPostTeaser`, `BlogPost` und `Comment`)
* Lösung: `steps/10-loader-function`

---
### defer

* Das Rendern einer Route wird verzögert, bis alle Daten geladen wurden (bzw. das Promise der loader-Funktion aufgelöst wurde)
* Wir können aber auch mit dem React Router die `Suspense`-Komponente von React verwenden, um Inhalte zu priorisieren
* Dazu können Daten innerhalb der `loader`-Funktion als "defered" (verzögert, bzw. "kommen später") gekennzeichnet werden.
* Die `loader`-Funktion gibt dann ein Objekt zurück, das mit `defer` erstellt wird. Darin enhalten können sein:
  * **geladene** Daten (auf die gewartet werden **soll**)
  * **(ausstehende) Promises** für Daten (auf die **nicht** gewartet werden soll)
* ```tsx
    export const blogPageLoader: LoaderFunction = async ({ params }) => {
      const { postId } = params;

    return defer({
      // auf BlogPost wird beim Rendern gewartet
      blogPost: await queryClient.fetchQuery( /* ... */ ),
      
      // Auf die Kommentare wird NICHT gewartet, es wird ein Promise zurückgeliefert  
      commentsPromise: queryClient.fetchQuery( /* ... */)
    });
  };
  ```
---
### Auf Daten warten
* Mit `defer` wird ein oder mehrere Promises in die Komponente gegeben
* Diese kann auf das **aufgelöste** Promise mit der [`Await`](https://reactrouter.com/en/main/components/await)-Komponente warten
* Die `Await`-Komponente erwartet als `resolve`-Property ein Promise und als Kind-Elemente eine *Funktion* (wie "früher" vor den Hooks...🙀)
* Diese Funktion ruft `Await` mit dem **aufgelösten** Promise-Wert auf
* (Außerdem kann die Kompoente mit  `errorElement` noch eine Komponente angeben, die gerendert wird, falls das Promise fehlschlägt)
* * Damit React in der Zwischenzeit einen Platzhalter anzeigen kann, muss darum eine `Suspense`-Komponente gelegt werden
* ```tsx
  function BlogPostPage() {
    const { blogPost, commentsPromise } = useLoaderData();
    return <>
      <Post post={blogPost} />
      <Suspense fallback={"Comments loading..."}>
        <Await resolve={commentsPromise}>
          { comments => <CommentList comments={comments} /> }
        </Await>
      </Suspense> 
    </>
  }
  ```


---
### useAsyncValue

* Als Alternative zur Render-Funktion (`children`) der `Await`-Komponente kann der [`useAsyncValue`-Hook](https://reactrouter.com/en/main/hooks/use-async-value) genutzt werden
* Dieser kann unterhalb einer `Await`-Komponente eingesetzt werden, um den Wert des Promises zu bekommen, auf den (das in der Hierarchie am nächsten darüberliegende) `Await` gewartet hat.
* ```tsx
  function BlogPostPage() {
    const { blogPost, commentsPromise } = useLoaderData();
    return <>
      <Post post={blogPost} />
      <Suspense fallback={"Comments loading..."}>
        <Await resolve={commentsPromise}>
          <CommentList />
        </Await>
      </Suspense> 
    </>
  }
  
  function CommentList() {
    const comments = useAsyncValue();

    return <>...</>
  }
  ```

---
### Übung: BlogPostPage

* Die Daten für die `BlogPostPage` werden schon gelesen, aber nicht verzögert
* Stell die Loader-Funktion `blogPageLoader` (`BlogPostPage.tsx`) auf `defer` um, so dass Blog-Post und Kommentare als Promises zurückgegeben werden.
* Baue die `BlogPostPage` so um, dass sie mit `Await` auf die beiden Promises wartet
  * Das `Await` für die Blog-Post-Daten soll mit einer `children`-Funktion arbeiten
  * Baue die `CommentList`-Komponente so um, dass sie `useAsyncValue` verwendet
  * Welcher Ansatz gefällt dir besser? `children` oder `useAsyncValue`?
* Kannst Du die `BlogPostPage` mit `Suspense` so bauen, dass der eigentlich Blog-Post schon angezeigt wird, auch wenn auf die Kommentare noch gewartet wird?
  * Dazu die `slowDown`-Konstanten in `backend-queries.ts` setzen (SlowDown für Kommentare muss länger sein als SlowDown für Artikel)
  * Beispiel: `const getBlogPostSlowdown = "?slowDown=1200"; const getCommentsSlowdown = "?slowDown=1600";`
* Lösung: `steps/20_defer`

---
### Actions
* Eine Route kann eine `action` definieren
* Diese Funktion wird vom React Router aufgerufen, wenn die Route mit nicht-lesendem Zugriff (POST, PATCH, DELETE, PUT, ...) aufgerufen wird
  * `loader` für GET, `action` für (fast) alles andere
* Auch die `action`-Funktion bekommt `params` und `request` übergeben
* Das `Request`-Objekt kann in diesem Fall zum Beispiel den den Inhalt eines Formulars enthalten 
* Mit der React Router `Form`-Komponente kann ein Formular "submitted" werden, und die entsprechende `action`-Funktion wird dann aufgerufen
  * ```tsx
    const router = createBrowserRouter({ path: "add", element: <PostEditor />, action: addPostAction });
  
    const addPostAction: ActionFunction = async ({ params, request }) => {
      const { title, body } = await request.json();

      const result = await fetch("/...", { method: "POST", body: JSON.stringify({title, body}));
      if (result.status === "success") {
        return redirect("/blog");
      }
      return result;
    };
    
    function PostEditor() {
     
      // Form-Komponente vom React Router (identische API mit HTML form-Element)
      return <Form method="POST">
        <input name="title" />
        <input name="body" />
      </Form>
    }
    ```
* Was ist eure Meinung dazu? 🤔 

--
## end-to-end-Tests

* Stimmt das: *a good e2e test lasts forever, no matter how often you change the implementation* (https://x.com/acdlite/status/1731354993230319974?s=20)?

--
### Playwright Komponententest

