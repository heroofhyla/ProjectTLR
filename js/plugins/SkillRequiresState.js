/*:
 * @plugindesc Provides a tag that lets you seal a skill unless a particular state is active
 * @author Michael Stroud
 *
 * @help
 * Use the tag <reqstate:3> for example, to require that the user have state #3 to use the specific skill
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 */

(function(){

Game_BattlerBase.prototype.isSkillSealed = function(skillId) {
    var reqState = $dataSkills[skillId].meta.reqstate;
    if (reqState){
        return this.isStateAffected(reqState);
    }
    return this.traitsSet(Game_BattlerBase.TRAIT_SKILL_SEAL).contains(skillId);
};

})();
