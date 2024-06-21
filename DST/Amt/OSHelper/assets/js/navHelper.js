import Tools from './tools-links.json'

// sidenavigation
function toggleNav() {
    if (!(document.getElementById("mySidenav").style.width === "450px")) {
        document.getElementById("mySidenav").style.width = "450px";
    } else {
        document.getElementById("mySidenav").style.width = "0";
    }
}

function initNav(navJSON, navDiv = "mySidenav") {
    const nav = document.getElementById(navDiv);
    Tools.forEach(tool => {
        nav.innerHTML += `<a href="${tool.Link}">${tool.Name}</a>`
    });
    // let tools;
    // fetch('./tools-links.json')
    //     .then((response) => response.json())
    //     .then((json) => tools = json.Tools);
}

export { initNav, toggleNav }