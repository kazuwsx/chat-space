json.messages @messages.each do |message|
  json.id         message.id
  json.user_name  message.user.name
  json.created_time message.created_at.strftime("%Y-%m-%d %H:%M:%S")
  json.content    message.content
  json.image      message.image.url
end
