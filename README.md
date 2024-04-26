# Synapse Room Cleaner

Simple web tool for your Matrix Synapse server that allows you to:
- List rooms
- List local room members
- Delete rooms

### April 2024 update:

- Code was rewritten in vanilla JavaScript and does not require any libraries
- Single HTML page with less than 500 lines
- Stylesheet updated to follow the look of Element menus

## How-To

### One-Time Setup

Matrix Synapse requires a user to be designated as a server admin, so [set up an admin user and get their access token](https://matrix-org.github.io/synapse/latest/usage/administration/admin_api/index.html#authenticate-as-a-server-admin).

Then, enable access to your server's [administration endpoints](https://matrix-org.github.io/synapse/latest/reverse_proxy.html#synapse-administration-endpoints). This is potentially unsafe.

### Run the Tool

[Synapse Room Cleaner hosted on GitHub Pages](https://yaky-dev.github.io/synapse-room-cleaner/)

[Synapse Room Cleaner hosted on yaky.dev](https://yaky.dev/apps/synapse-room-cleaner/)

Host it yourself

Download the [page](https://raw.githubusercontent.com/yaky-dev/synapse-room-cleaner/main/index.html) and open it from your disk.

### Credentials

Enter your homeserver address and admin access token.

For convenience, you can click **Save** to save the entered credentials to your browser's Local Storage. Once saved, credentials will be automatically set next time you open the page. **Clear** clears credential from inputs and local storage.

### Rooms

Click **List Rooms** to retrieve a list of rooms. Optionally, enter text in **Search by name** before clicking **List Rooms** to list rooms only with specified text in their name.

Rooms are queried and displayed in batches of 10 at a time. Use **Next** and **Prev** buttons to navigate the table. Click **List Rooms** again to go to the first batch.

The rooms table displays:
- An internal room ID
- Room name (expected to be blank for 1-on-1 rooms)
- Whether the room is encrypted
- Creator of the room
- Total member count (includes users from other servers)
- Local member count (only users who have an an account on your server)
- Local member list (has to be queried separately for each room)

Click **Get Members** to query the _local_ users (i.e. users with an account on your server) that are members of that room. Due to how federation works, if a user on your server joins a large room on another server, it is expected that another server's room is duplicated on your server, but has only one _local_ user.

Click **Delete** to attempt to delete a room. By default, the delete request runs with a _purge_ flag, which removes all traces of the room from the database. This removes messages, but not the uploaded media. 

If the initial delete attempt fails for any reason, the tool will allow you to _force purge_ the problematic room. This will delete the room, but might cause client issues for users that are still in that room. 

## Known issues

Local storage has [undefined behavior when running locally](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage#description). It appears to work fine in Firefox, though.

## Source and privacy

Synapse Room Cleaner is a single HTML page, less than 500 lines of uncompressed and readable code. It runs in the browser and only communicates to the Admin API of the specified homeserver, using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). Server credentials can be optionally saved to local storage, which resides on your machine.

## Why though?

My Synapse server is small, but after joining and leaving several large rooms, using bridges, and converting my database from SQLite3 to Postgresql, there were some broken and empty rooms. Some rooms appeared in my Element client, but I could not leave them. Some rooms showed up as empty in other clients. Some rooms just existed on the server, but had no members.
