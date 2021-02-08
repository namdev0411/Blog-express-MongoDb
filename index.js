const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {Post} = require('./models/post');
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
    const posts = await Post.find();
    res.render("index",{posts});
});
app.get('/post/new', (req, res) => {
    res.render("add");
});
app.post('/post/new', (req, res) => {
    const {name,description,body} = req.body;
    const newPost = Post({
        name,
        description,
        body,
        comments:[],
    });
    newPost.save()
    .then(data=>{
        if(data)return res.redirect('/');
    })
    .catch(err=>console.log(err));
});
app.get('/post/:id', async (req, res) => {
    const _id = req.params.id;
    const post = await Post.findById(_id);
    return res.render('view',{post});
});
app.get('/post/edit/:id',async (req,res)=>{
    const _id = req.params.id;
    const post = await Post.findById(_id);
    if(post) return res.render('edit',{post});
})
app.post('/post/edit/:id',async (req,res)=>{
    const date = Date.now();    
    const {name,description,body} = req.body;
    const _id = req.params.id;
    const post = await Post.findById(_id);
    if(post){
        const {like,comments} = post;
        const update = {
            name,
            description,
            body,
            createAt: date,
            like,
            comments
        };
        post.updateOne(update).
        then(data=>{
            
        })
        .catch(err=>{
            console.log(err)
        });
        return res.redirect(`/post/${post._id}`);
    }
    res.redirect("/");
})
app.post('/post/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const post = await Post.findById(id);
    if(post){
        post.deleteOne();
        return res.redirect("/");
    }
    res.redirect("/");
})
const port = 8080;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});