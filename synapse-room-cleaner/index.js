document.addEventListener('alpine:init', () => {
    Alpine.data('room_data', () => ({
        
        message: '',
        server: localStorage.getItem('server') || '', 
        token: localStorage.getItem('token') || '', 
        total_rooms: 0,
        rooms: [],
        
        get_rooms() {
            if (!this.server) {
                this.message = 'Homeserver URL is required';
                return;
            }
            if (!this.token) {
                this.message = 'Access token is required';
                return;
            }
            fetch(this.server + '/_synapse/admin/v1/rooms', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error) {
                    this.message = 'Error getting a list of rooms: ' + responseJson.error;
                } else {
                    this.total_rooms = responseJson.total_rooms;
                    this.rooms = responseJson.rooms;
                }
            })
            .catch((errorText) => {
                this.message = 'Error getting a list of rooms: ' + errorText;
            });
        },

        get_room_members(room_id) {
            fetch(this.server + '/_synapse/admin/v1/rooms/' + room_id + '/members', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error) {
                    this.message = responseJson.error;
                } else {
                    this.rooms.find(room => room.room_id == room_id).members = responseJson.members;
                }
            })
            .catch((errorText) => {
                this.message = 'Error getting a list of members for room ' + room_id + ': ' + errorText;
            });
        },

        delete_room(room_id, force) {
            fetch(this.server + '/_synapse/admin/v1/rooms/' + room_id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'purge': true,
                    'force_purge': (force === true)
                })
            })
            .then((response) => response.json())
            .then((responseJson) => { 
                if (responseJson.error)
                {
                    this.message = 'Error deleting room ' + room_id + ': ' + responseJson.error + '. You can try to force delete.';
                    this.rooms.find(room => room.room_id == room_id).force_delete = true;    
                }
                else
                {
                    this.rooms.find(room => room.room_id == room_id).deleted = true;
                }
            })
            .catch((errorText) => {
                this.message = 'Error deleting room ' + room_id + ': ' + errorText;
            });
        }
    }));
});
