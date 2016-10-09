/*:
 * @plugindesc Shows only a listing of all an actor's skills in the
 * actor command window
 * @param showAttackCommand
 * @desc if "1" and if the attack skill is not sealed, show the standard "attack" command 
 * @default 0
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 * @help
 * You'll need to manually add the attack and guard skills to each character 
 * if you want them. I recommend not blindly giving them to each character -
 * have some variety!
 *
 * This plugin makes it impossible to use items in battle.
 */

(function(){
	var parameters = PluginManager.parameters('skillsOnlyBattleWindow');
    var showAttackCommand = Number(parameters['showAttackCommand'] || 0);
	
	Window_ActorCommand.prototype.makeCommandList = function() {
		if (this._actor) {
			this.addEachSkillCommand();
		}
	};
	
	Window_ActorCommand.prototype.addEachSkillCommand = function() {
		var skills = this._actor.usableSkills();
		if (skills.length == 0 || (showAttackCommand && !this._actor.isSkillSealed(1))){
			this.addAttackCommand();
		}
		skills.forEach(function(skill) {
			var name = skill.name;
			this.addCommand(name, 'singleSkill', true, skill);
		}, this);
	};
	
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
		this.addWindow(this._actorCommandWindow);
	};
})();

