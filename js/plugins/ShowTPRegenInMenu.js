/*:
 * @plugindesc Removes the experience point display from the menu
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 */

(function(){
    var _WindowStatusPrototypeDrawParameters = Window_Status.prototype.drawParameters;
    Window_Status.prototype.drawParameters = function(x, y) {
        _WindowStatusPrototypeDrawParameters.call(this, x, y);
        this.changeTextColor(this.systemColor());
        this.drawText("TP Regen", x + 240, y);
        this.resetTextColor();
        this.drawText(this._actor.xparam(9), x + 360, y);
    };
 })();