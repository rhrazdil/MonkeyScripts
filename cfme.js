// ==UserScript==
// @name CFME provision VM autofill on click
// @namespace Violentmonkey Scripts
// @match https://*/*
// @grant GM_addStyle
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js 
// ==/UserScript==


var path = location.pathname;

function generate_string(prefix){
  return prefix + Math.random().toString(36).substring(7);
}

switch (true) {
  case path.includes('vm_infra/explorer'):
    $(document).ready(function() {
      $(document).on("click", function(event) {
          if (event.target.id == 'requester__owner_email'){
            $("#requester__owner_email").val('test_email@domain.com');
          } else if (event.target.id == 'service__vm_name'){
            $("#service__vm_name").val(generate_string('test_vm'));
          }
      });
    });
    break;
};
