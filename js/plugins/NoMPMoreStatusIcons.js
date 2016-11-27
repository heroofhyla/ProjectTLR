/*:
 * @plugindesc Removes MP bar, making room for more status icons
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 * @help
 * This plugin hides the MP bar in battle and in menus
 */

 (function(){
	Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
		this.drawActorName(actor, rect.x + 0, rect.y, 150);
		this.drawActorIcons(actor, rect.x + 156, rect.y, rect.width - 28);
	};
	
	Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
		this.drawActorHp(actor, rect.x + 130, rect.y, 201);
	};
	
	Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
		//nothing!
	};
})();