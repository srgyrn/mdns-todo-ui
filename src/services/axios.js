import axios from "axios";
export const API = process.env.VUE_APP_API_URL;

export function getList() {
  let list = axios.get(API + "/item").then(parseResponse);

  if (typeof list !== "object") {
    list = [];
  }
  return list;
}

export function postItem(value) {
  return axios.post(API + "/item", { content: value }).then(parseResponse);
}

const parseResponse = response => {
  if (response.status !== 200 || !response.data) return [];
  return response.data;
};
