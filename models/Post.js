const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  username: String,
  createdat: String,
  comments: [
    {
      body: String,
      username: String,
      createdat: String,
    },
  ],
  likes: [
    {
      username: String,
      createdat: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Post", postSchema);
