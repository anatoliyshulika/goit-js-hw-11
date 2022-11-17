import "./styles/main.scss";
// import Notiflix from "notiflix";
// import SimpleLightbox from "simplelightbox";
import r from "./js/domElementsRefs";
import firstRequest from "./js/firstRequest-IS";
import loadMoreRequest from "./js/loadMoreRequest-IS";
const throttle = require("lodash.throttle");

const imgPerPage = 40;
let page = 1;
let searchValue = "";

const loadByScroll = throttle(() => {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    loadMoreRequest(searchValue, page, imgPerPage);
    page += 1;
  }
}, 500);
export default loadByScroll;

r.formRef.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchValue = firstRequest(page, imgPerPage);
  page += 1;

  window.addEventListener("scroll", loadByScroll);
});

// window.addEventListener("scroll", loadByScroll);

// r.loadMoreBtnRef.addEventListener("click", () => {
//   loadMoreRequest(searchValue, page, imgPerPage);
//   page += 1;
// });

// if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
//   console.log("Srabotal scroll vnutri if");
//   loadMoreRequest(searchValue, page, imgPerPage);
//   page += 1;
// }

// r.divGalleryRef.scrollTop + r.divGalleryRef.clientHeight >= r.divGalleryRef.scrollHeight

//  () => {
//    console.log("Srabotal scroll");
//    console.log("document.body.offsetHeight", document.body.offsetHeight);
//    console.log("window.innerHeight", window.innerHeight);
//    console.log("window.pageYOffset", window.pageYOffset);
//    console.log(
//      "window.innerHeight + window.pageYOffset",
//      parseInt(window.innerHeight + window.pageYOffset)
//    );
//    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
//      console.log("Srabotal scroll vnutri if");
//      loadMoreRequest(searchValue, page, imgPerPage);
//      page += 1;
//    }
//  };
