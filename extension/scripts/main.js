import { convertMain } from './converter.js'

function display_h1(results) {
    console.log(results);
}

const fetchClasses = () => {
    let tabId;

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        tabId = tabs[0].id;
        var tab = tabs[0];
        console.log(tab);

        // tab_title = tab.title;
        chrome.scripting.executeScript(
            {
                target: { tabId: tabId },
                files: ['scripts/getAllElements.js'],
            },
            (response) => { console.log(response); });
    });

    let allElements;

    // chrome.tabs.executeScript(tabId, {
    //     code: "document.getElementsByTagName('*')"
    //   }, (response) => {
    //     console.log(response);
    //   });

    // const allElements = document.getElementsByTagName('*');
    console.log(allElements);
    const set = new Set();

    // ✅ Loop through all elements (including html, head, meta, scripts)
    for (const element of allElements) {
        console.log(element);
        for (const c of element.classList.entries()) {
            set.add(c[1]);
        }
    }

    for (const className of set) {
        const element = document.getElementsByClassName(className)[0];
        console.log(element.style.backgroundColor);
        // element.style.backgroundColor = "white";
        console.log(element);
    }
}

window.onload = (event) => {
    convertMain();
    // fetchClasses();
    console.log(event);
}