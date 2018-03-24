$(function() {

  function appendUser(user) {
    var search_list = $("#user-search-result");
    var html =
    `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${ user.name }</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
    </div>
    `
    search_list.append(html);
  }

  $("#user-search-field").on("input", function() {
    var input = $(".chat-group-form__input").val()
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      users.forEach(function(user){
        $(".chat-group-check__field--left").empty();
        $(".chat-group-check__field--right").empty();
        appendUser(user);
      })
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});
