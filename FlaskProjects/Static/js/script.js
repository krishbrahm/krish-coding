function sayHello() {
    const msgBox = document.createElement('dialog');
    msgBox.innerHTML = `
        <h1>Hello! Welcome to our website!</h1>
        <br>
        <p>This website will connect to a database using html, css, javascript, and python altogether</p>
        <button id="closeBtn" style="margin-top: 10px;">Close</button>
    `;

    document.body.appendChild(msgBox);
    msgBox.showModal();

    msgBox.querySelector('#closeBtn').onclick = function () {
        msgBox.close();
        msgBox.remove();
    };
}

