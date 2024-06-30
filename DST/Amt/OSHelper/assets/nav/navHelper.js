"use strict"

// sidenavigation
const status = {
    on: true,
    off: false
}

let sideNav;
let openMenuButton;
// dynamically give sidenavigation width
let sideNavWidth = () => Number(sideNav.style.width.split("px")[0]);

// export 
function toggleNav(onOrOff) {
    if (onOrOff) {
        sideNav.style.width = "450px";
        sideNav.style.left = 0;
        sideNav.style.opacity = "1";
        openMenuButton.addEventListener("click", () => toggleNav(status.off));

    } else {
        sideNav.style.width = "450px";
        sideNav.style.left = (sideNavWidth() * -1) + 15 + "px";
        sideNav.style.opacity = "0.33";
        openMenuButton.addEventListener("click", () => toggleNav(status.on));

    }
}

export async function initNav(navDiv = "mySidenav") {
    await addNav();
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
    openMenuButton.addEventListener("click", () => toggleNav(status.on));
}

async function addNav() {
    let body = document.body;
    if (document.getElementById("mySidenav") == null) {
        let newNav = document.createElement("div");
        newNav.className = "sidenav";
        newNav.id = "mySidenav";
        body.appendChild(newNav);
        sideNav = document.getElementById("mySidenav");
    }
    else sideNav = document.getElementById("openNav");

    if (document.getElementById("openNav") == null) {
        let subheader = document.getElementById("subheader");
        let newNav = document.createElement("button");
        newNav.id = "openNav";
        newNav.innerText = "\u{2630} Menü"
        subheader.appendChild(newNav);
        openMenuButton = document.getElementById("openNav");
    }
    else openMenuButton = document.getElementById("openNav");

}

async function addNavElements(navDiv) {
    let Tools = await fetch("./assets/nav/tools-links.json");
    Tools = await Tools.json();
    Tools = await Tools.Tools;
    // add button to close sidenav
    let closeButton = document.createElement("button");
    closeButton.className = "menubutton";
    closeButton.addEventListener("click", (e) => toggleNav(status.off));
    closeButton.innerText = "\u{2573}";
    navDiv.appendChild(closeButton);
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
    link.href = "./assets/nav/sidenav.css";
    head.appendChild(link);
}

function checkMenuRange(e) {
    if (e.clientX <= 15) { toggleNav(status.on); };
    // if (e.clientX >= sideNavWidth() + 15) { toggleNav(status.off) };
}