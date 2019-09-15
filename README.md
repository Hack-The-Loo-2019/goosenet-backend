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


### Chatrooms Collection
- `id (string)`
- `Units (collection)`:
    - `id (string)`
    - `unit_ref (@ref Managements.Buildings.Units)`
- `Members (collections)`:
    - `id (string)`
    - `member_ref (@ref Users)`
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
- `Announcements (collection)`:
    - `id (string)`
    - `title (string)`
    - `content (string)`
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
           - `id (string)`: Same as user id.
    
### Subscription Codes Collection
- `id (string)`
- `management_ref (@ref Managements)`
- `slot (integer)`
- `unit_ref (@ref Buildings.Units)`
