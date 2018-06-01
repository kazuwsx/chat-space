//DOMツリーの構築が完了したら実行される。
$(document).on('turbolinks:load', function() {

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

    function autoScroll () {
      //$(".messages")[0]で最新のメッセージを指定し、scrollHeightで要素までの高さを取得
      var scrollTarget = $('.messages')[0].scrollHeight;
      //.animate({scrollTop: スクロールしたいターゲット}, アニメーションの時間)
      $('.messages').animate({scrollTop: scrollTarget}, 'fast');
    }

    $('#new_message').on('submit', function(e) {
      //preventDefault()を使用してデフォルトのイベントを止めます。
      e.preventDefault();
      //FormDataオブジェクトに、指定したform要素内のフォームデータが取得
      var formData = new FormData(this);
      //attrメソッド->指定した属性の値を取得。
      var url = $('.new_message').attr('action')
      //.ajaxについて->https://www.sria.co.jp/blog/2014/10/lets-use-ajax-part-1-try-it-with-ajax-and-json/
      //ここでサーバーに対しての通信を行う。情報の指定（ここではdataに格納）、送信先、データの型（Json）等を記述
      $.ajax({
        //urlにはリクエストを送信する先のURLを指定
        url: url,
        //typeにはHTTP通信の種類を指定 get/post
        type: "POST",
        //dataには、フォームデータを指定
        data: formData,
        //dataTypeには、サーバから返されるデータの型を指定 xml/html/json/jsonp
        dataType: 'json',
        //processData・・dataに指定したオブジェクトをクエリ文字列に変換するかどうかを設定。
        //初期値はtrue。DOMDocumentそのものなど、他の形式でデータを送るために自動変換を行いたくない場合はfalseを指定
        processData: false,
        contentType: false,
      })

      //非同期通信の結果として返ってくるデータは、done(function(data) { 処理 })の関数の引数で受け取る
      .done(function(data){
        var html = buildHTML(data);
        //append・・指定した子要素の最後にテキスト文字やHTML要素を追加することができるメソッド
        $('.messages').append(html);
        //自動スクロール関数の呼び出し
        autoScroll();
        //フォームの中身を空にする
        $('.form__message').val('');
        //disabled(使用禁止)プロパティにfalseを与える
        $(".form__submit").prop("disabled", false);
      })
      //ajax処理の失敗
      .fail(function() {
        alert('投稿に失敗しました');
      })
    });

    //--------------------------------------自動更新機能-----------------------------------------------------

    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      setInterval( autoUpdate, 1000);
      $(function() {
        autoScroll();
      });
    }

    function autoUpdate() {
      colorChangeEvent();
      var href = location.href
      $.ajax({
        url: href,
        dataType:'json',
        type:'GET'
      })
      //.done(function(json){})でjbuilderから受け取ったデータを引数dataで使用
      .done(function(data) {
        //メッセージを複数入れるための変数。空の状態で定義。
        var insertHTML = '';
        //表示中のメッセージのうち最新のidを取得
        var id = $('.message:last').data('id');
        //jsonで定義したjson.messagesをひとつひとつforEachで処理
        data.messages.forEach(function(message) {
          if (message.id > id ) {
            var html = newMessageHTML(message);
            $('.messages').append(html);
            autoScroll();
          }
        });
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    }

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
              ${ message.created_time }
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
});
