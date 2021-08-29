import { checkUrl } from './checkURL';

function handleSubmit(event) {
  event.preventDefault();

  const url = document.getElementById('article-url').value;

  console.log('URL', url);
  //check url valid

  if (checkUrl(url)) {
    //Post data to the server
    console.log('Post data to the server');

    postUrl('http://localhost:8082/meaningCloudData', { url }).then((data) =>
      updateUI(data)
    );
  } else {
    alert('Not valid URL')
  }
}

const postUrl = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

function updateUI(data) {
  document.getElementById('text').innerHTML = data.text;
  document.getElementById('agreement').innerHTML = data.agreement;
  document.getElementById('subjectivity').innerHTML = data.subjectivity;
  document.getElementById('confidence').innerHTML = data.confidence;
  document.getElementById('irony').innerHTML = data.irony;
  document.getElementById('score_tag').innerHTML = data.scoreTag;
}

export { handleSubmit };
