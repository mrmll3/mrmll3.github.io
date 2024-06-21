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

export function initNav(navJSON, navDiv = "mySidenav") {
    const nav = document.getElementById(navDiv);
    Tools.forEach(tool => {
        nav.innerHTML += `<a href="${tool.Link}">${tool.Name}</a>`
    });
    let closeButton;
    closeButton = document.getElementsByClassName("closebtn")[0];
    closeButton.addEventListener("click", toggleNav);
}

function getTools() {
    fetch('./tools-links.json')
        .then((response) => response.json())
        .then((json) => tools = json.Tools);
}