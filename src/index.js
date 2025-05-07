//import {getEditor} from './services/ccEverywhere.js';
import axios from 'axios';

const fetchMessage = async () => {
  try {
    // Making GET request to the endpoint
    const response = await axios.get('http://localhost:3000/api/image-data');

    // Log the string response
    console.log('stringresponse:');
    console.log(response.data); // Outputs: "Hello from the server!"
    document.getElementById('image-container').src = response.data;
    console.log('Stored image to container')
  } catch (error) {
    console.error('Error fetching message:', error.message);
  }
};
console.log('fetchingmessage');
// Trigger the function
fetchMessage();
console.log('messagefetched');

