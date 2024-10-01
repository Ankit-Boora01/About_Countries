const body = document.body;
const siteMode = document.querySelector('#siteMode');
const siteModeIcon = document.querySelector('#site-Mode-Icon');

function toggleDarkMode() {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        siteMode.innerHTML = `<i id="site-Mode-Icon" class="fa-regular fa-moon">&nbsp;&nbsp;</i>Dark Mode`;
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark');
        siteMode.innerHTML = `<i id="site-Mode-Icon" class="fa-regular fa-sun">&nbsp;&nbsp;</i>Light Mode`;
        localStorage.setItem('theme', 'dark');
    }
}

siteMode.addEventListener('click', toggleDarkMode);

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        siteMode.innerHTML = `<i id="site-Mode-Icon" class="fa-regular fa-sun">&nbsp;&nbsp;</i>Light Mode`;
    } else {
        body.classList.remove('dark');
        siteMode.innerHTML = `<i id="site-Mode-Icon" class="fa-regular fa-moon">&nbsp;&nbsp;</i>Dark Mode`;
    }
}

applySavedTheme();
