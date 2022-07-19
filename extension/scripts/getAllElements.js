const allElements = document.getElementsByTagName('*');
const set = new Set();

// ✅ Loop through all elements (including html, head, meta, scripts)
for (const element of allElements) {
    for (const c of element.classList.entries()) {
        set.add(c[1]);
    }
}

const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

for (const className of set) {
    for (element of document.getElementsByClassName(className)) {
        if (element.tagName === "IMG") {
            console.log("here");
            element.style.filter = "hue-rotate(200deg)";
        }

        // element.style.backgroundColor = "white";
        // console.log(element); 
        // console.log(getComputedStyle(element, null).getPropertyValue("background-color"));  
        // console.log(getComputedStyle(element, null).getPropertyValue("color"));  
        // const one = (getComputedStyle(element, 'hover').getPropertyValue("box-shadow"));  
        const two = (getComputedStyle(element, null).getPropertyValue("border-color")); 
        // console.log("break")
        // console.log(rgba2hex(color).substring(0, 7));
    }
}