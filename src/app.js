const express = require('express');
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 5000;

const app = express();

// app.use(express.static(path.join(__dirname,'../public')));
// console.log(path.join(__dirname,'../public'));
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));

hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/weather',(req,res)=>{
    res.render('weather');
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('*',(req,res)=>{
    res.render('404');
})

app.listen(port, (err)=>{
    if(err){
        throw err;
        return;
    }

    console.log(`The express server is running on port: ${port}...`);
})