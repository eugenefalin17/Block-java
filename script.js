var wrapper = document.querySelector('.brands__wrapper');
var brands = document.querySelectorAll('.brand');
var dots = document.querySelectorAll('.dot');
var toggleBtn = document.querySelector('.brands__toggle');
var brandsList = document.querySelector('.brands__list');

var gap = 16;

// ===== КНОПКА =====
if (toggleBtn) {
  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault();

    brandsList.classList.toggle('brands__list--expanded');

    if (brandsList.classList.contains('brands__list--expanded')) {
      toggleBtn.innerHTML = '<img src="images/expand.svg"> Скрыть';
    } else {
      toggleBtn.innerHTML = '<img src="images/expand.svg"> Показать все';
    }
  });
}

// ===== СКРОЛЛ → АКТИВНАЯ ТОЧКА =====
wrapper.addEventListener('scroll', function() {
  var brandWidth = brands[0].offsetWidth;
  var scrollLeft = wrapper.scrollLeft;

  var index = Math.round(scrollLeft / (brandWidth + gap));

  for (var i = 0; i < dots.length; i++) {
    if (i === index) {
      dots[i].classList.add('active');
    } else {
      dots[i].classList.remove('active');
    }
  }
});

// ===== КЛИК ПО ТОЧКАМ =====
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', function() {
    var brandWidth = brands[0].offsetWidth;

    wrapper.scrollTo({
      left: i * (brandWidth + gap),
      behavior: 'smooth'
    });
  });
}
