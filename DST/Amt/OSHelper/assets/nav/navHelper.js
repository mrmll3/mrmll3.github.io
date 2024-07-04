"use strict"

// sidenavigation
let sideNav;
let openMenuButton;

function toggleNav() {
    sideNav.classList.toggle("is-active");    
}


export async function initNav(navDiv = "mySidenav") {
    await addNav();
    loadCSS();
    await addNavElements(sideNav);    
    // setTimeout(() => {
    //     sideNav.style.top = (sideNav.ClientHeight * -1) + "px";
    //     sideNav.style.calc = (sideNav.clientWidth * -1) + "px";
    // }, 2);

    // window.addEventListener("mousemove", checkMenuRange);
    openMenuButton.addEventListener("click", () => toggleNav());    
}

async function addNav() {
    let body = document.body;
    if (document.getElementById("mySidenav") == null) {
        let newNav = document.createElement("nav");
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
    closeButton.addEventListener("click", (e) => toggleNav());
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
    // if (e.clientX <= 15) { toggleNav(status.on); };
    // if (e.clientX >= sideNavWidth() + 15) { toggleNav(status.off) };
}
