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

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(post => {
            if (post && post.length) {
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

server.get('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findPostComments(id)
        .then(coms => {
            if (coms && coms.length) {
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

// PUT

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const newInfo = req.body;
    if (!newInfo.title || !newInfo.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.findById(id)
            .then(post => {
                if (post && post.length) {
                    db.update(id, newInfo)
                        .then(updateId => {
                            if (updateId === 1) {
                                res.status(200).json(newInfo);
                            } else {
                                res.status(500).json({ error: "The post information could not be modified." })
                            }
                        })
                        .catch(() => {
                            res.status(500).json({ error: "The post information could not be modified." })
                        })
                } else {
                    res.status(404).json({ message: "The post with the specified Id does not exist." })
                }
            })
            .catch(() => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }
})

// POST

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db.insert(req.body)
            .then(newPost => {
                res.status(201).json(newPost);
            })
            .catch(() => {
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            })
    }
});

server.post('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    const post = db.findById(id);
    const text = req.body;
    text.post_id = id;

    if (post) {
        if (!text) {
            res.status(400).json({ errorMessage: "Please provide text for the comment." });
        } else {
            db.insertComment(text)
                .then(() => {
                    res.status(201).json(text)
                })
                .catch(() => {
                    res.status(500).json({ error: "There was an error while saving the comment to the database" })
                })
        }
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

});

module.exports = server;
