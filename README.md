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
- `Messages (collection)`:
    - `id (string)`
    - `message (string)`
    - `user_ref (@ref Users)`
    - `fake_ref (@ref Users.Fakes)`
    - `timestamp (date)`
    - `Replies (collection)`:
        - `id (string)`
        - `message (string)`
        - `user_ref (@ref Users)`
        - `fake_ref (@ref Users.Fakes)`
        - `timestamp (date)`

### Managements Collection
- `id (string)`
- `name (string)`
- `Buildings (collection)`:
   - `id (string)`
   - `name (string)`
   - `address (string)`
   - `Units (collection)`:
       - `name (string)`
       - `Occupants (collection)`:
           - `id (string)`
           - `user_ref (@ref Users)`
    
### Subscription Codes Collection
- `id (string)`
- `management_ref (@ref Managements)`
- `slot (integer)`
- `unit_ref (@ref Buildings.Units)`
