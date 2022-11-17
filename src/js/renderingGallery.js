export default renderingGallery;

function renderingGallery(imgList) {
  let markupGallery = "";
  imgList.forEach((imgObj) => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = imgObj;
    markupGallery += `<div class="photo-card gallery__item">
  <a class="gallery__link" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views</b>
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
  });
  return markupGallery;
}
