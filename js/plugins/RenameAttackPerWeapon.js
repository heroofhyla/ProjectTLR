/*:
 * @plugindesc Weapons can rename the Attack skill
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 * @help
 * Item (Weapon) Note:
 *   <attackName:NAME>                # The equipping actor's Attack skill is renamed NAME */

(function(){
	Window_ActorCommand.prototype.addAttackCommand = function() {
		console.log(this._actor.isSkillSealed(1));
		if (this._actor.hasNoWeapons()){
			this.addCommand(TextManager.attack, 'attack', this._actor.canAttack());
		}else{
			var skillName = this._actor.weapons()[0].meta.attackName;
			this.addCommand(skillName?skillName:TextManager.attack, 'attack', this._actor.canAttack());
		}
	};
})();
