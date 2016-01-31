var Bot = require(__dirname + "/../");
(function test() {
	var talk = "I talked at " + new Date().getTime();
	var bot = new Bot({
		key : "FPYK3r6_h1QU0xCkYQBmxSIpblbfqG2Pdzv4EVPcUy5-uqqvuq5ogBAg81qbqPF1",// only
		// local
		host : "http://localhost:3030",
	});
	bot.on("connect", function() {
		console.log("connected");
	});
	bot.on("disconnect", function() {
		console.log("disconnect");
	});
	bot.on("authorized", function(data) {
		console.log("authorized " + data);
		bot.sendMessage(talk);
	});
	bot.on("event", function(data) {
		console.log("event " + JSON.stringify(data));
	});
	bot.on("message", function(message) {
		console.log("message " + JSON.stringify(message));
		if (message.body == talk) {
			bot.disconnect();
			console.log("test is ok");
		}
	});
})();