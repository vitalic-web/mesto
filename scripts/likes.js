const likeActive = document.querySelectorAll('.element__title-like');

for (let likeActiveElement of likeActive) {
  likeActiveElement.addEventListener('click', function() {
    likeActiveElement.classList.toggle('element__title-like_active');
  })
}

console.log(likeActive);
