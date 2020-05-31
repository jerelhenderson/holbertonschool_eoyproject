chrome.tabs.create({
    url: 'http://ign.com'
}, function(tab) {
    chrome.tabs.onUpdated.addListener(function func(tabId, changeInfo) {
        if (tabId == tab.id && changeInfo.status == 'complete') {
            chrome.tabs.onUpdated.removeListener(func);
            savePage(tabId);
        }
    });
});

function savePage(tabId) {
    chrome.pageCapture.saveAsMHTML({
        tabId: tabId
    }, function(blob) {
        var url = URL.createObjectURL(blob);
        // Optional: chrome.tabs.remove(tabId); // to close the tab
        chrome.downloads.download({
            url: url,
            filename: 'whatever.mhtml'
        });
    });
}
