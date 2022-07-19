import Color from "../node_modules/ac-colors/index.js";

export const convertMain = () => {
    console.log("converter.js");
    greenToRed(67, 185, 25);
}

export function greenToRed(greenR, greenG, greenB) {
    let XYZ = RGBtoXYZ(greenR,greenG,greenB)
    let colX = XYZ[0];
    let colY = XYZ[1];
    let colZ = XYZ[2];  
    let LAB = XYZtoLAB(colX, colY, colZ)

    let greenL = LAB[0];
    let greenA = LAB[1];
    let greenB2 = LAB[2];

    let redL = greenL;
    let redA = (greenA) * (-1);
    let redB = greenB2;

    let redXYZ = LABtoXYZ(redL, redA, redB)
    console.log(redXYZ)
    let redX = redXYZ[0];
    let redY = redXYZ[1];
    let redZ = redXYZ[2];

    let redRGB = XYZtoRGB(redX, redY, redZ)
    let redR = redRGB[0];
    let redG = redRGB[1];
    let redB2 = redRGB[2];
    let redHex = RGBtoHEX(redR, redG, redB2);

    return redHex

    console.log(redRGB);
}

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
    let ref_X =  95.047;
    let ref_Y = 100.000;
    let ref_Z = 108.883;

    let var_X = x / ref_X          //ref_X =  95.047   Observer= 2°, Illuminant= D65
    let var_Y = y / ref_Y          //ref_Y = 100.000
    let var_Z = z / ref_Z          //ref_Z = 108.883

    if ( var_X > 0.008856 ) var_X = Math.pow( var_X, 1/3 )
    else                    var_X = ( 7.787 * var_X ) + ( 16 / 116 )
    if ( var_Y > 0.008856 ) var_Y = Math.pow(var_Y, 1/3 )
    else                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 )
    if ( var_Z > 0.008856 ) var_Z = Math.pow (var_Z, 1/3 )
    else                    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 )

    let CIE_L = ( 116 * var_Y ) - 16
    let CIE_a = 500 * ( var_X - var_Y )
    let CIE_b = 200 * ( var_Y - var_Z )

return [CIE_L, CIE_a, CIE_b]
}

function LABtoXYZ(l, a, b){
    let answer = Color.labToXyz([l, a, b]);
    return answer
}

function XYZtoRGB(x, y, z){
    let answer2 = Color.xyzToRgb([x, y, z]);
    return answer2
}

function RGBtoHEX(r, g, b){
    let answer3 = Color.rgbToHex([r, g, b]);
    return answer3
}







