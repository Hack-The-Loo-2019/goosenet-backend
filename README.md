# goosenet-backend

## Database
### Users Collection
- `id (string)`
- `name (string)`
- `email (string)`
- `avatar (string)`
- `Friends (collection)`:
    - `id (string)`
- `Fakes (collection)`:
    - `name (string)`
    - `created_at (date)`
    
### Messages Collection
- `id (string)`
- `message (string)`
- `chatroom_ref (@ref Chatrooms)`
- `user_ref (@ref Users)`
- `fake_ref (@ref Users.Fakes)`
- `message_ref (@ref Messages)`: If null, this message is of depth 0. If not null, this message is of depth 1 (a reply).
- `timestamp (date)`

### Announcements Collection
- `id (string)`
- `title (string)`
- `content (string)`
- `user_ref (@ref Users)`
- `chatroom_ref (@ref Chatrooms.)`
- `timestamp (date)`
- `Replies (collection)`:
    - `id (string)`
    - `message (string)`
    - `user_ref (@ref Users)`
    - `timestamp (date)`

### Chatrooms Collection
- `id (string)`
- `unit_refs ([@ref Buildings.Units])`
- `building_refs ([@ref Buildings])`
- `user_refs ([@ref Users])`

### Buildings Collection
- `id (string)`
- `address (string)`
- `Units (collection)`:
    - `name (string)`
    - `user_ref (@ref Users)`
