$(function() {
  function buildHTML(message){
    if( message.content !== undefined) {
      var con = <p class="lower-message__content">${message.content}</p>
    }
    if( message.image_tag !== undefined) {
      var img = <img src='${message.image_tag}' >
    }
   var html =
   `
  <div class="message">
    <div class=upper-message>
      <div class="upper-message__user-name">
        ${message.user_name}
      </div>
      <div class="upper-message__date">
        ${message.created_at}
      </div>
    </div>
    <div lower-message>
      ${con}
      ${img}
    </div>
  <div>
       `
   return html;
 }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $('.new_message').attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__message').val('');
    })
    .fail(function() {
      alert('投稿に失敗しました');
    })
  });
});
