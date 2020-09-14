class Authorization {
  _root = {
    auth : document.querySelector('#open_auth'),
    modalWrap : document.querySelector('.authorization'),
    modal : document.querySelector('.modal'),
    form : document.querySelector('#form'),
    authClose : document.querySelector('#authClose'),
    username : document.querySelector('#form_username'),
    password : document.querySelector('#form_password'),
    feedback : document.querySelector('.invalid-feedback')
  }
  openModal() {
    this._root.modalWrap.style.visibility = 'visible';
    this._root.modal.style.transform = 'translateY(0px)';
  }
  hideModal() {
    this._root.username.value = '';
    this._root.password.value = '';
    this._root.password.classList.remove('invalid');
    this._root.feedback.style.visibility = 'hidden';
    this._root.modalWrap.style.visibility = 'hidden';
    this._root.modal.style.transform = 'translateY(-600px)';
  }
  formEvent(e) {
    const ROOT = this._root;
    e.preventDefault();
    if (ROOT.username.value === 'admin' && ROOT.password.value === 'admin') {
      localStorage.setItem('user', JSON.stringify({login : ROOT.username.value,
        password : ROOT.password.value}));
      this.hideModal();
      ROOT.auth.innerHTML = 'Log out';
    } else {
      ROOT.password.classList.add('invalid');
      ROOT.feedback.style.visibility = 'visible';
    }
  }
  logOut() {
    LSService.deleteData('user');
  }
  render() {
    const ROOT = this._root;
    ROOT.modalWrap.addEventListener('click', (e) => {
      if ((!e.target.closest('.modal')) || (e.target === ROOT.authClose)) {
        this.hideModal();
      }
    })
    ROOT.form.addEventListener('submit', this.formEvent.bind(this));
    ROOT.auth.addEventListener('click', () => {
      if (LSService.keyCheck('user')) {
        this.logOut();
        ROOT.auth.innerHTML = 'Log in';
      } else if (!LSService.keyCheck('user')) {
        this.openModal();
      }
    })
  }
}

const newAuth = new Authorization();
newAuth.render();