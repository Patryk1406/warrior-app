function maxTenPoints() {
    const skillsInputs = Array.from(document.querySelectorAll('fieldset.new-warrior input[type="number"]'));
    const remainingPointsSpan = document.getElementById('remaining-points');

    skillsInputs.forEach(input => {
        input.addEventListener('input', () => {
            const numberOfPointsArray = skillsInputs.map(input => Number(input.value));
            const sumOfPoints = numberOfPointsArray.reduce((prev, curr) => prev + curr, 0);
            remainingPointsSpan.textContent = String(10 - sumOfPoints);
            if (sumOfPoints === 10) {
                skillsInputs.forEach(input => input.setAttribute('max', Number(input.value)));
            }
            else {
                skillsInputs.forEach(input => input.removeAttribute('max'));
            }
        })
    })
}

maxTenPoints();