
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

       return getStockPriceDifference(timeInterval, higherThreshold, lowerThreshold);


       
    })
    }
    // if user preferences are not set
    catch(error){
        timeInterval = 'Hour';
        higherThreshold = 1; 
        lowerThreshold = -1; 
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


         // gets stock price and time from 1 hour ago
         if (timeInterval == 'Hour') {
            fetch("https://finnhub.io/api/v1/stock/candle?symbol=MDB&resolution=60&from=" + (currentTime - threeDaysAgo) +
     "&to=" + (currentTime - 3600) + "&token=cbarv4aad3i91bfqbbug").then((response) =>{return response.json(); }).then((data) =>{
                var t = data['t'];
                prevTime = t[t.length - 1];
                prevPrice = data['c'][t.length - 1];

                var priceDifference = currPrice - prevPrice;
                var priceDiffPercentage = priceDifference / prevPrice;
                var color = 0;
        
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

                //color = 0; 
                //priceDiffPercentage = -0.09;
        

                if(priceDiffPercentage > 0){
                    var priceInfo = "Current Stock Price: " + "$" + currPrice + "; +" + Math.floor(priceDiffPercentage * 100) + "%";
    
                }
                else{
                    var priceInfo = "Current Stock Price: " + "$" + currPrice + "; " + Math.floor(priceDiffPercentage * 100) + "%";
                }
                

                chrome.storage.sync.set({"color":color});
                chrome.storage.sync.set({"price":priceInfo});
                document.getElementsByClassName("PromoBanner__Title-sc-13lnlg-3")[0].innerHTML = priceInfo;
        
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
            if(priceDiffPercentage > 0){
                var priceInfo = "Current Stock Price: " + "$" + currPrice + "; +" + Math.floor(priceDiffPercentage * 100) + "%";

            }
            else{
                var priceInfo = "Current Stock Price: " + "$" + currPrice + "; " + Math.floor(priceDiffPercentage * 100) + "%";
            }
    
            //var priceInfo = "Current Stock Price: " + "$" + currPrice + "; " + Math.floor(priceDiffPercentage * 100) + "%";
            chrome.storage.sync.set({"color":color});
            chrome.storage.sync.set({"price":priceInfo});
            document.getElementsByClassName("PromoBanner__Title-sc-13lnlg-3")[0].innerHTML = priceInfo;

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
        if(priceDiffPercentage > 0){
            var priceInfo = "Current Stock Price: " + "$" + currPrice + "; +" + Math.floor(priceDiffPercentage * 100) + "%";

        }
        else{
            var priceInfo = "Current Stock Price: " + "$" + currPrice + "; " + Math.floor(priceDiffPercentage * 100) + "%";
        }

        chrome.storage.sync.set({"color":color});
        chrome.storage.sync.set({"price":priceInfo});
        document.getElementsByClassName("PromoBanner__Title-sc-13lnlg-3")[0].innerHTML = priceInfo;


        return [color, currPrice];
}); }

if (timeInterval == 'Month') {
    console.log("https://finnhub.io/api/v1/stock/candle?symbol=MDB&resolution=60&from=" + (currentTime - threeDaysAgo - oneMonthAgo - oneDayAgo) +
    "&to=" + (currentTime - oneMonthAgo) + "&token=cbarv4aad3i91bfqbbug");
    fetch("https://finnhub.io/api/v1/stock/candle?symbol=MDB&resolution=60&from=" + (currentTime - threeDaysAgo - oneMonthAgo - oneDayAgo) +
"&to=" + (currentTime - oneMonthAgo) + "&token=cbarv4aad3i91bfqbbug").then((response) =>{return response.json(); }).then((data) =>{
        console.log(data);
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
        if(priceDiffPercentage > 0){
            var priceInfo = "Current Stock Price: " + "$" + currPrice + "; +" + Math.floor(priceDiffPercentage * 100) + "%";

        }
        else{
            var priceInfo = "Current Stock Price: " + "$" + currPrice + "; " + Math.floor(priceDiffPercentage * 100) + "%";
        }

        chrome.storage.sync.set({"color":color});
        chrome.storage.sync.set({"price":priceInfo});                
       document.getElementsByClassName("PromoBanner__Title-sc-13lnlg-3")[0].innerHTML = priceInfo;

        return [color, currPrice];
       
}); }
               

            })};


getLocalStorageData();
setInterval(getLocalStorageData(), 100000);
