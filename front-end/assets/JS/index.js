const $ = document;

$.addEventListener('DOMContentLoaded', () => {
  console.log('Page Chargée');

  $.querySelector('#contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:3000/send-email', {
      firstname: $.querySelector('#firstname').value,
      lastname: $.querySelector('#lastname').value,
      email: $.querySelector('#email').value,
      subject: $.querySelector('#subject').value,
      message: $.querySelector('#message').value
    });
    console.log(response.data);
    alert('Merci pour votre message');
  });
});
