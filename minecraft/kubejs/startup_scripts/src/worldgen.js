const oresToRemove = ["minecraft:copper_ore", "create:zinc_ore"];

let allOresToRemove = [];

oresToRemove.forEach((or) => {
  allOresToRemove.concat(ore(or));
});

WorldgenEvents.remove((event) => {
  event.removeOres((props) => {
    props.worldgenLayer = "underground_ores";
    props.blocks = allOresToRemove;
  });

  event.removeOres((props) => {
    props.worldgenLayer = "underground_ores";
    props.biomes = { not: "#minecraft:is_savanna" };
    props.blocks = ore("minecraft:gold_ore");
  });

  event.removeOres((props) => {
    props.worldgenLayer = "underground_ores";
    props.biomes = { not: "#minecraft:is_desert" };
    props.blocks = ore("thermal:lead_ore");
  });
});

function ore(name) {
  let split = name.split(":");

  return [name, split[0] + ":deepslate_" + split[1]];
}
