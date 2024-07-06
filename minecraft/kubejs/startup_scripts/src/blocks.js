StartupEvents.registry("block", (event) => {
  event
    .create("enriched_gravel")
    .mapColor("stone")
    .soundType("gravel")
    .hardness(0.6)
    .resistance(0.6)
    .requiresTool(true)
    .tagBlock("mineable/shovel")
    .property(BlockProperties.FALLING);

  event
    .create("cobble_quartz_ore")
    .mapColor("stone")
    .soundType("stone")
    .hardness(3)
    .resistance(3)
    .requiresTool(true)
    .tagBlock("mineable/pickaxe");

  event
    .create("warp_engine")
    .blockEntity((info) => {
      info.inventory(9, 1, /(?:vs_clockwork:wanderlite_matrix)/);
      info.rightClickOpensInventory();
      info.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
          .extractItem((blockEntity, slot, amount, simulate) =>
            blockEntity.inventory.extractItem(slot, amount, simulate)
          )
          .insertItem((blockEntity, slot, stack, simulate) =>
            blockEntity.inventory.insertItem(slot, stack, simulate)
          )
          .getSlotLimit((blockEntity, slot) =>
            blockEntity.inventory.getSlotLimit(slot)
          )
          .getSlots((blockEntity) => blockEntity.inventory.slots)
          .getStackInSlot((blockEntity, slot) =>
            blockEntity.inventory.getStackInSlot(slot)
          )
          .isItemValid((blockEntity, slot, stack) =>
            blockEntity.inventory.isItemValid(slot, stack)
          )
      );
    })
    .mapColor("iron")
    .soundType("metal")
    .hardness(5)
    .resistance(6)
    .requiresTool(true)
    .tagBlock("mineable/pickaxe");
});
