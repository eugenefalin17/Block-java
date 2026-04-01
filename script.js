var toggleBtn = document.querySelector('.brands__toggle');
var brandsList = document.querySelector('.brands__list');

toggleBtn.addEventListener('click', function(e) {
  e.preventDefault();

  // переключаем класс expanded у списка брендов
  brandsList.classList.toggle('brands__list--expanded');

  // меняем текст и иконку кнопки
  if (brandsList.classList.contains('brands__list--expanded')) {
    toggleBtn.innerHTML = '<img src="images/expand.svg" alt="expand"> Скрыть';
  } else {
    toggleBtn.innerHTML = '<img src="images/expand.svg" alt="expand"> Показать все';
  }
});

// ======= Slider для мобильного (320px) =======
var dots = document.querySelectorAll('.dot');
var brandsList = document.querySelector('.brands__list');
var brandWidth = 240; // ширина одного бренда
var gap = 16; // gap между брендами
var currentIndex = 0;

// функция для сдвига списка
function updateSlider(index) {
    var offset = index * (brandWidth + gap);
    brandsList.style.transition = 'transform 0.3s ease';
    brandsList.style.transform = 'translateX(-' + offset + 'px)';

    // обновляем активную точку
    dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === index);
    });
}

// навешиваем событие на точки
dots.forEach(function(dot, i) {
    dot.addEventListener('click', function(e) {
        e.preventDefault();
        currentIndex = i;
        updateSlider(currentIndex);
    });
});

// инициализация на первой точке
updateSlider(0);

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


