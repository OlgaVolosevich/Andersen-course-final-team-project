const AUTH = document.querySelector('#open_auth');
const MODAL_WRAP = document.querySelector('.authorization');
const MODAL = document.querySelector('.modal');
const FORM = document.querySelector('#form');
const AUTH_CLOSE = document.querySelector('#authClose');
const USERNAME = document.querySelector('#form_username');
const PASSWORD = document.querySelector('#form_password');
const FEEDBACK = document.querySelector('.invalid-feedback');

FORM.addEventListener('submit', formEvent);
AUTH.addEventListener('click', openModal);
MODAL_WRAP.addEventListener('click', closeModal);

function formEvent(e) {
  if(USERNAME.value === 'admin' && PASSWORD.value === 'admin') {
    localStorage.setItem('user', JSON.stringify({login : USERNAME.value, password : PASSWORD.value}));
  } else {
    e.preventDefault();
    PASSWORD.classList.add('invalid');
    FEEDBACK.style.visibility = 'visible';
  }
}
function openModal() {
  MODAL_WRAP.style.visibility = 'visible';
  MODAL.style.transform = 'translateY(0px)';
}
function closeModal(e) {
  if((!e.target.closest('.modal')) || (e.target === AUTH_CLOSE)) {
    USERNAME.value = '';
    PASSWORD.value = '';
    PASSWORD.classList.remove('invalid');
    FEEDBACK.style.visibility = 'hidden';
    MODAL_WRAP.style.visibility = 'hidden';
    MODAL.style.transform = 'translateY(-600px)';
  }
}
