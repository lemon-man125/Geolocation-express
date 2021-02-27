const express = require('express');
const Ds = require('nedb');
require('dotenv').config()

const port = process.env.PORT || 1000;
const api = express();
const listener = api.listen(port, () => {
    console.log('Your app is listening on port ' + listener.address().port || port);
  });
api.use(express.static('web'));
api.use(express.json({limit: '2mb'}))

const data = new Ds('dsData.db');
data.loadDatabase();

api.post('/geo', (req, res) => {
    //console.log(req.body);
    data.insert(req.body);
    res.json({
        status: 'gotPost',
        latitude: req.body.lat,
        longitude: req.body.lon,
    });
    
});

api.get('/data', async (req, res) => {
    data.find({}, (err, records) => {
        if (err) {
            response.json({ err });
            return;
        }
        res.json(records);   
    })
})
