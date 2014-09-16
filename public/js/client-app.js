$('.comment-submit').click(function(event) {
	
	var $comment_el = $('.comment-input').first()
		, comment = $comment_el.val()
		, time = new Date().toDateString();
	
	var source = $('#comment').html()
		, html = Handlebars.compile(source)({ comment: comment, time: time });

	$comment_el.val('');
	$('#comments-container').prepend(html);

});