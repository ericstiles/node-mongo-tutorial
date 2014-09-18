function renderComment(comment) {

	var source = $('#comment').html()
		, dateString = new Date(comment.created).toDateString()
		, html = Handlebars.compile(source)({ comment: comment.text, time: dateString });

	$('#comments-container').prepend(html);
}

// create comment
$('.comment-submit').click(function(event) {
	
	var $comment_el = $('.comment-input').first()
		, comment = $comment_el.val();

	$.get('/comments/create', { 
		text: comment, 
		author: 'anonymous' 
	}, function(res) {
		renderComment(res.data);
		$comment_el.val('');
	});

});

// list comments on page load
$.get('/comments', function(res) {
	res.data.forEach(function(comment) {
		renderComment(comment)
	});
});