function renderComment(comment) {

	var source = $('#comment').html()
		, dateString = new Date(comment.created).toDateString()
		, html = Handlebars.compile(source)({ 
			comment: comment.text, 
			author: comment.author,
			time: dateString 
		});

	$('#comments-container').prepend(html);
}

// socket.io 
var socket = io.connect('http://localhost')
	, commentCount = 0;

socket.on('newComment', function(comment) {
	renderComment(comment);

	if (comment.author !== localStorage.author) {
		commentCount++;

		var countString = commentCount + " NEW COMMENT"
		if (commentCount > 1) countString += "S";

		$('#comment-count').text(countString);
	}
});

// session author name
$('#author-name-submit button').click(function(event) {
	$.post('/session/author', { 
		author: $('#author-name-submit input').val() 
	}, function(res) {
		$('#author-name-submit').hide();
		$('#author-name').text('Welcome, ' + res.data.author);
		localStorage.author = res.data.author;
	});
});

// create comment
$('.comment-submit').click(function(event) {
	
	var $comment_el = $('.comment-input').first()
		, comment = $comment_el.val()
		, data = { text: comment, author: 'Anonymous' }

	$.post('/comments/create', data, function(res) {
		socket.emit('comment', res.data)
		$comment_el.val('');
	});

});

// list comments on page load
$.get('/comments', function(res) {
	res.data.forEach(function(comment) {
		renderComment(comment)
	});
});

if (localStorage.author) {
	$('#author-name-submit').hide();
	$('#author-name').text(localStorage.author)
}