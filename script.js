var toggleBtn = document.querySelector('.brands__toggle');
var brandsList = document.querySelector('.brands__list');
var dots = document.querySelectorAll('.dot');

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

// ===== СЛАЙДЕР 320px (свайп + клик) =====
var startX = 0;
var endX = 0;

// функция смены слайда
function goToSlide(index) {
  if (index < 0) index = 0;
  if (index > dots.length - 1) index = dots.length - 1;

  currentIndex = index;

  var offset = currentIndex * (brandWidth + gap);
  brandsList.style.transform = 'translateX(-' + offset + 'px)';

  // обновляем точки
  dots.forEach(function(dot, i) {
    dot.classList.toggle('active', i === currentIndex);
  });
}

// ===== СВАЙП (телефон) =====
brandsList.addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
});

brandsList.addEventListener('touchend', function(e) {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  var diff = startX - endX;

  if (Math.abs(diff) > 50) { // минимальный свайп
    if (diff > 0) {
      // свайп влево → следующий
      goToSlide(currentIndex + 1);
    } else {
      // свайп вправо → предыдущий
      goToSlide(currentIndex - 1);
    }
  }
}

// ===== КЛИК ПО КАРТОЧКЕ (десктоп) =====
var brands = document.querySelectorAll('.brand');

brands.forEach(function(brand) {
  brand.addEventListener('click', function(e) {
    if (window.innerWidth < 768) {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    }
  });
});

// старт
goToSlide(0);

// --- Сброс трансформации при изменении размера окна ---
window.addEventListener('resize', function() {
    var screenWidth = window.innerWidth;

    if (screenWidth >= 768) {
        // Сбрасываем слайдер transform
        brandsList.style.transform = '';
        currentIndex = 0;

        // Показываем все бренды для сетки
        var brands = document.querySelectorAll('.brand');
        brands.forEach(function(brand) {
            brand.style.display = ''; // оставляем CSS-отображение по медиа-запросу
        });

        // НЕ трогаем кнопку toggle и класс expanded
        // Таким образом "Показать все / Скрыть" продолжит работать на больших экранах
    } else {
        // На мобильном 320px восстанавливаем слайдер и точки
        var brands = document.querySelectorAll('.brand');
        brands.forEach(function(brand) {
            brand.style.display = 'flex';
        });

        updateSlider(currentIndex);
    }
});
