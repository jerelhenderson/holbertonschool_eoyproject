chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
    let url = tabs[0].url;
    grabHTML(url);
  });
});

function grabHTML(url) {
  let xhr = new XMLHttpRequest();

  xhr.onload = function() {
    pageSource = xhr.responseText;
    getWords(pageSource);
  };
  xhr.open("GET", url);
  xhr.send();
};

