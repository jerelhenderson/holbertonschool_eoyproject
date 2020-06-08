let sw = require('stopword');
let extractor = require('@knod/unfluff');

function getWords(data) {
    data = extractor(data);
    alert(data);

    let wordsArray = splitWords(data["text"]);
    let wordsMap = countWords(wordsArray);
    let sortedList = sortByFreq(wordsMap);

    alert("/" + sortedList[0]["word"] + "/" + sortedList[1]["word"] + "-" + sortedList[2]["word"]); 
};

function splitWords (givenText) {
    let changedString = givenText.replace(/\W/g, ' ').replace(/\d+/g, '').replace(/ +(?= )/g, '').toLowerCase();
    let wordsArray = changedString.split(/\s+/);
    let strippedWords = sw.removeStopwords(wordsArray);

    return strippedWords;
};

function countWords (wordsArray) {
    let wordsMap = {};

    wordsArray.forEach(function (key) {
	if (wordsMap.hasOwnProperty(key)) {
	    wordsMap[key]++;
	} else {
	    wordsMap[key] = 1;
	}
    });
    return wordsMap;
};

function sortByFreq (wordsMap) {
    let sortedList = [];

    sortedList = Object.keys(wordsMap).map(function (key) {
	return {
	    word: key,
	    total: wordsMap[key]
	};
    });

    sortedList.sort(function (lowest, highest) {
	return highest.total - lowest.total
    });

    if (sortedList.length > 20) {
	return sortedList.slice(0, 10);
    } else {
	return sortedList;
    }
};
