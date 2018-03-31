$(function() {
  function buildHTML(message){
    if( message.image_tag) {
      var img = `<img src='${message.image_tag}' class="lower-message__image">`
    } else{
      var img = ''
    }
   var html =
   `
  <div class="message" data-id="${message.id}">
    <div class=upper-message>
      <div class="upper-message__user-name">
        ${message.user_name}
      </div>
      <div class="upper-message__date">
        ${message.created_at}
      </div>
    </div>
    <div lower-message>
      <p class="lower-message__content">
        ${message.content}
      </p>
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


  ////////////////////////////////自動更新機能//////////////////////////////////////////////////////////////////
  setInterval(function() {
    var href = window.location.href;
    $.ajax({
      url: href,
      dataType:'json',
      type:'GET',
    })
    .done(function(data) { //.done(function(json){})でjbuilderから受け取ったデータを引数dataで使用
      var insertHTML = '';//メッセージを複数入れるための変数。空の状態で定義。
      var id = $('.message').last().attr('data-id');//表示中のメッセージのうち最新のidを取得

      data.messages.forEach(function(message) {//jsonで定義したjson.messagesをひとつひとつforEachで処理
        if (message.id > id ) {
          var html = newMessageHTML(message);
          $('.messages').append(html);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
      });
    })
    .fail(function(data) {
      alert('自動更新に失敗しました');
    });
  } , 5 * 1000 );

  function newMessageHTML(message) {
    var insertImage = '';
    if (message.image) {
    insertImage = `<img src="${message.image}">`;
    }
    var html =
      `
      <div class="message" data-id="${message.id}">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${ message.user_name }
          </div>
          <div class="upper-message__date">
            ${ message.created_at }
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${ message.content }
          </p>
          ${insertImage}
        </div>
      </div>
      `
    return html
  }
});
