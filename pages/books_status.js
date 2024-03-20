let BookInstance = require('../models/bookinstance');

function get_book(id) {
  if (typeof id !== "string") {
      return ({status: "error"});
  }
  return Book.findOne({'_id': {$eq: id}}).populate('author');
}

function get_book_dtl(id) {
  return BookInstance
          .find({ 'book': id })
          .select('imprint status');
}

exports.show_all_books_status = async function(res) {
  console.log("Test", BookInstance.find({status: 'Available'}))
  return res.send(await BookInstance.find({status: 'Available'}).exec());
}