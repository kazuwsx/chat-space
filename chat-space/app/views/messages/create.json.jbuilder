json.ignore_nil!
json.content  @message.content
json.image_tag @message.image.url
json.created_at  @message.created_at
json.user_name  @message.user.name
