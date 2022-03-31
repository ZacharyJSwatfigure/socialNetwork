// import required modules
const { Schema, model } = require("mongoose");

// define the User schema
const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required"],
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
	}
);

UserSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;