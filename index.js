var io = require("socket.io-client");
var Promise = require("bluebird");
var fs = require("fs");
var request = require("request");
var EventEmitter = require("events").EventEmitter;
var sendMessage = function(body, params) {
	return new Promise(function(success, fail) {
		request.post({
			url : params.host + "/api/bots/messages",
			form : {
				key : params.key,
				body : body
			}
		}, function(err, httpResponse, body) {
			if (err) {
				fail(err)
			} else {
				httpResponse.data = body;
				if (httpResponse.statusCode > 300) {
					fail(httpResponse)
				} else {
					success(JSON.parse(body));
				}
			}
		})
	})
}
if (require.main === module) {
	var program = require('commander');
	program.version(require("./package.json").version).option('-b, --body <body>', 'Message body').option('-K, --botKey <key>', 'Bot Key').option('-H, --host [host]', 'Access host').parse(process.argv);
	if (!program.body || !program.botKey) {
		console.error('Oops! one or some parameter are lacking.');
		program.help();
		process.exit(1);
	}
	sendMessage(program.body, {
		key : program.botKey,
		host : program.host || "https://slite.ukiuni.com"
	});
} else {
	var forExport = function(params) {
		var self = this;
		params = params || {};
		try {
			params.key = params.key || process.env.KEY || fs.readSync(fs.readFileSync((process.env.HOME || process.env.USERPROFILE) + "/.botbase/key"));
		} catch (ignored) {
		}
		params.host = params.host || "https://slite.ukiuni.com";
		var socket = io(params.host);
		socket.on("connect", function() {
			self.emit("connect");
			if (params.key) {
				self.autorize(params.key);
			}
		});
		socket.on("disconnect", function() {
			self.emit("disconnect");
		});
		socket.on("error", function(error) {
			self.emit("error", error)
		});
		socket.on("authorizedAsBot", function(response) {
			self.channel = JSON.parse(response).channel
			socket.on(self.channel.accessKey, function(data) {
				var event = JSON.parse(data);
				self.emit("event", event);
				if ("message" == event.type) {
					self.emit("message", event.message);
				}
			});
			self.emit("authorized", response);
			self.isAuthorized = true;
		});
		self.isAuthorized = false;
		self.autorize = function(key) {
			socket.emit("authorizeAsBot", key);
		}
		self.listenChannel = function(channelAccessKey, listener) {
			socket.on(channelAccessKey, listener);
		}
		self.sendMessage = function(body) {
			sendMessage(body, params);
		};
		self.disconnect = function() {
			socket.disconnect();
		};
	}
	forExport.prototype = Object.create(EventEmitter.prototype);
	module.exports = forExport;
}