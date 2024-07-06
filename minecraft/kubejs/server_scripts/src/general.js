ServerEvents.loaded((event) => {
  if (event.server.persistentData.gameRules) return;
  event.server.gameRules.set("doDaylightCycle", false);
  event.server.gameRules.set("doInsomnia", false);
  event.server.gameRules.set("doPatrolSpawning", false);
});
