var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cors = require('cors');

app.use(cors());

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
 // res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
  console.log('Example app listening on port 8081!');
  console.log(`Your API key is ${process.env.API_KEY}`);
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});

app.post('/meaningCloudData', (req, res) => {
  const { url } = req.body;

  const BASE_API_URL = 'https://api.meaningcloud.com/sentiment-2.1';
  const MEAN_CLOUD_API_KEY = process.env.API_KEY;

  const requestURL = `${BASE_API_URL}?key=${MEAN_CLOUD_API_KEY}&url=${url}&lang=en`
  console.log(requestURL)

  getMeaningCloudData(requestURL)
  .then((data)=> {
  
    const requestedData = {
      text: data.sentence_list[0].text,
      scoreTag: data.score_tag,
      agreement: data.agreement,
      subjectivity: data.subjectivity,
      confidence: data.confidence,
      irony: data.irony
    }
   res.send(requestedData)
   console.log(requestedData)
  })

});


const fetch = require('node-fetch');

const getMeaningCloudData = async (url) => {
    const response = await fetch(url);
    console.log(url);
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('error', error);
    }
  };