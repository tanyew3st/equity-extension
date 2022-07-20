

//const finnhub = require('finnhub'); 
//import finhub from 'finhub'; 
//const api_key = finnhub.ApiClient.instance.authentications['api_key'];


//api_key.apiKey = "cbarv4aad3i91bfqbbug"
//const finnhubClient = new finnhub.DefaultApi();

var timeInterval = 'Hour';
var higherThreshold = 1; 
var lowerThreshold = -1; 



// Gets User Preferences from Local Storage
function getLocalStorageData(){

    /** 
    const obj = {
        "timePeriod" : 'Hour',
        "lowerThreshold" : 1,
        "higherThreshold" : -1,
    }
    debugger;
    //window.localStorage.setItem("preferences", obj);
    //console.log(window.localStorage);


    chrome.storage.sync.set({'preferences':obj});
    **/
    try{
    //const userPrefs = window.localStorage.getItem('preferences');
    chrome.storage.sync.get("preferences",function(res){
        timeInterval = res['timePeriod']; 
        higherThreshold = res['higherThreshold']; 
        lowerThreshold = res['lowerThreshold']; 

    }).then((timeInterval, higherThreshold, lowerThreshold ) => {return [timeInterval, higherThreshold, lowerThreshold]; });


    }
    // if user preferences are not set
    catch(error){
        timeInterval = 'Hour';
        higherThreshold = 1; 
        lowerThreshold = -1; 
        return [timeInterval, higherThreshold, lowerThreshold]; 
    }



   



}


// Returns Stock status based on user preferences for stock Percentage threshold and time interval
function getStockPriceDifference(timeInterval, higherThreshold, lowerThreshold) {


    var currentTime = Math.round((new Date()).getTime() / 1000); // in seconds
    const threeDaysAgo = 259200;
    const oneWeekAgo = 604800;
    const sunday = 1658101000;
    const oneMonthAgo = 2630000;
    const oneDayAgo = 86400;

    var currTime = 0; //initialize variables
    var currPrice = 0;
    var prevTime = 0;
    var prevPrice = 0;

    //axios.get(url[, config])

    // gets current stock price and time in seconds

    fetch("https://finnhub.io/api/v1/stock/candle?symbol=MDB&resolution=30&from=" + (currentTime - threeDaysAgo) +
     "&to=" + currentTime + "&token=cbarv4aad3i91bfqbbug").then(data=>{
        var times = data['t'];
        currTime = times[times.length - 1];
        currPrice = data['c'][times.length - 1];
        console.log(currTime);
        console.log(currPrice);


    })
    //finnhubClient.stockCandles("MDB", "30", currentTime - threeDaysAgo, currentTime, (error, data, response) => {
       //var times = data['t'];
       // currTime = times[times.length - 1];
       // currPrice = data['c'][times.length - 1];

    //});

    /** 
    setTimeout(() => {


        // gets stock price and time from 1 hour ago
        if (timeInterval == 'Hour') {
            finnhubClient.stockCandles("MDB", "60", currentTime - threeDaysAgo, currentTime - 3600, (error, data, response) => {
                var t = data['t'];
                prevTime = t[t.length - 1];
                prevPrice = data['c'][t.length - 1];

            });
        }

        // gets stock price and time from 1 day ago
        else if (timeInterval == 'Day') {
            finnhubClient.stockCandles("MDB", "60", currentTime - threeDaysAgo - oneDayAgo, currentTime - oneDayAgo, (error, data, response) => {
                var t = data['t'];
                prevTime = t[t.length - 1];
                prevPrice = data['c'][t.length - 1];

            });

        }

        // gets stock price and time from 1 week ago
        else if (timeInterval == 'Week') {

            finnhubClient.stockCandles("MDB", "60", currentTime - threeDaysAgo - oneWeekAgo, currentTime - oneWeekAgo, (error, data, response) => {
                var t = data['t'];
                prevTime = t[t.length - 1];
                prevPrice = data['c'][t.length - 1];


            });
        }



        // gets stock price and time from 1 month ago
        else if (timeInterval == 'Month') {
            finnhubClient.stockCandles("MDB", "60", currentTime - threeDaysAgo - oneMonthAgo, currentTime - oneMonthAgo, (error, data, response) => {
                var t = data['t'];
                prevTime = t[t.length - 1];
                prevPrice = data['c'][t.length - 1];

            });
        }






    }, 3000);




    
    setTimeout(() => {
        console.log(currTime);
        console.log(currPrice);
        console.log(prevTime);
        console.log(prevPrice);


        // calculates rate of change from the previous stock price to the current stock price 
        var priceDifference = currPrice - prevPrice;
        var priceDiffPercentage = priceDifference / prevPrice;
        var color = '';

        // returns different labels based on user specificed threshold 
        if (priceDiffPercentage > higherThreshold) {
            color = 'higher';
        }
        else if (priceDiffPercentage < lowerThreshold) {
            color = 'lower';
        }
        else {
            color = 'neutral';
        }

        console.log(color);


        return [color, currPrice];




    }, 7000);





}
**/

userPreferences = getLocalStorageData();
getStockPriceDifference(userPreferences[0],userPreferences[1],userPreferences[2]);}


// // const convertMain = require('./converter.js')

// // (async () => {
// //     const src = chrome.runtime.getURL("your/content_main.js");
// //     const contentMain = await import(src);
// //     contentMain.main();
// //   })();

// function display_h1 (results){
//     console.log(results);
// }

// const fetchClasses = () => {

//     console.log("something");
//     let tabId;

//     chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
//         tabId = tabs[0].id;
//         var tab = tabs[0];
//         console.log(tab);

//         // tab_title = tab.title;
//         chrome.scripting.executeScript(
//             {
//               target: {tabId: tabId},
//               files: ['scripts/getAllElements.js'],
//             },
//         (response) => { console.log(response); });        
//     });

//     let allElements;

//     // chrome.tabs.executeScript(tabId, {
//     //     code: "document.getElementsByTagName('*')"
//     //   }, (response) => {
//     //     console.log(response);
//     //   });

//     // const allElements = document.getElementsByTagName('*');
//     console.log(allElements);
//     const set = new Set();

//     // ✅ Loop through all elements (including html, head, meta, scripts)
//     for (const element of allElements) {
//         console.log(element);
//         for (const c of element.classList.entries()) {
//             set.add(c[1]);
//         }
//     }

//     for (const className of set) {
//         const element = document.getElementsByClassName(className)[0];
//         console.log(element.style.backgroundColor);
//         // element.style.backgroundColor = "white";
//         console.log(element);
//     }

// }

// window.onload = (event) => {
//     console.log("sending message...");
//     chrome.runtime.sendMessage({}, function(response) {
//         console.log(response);
//         //code to initialize my extension
//     });    

//     fetchClasses();
//     // slider();
//     console.log(event);
// }
