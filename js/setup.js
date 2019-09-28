'use strict';

var WIZARD_AMOUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD__COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD__EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
userNameInput.onfocus = function () {
  this.focused = true;
};
userNameInput.onblur = function () {
  this.focused = false;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !userNameInput.focused) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');

var getCoatColor = function () {
  return WIZARD__COAT_COLORS[Math.floor(Math.random() * WIZARD__COAT_COLORS.length)];
};

var refreshCoatColor = function () {
  var coatColor = getCoatColor();
  wizardCoat.style.fill = coatColor;
  setup.querySelector('input[name="coat-color"]').value = coatColor;
};

wizardCoat.addEventListener('click', function () {
  refreshCoatColor();
});

var getEyesColor = function () {
  return WIZARD__EYES_COLORS[Math.floor(Math.random() * WIZARD__EYES_COLORS.length)];
};

var refreshEyesColor = function () {
  var eyesColor = getEyesColor();
  wizardEyes.style.fill = eyesColor;
  setup.querySelector('input[name="eyes-color"]').value = eyesColor;
};

wizardEyes.addEventListener('click', function () {
  refreshEyesColor();
});

var setupFireball = setup.querySelector('.setup-fireball-wrap');

var refreshFireballColor = function () {
  var fireballColor = FIREBALL_COLORS[Math.floor(Math.random() * FIREBALL_COLORS.length)];
  setupFireball.style.background = fireballColor;
  setup.querySelector('input[name="fireball-color"]').value = fireballColor;
};

setupFireball.addEventListener('click', function () {
  refreshFireballColor();
});

var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = [];
for (var i = 0; i < WIZARD_AMOUNT; i++) {
  var firstName = WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)];
  var secondName = WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)];
  wizards[i] = {
    name: firstName + ' ' + secondName,
    coatColor: getCoatColor(),
    eyesColor: getEyesColor()
  };
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');
