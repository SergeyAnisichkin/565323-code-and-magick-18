'use strict';

(function () {
  var WIZARD_AMOUNT = 4;
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var INPUT_COAT_COLOR = 'input[name="coat-color"]';
  var INPUT_EYES_COLOR = 'input[name="eyes-color"]';
  var INPUT_FIREBALL_COLOR = 'input[name="fireball-color"]';

  var setup = document.querySelector('.setup');
  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');

  var getCoatColor = function () {
    return WIZARD_COAT_COLORS[Math.floor(Math.random() * WIZARD_COAT_COLORS.length)];
  };

  var refreshCoatColor = function () {
    var coatColor = getCoatColor();
    wizardCoat.style.fill = coatColor;
    setup.querySelector(INPUT_COAT_COLOR).value = coatColor;
  };

  wizardCoat.addEventListener('click', function () {
    refreshCoatColor();
  });

  var getEyesColor = function () {
    return WIZARD_EYES_COLORS[Math.floor(Math.random() * WIZARD_EYES_COLORS.length)];
  };

  var refreshEyesColor = function () {
    var eyesColor = getEyesColor();
    wizardEyes.style.fill = eyesColor;
    setup.querySelector(INPUT_EYES_COLOR).value = eyesColor;
  };

  wizardEyes.addEventListener('click', function () {
    refreshEyesColor();
  });

  var refreshFireballColor = function () {
    var fireballColor = FIREBALL_COLORS[Math.floor(Math.random() * FIREBALL_COLORS.length)];
    setupFireball.style.background = fireballColor;
    setup.querySelector(INPUT_FIREBALL_COLOR).value = fireballColor;
  };

  setupFireball.addEventListener('click', function () {
    refreshFireballColor();
  });

  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  setup.querySelector('.setup-similar').classList.remove('hidden');

  var form = setup.querySelector('.setup-wizard-form');

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARD_AMOUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onUpload = function () {
    setup.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onUpload, onError);
    evt.preventDefault();
  });

  window.backend.load(onLoad, onError);

})();
