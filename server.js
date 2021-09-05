const express = require('express');
const app = express();
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/binzone', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

//routes
app.get('/', (req, res)=> {
   const code =`Welcome to the BinZone, 
follow the commands in the top right corner 
to create a new file to share with others`
    res.render('code-display', { code })
})

app.get('/new', (req, res) => {
    res.render('new')
})

app.post('/save', (req, res) => {
    const value = req.body.value
    console.log(value)

})
app.listen(3000)