
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cbarv4aad3i91bfqbbug"
const finnhubClient = new finnhub.DefaultApi();

var currentTime = Math.round((new Date()).getTime() / 1000);
const threeDaysAgo = 259200;
const oneWeekAgo = 604800;
const sunday = 1658101000;
const oneMonthAgo = 2630000;
const oneDayAgo = 86400;

var currTime = 0;
var currPrice = 0;
var prevTime = 0;
var prevPrice = 0;




function getPriceDifference(timeInterval, higherThreshold, lowerThreshold) {

        finnhubClient.stockCandles("MDB", "30", currentTime - threeDaysAgo, currentTime, (error, data, response) => {
            var times = data['t'];
            currTime = times[times.length - 1];
            currPrice = data['c'][times.length - 1];

        });

        setTimeout(() => {


            if (timeInterval == 'Hour') {
                finnhubClient.stockCandles("MDB", "60", currentTime - threeDaysAgo, currentTime - 3600, (error, data, response) => {
                    var t = data['t'];
                    prevTime = t[t.length - 1];
                    prevPrice = data['c'][t.length - 1];

                });
            }

            else if (timeInterval == 'Day') {
                finnhubClient.stockCandles("MDB", "60", currentTime - threeDaysAgo - oneDayAgo, currentTime - oneDayAgo, (error, data, response) => {
                    var t = data['t'];
                    prevTime = t[t.length - 1];
                    prevPrice = data['c'][t.length - 1];

                });

            }

            else if (timeInterval == 'Week') {

                finnhubClient.stockCandles("MDB", "60", currentTime - threeDaysAgo - oneWeekAgo, currentTime - oneWeekAgo, (error, data, response) => {
                    var t = data['t'];
                    prevTime = t[t.length - 1];
                    prevPrice = data['c'][t.length - 1];


                });
            }



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


            var priceDifference = currPrice - prevPrice;
            var priceDiffPercentage = priceDifference / prevPrice;
            var color = '';


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


            return color;




        }, 7000);





    }


getPriceDifference('Week',0.1,-0.1);