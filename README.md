# goosenet-backend

## Database
### Users Collection
- `id (string)`
- `name (string)`
- `email (string)`
- `Friends (collection)`:
    - `id (string)`
- `Fakes (collection)`:
    - `name (string)`
    - `avatar (string)`
    
### Messages Collection
- `id (string)`
- `message (string)`
- `chatroom_ref (Chatrooms.id)`
- `user_ref (Users.id)`
- `message_ref (Messages.id)`: If null, this message is of depth 0. If not null, this message is of depth 1 (a reply).
- `timestamp (date)`

### Announcements Collection
- `id (string)`
- `title (string)`
- `content (string)`
- `user_ref (Users.id)`
- `chatroom_ref (Chatrooms.id)`
- `timestamp (date)`
- `Replies (collection)`:
    - `id (string)`
    - `message (string)`
    - `user_ref (Users.id)`
    - `timestamp (date)`

### Chatrooms Collection
- `id (string)`
- `unit_refs ([Buildings.Units.id])`
- `building_refs ([Buildings.id])`
- `user_refs ([Users.id])`

### Buildings Collection
- `id (string)`
- `address (string)`
- `Units (collection)`:
    - `name (string)`
    - `user_ref (Users.id)`
