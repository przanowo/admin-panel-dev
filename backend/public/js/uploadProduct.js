import axios from 'axios';
import { showAlert } from './alerts';

export const uploadProduct = async (data) => {
  try {
    console.log(data);

    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/parfums',
      data,
    });

    if (res.data.status === 'success') {
      console.log('success', 'Product uploaded successfully');
      console.log('success');
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};
