const allElements = document.getElementsByTagName('*');
const set = new Set();

// ✅ Loop through all elements (including html, head, meta, scripts)
for (const element of allElements) {
    for (const c of element.classList.entries()) {
        set.add(c[1]);
    }
}

for (const className of set) {
    const element = document.getElementsByClassName(className)[0];
    // element.style.backgroundColor = "white";
    console.log(element); 
    console.log(element.backgroundColor);  
}