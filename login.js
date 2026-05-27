const container = document.getElementById('container');
const cadastrarButton = document.querySelector('registro');
const entrarButton = document.querySelector('login');

cadastrarButton.addEventListener('click', () => {
    container.classList.add('active');
});