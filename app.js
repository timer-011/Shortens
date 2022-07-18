const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Link = require('./models/Link');
const id = require('randomstring');

//  MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = mongoose.connect('mongodb://localhost/Shortens', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err)
        console.log('Mongo error');
    else
        console.log('MongoDB connected');
});

app.get('/', async (req, res) => {
    const list = await Link.find({});
    // console.log(list);
    res.render('index.ejs', {title: 'Shortens', list});

})

app.get('/:url', async (req, res) => {
    const item = await Link.findOne({
        shorten: req.params.url
    });
    if(!item)
        return res.status(404); //  not found
    console.log(item);
    res.redirect(item.link);
    // res.send('Thankyou for your response');
})

app.post('/link', async (req, res) => {
    console.log('received a post request');
    const {newLink} = req.body;
    console.log(newLink);

    const newEntry = await Link.create({
        link: newLink,
        shorten: id.generate(6)
    });

    console.log(newEntry);
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('Listening on PORT 3000');
});