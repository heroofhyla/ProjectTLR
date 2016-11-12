/*:
 * @plugindesc Calls a specified common event at the start of every battle
 * @param eventID 
 * @desc The common event to call at the start of each battle
 * @default 1
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 */

(function(){
	var parameters = PluginManager.parameters('CommonEventAtBattleStart');
    var eventID = Number(parameters['eventID'] || 1);
	
	var _BattleManagerStartBattle = BattleManager.startBattle;
	BattleManager.startBattle = function() {
		_BattleManagerStartBattle.call(this);
		$gameTemp.reserveCommonEvent(eventID);
	};
	
})();
