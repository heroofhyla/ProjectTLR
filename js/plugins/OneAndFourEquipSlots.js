/*:
 * @plugindesc Changes equip slots so each actor can equip 1 of one slot type and several of another
 * @param primarySlotID 
 * @desc The ID of the slot for the primary equipment (default 1)
 * @default 1
 * @param otherSlotID 
 * @desc The ID to use for each other slot (default 2)
 * @default 2
 * @param slotCount
 * @desc The total number of slots (default 5)
 * @default 5
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 * @help
 * todo
 */

(function(){
	var parameters = PluginManager.parameters('OneAndFourEquipSlots');
    var primarySlotID = Number(parameters['primarySlotID'] || 1);
	var otherSlotID = Number(parameters['otherSlotID'] || 2);
	var slotCount = Number(parameters['slotCount'] || 5);
	Game_Actor.prototype.equipSlots = function() {
		var slots = [];
		for (var i = 1; i <= slotCount; i++) {
			slots.push(otherSlotID);
		}
		slots[0] = primarySlotID;
		/*if (slots.length >= 2 && this.isDualWield()) {
			slots[1] = 1;
		}*/
		return slots;
	};
})();
