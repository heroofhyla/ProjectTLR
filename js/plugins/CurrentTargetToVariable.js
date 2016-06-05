/*:
 * @plugindesc Stores the current target's id in a designated variable
 * @author Michael Stroud
 *
 * @param variableNumber 
 * @desc Which variable to use for storing the target
 * @default 1
 *
 * @help This plugin does not provide plugin commands.
*/

(function(){
	var _Game_Action_prototype_setTarget = Game_Action.prototype.setTarget;
	var parameters = PluginManager.parameters('CurrentTargetToVariable');
	var variableNumber = Number(parameters['variableNumber']);
	Game_Action.prototype.setTarget = function(targetIndex) {
		$gameVariables.setValue(variableNumber, targetIndex);
		_Game_Action_prototype_setTarget.call(this, targetIndex);
	}
})();
