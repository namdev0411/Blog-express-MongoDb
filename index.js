const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {Posts} = require('./models/posts');
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//view
app.set('view engine', 'ejs');
//MongoDb
app.use('/post', express.static('public'))
const linkDb="mongodb+srv://namdev0411:Nams2bxthanh0411@cluster0.cugve.mongodb.net/blog?retryWrites=true&w=majority";
const mongoose = require('mongoose');

mongoose.connect(linkDb, {useNewUrlParser: true, useNewUrlParser: true,  useUnifiedTopology: true})
    .then(()=>console.log('db connected'))
    .catch(()=>console.log('connect false'))
mongoose.Promise = global.Promise;

app.get('/', async (req, res) => {
    const posts = await Posts.find();
    res.render("index",{posts});
});
app.get('/post/:id', async (req, res) => {
    const _id = req.params.id;
    const post = await Posts.findById(_id);
    res.render('view',{post});
});
const port = 8080;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});