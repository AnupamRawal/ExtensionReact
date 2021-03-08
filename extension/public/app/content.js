/*global chrome*/
(function(){
    chrome.runtime.sendMessage({ type: "hello" },console.log('hello'));
}())

