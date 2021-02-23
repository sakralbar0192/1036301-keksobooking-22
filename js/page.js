const adForm = document.querySelector('.ad-form');
const adFormfieldsets = adForm.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormSelects = mapFiltersForm.children;

//Функция, делающая формы неактивными
const makePageInactive = () => {
  adForm.classList.add('ad-form--disabled');
  adFormfieldsets.forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });
  mapFiltersForm.classList.add('.map__filters--disabled');
  Array.from(mapFiltersFormSelects).forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });
};

//Функция, делающая формы активными
const makePageActive = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormfieldsets.forEach((value) => {
    value.removeAttribute('disabled');
  });
  mapFiltersForm.classList.remove('.map__filters--disabled');
  Array.from(mapFiltersFormSelects).forEach((value) => {
    value.removeAttribute('disabled');
  });
}
export {makePageInactive, makePageActive};
