// const ntc = require("ntcjs");
import { ntc } from '/ntc.js';
ntc = require('ntc.js');

let result = ntc.name('#59fd8c');

let rgb_value = result[0];      
let specific_name = result[1];  
let shade_value = result[2];    // #0000ff         : RGB value of shade of closest match
let shade_name = result[3]; 

console.log(result);

if(shade_name == 'Green'){
    console.log("this is green");
}
 