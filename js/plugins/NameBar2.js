/*:
 * @plugindesc Adds a nameplate above message boxes.
 * @author 
 *
 * @help This plugin does not provide plugin commands.
*/
(function(){
	currentName = "Your Name Here";
	
	//all this stuff is copied from Window_Gold
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
		this.drawText(currentName, x, 0, width, 'left');
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
	};
	
	//if i comment out everything after this line, i don't get any errors (but of course the plugin won't actually do anything)
	
	//overriding stuff from Window_Message in order to add my window
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