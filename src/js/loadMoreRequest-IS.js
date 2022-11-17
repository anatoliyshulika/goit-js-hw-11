import r from "./domElementsRefs";
import fetchImages from "./fetchImages";
import renderingGallery from "./renderingGallery";
import loadByScroll from "../infinite-scroll";
import SimpleLightbox from "simplelightbox";
import Notiflix from "notiflix";

export default function loadMoreRequest(searchValue, page, imgPerPage) {
  fetchImages(searchValue, page, imgPerPage)
    .then((responseDataObj) => {
      if (!responseDataObj) {
        Notiflix.Notify.error("Something went wrong!");
        return;
      }

      if (responseDataObj.hits.length > 0) {
        r.divGalleryRef.insertAdjacentHTML(
          "beforeend",
          renderingGallery(responseDataObj.hits)
        );

        const gallery = new SimpleLightbox(".gallery a");
        gallery.refresh();
      }
      console.log(responseDataObj.totalHits);
      if (responseDataObj.totalHits < page * imgPerPage) {
        window.removeEventListener("scroll", loadByScroll);
        Notiflix.Notify.info(
          "Sorry, there are no images matching your search query. Please try again."
        );
      }
    })
    .catch((error) => {
      Notiflix.Notify.failure(`Error ${error.message}.`);
      return;
    });
}
