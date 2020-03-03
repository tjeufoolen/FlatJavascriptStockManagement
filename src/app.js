import './app.scss';

if (module.hot) {
    module.hot.accept();
}

const root = document.createElement("div");
root.innerHTML = `<h1>Hello World!</h1>`;
document.body.appendChild(root);