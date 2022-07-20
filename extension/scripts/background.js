chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        console.log(tabs[0].id);
    })
    console.log("receieved a message!");
    return "something";
    // if (request.type == "worktimer-notification")
    //   chrome.notifications.create('worktimer-notification', request.options, function() { });
});
