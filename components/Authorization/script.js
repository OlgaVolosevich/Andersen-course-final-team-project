class Authorization {
  _root = {
    auth : document.querySelector('#open_auth'),
    modalWrap : document.querySelector('.authorization'),
    modal : document.querySelector('.modal'),
    form : document.querySelector('#form'),
    authClose : document.querySelector('#authClose'),
    username : document.querySelector('#form_username'),
    password : document.querySelector('#form_password'),
    feedback : document.querySelector('.invalid-feedback'),
    burger : document.querySelector('.navbar_burger'),
    navbar : document.querySelector('#navbar_nav')
  }
  openModal() {
    const {modalWrap, modal} = this._root;
    modalWrap.style.visibility = 'visible';
    modal.style.transform = 'translateY(0px)';
  }
  hideModal() {
    const {username, password, feedback, modalWrap, modal} = this._root;
    username.value = '';
    password.value = '';
    password.classList.remove('invalid');
    username.classList.remove('invalid');
    feedback.style.visibility = 'hidden';
    modalWrap.style.visibility = 'hidden';
    modal.style.transform = 'translateY(-600px)';
  }
  formEvent(e) {
    const {username, password, auth, feedback} = this._root;
    e.preventDefault();
    if (username.value === 'admin' && password.value === 'admin') {
      localStorage.setItem('user', JSON.stringify({login : username.value,
        password : password.value}));
      this.hideModal();
      auth.innerHTML = 'Log out';
    } else {
      username.classList.add('invalid')
      password.classList.add('invalid');
      feedback.style.visibility = 'visible';
    }
  }
  logOut() {
    LSService.deleteData('user');
    this._root.auth.innerHTML = 'Log in';
  }
  burg() {
    const {burger, navbar} = this._root;
    burger.classList.toggle('navbar_burger_active')
    if (!burger.classList.contains('navbar_burger_active')) {
      navbar.style.visibility = 'hidden';
      navbar.style.transform = 'translateX(100%)'
    } else if (burger.classList.contains('navbar_burger_active')) {
      navbar.style.visibility = 'visible';
      navbar.style.transform = 'translateX(0%)';
    }
  }
  render() {
    const {modalWrap, authClose, form, auth, burger} = this._root;
    modalWrap.addEventListener('click', (e) => {
      if ((!e.target.closest('.modal')) || (e.target === authClose)) {
        this.hideModal();
      }
    })
    form.addEventListener('submit', this.formEvent.bind(this));
    if (LSService.keyCheck('user')) {
      auth.innerHTML = 'Log out';
      auth.addEventListener('click', this.logOut.bind(this))
    } else if(!LSService.keyCheck('user')) {
      auth.innerHTML = 'Log in';
      auth.addEventListener('click', this.openModal.bind(this))
    }
    burger.addEventListener('click', this.burg.bind(this))
  }
}

const newAuth = new Authorization();
newAuth.render();