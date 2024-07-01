// priority: 0

// Visit the wiki for more info - https://kubejs.com/

StartupEvents.registry("item", (e) => {
  // The texture for this item has to be placed in kubejs/assets/kubejs/textures/item/test_item.png
  // If you want a custom item model, you can create one in Blockbench and put it in kubejs/assets/kubejs/models/item/test_item.json
  e.create("kelp_paste").displayName("Kelp Paste").maxStackSize(64);
});
