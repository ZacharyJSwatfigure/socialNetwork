const { User } = require("../models");

const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then((dbUserData) => {
                res.status(200).json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__v")
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id." });
                    return;
                }
                res.status(200).json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST create user
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => {
                res.status(200).json(dbUserData);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    // PUT update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id" });
                    return;
                }
                res.status(200).json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // DELETE user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id" });
                    return;
                }

                res.status(200).json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST add a new friend to a user's friend list
    addFriend({ params }, res) {
        User.findOne({ _id: params.friendId })
            .then((friendData) => {
                if (!friendData) {
                    res
                        .status(404)
                        .json({ message: "No user (friend) found with this id" });
                    return;
                }

                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { friends: friendData } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res
                        .status(404)
                        .json({ message: "No user (user) found with this id" });
                    return;
                }

                res.status(200).json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // DELETE a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id" });
                    return;
                }

                res.status(200).json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
};

module.exports = userController;