import Tools from './tools-links.json' assert { type: 'json' }

// sidenavigation

function toggleNav() {
    if (!(document.getElementById("mySidenav").style.width === "450px")) {
        document.getElementById("mySidenav").style.width = "450px";
    } else {
        document.getElementById("mySidenav").style.width = "0";
    }
}

function initNav(navJSON, navDiv) {

    // let tools;
    // fetch('./tools-links.json')
    //     .then((response) => response.json())
    //     .then((json) => tools = json.Tools);
}
