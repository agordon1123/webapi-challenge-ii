const express = require('express');
const db = require('./data/db');

const server = express();

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

module.exports = server;
