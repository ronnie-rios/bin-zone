const express = require('express');
const app = express();
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const Document = require('./models/document');
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
    res.render('code-display', { code, language:'plaintext' })
})

app.get('/new', (req, res) => {
    res.render('new')
})
//save document
app.post('/save', async (req, res) => {
    const value = req.body.value
    try {
        const document = await Document.create({ value })
        res.redirect(`/${document.id}`)
    } catch (e) {
        res.render('new', { value })
    }
})

//document get by id
app.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const document = await Document.findById(id)
        res.render('code-display', {code: document.value, id })
    } catch (e) {
        res.redirect('/')
    }
})

//duplicate route
app.get('/:id/duplicate', async (req, res) => {
    const id = req.params.id
    try {
        const document = await Document.findById(id)
        res.render('new', {value: document.value  })
    } catch (e) {
        res.redirect(`/${id}`)
    }
})
app.listen(3000)