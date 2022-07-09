import axios from 'axios';

const getAllData = (urls: String[]) => {
  return Promise.all(urls.map(fetchData));
};

const fetchData = async (url: String) => {
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

export default getAllData;
