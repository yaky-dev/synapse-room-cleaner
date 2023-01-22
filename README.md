# Synapse Room Cleaner

Simple web tool for your Matrix Synapse server that allows you to:
- List rooms
- List room members
- Delete rooms

To use this tool, you need to [set yourself up as admin and get the access token](https://matrix-org.github.io/synapse/latest/usage/administration/admin_api/index.html#authenticate-as-a-server-admin), and your server's Admin API has to be accessible, [which is a risk](https://matrix-org.github.io/synapse/latest/reverse_proxy.html#synapse-administration-endpoints).


## How to use

- Open [Synapse Room Cleaner hosted on yaky.dev](https://yaky.dev/apps/synapse-room-cleaner)
- Enter your homeserver address and your admin access token
- Click "List Rooms". If your homeserver is reachable and your access token is valid, you will get a table containing a list of all rooms on your server.

For each room:
- Click "List Members" to get a list of _local_ users who have joined that room
- Click "Delete" to delete that room (uses the default "purge" option which deletes the room from the database)


## Running locally

You don't trust some guy named Yaky with your homeserver and access token, I get it. Or you don't expose your homeserver's API to the web, because you are a careful person.

You can run the tool locally by cloning or downloading the source and opening `synapse-room-cleaner/index.html` in your browser. 


## Privacy

This tool runs in your browser, and only communicates to the Admin API of the homeserver that you specify. All API calls use JavaScript's Fetch API and are issued from `index.js`, which is in its original, readable form.

Homeserver address and admin access token are saved to local storage for convenience. To remove them from local storage, simply set them back to blank. 

Synapse Room Cleaner uses [Alpine.js](https://alpinejs.dev/) v3 framework for its UI, but instead of relying on a CDN (i.e. making unnecessary calls), a minified version (`alpine.min.js`) is included with this tool.


## Why though?

My Synapse server is small, but after joining and leaving several large rooms, using bridges, and converting my database from SQLite3 to Postgresql, there are some broken and orphaned rooms. Some of them just appear in my Element client, but I cannot leave them. Some simply exist and have not been cleaned up for some reason. At least one of these rooms is causing issues when trying to connect to Matrix using Chatty on PinePhone.