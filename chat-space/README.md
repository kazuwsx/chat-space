## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|text|null: false, unique: true|
|email|string|null: false, unique: true|

### Association
- has_many :member
- has_many :message

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false, unique: true|

### Association
- has_many :member
- has_many :message

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesrテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
