## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false, index: true, unique: true|



### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false, unique: true|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
