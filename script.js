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
  // вычисляем максимально возможный индекс с учётом всех карточек
  var maxIndex = brands.length - 1;
  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;

  currentIndex = index;

  var offset = currentIndex * (brandWidth + gap);
  brandsList.style.transform = 'translateX(-' + offset + 'px)';

  // обновляем точки: точка = страница (например, каждые 3 карточки)
  for (var i = 0; i < dots.length; i++) {
    var pageStart = i * 3; // 3 карточки на экран
    var pageEnd = pageStart + 2;
    if (currentIndex >= pageStart && currentIndex <= pageEnd) {
      dots[i].classList.add('active');
    } else {
      dots[i].classList.remove('active');
    }
  }
}

// ===== СВАЙП =====
var startX = 0;
var endX = 0;

brandsList.addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
});

brandsList.addEventListener('touchend', function(e) {
  endX = e.changedTouches[0].clientX;
  var diff = startX - endX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) goToSlide(currentIndex + 1); // вперед
    else goToSlide(currentIndex - 1); // назад
  }
});

// ===== КЛИК ПО КАРТОЧКЕ =====
for (var i = 0; i < brands.length; i++) {
  brands[i].addEventListener('click', (function(i){
    return function(e){
      if (window.innerWidth < 768) {
        e.preventDefault();
        if (i > currentIndex) goToSlide(currentIndex + 1);
        else if (i < currentIndex) goToSlide(currentIndex - 1);
      }
    }
  })(i));
}

// ===== РЕСАЙЗ =====
window.addEventListener('resize', function() {
  if (window.innerWidth >= 768) {
    brandsList.style.transform = '';
    currentIndex = 0;
    for (var i = 0; i < brands.length; i++) {
      brands[i].style.display = '';
    }
  } else {
    for (var i = 0; i < brands.length; i++) {
      brands[i].style.display = 'flex';
    }
    goToSlide(currentIndex);
  }
});

// стартовый слайд
goToSlide(0);
