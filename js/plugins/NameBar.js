/*:
 * @plugindesc Adds a nameplate above message boxes.
 * @author Michael Stroud
 * 
 * @param variable	
 * @desc The variable which holds the current name to display
 * @default 1
 * No warranty, express or implied. I can't guarantee that it will
 * work at all. If it's useful to you, credit is appreciated.
 * You may redistribute, but do not remove any of the above.
 * 
 * Revision 1: Complete basic functionality
 * Revision 2: Adjust timings for opening and closing.
 * @help
 *
 * Use \~ in a message box to make the nameplate appear.
 * Right now the position of the nameplate is hardcoded. This might change.
 * 
 * To control which name is displayed:
 * 
 * Set the assigned variable to use the "script" option, and enter the
 * name of the character IN QUOTES.
 * To use a character name from the database, use "\\n[3]" for example
 * (including the quotes and both backslashes) to display the name of the
 * third character in the database.
*/
(function(){
	var parameters = PluginManager.parameters('NameBar');
    var nameVar = Number(parameters['variable'] || 1);
	//all this stuff is adapted from Window_Gold
	function Window_Name() {
		this.initialize.apply(this, arguments);
	}

	Window_Name.prototype = Object.create(Window_Base.prototype);
	Window_Name.prototype.constructor = Window_Name;

	Window_Name.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = this.windowHeight();
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.refresh();
	};

	Window_Name.prototype.windowWidth = function() {
		return 240;
	};

	Window_Name.prototype.windowHeight = function() {
		return this.fittingHeight(1);
	};

	Window_Name.prototype.refresh = function() {
		var x = this.textPadding();
		var width = this.contents.width - this.textPadding() * 2;
		this.contents.clear();
		var nameString = String($gameVariables.value(nameVar));
		nameString = this.convertEscapeCharacters(nameString);
		this.drawText(nameString, x, 0, width, 'left');
	};

	Window_Name.prototype.value = function() {
		return $gameParty.Name();
	};

	Window_Name.prototype.currencyUnit = function() {
		return TextManager.currencyUnit;
	};

	Window_Name.prototype.open = function() {
		this.refresh();
		Window_Base.prototype.open.call(this);
		if (this._openness > 128){
			this._openness = 255;
		}else{
			this._openness = 0;
		}
	};
	
	Window_Name.prototype.close = function(){
		this.refresh();
		Window_Base.prototype.close.call(this);
		if (this._openness > 0){
			this._openness = 255;
		}
	}

	var _Window_message_prototype_subwindows = Window_Message.prototype.subWindows;
	Window_Message.prototype.subWindows = function() {
    return [this._goldWindow, this._choiceWindow,
            this._numberWindow, this._itemWindow,
			this._nameWindow];
	};
	
	var _Window_Message_prototype_createSubWindows = Window_Message.prototype.createSubWindows;
	Window_Message.prototype.createSubWindows = function(){
		_Window_Message_prototype_createSubWindows.call(this);
		this._nameWindow = new Window_Name(0,372);
		this._nameWindow.openness = 0;
	};
	
	var _Window_Message_prototype_terminateMessage = Window_Message.prototype.terminateMessage;
	Window_Message.prototype.terminateMessage = function() {
		this._nameWindow.close();
		_Window_Message_prototype_terminateMessage.call(this);
	};
	
	Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {

    case '$':
        this._goldWindow.open();
        break;
	case '~':
		this._nameWindow.open();
		break;
    case '.':
        this.startWait(15);
        break;
    case '|':
        this.startWait(60);
        break;
    case '!':
        this.startPause();
        break;
    case '>':
        this._lineShowFast = true;
        break;
    case '<':
        this._lineShowFast = false;
        break;
    case '^':
        this._pauseSkip = true;
        break;
    default:
        Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
        break;
    }
	};
	
	Window_Base.prototype.obtainEscapeCode = function(textState) {
    textState.index++;
    var regExp = /^[\~\$\.\|\^!><\{\}\\]|^[A-Z]+/i;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[0].toUpperCase();
    } else {
        return '';
    }
	
};
})();