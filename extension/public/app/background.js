/*global chrome*/
(function(){
    chrome.runtime.onMessage.addListener(data => {
        console.log(data);
        console.log('in bg.js')
        if (data.type === "hello") {
            console.log("gettting conncted from this logmsg")
        }
    })
}());

