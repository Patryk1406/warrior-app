function exitError() {
    const exitBtn = document.querySelector('div.exit');
    exitBtn.addEventListener('click', () => {
        exitBtn.parentElement.parentElement.style.display = 'none';
    })
}

exitError()