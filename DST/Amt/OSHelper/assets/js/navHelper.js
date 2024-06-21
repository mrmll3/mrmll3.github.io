"use strict"

// sidenavigation
export function toggleNav() {
    if (!(document.getElementById("mySidenav").style.width === "450px")) {
        document.getElementById("mySidenav").style.width = "450px";
    } else {
        document.getElementById("mySidenav").style.width = "0";
    }
}

export async function initNav(navDiv = "mySidenav") {
    const nav = document.getElementById(navDiv);
    let Tools;
    console.log(getTools());
    Tools = getTools();
    // getTools().then(() =>
    //     Tools.forEach(tool => {
    //         nav.innerHTML += `<a href="${tool.Link}">${tool.Name}</a>`
    //     }));
    Tools.forEach(tool => {
        nav.innerHTML += `<a href="${tool.Link}">${tool.Name}</a>`
    })
}

function getTools() {
    fetch('https://mrmll3.github.io/DST/Amt/OSHelper/assets/js/tools-links.json')
        .then((response) => response.json())
        .then((json) => {
            let Tools;
            Tools = json;
            Tools = Tools.Tools;
            return Tools;
        });

}