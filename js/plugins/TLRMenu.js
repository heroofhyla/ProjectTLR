/*:
 * @plugindesc A very simple alternate menu. Designed for Trample Line Riddles.
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 */

 (function(){
    function WindowGroup_Status() {
        this.initialize.apply(this, arguments);
    }
    WindowGroup_Status.prototype = Object.create(Window_Selectable.prototype);
    WindowGroup_Status.prototype.constructor = WindowGroup_Status;
    
    WindowGroup_Status.prototype.maxItems = function(){
        return $gameParty.members().length;
    }
    
    WindowGroup_Status.prototype.numVisibleRows = function(){
        return 3;
    }

    WindowGroup_Status.prototype.initialize = function(x, scene) {
        Window_Selectable.prototype.initialize.call(this,x,0,Graphics.boxWidth - 240, 0);
        this._statusWindow = [];
        var empty = 3 - $gameParty.members().length;
        var spaces = $gameParty.members().length + 1;
        var totalWinHeights = Graphics.boxHeight / 3 * $gameParty.members().length;
        var leftOver = Graphics.boxHeight - totalWinHeights;
        var spaceHeight = leftOver/spaces;
        for (i = 0; i < 3; i++){
            this._statusWindow[i] = new Window_MenuStatus(x, i * (Graphics.boxHeight / 3), i);
            scene.addWindow(this._statusWindow[i]);
        }
    }
    
    WindowGroup_Status.prototype.selectLast = function() {
        this.select($gameParty.menuActor().index() || 0);
        this.refresh();
    }
    WindowGroup_Status.prototype.setFormationMode = function(formationMode) {
        this._formationMode = formationMode;
    }
    
    
    WindowGroup_Status.prototype.processCancel = function(){
        Window_Selectable.prototype.processCancel.call(this);
        for (i = 0; i < $gameParty.members().length; i++){
            this._statusWindow[i].deselect();
            this._statusWindow[i].refresh(false);
        }
    }
    WindowGroup_Status.prototype.refresh = function(){
        if (this.index() >= 0){
            $gameParty.setMenuActor($gameParty.members()[this.index()]);
        }
        
        for (i = 0; i < $gameParty.members().length; i++){
            if (this.index() == i){
                this._statusWindow[i].select(0);
                this._statusWindow[i].activate();
            }else{
                this._statusWindow[i].deselect();
                this._statusWindow[i].deactivate();
            }
            this._statusWindow[i].refresh();
        }
    }

    WindowGroup_Status.prototype.updateArrows = function() {
        this.downArrowVisible = false;
        this.upArrowVisible = false;
    }
    Window_MenuStatus.prototype.refresh = function(selected) {
        this.contents.clear();
        this.drawItemBackground(0);
        this.drawItemImage(0);
        this.drawItemStatus(0);
    }
    Scene_Menu.prototype.createStatusWindow = function(){
        
        this._statusWindow = new WindowGroup_Status(this._commandWindow.width, this);
        this.addWindow(this._statusWindow);
    }

    Scene_Menu.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this._statusWindow.refresh();
    };
     
     var _WindowMenuStatusPrototypeInitialize = Window_MenuStatus.prototype.initialize;
     Window_MenuStatus.prototype.initialize = function(x, y, actorIndex){
         this._actor = $gameParty.members()[actorIndex];
         _WindowMenuStatusPrototypeInitialize.call(this, x, y);
         this._padding = 6;
     }
     
     Window_MenuStatus.prototype.drawItemImage = function(index) {
         
        if (this._actor){
            var rect = this.itemRect(index);
            this.changePaintOpacity(this._actor.isBattleMember());
            this.drawActorFace(this._actor, rect.x + 1, rect.y + 1, Window_Base._faceWidth, Window_Base._faceHeight);
            this.changePaintOpacity(true);
        }
    };

    Window_MenuStatus.prototype.windowHeight = function() {
        return Graphics.boxHeight/ 3;
    };

    Window_MenuStatus.prototype.maxEquipmentLines = function(){
        return 3;
    };

    Window_MenuStatus.prototype.drawEquipSlots = function(index) {
        var rect = this.itemRect(index);
        var x = rect.x + 162;
        var y = rect.y + this.lineHeight() - 10;
        var width = rect.width - x - this.textPadding();
        var equips = this._actor.equips();
        var count = Math.min(equips.length, this.maxEquipmentLines());
        for (var i = 0; i < count; i++) {
            this.drawItemName(equips[i], x, y + this.lineHeight() * i);
        }
    };

    Window_MenuStatus.prototype.contentsHeight = function(){
        return this.height - 12;
    };

    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        if (this._actor){
            var rect = this.itemRect(index);
            var x = rect.x + 162;
            var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
            var width = rect.width - x - this.textPadding();
            this.drawActorName(this._actor, rect.x + 1, rect.y + 1 - 8);
            this.drawTextEx(this._actor.profile(), rect.x+1, rect.y + 1 + Window_Base._faceHeight - 4);
            this.drawEquipSlots(index, x, y, width);
        }
    };
    
    Window_MenuStatus.prototype.drawItemBackground = function(index, selected){
        if (selected){
            var rect = this.itemRect(index);
            rect.height -= 18;
            var color = this.pendingColor();
            this.changePaintOpacity(false);
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
            this.changePaintOpacity(true);
        }
    }

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 1;
    };

    Window_MenuStatus.prototype.maxItems = function() {
        return 1;
    };
})();