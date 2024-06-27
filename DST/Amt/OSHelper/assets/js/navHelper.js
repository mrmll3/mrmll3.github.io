"use strict"

// sidenavigation
const status = {
    on: true,
    off: false
}

let sideNav;
if (document.getElementById("mySidenav") == null) {
    let body = document.body;
    let newNav = document.createElement("div");
    newNav.className = "sidenav";
    newNav.id = "mySidenav";
    body.appendChild(newNav);
    sideNav = document.getElementById("mySidenav");
}
else sideNav = document.getElementById("mySidenav");

// const menuButton = document.getElementById("menubtn");

export function toggleNav(onOrOff) {
    if (onOrOff) {
        sideNav.style.width = "450px";
        sideNav.style.left = 0;
        sideNav.style.opacity = "1";
    } else {
        sideNav.style.width = "450px";
        sideNav.style.left = (Number(sideNav.style.width.split("px")[0]) * -1) + 15 + "px";
        sideNav.style.opacity = "0.33";
    }
}

export async function initNav(navDiv = "mySidenav") {
    const nav = document.getElementById(navDiv);
    let Tools = await fetch('https://mrmll3.github.io/DST/Amt/OSHelper/assets/js/tools-links.json');
    Tools = await Tools.json();
    Tools = await Tools.Tools;
    Tools.forEach(tool => {
        nav.innerHTML += `<a href="${tool.Link}">${tool.Name}</a>`
    })
    toggleNav(status.off);
    window.addEventListener("mousemove", checkMenuRange);
    setTimeout(() => {
        sideNav.style.left = "25px";
        sideNav.style.opacity = "1";
        setTimeout(() => {
            sideNav.style.left = "15px";
            sideNav.style.opacity = "0.33";
        }, 100)
    }, 200)
}

function checkMenuRange(e) {
    if (e.clientX <= 15) { toggleNav(status.on); };
    if (e.clientX >= Number(sideNav.style.width.split("px")[0]) + 15) { toggleNav(status.off) };
}