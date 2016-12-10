/*:
 * @plugindesc A very simple alternate menu. Designed for Trample Line Riddles.
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 */

 (function(){
Window_MenuStatus.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, Window_Base._faceWidth, Window_Base._faceHeight);
    this.changePaintOpacity(true);
};

Window_MenuStatus.prototype.maxEquipmentLines = function(){
    return 3;
};

Window_MenuStatus.prototype.drawEquipSlots = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x + 162;
    var y = rect.y + this.lineHeight() - 10;
    var width = rect.width - x - this.textPadding();
    var equips = actor.equips();
    var count = Math.min(equips.length, this.maxEquipmentLines());
    for (var i = 0; i < count; i++) {
        this.drawItemName(equips[i], x, y + this.lineHeight() * i);
    }
};

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x + 162;
    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    var width = rect.width - x - this.textPadding();
    this.drawActorName(actor, rect.x + 1, rect.y + 1 + Window_Base._faceHeight - this.standardFontSize());
    this.drawTextEx(actor.profile(), rect.x+1, rect.y + 1 + Window_Base._faceHeight);
    this.drawEquipSlots(index, x, y, width);
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return $gameParty.members().length;
};
})();