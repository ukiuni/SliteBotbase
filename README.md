# Botbase - bot module for [Slite](https://slite.ukiuni.com) -
Botbase is a bot module for [Slite](https://slite.ukiuni.com) a chat system.

# Usage
```
var Bot = require("botbase");
var bot = new Bot({
	key : "FPYK3r6_h1QU0xCkYQBmxSIpblbfqG2Pdzv4EVPcUy5-uqqvuq5ogBAg81qbqPF1"
});
bot.on("message", function(message){
	console.log("message. => " + message.body + " from " + owner.name);
})
bot.sendMessage("*OK* I'm awesome.")
```
# Api
* constructor(parameters)
 * parameters.key bot's key. create at [Slite](https://slite.ukiuni.com) message view. required.
 * parameters.host connect host. default is https://slite.ukiuni.com. option.
* sendMessage(body) send message to channel. 
 * body Message to be send. Can be Markdown.
* disconnect() disconnect from server. Call before exit node app.

# event
bot emits event. receive event with "on" function like bot.on("message", listenerFunc)
* message on receive message. receive object like below
```
{"id":1024,"body":"I talked at 1454245656977","ownerId":1,"BotId":20,"channelId":31,"accessKey":"XcutbtApmwnz9m-23dqL2zDSKMtfx3YVZDezJroBUeMj-H_8pP2ouoPpKInIrgKG","type":"markdown","updatedAt":"2016-01-31T13:07:37.059Z","createdAt":"2016-01-31T13:07:37.059Z","owner":{"id":1,"name":"peek","iconUrl":"http://localhost:3030/api/image/IpVvyQlinLnitpFDBPnzLzh4-nzczSuAeuhhozspYK1v-608EIbWcbwaIg_4iQZv"},"Bot":{"id":20,"name":"api","iconUrl":"/images/bot.png"}}
```
* connect on connnect.
* disconnect on disconnect.
* error on error.
* event on event. Kind of event is "message", "join", "reave",  "startTalking", "stopTalking" and "hello". Get kind with "type" parameter of receive object. if you want recieve message only, Use message event.


# License
Apache License Version 2.0
