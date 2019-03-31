const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const uuid = require('uuid');


Posts = [
    {
        id: uuid.v4(),
        title: "Prueba 1",
        content: "Este post se hace con el objetivo de probar uno",
        author: "Rocio Alejandra Orozco Parra",
        publishDate: '23-Mar-19'
    },
    {
        id: uuid.v4(),
        title: "Prueba 2",
        content: "El examen es el 31 de marzo",
        author: "Gerardo ALdair Ponce Gomez",
        publishDate: '13-Mar-19'
    },
    {
        id: uuid.v4(),
        title: "Prueba 3",
        content: "Capacitador post 3",
        author: "Oscar Octavio Soler Trejo",
        publishDate: '24-Mar-19'
    },
    {
      id: uuid.v4(),
      title: "Prueba 4",
      content: "Estudiante de finanzas",
      author: "Francisco Javier Villarreal",
      publishDate: '15-Feb-19'
    }
]

// GET method route
app.get('/blog-post', (req, res) => {
    res.status(200).json({
        message: "All Succes",
        status: 200,
        posts: Posts
    });
});


// GET method route
app.get('/blog-post/:author', (req, res) => {
    const Author = req.params.author;

    if(!Author){
        res.status(406).json({
            message: "Author Missing",
            status: 406
        });
    }

    const authorPosts = [];
    Posts.forEach(item => {
        if(Author == item.author){
            authorPosts.push(item);
        }
    });

    if(authorPosts.length > 0){
        res.status(200).json({
            message: "Author post Sent",
            status: 200,
            post: authorPosts
        });
    }else{
        res.status(404).json({
            message : "Author not found",
            status : 404
        });
    }
});

// POST method route
app.post('/blog-post', jsonParser, (req, res) => {

    const title = req.body.title;
    const content = req.body.content;
    const Author = req.body.author;
    const date = req.body.publishDate;

    if(!title || !content || !Author || !date){
    res.status(406).json({
      message : "Missing data.",
      status : 406
    })
    return;
  }

    let PostNew = {
        id: uuid.v4(),
        title: title,
        content: content,
        author: Author,
        publishDate: date
    };
    Posts.push(PostNew);

    res.status(201).json({
        message: "Post Added",
        status: 201,
        post: PostNew
    });
});


//DELETE method route
app.delete('/blog-post/:id', jsonParser, (req, res) => {
    const bodyId = req.body.id;
    const paramId = req.params.id;
    if(!bodyId || !paramId || bodyId != paramId){
        res.status(406).json({
            message: "ID Missing",
            status: 406
        });
        return;
    }

    Posts.forEach((item, index) => {
        if(paramId == item.id){
            delete Posts[index];
            res.status(204).send("Delete");
            return;
        }
    });

    res.status(404).json({
        message: "Post not found",
        status: 404
    });


});


//PUT method route
app.put('/blog-post/:id', jsonParser, (req, res) => {
    let postId = req.params.id;
    let NewPost = req.body;


    if(!postId){
        res.status(406).json({
            message: "ID Missing",
            status: 406
        });
        return;
    }

    let PostNew = null;

    if(!NewPost.title && !NewPost.content && !NewPost.author && !NewPost.publishDate){
        res.status(404).json({
            message: "No data in body",
            status: 404
        });
        return;
    }
    else{
        Posts.forEach(item => {
            if(postId == item.id){
                if(NewPost.title) {
                  item.title = NewPost.title;
                }
                if(NewPost.content) {
                  item.content = NewPost.content;
                }
                if(NewPost.author) {
                  item.author = NewPost.author;
                }
                if(NewPost.publishDate) {
                  item.publishDate = NewPost.publishDate;
                }
                PostNew = item;

                res.status(200).json({
                    message: "Post Updated",
                    status: 200,
                    post: PostNew
                });
            }
        });
    }

    res.status(404).json({
        message: 'ID not found',
        status: 404,
    });

});


app.listen(8080, () => {
    console.log("Your app is running in port 8080");
});
