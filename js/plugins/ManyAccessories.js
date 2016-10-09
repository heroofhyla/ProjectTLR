/*:
 * @plugindesc Equip more than one accessory
 * @param accessoryCount 
 * @desc The number of accessories that can be equipped
 * @default 2
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 * @help
 * Whatever equipment slot is last on the list in the Terms tab of
 * the database will be duplicated the specified number of times.
 */

(function(){
	var parameters = PluginManager.parameters('ManyAccessories');
    var accessoryCount = Number(parameters['accessoryCount'] || 2);
	Game_Actor.prototype.equipSlots = function() {
		var slots = [];
		for (var i = 1; i < $dataSystem.equipTypes.length - 1; i++) {
			slots.push(i);
		}
		var accessorySlot =  $dataSystem.equipTypes.length - 1; 
		console.log(accessorySlot);
		for (var i = 1; i <= accessoryCount; i++){
			slots.push(accessorySlot)
		}
		if (slots.length >= 3 && this.isDualWield()) {
			slots[1] = 1;
		}
		return slots;
	};
})();
