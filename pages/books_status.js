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
  //return res.send([]);
  const results = await Promise.all([get_book(id).exec(), get_book_dtl(id).exec()])
  try {
    let book = await results[0];
    let bookInstance = await results[1];
    res.send({
      title: book.title,
      status: bookInstance.status,
    });
  }
  catch(err) {
    res.send(`Book ${id} not found`);
  } 
}