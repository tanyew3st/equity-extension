function greenToGray(greenR2, greenG2, greenB2) {
    let sum = greenR2 + greenG2 + greenB2;
    let average = Math.floor(sum/3)
    let grayReturn = 'rgb' + '(' + String(average) + ',' + String(average) + ',' + String(average)+ ')'
    return grayReturn
}

