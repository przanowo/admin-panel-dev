import axios from 'axios';
import { showAlert } from './alerts';

export const uploadProduct = async (data) => {
  try {
    console.log(data, 'try uploadProduct');

    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/parfums',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Product uploaded successfully');
    }
  } catch (err) {
    showAlert('error catch', err.response.data.message);
  }
};
