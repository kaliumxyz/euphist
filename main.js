// ==UserScript==
// @name         euphist
// @version      1.0.2
// @namespace    leet.nu
// @description  bash like history support for Heim.
// @author       Kalium, Xyzzy
// @include      https://euphoria.io/room/*
// @include      https://euphoria.leet.nu/room/*
// @grant        none
// @updateUrl    https://raw.githubusercontent.com/kaliumxyz/euphist/master/main.js
// @downloadUrl  https://raw.githubusercontent.com/kaliumxyz/euphist/master/main.js
// ==/UserScript==

(() => {
	function main() {
		if (typeof Heim === 'undefined') {
			setTimeout(main, 100);
			return;
		}

		console.log('euphist init!')
		const euphist = {
			msgStack: [],
			msgIndex: 0,
		};

		Heim.actions._sendMessage = Heim.actions.sendMessage;
		Heim.actions.sendMessage = (text, ...etc) => {
			euphist.msgStack.push(text);
			euphist.msgIndex = euphist.msgStack.length;
			Heim.actions._sendMessage(text, ...etc);
		}

		euphist.keyDownEvent = ev => {
			if(ev.ctrlKey) {
				let input = document.querySelector('.entry-text');

				if(input)
					if(input.value === '' || input.value === euphist.msgStack[euphist.msgIndex])
						switch(ev.keyCode) {
								//up
							case 38:
								if(euphist.msgIndex > 0)
									input.value = euphist.msgStack[--euphist.msgIndex];
								break;
								//down
							case 40:
								if(euphist.msgIndex >= euphist.msgStack.length -1) {
									input.value = '';
									euphist.msgIndex = euphist.msgStack.length;
								} else {
									input.value = euphist.msgStack[++euphist.msgIndex];
								}
								break;
						}
			}
		}

		document.addEventListener('keydown', euphist.keyDownEvent);
	}
	main();
})();
