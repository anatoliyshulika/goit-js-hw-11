import r from "./domElementsRefs";
import fetchImages from "./fetchImages";
import renderingGallery from "./renderingGallery";
import SimpleLightbox from "simplelightbox";
import Notiflix from "notiflix";

export default function loadMoreRequest(searchValue, page, imgPerPage) {
  fetchImages(searchValue, page, imgPerPage)
    .then((responseDataObj) => {
      r.loadMoreBtnRef.classList.add("visually-hidden");
      if (!responseDataObj) {
        Notiflix.Notify.error("Something went wrong!");
        return;
      }

      if (responseDataObj.hits.length > 0) {
        r.divGalleryRef.insertAdjacentHTML(
          "beforeend",
          renderingGallery(responseDataObj.hits)
        );

        const { height: cardHeight } = document
          .querySelector(".gallery")
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 1.6,
          behavior: "smooth",
        });
        const gallery = new SimpleLightbox(".gallery a");
        gallery.refresh();

        if (responseDataObj.totalHits > page * imgPerPage) {
          r.loadMoreBtnRef.classList.remove("visually-hidden");
        } else {
          Notiflix.Notify.info(
            "Sorry, there are no images matching your search query. Please try again."
          );
        }
      }
    })
    .catch((error) => {
      Notiflix.Notify.failure(`Error ${error.message}.`);
      return;
    });
}
