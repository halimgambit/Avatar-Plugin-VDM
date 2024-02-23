exports.action = function(data, callback){

	let client = setClient(data);
	info("VDM from:", data.client, "To:", client);
	vdm (data, client);
	callback();
 
}


function vdm (data, client) {

	fetch('https://blague.xyz/api/vdm/random')
	.then(response => {
	if (response.status !== 200) {
	throw new Error(`La connexion à échoué, code erreur: ${response.status}`);
	}
	return response.json();
	})
	.then(response2 => {
	Avatar.speak(`${response2.vdm.content} VDM`, data.client, () => { 
	Avatar.Speech.end(data.client);
	});
    })
	.catch(err => {
	Avatar.speak(`Je n'arrive pas accéder au site de vdm, ${err.message}`, data.client, () => { 
	Avatar.Speech.end(data.client);
	});
	});

}

function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}
