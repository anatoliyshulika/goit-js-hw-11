import "./styles/main.scss";
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
