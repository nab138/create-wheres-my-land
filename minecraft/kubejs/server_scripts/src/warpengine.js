const warpData = {
  "minecraft:iron_ingot": "moonmod:moon",
  "minecraft:grass_block": "minecraft:overworld",
};

const dimLocations = {
  "moonmod:moon": 1.25,
  "minecraft:overworld": 1,
};

// The amount of wanderlite required to warp one "location"
const wanderliteCost = 128;

BlockEvents.rightClicked((event) => {
  if (
    event.hand.name() !== "MAIN_HAND" ||
    event.block.id !== "kubejs:warp_engine"
  )
    return;

  let data = warpData[event.item.id];
  if (!data) return;

  let numWanderlite = 0;
  event.block
    .getInventory()
    .getAllItems()
    .forEach((item) => {
      if (item.getId() == "vs_clockwork:wanderlite_matrix") {
        numWanderlite += item.getCount();
      }
    });

  let curLocation = dimLocations[event.level.dimension];
  if (!curLocation) {
    event.player.tell(
      "The warp engine can't seem to find it's way from " +
        event.level.dimension
    );
    event.cancel();
    return;
  }

  let targetLocation = dimLocations[data];

  if (curLocation === targetLocation) {
    event.player.tell("Like magic, you've been brought to... the same place!");
    event.cancel();
    return;
  }

  let curWanderliteCost =
    wanderliteCost * Math.abs(targetLocation - curLocation);

  if (numWanderlite < curWanderliteCost) {
    event.player.tell(
      "Not enough wanderlite to warp! You need " +
        wanderliteCost * Math.abs(targetLocation - curLocation) +
        " wanderlite to warp there."
    );
    event.cancel();
    return;
  }
  event.block.getInventory().clear("vs_clockwork:wanderlite_matrix");
  let remainingWanderlite = Math.floor(numWanderlite - curWanderliteCost);
  while (remainingWanderlite > 0) {
    let stack = Item.of(
      "vs_clockwork:wanderlite_matrix",
      Math.min(remainingWanderlite, 64)
    );
    event.block.getInventory().insertItem(stack, false);
    remainingWanderlite -= 64;
  }

  event.player.teleportTo(
    data,
    event.player.position().x(),
    event.player.position().y(),
    event.player.position().z(),
    0,
    0
  );
  event.server.runCommandSilent(
    `execute as ${event.player.username} run tp @v[limit=1] @s`
  );
  event.cancel();
});
