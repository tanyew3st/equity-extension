document.getElementById("preferences-form").addEventListener('submit', function (event) {
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
        "timePeriod": timePeriod,
        "lowerThreshold": lowerBound,
        "higherThreshold": upperBound,
    }

    chrome.storage.sync.set({ "preferences": obj });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
    window.close();
});

document.getElementById("lower-range").addEventListener("input", function () {
    document.getElementById("lower-val").innerHTML = document.getElementById("lower-range").value + '%';
});

document.getElementById("upper-range").addEventListener("input", function () {
    document.getElementById("upper-val").innerHTML = document.getElementById("upper-range").value + '%';
});

const setPreferences = () => {
    let timeInterval;
    let higherThreshold;
    let lowerThreshold;
    try {
        chrome.storage.sync.get("preferences", function (res) {

            timeInterval = res['preferences']['timePeriod'];
            higherThreshold = res['preferences']['higherThreshold'];
            lowerThreshold = res['preferences']['lowerThreshold'];
            document.getElementById("lower-range").value = parseInt(lowerThreshold * 100);
            document.getElementById("lower-val").innerHTML = parseInt(lowerThreshold * 100) + '%';
            document.getElementById("upper-range").value = parseInt(higherThreshold * 100);
            document.getElementById("upper-val").innerHTML = parseInt(higherThreshold * 100) + '%';
            document.getElementById(timeInterval + "Radio").setAttribute("checked", "");
            
        })
    }
    // if user preferences are not set
    catch (error) {

        timeInterval = 'Hour';
        higherThreshold = 5;
        lowerThreshold = -5;
        document.getElementById("lower-range").value = lowerThreshold;
        document.getElementById("lower-val").innerHTML = lowerThreshold + '%';
        document.getElementById("upper-range").value = higherThreshold;
        document.getElementById("upper-val").innerHTML = higherThreshold + '%';
        document.getElementById(timeInterval + "Radio").setAttribute("checked", "");

    }
}

setPreferences();