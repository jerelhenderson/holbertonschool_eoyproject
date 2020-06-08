promisifyAll(
  chrome.pageCapture,
  chrome.permissions,
  chrome.storage.sync,
  chrome.tabs
);

chrome.browserAction.onClicked.addListener(function(tab) {
  save(tab);
});

async function save(tab) {
  let saveFile = await chrome.pageCapture.saveAsMHTML({ tabId: tab.id }, null);
  const options = await chrome.storage.sync.get({ patchSubject: true }, null);

  if (options.patchSubject) {
    let mht = await readBlobAsync(saveFile);

    mht = mht.replace(/^(Subject: )(.*)$/m, `$1${tab.title}`);
    saveFile = new Blob([mht]);
  }

  const filename = `${cleanUp(tab.title)}.mht`;

  console.info(`Executed: ${filename}`);

  download(filename, saveFile);

  function download(filename, saveFile) {
    chrome.downloads.download({
      conflictAction: 'uniquify',
      filename: filename,
      url: URL.createObjectURL(saveFile)
    });
  }

  function readBlobAsync(saveFile) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = () => {
        reject(fr.error)
      };
      fr.onload = () => {
        resolve(fr.result)
      };
      fr.readAsText(saveFile);
    });
  };

  function cleanUp(filename) {
    return filename.replace(/[<>:"/\\|?*\x00-\x1F]/g, '');
  }
}
