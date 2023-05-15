const mongoose = require("mongoose");
const Author = require("./author")


const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  publishDate: {
    type: Number,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImage: {
    type: Buffer,
    required: true,
  },
  coverImageType: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Author,
  },
});

bookSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString("base64")}`;
  }
});

// module.exports = mongoose.model("Book", bookSchema);

// module.exports = (db) => db.model('Book', bookSchema);

const bookConnection = mongoose.createConnection(process.env.DATABASE_URL);


module.exports = bookConnection.model('Book', bookSchema);

