
var timeInterval = 'Hour';
var higherThreshold = 1; 
var lowerThreshold = -1; 



// Gets User Preferences from Local Storage
function getLocalStorageData(){
        document.getElementsByClassName("PromoBanner__Title-sc-13lnlg-3")[0].innerHTML = "Stock Price Loading...";


    try{
    chrome.storage.sync.get("preferences",function(res){
        timeInterval = res['preferences']['timePeriod']; 
        higherThreshold = res['preferences']['higherThreshold']; 
        lowerThreshold = res['preferences']['lowerThreshold']; 
        
       console.log(timeInterval);
       console.log(higherThreshold);
       console.log(lowerThreshold);

    
       console.log("oooh it worked!");

        return getStockPriceDifference(timeInterval, higherThreshold, lowerThreshold);


       
    })
    }
    // if user preferences are not set
    catch(error){
        timeInterval = 'Hour';
        higherThreshold = 1; 
        lowerThreshold = -1; 
        console.log("error");
        return [timeInterval, higherThreshold, lowerThreshold]; 
    }




}

function streamToString (stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
  }

// Returns Stock status based on user preferences for stock Percentage threshold and time interval
function getStockPriceDifference(timeInterval, higherThreshold, lowerThreshold) {

    console.log(
        "THIS WORKS1"
    );

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


    // gets current stock price and time in seconds

    fetch("https://finnhub.io/api/v1/stock/candle?symbol=MDB&resolution=30&from=" + (currentTime - threeDaysAgo) +
     "&to=" + currentTime + "&token=cbarv4aad3i91bfqbbug").then((response) =>{
        return response.json();
     }).then((data) => {



        var times = data['t'];
        currTime = times[times.length - 1];
        currPrice = data['c'][times.length - 1];
        console.log(currTime);
        console.log(currPrice);

         // gets stock price and time from 1 hour ago
         if (timeInterval == 'Hour') {
            fetch("https://finnhub.io/api/v1/stock/candle?symbol=MDB&resolution=60&from=" + (currentTime - threeDaysAgo) +
     "&to=" + (currentTime - 3600) + "&token=cbarv4aad3i91bfqbbug").then((response) =>{return response.json(); }).then((data) =>{
                var t = data['t'];
                prevTime = t[t.length - 1];
                prevPrice = data['c'][t.length - 1];
                console.log(prevTime);
                console.log(prevPrice);
                var priceDifference = currPrice - prevPrice;
                var priceDiffPercentage = priceDifference / prevPrice;
                var color = '';
        
                // returns different labels based on user specificed threshold 
                if (priceDiffPercentage > higherThreshold) {
                    color = 2;
                }
                else if (priceDiffPercentage < lowerThreshold) {
                    color = 0;
                }
                else {
                    color = 1;
                }
        
                console.log(color);
                console.log(currPrice);

                chrome.storage.sync.set({"color":color});
                chrome.storage.sync.set({"price":currPrice});
                document.getElementsByClassName("PromoBanner__Title-sc-13lnlg-3")[0].innerHTML = "Current Stock Price: $" + currPrice;
        
                return [color, currPrice];
     }); }

     if (timeInterval == 'Day') {
        fetch("https://finnhub.io/api/v1/stock/candle?symbol=MDB&resolution=60&from=" + (currentTime - threeDaysAgo - oneDayAgo) +
 "&to=" + (currentTime - oneDayAgo) + "&token=cbarv4aad3i91bfqbbug").then((response) =>{return response.json(); }).then((data) =>{
            var t = data['t'];
            prevTime = t[t.length - 1];
            prevPrice = data['c'][t.length - 1];
            console.log(prevTime);
            console.log(prevPrice);
            var priceDifference = currPrice - prevPrice;
            var priceDiffPercentage = priceDifference / prevPrice;
            var color = '';
    
            // returns different labels based on user specificed threshold 
            if (priceDiffPercentage > higherThreshold) {
                color = 2;
            }
            else if (priceDiffPercentage < lowerThreshold) {
                color = 0;
            }
            else {
                color = 1;
            }
    
            console.log(color);

            console.log(currPrice);
    
            chrome.storage.sync.set({"color":color});
            chrome.storage.sync.set({"price":currPrice});
            document.getElementsByClassName("PromoBanner__Title-sc-13lnlg-3")[0].innerHTML = "Current Stock Price: $" + currPrice;

            return [color, currPrice];
 }); }

 if (timeInterval == 'Week') {
    fetch("https://finnhub.io/api/v1/stock/candle?symbol=MDB&resolution=60&from=" + (currentTime - threeDaysAgo - oneWeekAgo) +
"&to=" + (currentTime - oneWeekAgo) + "&token=cbarv4aad3i91bfqbbug").then((response) =>{return response.json(); }).then((data) =>{
        var t = data['t'];
        prevTime = t[t.length - 1];
        prevPrice = data['c'][t.length - 1];
        console.log(prevTime);
        console.log(prevPrice);
        var priceDifference = currPrice - prevPrice;
        var priceDiffPercentage = priceDifference / prevPrice;
        var color = '';

        // returns different labels based on user specificed threshold 
        if (priceDiffPercentage > higherThreshold) {
            color = 2;
        }
        else if (priceDiffPercentage < lowerThreshold) {
            color = 0;
        }
        else {
            color = 1;
        }

        console.log(color);

        console.log(currPrice);

        chrome.storage.sync.set({"color":color});
        chrome.storage.sync.set({"price":currPrice});
        document.getElementsByClassName("PromoBanner__Title-sc-13lnlg-3")[0].innerHTML = "Current Stock Price: $" + currPrice;


        return [color, currPrice];
}); }

if (timeInterval == 'Month') {
    fetch("https://finnhub.io/api/v1/stock/candle?symbol=MDB&resolution=60&from=" + (currentTime - threeDaysAgo - oneMonthAgo) +
"&to=" + (currentTime - oneMonthAgo) + "&token=cbarv4aad3i91bfqbbug").then((response) =>{return response.json(); }).then((data) =>{
        var t = data['t'];
        prevTime = t[t.length - 1];
        prevPrice = data['c'][t.length - 1];
        console.log(prevTime);
        console.log(prevPrice);
        var priceDifference = currPrice - prevPrice;
        var priceDiffPercentage = priceDifference / prevPrice;
        var color = '';

        // returns different labels based on user specificed threshold 
        if (priceDiffPercentage > higherThreshold) {
            color = 2;
        }
        else if (priceDiffPercentage < lowerThreshold) {
            color = 0;
        }
        else {
            color = 1;
        }

        console.log(color);


        console.log(currPrice);

        chrome.storage.sync.set({"color":color});
        chrome.storage.sync.set({"price":currPrice});                
        document.getElementsByClassName("PromoBanner__Title-sc-13lnlg-3")[0].innerHTML = "Current Stock Price: $" + currPrice;

        return [color, currPrice];
       
}); }
               

            })};










     //});
    //}

    
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

//debugger; 
//let userPreferences = 

getLocalStorageData();
setInterval(getLocalStorageData(), 100000);


//getStockPriceDifference(userPreferences[0],userPreferences[1],userPreferences[2]);


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
// 
