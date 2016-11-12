/*:
 * @plugindesc Enables movement with the WASD keys. 
 * @author Michael Stroud
 * 
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 * @help
 * This script allows character movement with WASD, in addition to the
 * arrow keys. 
 */

(function(){
	Input.keyMapper[65] = 'left';     //a
	Input.keyMapper[68] = 'right';    //d
	Input.keyMapper[87] = 'up';       //w
	Input.keyMapper[83] = 'down';     //s
	Input.keyMapper[69] = 'pagedown'; //e
})();