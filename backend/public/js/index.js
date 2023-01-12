/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { uploadProduct } from './uploadProduct';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const parfumDataForm = document.querySelector('.form-parfum-data');
const userPasswordForm = document.querySelector('.form-user-password');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);

    updateSettings(form, 'data');
  });

if (parfumDataForm)
  parfumDataForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const quantity = document.getElementById('quantity').value;
    const year = document.getElementById('year').value;
    const sex = document.querySelector('input[name="sex-group"]').value;
    const type = document.querySelector('input[name="type-group"]').value;
    const category = document.querySelector(
      'input[name="category-group"]'
    ).value;
    const condition = document.querySelector(
      'input[name="condition-group"]'
    ).value;
    const visible = document.querySelector('input[name="visible-group"]').value;
    // const imageCover = document.getElementById('imageCover').value;
    // const image = document.getElementById('image').value;

    // // Get the group of radio buttons
    // const radioGroup = document.querySelector('input[name="category-group"]');

    // // Get the selected value
    // const selectedValue = radioGroup.value;

    // console.log(selectedValue); // Will log the value of the selected radio button

    uploadProduct(
      {
        name,
        description,
        price,
        brand,
        model,
        quantity,
        year,
        sex,
        type,
        category,
        condition,
        visible,
      },
      'data'
    );
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
