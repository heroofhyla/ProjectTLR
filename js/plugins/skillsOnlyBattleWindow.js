/*:
 * @plugindesc Shows only a listing of all an actor's skills in the
 * actor command window
 * @author Michael Stroud
 * @param showSkillIcon
 * @desc if "1" then icons are shown next to skills
 * @default 1
 * @param itemCommandSkill
 * @desc Create a placeholder skill for the item command and set its ID here.
 * @default 3
 * @
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 * @help 
 * Seal skill 1 to remove the attack command from a character.
 * Seal skill 2 to remove the guard command.
 * Seal the skill specified by "itemCommandSkill" to remove the item command.
 */

(function(){
	var parameters = PluginManager.parameters('skillsOnlyBattleWindow');
    var showAttackCommand = Number(parameters['showAttackCommand'] || 0);
	var showItemCommand = Number(parameters['showItemCommand'] || 0);
    var showGuardCommand = Number(parameters['showGuardCommand'] || 0);
    var showSkillIcon = Number(parameters['showSkillIcon'] || 0);
    var itemCommandSkill = Number(parameters['itemCommandSkill'] || 3);
    this.icons = [];
	Window_ActorCommand.prototype.makeCommandList = function() {
		if (this._actor) {
            this.icons = [];
			this.addEachSkillCommand();
		}
	};
	
	Window_ActorCommand.prototype.addEachSkillCommand = function() {
		var skills = this._actor.usableSkills();        
		if (!this._actor.isSkillSealed(1)){
			this.addAttackCommand();
            this.icons.push($dataSkills[1].iconIndex);
		}
		skills.forEach(function(skill) {
			var name = skill.name;
			this.addCommand(name, 'singleSkill', true, skill);
            this.icons.push(skill.iconIndex);
		}, this);
        
        if (!this._actor.isSkillSealed(2)){
            this.addGuardCommand();
            this.icons.push($dataSkills[2].iconIndex);
        }
        
        if (!this._actor.isSkillSealed(itemCommandSkill)){
                this.addItemCommand();
                this.icons.push($dataSkills[itemCommandSkill].iconIndex);
        }
	};
	
    Window_ActorCommand.prototype.drawItem = function(index){
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        var x = rect.x;
        if (showSkillIcon){
            this.drawIcon(this.icons[index], rect.x, rect.y);
            x += Window_Base._iconWidth;
            this.drawText(this.commandName(index), x, rect.y, rect.width-Window_Base._iconWidth, align);
        }else{
            this.drawText(this.commandName(index), x, rect.y, rect.width, align);
        }
        
    }
	Scene_Battle.prototype.commandSingleSkill = function() {
		var skill = this._actorCommandWindow.currentExt();
		var action = BattleManager.inputtingAction();
		action.setSkill(skill.id);
		BattleManager.actor().setLastBattleSkill(skill);
		this.onSelectAction();
	};
	
	Scene_Battle.prototype.createActorCommandWindow = function() {
		this._actorCommandWindow = new Window_ActorCommand();
		this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
		this._actorCommandWindow.setHandler('singleSkill', this.commandSingleSkill.bind(this));
		this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
        this._actorCommandWindow.setHandler('guard', this.commandGuard.bind(this));
        this._actorCommandWindow.setHandler('item', this.commandItem.bind(this));
		this.addWindow(this._actorCommandWindow);
	};
})();

