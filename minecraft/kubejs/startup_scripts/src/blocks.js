StartupEvents.registry("block", (event) => {
  event
    .create("enriched_gravel")
    .mapColor("stone")
    .soundType("gravel")
    .hardness(0.6)
    .resistance(0.6)
    .requiresTool(true)
    .tagBlock("mineable/shovel");
});
