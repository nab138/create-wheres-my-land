const woodTypes = ["oak", "spruce", "birch", "jungle", "acacia", "dark_oak"];

const newWoodTypes = woodTypes.concat(["cherry", "mangrove"]);

const netherWoodTypes = ["warped", "crimson"];

ServerEvents.recipes((event) => {
  //listen for the "recipes" server event.
  // You can replace `event` with any name you like, as
  // long as you change it inside the callback too!

  // This part, inside the curly braces, is the callback.
  // You can modify as many recipes as you like in here,
  // without needing to use ServerEvents.recipes() again.

  // remove all boat recipes
  newWoodTypes.forEach((woodType) => {
    event.remove({ output: `minecraft:${woodType}_boat` });
  });

  event.replaceInput(
    { input: "minecraft:gold_ingot", mod: "vs_eureka" },
    "minecraft:gold_ingot",
    "vs_eureka:floater"
  );
  event.replaceInput(
    { id: "vs_eureka:floater" },
    "minecraft:string",
    "minecraft:dried_kelp_block"
  );

  event.remove({ id: "create:crafting/kinetics/mechanical_drill" });

  event.replaceInput(
    { id: "thermal:drill_head" },
    "minecraft:iron_ingot",
    "thermal:lead_ingot"
  );

  event.replaceInput(
    { id: "thermal:drill_head" },
    "minecraft:copper_ingot",
    "minecraft:iron_ingot"
  );

  event.recipes.createMixing("2x kubejs:kelp_paste", [
    "minecraft:dried_kelp",
    "minecraft:dried_kelp",
    "minecraft:kelp",
    "minecraft:kelp",
  ]);

  event.recipes.createMixing("1x kubejs:enriched_gravel", [
    Fluid.of("minecraft:water", 1000),
    "minecraft:gravel",
    "minecraft:gravel",
    "minecraft:clay_ball",
    "kubejs:kelp_paste",
    "minecraft:iron_nugget",
  ]);

  event.shaped("create:super_glue", ["AB", "CA"], {
    A: "kubejs:kelp_paste",
    B: "create:iron_sheet",
    C: "minecraft:iron_nugget",
  });

  event.shaped("create:mechanical_drill", [" A ", " B ", " C "], {
    A: "thermal:drill_head",
    B: "create:shaft",
    C: "create:andesite_casing",
  });
});
