
const router = require("express").Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thoughts-controller");
//list all the routes that do what (all prepended with api/):
// thoughts
router.route("/").get(getAllThoughts).post(createThought);

// thoughts/:id
router.route("/:id").get(getThoughtById).put(updateThought);

// thought/:userId/:thoughtId
router.route("/:userId/:thoughtId").delete(deleteThought);

// thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;