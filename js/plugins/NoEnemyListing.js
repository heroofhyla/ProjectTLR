/*:
 * @plugindesc Suppresses the enemies list that appears pre-battle
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 * @help
 * This script completely removes the message that appears pre-combat
 * which lists all enemies in the fight. Pre-emptive strike and surprise
 * warnings still appear.
 */

(function(){
	BattleManager.displayStartMessages = function() {
    if (this._preemptive) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
	};
})();