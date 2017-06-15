/*:
 * @plugindesc Simplifies combat
 *
 * @help
 * Luck stat (0-100 value) is used for dodge stat and critical hit rate
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 */

 (function(){

Game_Action.prototype.itemCri = function(target) {
    var cri = this.subject().luk/100.0;
    return this.item().damage.critical ? cri * (1 - target.cev) : 0;
};

Game_Action.prototype.itemEva = function(target) {
    var eva = target.luk/100.0;
    if (this.isPhysical()) {
        return eva
    } else if (this.isMagical()) {
        return eva
    } else {
        return 0;
    }
};

Game_Action.prototype.itemHit = function(target) {
    return this.item().successRate * 0.01;
};

})();