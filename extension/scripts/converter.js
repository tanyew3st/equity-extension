import Color from "../node_modules/ac-colors/index.js";

export const convertMain = () => {
    console.log("converter.js");
}
// function greenToRead(perc) {
//     var r, g, b = 0;
//     if (perc < 50) {
//         r = 255;
//         g = Math.round(5.1 * perc);
//     }
//     else {
//         g = 255;
//         r = Math.round(510 - 5.10 * perc);
//     }
//     var h = r * 0x10000 + g * 0x100 + b * 0x1;
//     console.log('#' + ('000000' + h.toString(16)).slice(-6));
// }

// greenToRead(0);

// function componentToHex(c) {
//     var hex = c.toString(16);
//     return hex.length == 1 ? "0" + hex : hex;
//   }
  
//   function rgbToHex(r, g, b) {
//     return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
//   }
  

// function greenToRed(greenR, greenG, greenB) {
//     var redR, redG, redB = 0;
//     redR = greenG;
//     redG = greenB;
//     redB = greenR;
    
//     var answer = rgbToHex(redR, redG, redB);
//     console.log(answer);
// }

// greenToRed(56, 93, 56); 

// const getGreenToRed = (percent) => {
//     const r = 255 * percent/100;
//     const g = 255 - (255 * percent/100);
//     return 'rgb('+r+','+g+',0)';
// }

// user colour
var Red   = 56;
var Green = 79;
var Blue  = 132;

// user colour converted to XYZ space
let XYZ = RGBtoXYZ(Red,Green,Blue)
var colX = XYZ[0];
var colY = XYZ[1];
var colZ = XYZ[2];

// alert(XYZ)

var LAB = XYZtoLAB(colX, colY, colZ)

console.log(LAB)
console.log(LAB[0])
console.log(LAB[1])
console.log(LAB[2])

var greenL = LAB[0];
var greenA = LAB[1];
var greenB = LAB[2];

var redL = greenL;
var redA = (greenA) * (-1);
var redB = greenB

console.log(redA)

function RGBtoXYZ(R, G, B)
{
    let var_R = parseFloat( R / 255 )        //R from 0 to 255
    let var_G = parseFloat( G / 255 )        //G from 0 to 255
    let var_B = parseFloat( B / 255 )        //B from 0 to 255

    if ( var_R > 0.04045 ) var_R = ( ( var_R + 0.055 ) / 1.055 ) ** 2.4
    else                   var_R = var_R / 12.92
    if ( var_G > 0.04045 ) var_G = ( ( var_G + 0.055 ) / 1.055 ) ** 2.4
    else                   var_G = var_G / 12.92
    if ( var_B > 0.04045 ) var_B = ( ( var_B + 0.055 ) / 1.055 ) ** 2.4
    else                   var_B = var_B / 12.92

    var_R = var_R * 100
    var_G = var_G * 100
    var_B = var_B * 100

    //Observer. = 2°, Illuminant = D65
    let X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805
    let Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722
    let Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505
    return [X, Y, Z]
}


function XYZtoLAB(x, y, z)
{
    var ref_X =  95.047;
    var ref_Y = 100.000;
    var ref_Z = 108.883;

    var var_X = x / ref_X          //ref_X =  95.047   Observer= 2°, Illuminant= D65
    var var_Y = y / ref_Y          //ref_Y = 100.000
    var var_Z = z / ref_Z          //ref_Z = 108.883

    if ( var_X > 0.008856 ) var_X = Math.pow( var_X, 1/3 )
    else                    var_X = ( 7.787 * var_X ) + ( 16 / 116 )
    if ( var_Y > 0.008856 ) var_Y = Math.pow(var_Y, 1/3 )
    else                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 )
    if ( var_Z > 0.008856 ) var_Z = Math.pow (var_Z, 1/3 )
    else                    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 )

    var CIE_L = ( 116 * var_Y ) - 16
    var CIE_a = 500 * ( var_X - var_Y )
    var CIE_b = 200 * ( var_Y - var_Z )

return [CIE_L, CIE_a, CIE_b]
}

function LABtoXYZ(x1, y1, z1)
{
    var XYZValue = Color.labToXyz([x1,y1,z1]);
}

console.log(LABtoXYZ(24.294,19.570,0.211));





