const ioServer = require("socket.io");
const RTCMultiConnectionServer = require("rtcmulticonnection-server");
const fs = require('fs');
const path = require("path");
const server = require("http");
const cors = require("cors");
const express = require("express");

let app = express();
app.use(cors());
app.options('*', cors());

let port = 443;
let isUseHTTPs = true;

/*if ( app.get('env') === 'development' ) {
  port = 9003;
  isUseHTTPs = false;
}*/

//quando for pro server, descomentar abaixo.
app.use(express.static(path.join(__dirname, '../build')));

const jsonPath = {
  config: "./server/config.json",
  logs: "logs.json"
};

const BASH_COLORS_HELPER = RTCMultiConnectionServer.BASH_COLORS_HELPER;
const getValuesFromConfigJson =
  RTCMultiConnectionServer.getValuesFromConfigJson;
const getBashParameters = RTCMultiConnectionServer.getBashParameters;

var config = getValuesFromConfigJson(jsonPath);
config = getBashParameters(config, BASH_COLORS_HELPER);


var httpServer;

if (isUseHTTPs) {
  httpServer = require("https");

  var options = {
    key: null,
    cert: null,
    ca: null
  };

  var pfx = false;

  if (!fs.existsSync(config.sslKey)) {
    console.log(
      BASH_COLORS_HELPER.getRedFG(),
      "sslKey:\t " + config.sslKey + " does not exist."
    );
  } else {
    pfx = config.sslKey.indexOf(".pfx") !== -1;
    options.key = fs.readFileSync(config.sslKey);
  }

  if (!fs.existsSync(config.sslCert)) {
    console.log(
      BASH_COLORS_HELPER.getRedFG(),
      "sslCert:\t " + config.sslCert + " does not exist."
    );
  } else {
    options.cert = fs.readFileSync(config.sslCert);
  }

  if (config.sslCabundle) {
    if (!fs.existsSync(config.sslCabundle)) {
      console.log(
        BASH_COLORS_HELPER.getRedFG(),
        "sslCabundle:\t " + config.sslCabundle + " does not exist."
      );
    }

    options.ca = fs.readFileSync(config.sslCabundle);
  }

  if (pfx === true) {
    options = {
      pfx: sslKey
    };
  }

  httpServer = httpServer.createServer(options, app);
} else {
  httpServer = server.createServer(app);
}

httpServer.listen(port, process.env.IP || "0.0.0.0", function() {
  console.log("Server is running on port " + port);
});

ioServer(httpServer).on("connection", function(socket) {
  RTCMultiConnectionServer.addSocket(socket, { config });

  const params = socket.handshake.query;

  if (!params.socketCustomEvent) {
    params.socketCustomEvent = "custom-message";
  }

  socket.on(params.socketCustomEvent, function(message) {
    socket.broadcast.emit(params.socketCustomEvent, message);
  });
});
