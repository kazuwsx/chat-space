$(document).on('turbolinks:load', function() {
  //readyイベントの省略形・readyイベント--HTMLの読み込みが完了したらjQueryによる操作を開始
  $(function() {
    function appendUser(user) {
      //search-resultのDOM要素を変数に代入
      var search_list = $("#user-search-result");
      //追加したいhtmlの記述
      var html =
      `
      <div class="chat-group-user chat-group-user-${ user.id } clearfix">
        <p class="chat-group-user__name">${ user.name }</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
      </div>
      `
      search_list.append(html);
    }
    //keyupにより文字打ち込みが終わったら処理
    $("#user-search-field.chat-group-form__input").on("keyup", function() {
      //valメソッド--HTMLタグに入力、選択されている値を取得できる
      var input = $("#user-search-field").val()
      //ajax通信の設定
      $.ajax({
        //httpメソッドの設定
        type: 'GET',
        //urlの設定
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        //フォームの中身を削除
        $(".chat-group-form__field-right").remove();
        users.forEach(function(user){
          appendUser(user);
        })
      })

      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });
  });

  $(function() {
    var member_list = $("#chat-group-users")

    function appendMember(id, name) {
      var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                    <input name='group[user_ids][]' type='hidden' value='${id}'>
                    <p class='chat-group-user__name'>${ name }</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${ id }">削除</a>
                  </div>`
      member_list.append(html);
    }

    $(document).on('click', 'a.chat-group-user__btn--add', function() {
      //data()で引数に指定したidを取得
      var user_id = $(this).data("user-id");
      var user_name = $(this).data("user-name");
      //.remove()マッチしている自身の要素と子要素を含めて削除
        $("#user-search-result .chat-group-user-" + user_id).remove();
        appendMember(user_id, user_name);
    });
  })

  $(function() {
    $(document).on('click', 'a.chat-group-user__btn--remove', function() {
      var user_id = $(this).data("user-id");
      $("#chat-group-user-" + user_id).remove();
    });
  });
});
