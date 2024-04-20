import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import { fetchRecipes } from "@/app/components/queries.ts";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";


// TODO:
//  ENTWEDER:
//   - überschreibe deine "/app/recipes/page.tsx"-Datei mit dieser Datei
//  ODER
//   - baue deine bestehende Datei "/app/recipes/page.tsx"-Datei um
//
//  IN JEDEM FALL:
//   - Die Komponente für die Route muss eine async RSC werden
//   - Die Komponente soll mittels "fetchRecipes" die Daten laden
//      - Diese Funktion ist bereits fertig: import { fetchRecipes } from "@/app/components/queries.ts";
//      - Die Funktion liefert ein Promise zurück, dass ein Objekt vom Typ PageResponseRecipeDto enthält
//        - In diesem Objekt gibt es einen Eintrag "content", der die Liste mit den Rezepten enthält
//   - Die geladenen Rezepte sollten mit der (fast) fertigen Komponente "RecipeCard" gerendert werden
//     - Du musst über die geladene Liste iterieren (result.content) und für jeden Eintrag eine RecipeCard-Komponente rendern
//
//   - Wir werden später die RecipeListPage-Komponente noch erweitern.
//     - Die Darstellung der eigentliche Liste (iterieren über den Inhalt und Rendern der RecipeCard-Komponente)
//       kannst Du in einer eigenen Komponente machen. Dazu kannst Du das Promise (!) mit dem Ergebnis an die
//       RecipeList-Komponente (s.u.) übergeben

export default function RecipeListPage() {
  // TODO: fetchRecipes verwenden, um Rezepte zu laden

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto pb-16 pt-16"}>
        { /** TODO: RecipeList-Komponente (s.u.) aufrufen */ }
      </div>
    </div>
  );
}

type RecipeListProps = {
  recipesPromise: Promise<PageResponseRecipeDto>;
};

function RecipeList({ recipesPromise }: RecipeListProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      { /** TODO: über das Ergebnis iterieren und mit map für jeden Eintrag eine RecipeCard rendern */}
    </div>
  );
}
