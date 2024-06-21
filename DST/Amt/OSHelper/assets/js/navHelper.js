"use strict"
let Tools;
getTools();


// sidenavigation
export function toggleNav() {
    if (!(document.getElementById("mySidenav").style.width === "450px")) {
        document.getElementById("mySidenav").style.width = "450px";
    } else {
        document.getElementById("mySidenav").style.width = "0";
    }
}

export function initNav(navDiv = "mySidenav") {
    const nav = document.getElementById(navDiv);
    getTools().then(
        Tools.forEach(tool => {
            nav.innerHTML += `<a href="${tool.Link}">${tool.Name}</a>`
        });
    let closeButton;
    let menuButton;
    menuButton = document.getElementById("openNav");
    closeButton = document.getElementsByClassName("closebtn")[0];
    closeButton.addEventListener("click", toggleNav);
    menuButton.addEventListener("click", toggleNav);)
}

async function getTools() {
    fetch('https://mrmll3.github.io/DST/Amt/OSHelper/assets/js/tools-links.json')
        .then((response) => response.json())
        .then((json) => tools = json.Tools);
}