var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

// comment document schema
var commentSchema = new Schema({
	created: { type: Date, default: Date.now },	
	text: String,
	author: String
}, { collection: 'comments' });

// static model methods
commentSchema.statics = {

	// all comments sorted by create time
	list: function(callback) {
		this.find({}, 'text author created')
				.sort('+created')
				.exec(function(error, comments) {
					return callback(error, comments);
				});
	}

};

// model instance methods
commentSchema.methods = {}

// register model
mongoose.model('Comment', commentSchema);