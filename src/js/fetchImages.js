export default fetchImages;
import axios from "axios";
import Notiflix from "notiflix";

const API_KEY = "31319107-722dadb9eaa121b95e9a372a6";
const baseUrl = "https://pixabay.com/api/";
const requestParams = "image_type=photo&orientation=horizontal&safesearch=true";

async function fetchImages(searchValue, page, imgPerPage) {
  const response = await axios.get(
    `${baseUrl}?key=${API_KEY}&q=${searchValue}&${requestParams}&per_page=${imgPerPage}&page=${page}`
  );
  return response.data;
}
