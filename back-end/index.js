const express = require('express');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const mg = mailgun.client({
  username: 'farid',
  key: process.env.APIKEY
});

const app = express();

console.log(process.env.API_KEY);

app.use(cors());
app.use(express.json());

app.post('/send-email', (req, res) => {
  console.log(req.body);
  try {
    mg.messages
      .create(process.env.SERVER, {
        from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
        to: process.env.MAIL,
        subject: req.body.subject,
        text: req.body.message
      })
      .then((msg) => res.json(msg.message))
      .catch((err) => res.json(err.message));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.all('*', (req, res) => {
  res.status(404).json("Cette route n'existe pas");
});

app.listen(process.env.PORT, () => {
  console.log('Server started');
});
