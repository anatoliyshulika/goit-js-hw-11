import "./styles/main.scss";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import r from "./js/domElementsRefs";
import firstRequest from "./js/firstRequest";
import loadMoreRequest from "./js/loadMoreRequest";

const imgPerPage = 40;
let page = 1;
let searchValue = "";

r.formRef.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchValue = firstRequest(page, imgPerPage);
  page += 1;
});

r.loadMoreBtnRef.addEventListener("click", () => {
  loadMoreRequest(searchValue, page, imgPerPage);
  page += 1;
});
