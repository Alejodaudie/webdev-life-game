'use strict';

function buildDom(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}

function main() {
    
    var splashMain;

    function buildSplash() {
        splashMain = buildDom(`
            <main>
                <h1>WebDeveloper life</h1>
                <div>
                    <p>huahjhbadvasvfsakdvckawjvckajvk</p>
                </div>
                <button>Start</button>
            </main>
        `);

        document.body.appendChild(splashMain);

        // var button = splashMain.querySelector('button');
        // button.addEventListener('click', startGame);

    }

    function destroySplash() {
        splashMain.remove();
    }
    

   buildSplash(); 
}

window.addEventListener('load', main);