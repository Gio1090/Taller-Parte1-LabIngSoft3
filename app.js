const descriptions = {
  'Todas': 'Atención integral con profesionales que diseñan un plan para cada persona.',
  'Terapia neural': 'La terapia neural busca apoyar el bienestar y la calidad de vida.',
  'Quiropraxia': 'La quiropraxia se enfoca en la movilidad y el cuidado de la columna.',
  'Fisioterapia': 'La fisioterapia ayuda a recuperar movilidad, fuerza y autonomía.',
  'Nutrición y Dietética Terapéutica': 'Nutrición y dietética acompaña la recuperación con hábitos saludables.'
};

const specialtyButtons = document.querySelectorAll('[data-specialty]');
const doctorCards = document.querySelectorAll('.doctor-item');
const specialtyDescription = document.getElementById('descripcionEspecialidad');
const emptySpecialtyMessage = document.getElementById('sinMedicos');

specialtyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const specialty = button.dataset.specialty;
    let visibleDoctors = 0;

    specialtyButtons.forEach((item) => item.classList.toggle('active', item === button));
    doctorCards.forEach((card) => {
      const isVisible = specialty === 'Todas' || card.dataset.specialty === specialty;
      card.classList.toggle('d-none', !isVisible);
      if (isVisible) visibleDoctors += 1;
    });

    specialtyDescription.textContent = descriptions[specialty];
    emptySpecialtyMessage.classList.toggle('d-none', visibleDoctors > 0);
  });
});

const registrationForm = document.getElementById('formRegistro');
const registrationConfirmation = document.getElementById('confirmacionRegistro');

registrationForm.querySelectorAll('input').forEach((input) => {
  input.addEventListener('blur', () => {
    input.classList.toggle('is-invalid', !input.checkValidity());
    input.classList.toggle('is-valid', input.checkValidity());
  });

  input.addEventListener('input', () => {
    if (input.classList.contains('is-invalid') || input.classList.contains('is-valid')) {
      input.classList.toggle('is-invalid', !input.checkValidity());
      input.classList.toggle('is-valid', input.checkValidity());
    }
  });
});

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let formIsValid = true;

  registrationForm.querySelectorAll('input').forEach((input) => {
    const isValid = input.checkValidity();
    input.classList.toggle('is-invalid', !isValid);
    input.classList.toggle('is-valid', isValid);
    if (!isValid) formIsValid = false;
  });

  if (!formIsValid) {
    registrationConfirmation.classList.add('d-none');
    registrationForm.querySelector(':invalid')?.focus();
    return;
  }

  const registrationId = `SC-${Date.now().toString().slice(-8)}`;
  registrationConfirmation.textContent = `Registro confirmado. Tu número de registro es ${registrationId}.`;
  registrationConfirmation.classList.remove('d-none');
  registrationForm.reset();
  registrationForm.querySelectorAll('.is-valid').forEach((input) => input.classList.remove('is-valid'));
});