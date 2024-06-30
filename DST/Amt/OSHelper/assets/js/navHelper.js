"use strict"

// sidenavigation
const status = {
    on: true,
    off: false
}

let sideNav;
let sideNavWidth = () => Number(sideNav.style.width.split("px")[0]);
// const menuButton = document.getElementById("menubtn");

// export 
function toggleNav(onOrOff) {
    if (onOrOff) {
        sideNav.style.width = "450px";
        sideNav.style.left = 0;
        sideNav.style.opacity = "1";
    } else {
        sideNav.style.width = "450px";
        sideNav.style.left = (sideNavWidth() * -1) + 15 + "px";
        sideNav.style.opacity = "0.33";
    }
}

export async function initNav(navDiv = "mySidenav") {
    addNav();
    loadCSS();
    await addNavElements(sideNav);
    toggleNav(status.off);
    // intro animation
    setTimeout(() => {
        sideNav.style.left = (sideNavWidth() * -1) + 20 + "px";
        sideNav.style.opacity = "1";
        setTimeout(() => {
            sideNav.style.left = (sideNavWidth() * -1) + 15 + "px";
            sideNav.style.opacity = "0.33";
        }, 100)
    }, 200)
    window.addEventListener("mousemove", checkMenuRange);
}

function addNav() {
    if (document.getElementById("mySidenav") == null) {
        let body = document.body;
        let newNav = document.createElement("div");
        newNav.className = "sidenav";
        newNav.id = "mySidenav";
        body.appendChild(newNav);
        sideNav = document.getElementById("mySidenav");
    }
    else sideNav = document.getElementById("mySidenav");

}

async function addNavElements(navDiv) {
    let Tools = await fetch("./assets/js/tools-links.json");
    Tools = await Tools.json();
    Tools = await Tools.Tools;
    // add links to sideNav
    Tools.forEach(tool => {
        let linkElement = document.createElement("a");
        linkElement.className = "sidenav-link";
        linkElement.href = tool.Link;
        linkElement.innerText = tool.Name;
        navDiv.appendChild(linkElement);;
    });
}

function loadCSS() {
    // dynamically load sidenav.css
    let head = document.getElementsByTagName("HEAD")[0];
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "./assets/css/sidenav.css";
    head.appendChild(link);
}

function checkMenuRange(e) {
    if (e.clientX <= 15) { toggleNav(status.on); };
    if (e.clientX >= sideNavWidth() + 15) { toggleNav(status.off) };
}