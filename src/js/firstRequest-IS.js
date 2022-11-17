import r from "./domElementsRefs";
import fetchImages from "./fetchImages";
import renderingGallery from "./renderingGallery";
import loadByScroll from "../infinite-scroll";
import SimpleLightbox from "simplelightbox";
import Notiflix from "notiflix";

export default function firstRequest(page, imgPerPage) {
  const formInput = new FormData(r.formRef);
  const searchValue = formInput.get("searchQuery");
  if (searchValue === "") {
    Notiflix.Notify.info("Please, enter you request.");
    return;
  }
  fetchImages(searchValue, page, imgPerPage)
    .then((responseDataObj) => {
      if (!responseDataObj) {
        Notiflix.Notify.error("Something went wrong!");
        return;
      }

      if (responseDataObj.hits.length > 0) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        r.divGalleryRef.innerHTML = renderingGallery(responseDataObj.hits);
        const gallery = new SimpleLightbox(".gallery a");
        gallery.on("show.simplelightbox");
        Notiflix.Notify.success(
          `Hooray! We found ${responseDataObj.totalHits} images.`
        );

        if (responseDataObj.totalHits < page * imgPerPage) {
          window.removeEventListener("scroll", loadByScroll);
        }
      }
    })
    .catch((error) => {
      Notiflix.Notify.failure(`Error ${error.message}.`);
      return;
    });
  return searchValue;
}
