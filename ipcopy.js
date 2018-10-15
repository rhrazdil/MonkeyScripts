// ==UserScript==
// @name IPCopy
// @description Copy IP address from clicked element
// @namespace Violentmonkey Scripts
// @match https://*/*
// @grant GM_addStyle
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js 
// ==/UserScript==


function isIPAddr(input) {
    var blocks = input.split(".");
    if(blocks.length === 4) {
      return blocks.every(function(block) {
        return !isNaN(block) && parseInt(block,10) >=0 && parseInt(block,10) <= 255;
      });
    }
    return false;
  }

  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
  
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
}

document.addEventListener("click", (event) => {    
  text = event.target.innerHTML;
  addrs = text.split(' ');
  for (var i = 0; i < addrs.length; i++) {
    if(isIPAddr(addrs[i])) {
      copyTextToClipboard(addrs[i]);
      break;
    }
  }
});
