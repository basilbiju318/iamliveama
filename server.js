const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const accountSid = 'AC038a035d087420dfb91b2765773c81bd';
const authToken = '15070100346dc33a44c452623436cb02';
const fromPhone = '+YOUR_TWILIO_NUMBER'; // Replace this with your Twilio number (e.g. "+1415xxxxxxx")

const client = twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
  const { phone, message } = req.body;

  try {
    const result = await client.messages.create({
      body: message,
      from: fromPhone,
      to: phone
    });
    res.send({ success: true, sid: result.sid });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
