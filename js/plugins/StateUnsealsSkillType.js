/*:
 * @plugindesc Provides a tag that allows you to unseal particular skilltypes with a state
 *
 * @help
 * Use the tag <unsealskilltype:3> for example, to unseal skilltype #3
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 */

(function(){

Game_BattlerBase.prototype.isSkillTypeSealed = function(stypeId) {
    console.log("Checking skill seals for " + this.name);
    var unseals = [];
    $dataStates.forEach(function(state) {
        meta = state.meta.unsealskilltype;
        if (meta){
            unseals.push(meta);
        }
    });
    
    if (unseals.includes(stypeId)){
        return true;
    }
    return this.traitsSet(Game_BattlerBase.TRAIT_SKILL_SEAL).contains(skillId);
};

})();
