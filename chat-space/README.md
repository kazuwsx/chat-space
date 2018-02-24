## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|text|null: false, unique: true|
|email|string|null: false, unique: true|

### Association
- has_many :groups, throuth: members
- has_many :members
- has_many :messages

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false, unique: true|

### Association
- has_many :users, throuth: :members
- has_many :members
- has_many :messages
- accepts_nested_attributes_for :members

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
