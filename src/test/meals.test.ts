import { describe, expect, it } from "vitest";
import { computeMacros, normalize, searchRecipes, shoppingList } from "@/lib/meals";
import { recipeById, weeks } from "@/data/recipes";

describe("meals", () => {
  it("every week has 7 days with 4 existing recipes", () => {
    expect(weeks).toHaveLength(6);
    for (const w of weeks) {
      expect(w.days).toHaveLength(7);
      for (const d of w.days) for (const id of Object.values(d)) expect(recipeById[id]).toBeDefined();
    }
  });
  it("computes macros from per-100g table (3 jajka 180 g = 257 kcal part)", () => {
    expect(computeMacros([["jajko", 180]]).kcal).toBe(257);
  });
  it("flags ingredients without data as missing", () => {
    expect(computeMacros(recipeById["curry-kokosowe"]!.ingredients).missing).toContain("Pasta curry");
  });
  it("searches without Polish characters", () => {
    expect(normalize("Łosoś żółty")).toBe("losos zolty");
    expect(searchRecipes("losos").map((r) => r.id)).toContain("salmon-teriyaki");
    expect(searchRecipes("pieczarkowy").map((r) => r.id)).toContain("kurczak-pieczarkowy");
  });
  it("shopping list scales with servings", () => {
    const one = shoppingList(1, 1).find((r) => r.id === "jajko")!.grams;
    expect(shoppingList(1, 2).find((r) => r.id === "jajko")!.grams).toBe(one * 2);
  });
});
