exports.action = function(data, callback){

	let client = setClient(data);
	info("VDM from:", data.client, "To:", client);
	vdm (data, client);
	callback();
 
}

function vdm (data, client) {
	
	fetch('https://blague.xyz/api/vdm/random')
	.then(response => response.json())
	.then(response2 => {
	console.log(response2.vdm.content)
	Avatar.speak(response2.vdm.content, data.client, function(){
	Avatar.Speech.end(data.client);
	});
	})
	.catch(function (err) {
	console.warn('Je n\'arrive pas accéder au site.', err);
	Avatar.speak('Je n\'arrive pas accéder au site.', data.client, function(){
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
