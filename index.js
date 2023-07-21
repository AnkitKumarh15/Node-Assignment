const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;



app.use(bodyParser.json());

let db;
MongoClient.connect('mongodb+srv://ankitkumar:asdf@cluster0.uugtjq0.mongodb.net/?retryWrites=true&w=majority').then((client)=>{
db = client.db('UrlShort');    
console.log("DB server is connected");
}).catch((err)=>{
    console.log(err);
})

app.post('/shorten', (req, res) => {
    const longUrl = req.body.destinationUrl;
    const shortUrl = generateShortUrl(longUrl);
  
    res.json({ shortUrl });
});

app.post('/update', (req, res) => {
    const shortUrl = req.body.shortUrl;
    const newLongUrl = req.body.destinationUrl;
    const success = updateShortUrl(shortUrl, newLongUrl);
  
    res.json({ success });
});
  
app.get('/get/:shortUrl', (req, res) => {
    const shortUrl = req.params.shortUrl;
    const longUrl = getDestinationUrl(shortUrl);
  
    if (longUrl) {
      res.redirect(longUrl);
    } else {
      res.status(404).send('URL not found');
    }
});

app.post('/updateExpiry', (req, res) => {
    const shortUrl = req.body.shortUrl;
    const daysToAdd = req.body.daysToAdd;
    const success = updateExpiry(shortUrl, daysToAdd);
  
    res.json({ success });
});
  
  

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
