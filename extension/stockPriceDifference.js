
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cbarv4aad3i91bfqbbug"
const finnhubClient = new finnhub.DefaultApi();




// Gets User Preferences from Local Storage
function getLocalStorageData(){





    const userPrefs = window.localStorage.getItem('preferences');
    timeInterval = userPrefs['timePeriod']; 
    higherThreshold = userPrefs['higherThreshold']; 
    lowerThreshold = userPrefs['lowerThreshold']; 

    return [timeInterval, higherThreshold, lowerThreshold]; 

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
    finnhubClient.stockCandles("MDB", "30", currentTime - threeDaysAgo, currentTime, (error, data, response) => {
        var times = data['t'];
        currTime = times[times.length - 1];
        currPrice = data['c'][times.length - 1];

    });

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

userPreferences = getLocalStorageData();
getStockPriceDifference(userPreferences[0],userPreferences[1],userPreferences[2]);