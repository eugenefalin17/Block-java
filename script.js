var toggleBtn = document.querySelector('.brands__toggle');
var brandsList = document.querySelector('.brands__list');
var dots = document.querySelectorAll('.dot');
var brands = document.querySelectorAll('.brand');

var currentIndex = 0;
var brandWidth = 240;
var gap = 16;

// ===== КНОПКА "Показать все / Скрыть" (768+) =====
if (toggleBtn) {
  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault();

    brandsList.classList.toggle('brands__list--expanded');

    if (brandsList.classList.contains('brands__list--expanded')) {
      toggleBtn.innerHTML = '<img src="images/expand.svg" alt=""> Скрыть';
    } else {
      toggleBtn.innerHTML = '<img src="images/expand.svg" alt=""> Показать все';
    }
  });
}

// ===== Функция перехода на слайд =====
function goToSlide(index) {
  var maxIndex = dots.length - 1;
  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;

  currentIndex = index;

  var offset = currentIndex * (brandWidth + gap);
  brandsList.style.transform = 'translateX(-' + offset + 'px)';

  for (var i = 0; i < dots.length; i++) {
    if (i === currentIndex) {
      dots[i].classList.add('active');
    } else {
      dots[i].classList.remove('active');
    }
  }
}

// ===== СВАЙП (телефон) =====
var startX = 0;
var endX = 0;

brandsList.addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
});

brandsList.addEventListener('touchend', function(e) {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  var diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // свайп влево → следующий
      goToSlide(currentIndex + 1);
    } else {
      // свайп вправо → предыдущий
      goToSlide(currentIndex - 1);
    }
  }
}

// ===== КЛИК ПО КАРТОЧКЕ (мобильный) =====
for (var i = 0; i < brands.length; i++) {
  brands[i].addEventListener('click', (function(i){
    return function(e){
      if (window.innerWidth < 768) {
        e.preventDefault();
        if (i > currentIndex) {
          goToSlide(currentIndex + 1);
        } else if (i < currentIndex) {
          goToSlide(currentIndex - 1);
        }
      }
    }
  })(i));
}

// ===== СБРОС ПРИ РАЗМЕРЕ ОКНА =====
window.addEventListener('resize', function() {
  var screenWidth = window.innerWidth;

  if (screenWidth >= 768) {
    // Сбрасываем слайдер transform
    brandsList.style.transform = '';
    currentIndex = 0;

    // Показываем все бренды для сетки
    for (var i = 0; i < brands.length; i++) {
      brands[i].style.display = ''; // оставляем CSS-отображение по медиа-запросу
    }

    // НЕ трогаем кнопку toggle и класс expanded
  } else {
    // На мобильном 320px восстанавливаем слайдер и точки
    for (var i = 0; i < brands.length; i++) {
      brands[i].style.display = 'flex';
    }

    goToSlide(currentIndex);
  }
});

// ===== СТАРТОВЫЙ СЛАЙД =====
goToSlide(0);
