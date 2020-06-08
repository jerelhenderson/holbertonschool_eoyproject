chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
  if(request.action === "getSource") {
    sendResponse({sourceCode: document.documentElement.outerHTML});
  }
});
