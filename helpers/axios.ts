import axios from 'axios';

const getAllDataWithoutCredential = (urls: String[]) => {
  return Promise.all(urls.map(fetchDataWithoutCredential));
};

const fetchDataWithoutCredential = async (url: String) => {
  try {
    const { data } = await axios.get(String(url));
    return {
      success: true,
      data: data,
    };
  } catch (err) {
    return { success: false };
  }
};

const getAllDataWithCredential = (urls: String[]) => {
  return Promise.all(urls.map(fetchDataWithCredential));
};

const fetchDataWithCredential = async (url: String) => {
  try {
    const { data } = await axios.get(String(url), { withCredentials: true });
    return {
      success: true,
      data: data,
    };
  } catch (err) {
    return { success: false };
  }
};

export { getAllDataWithoutCredential, getAllDataWithCredential };
