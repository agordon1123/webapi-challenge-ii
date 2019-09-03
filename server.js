const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

// GET

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
});

// Unsure why I'm getting an empty array back on postman when the post with the specific ID is not found
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
    }
);

// Same comment as above
server.get('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findCommentById(id)
        .then(coms => {
            if (coms) {
                res.status(200).json(coms);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The comments information could not be retrieved." });
        })
});

// DELETE

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(del => {
            if (del) {
                res.status(200).send("Post successfully deleted");
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The post could not be removed" });
        })
})

// POST

// server.post('/api/posts', (req, res) => {
//     const { title, contents } = req.body;
//     if (!req.body.title || !req.body.contents) {
//         res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
//     } else {
//         db.insert(req.body.title, req.body.contents)
//             .then(newPost => {
//                 res.status(201).json(newPost);
//             })
//             .catch(() => {
//                 res.status(500).json({ error: "There was an error while saving the post to the database" });
//             })
//     }
// });

module.exports = server;
