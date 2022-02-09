const firstWarriorInput = document.getElementById('firstWarriorId');
const secondWarriorInput = document.getElementById('secondWarriorId');

function notFightWithOneself(firstWarriorInput, secondWarriorInput) {
    firstWarriorInput.addEventListener('input', () => {
        const optionsOfSecondInput = Array.from(secondWarriorInput.children);
        optionsOfSecondInput.forEach(option => option.removeAttribute('disabled'));
        const optionToDisable = optionsOfSecondInput.find(option => option.value === firstWarriorInput.value);
        optionToDisable.setAttribute('disabled', String(true));
    })
}

notFightWithOneself(firstWarriorInput, secondWarriorInput);
notFightWithOneself(secondWarriorInput, firstWarriorInput);