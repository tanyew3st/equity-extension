document.getElementById("preferences-form").addEventListener('submit', function (event) {
    console.log("reached inner");
    const form = event.target;
    const hour = form['0'].checked;
    const day = form['1'].checked;
    const week = form['2'].checked;
    const month = form['3'].checked;
    const lowerBound = parseFloat(form['4'].value) / 100;
    const upperBound = parseFloat(form['5'].value) / 100;

    let timePeriod = null;
    if (hour) {
        timePeriod = "Hour";
    } else if (day) {
        timePeriod = "Day";
    } else if (week) {
        timePeriod = "Week";
    } else {
        timePeriod = "Month";
    }

    const obj = {
        "timePeriod" : timePeriod,
        "lowerThreshold" : lowerBound,
        "higherThreshold" : upperBound,
    }

   // window.localStorage.setItem("preferences", obj);
    chrome.storage.sync.set({"preferences":obj});
    console.log(window.localStorage);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
    window.close();
});

document.getElementById("lower-range").addEventListener("input", function () {
    console.log("called");
    document.getElementById("lower-val").innerHTML= document.getElementById("lower-range").value + '%';
});

document.getElementById("upper-range").addEventListener("input", function () {
    console.log("called");
    document.getElementById("upper-val").innerHTML= document.getElementById("upper-range").value + '%';
});
