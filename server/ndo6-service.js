/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
const fs = __webpack_require__(12);
const path = __webpack_require__(7);
const _ = __webpack_require__(1);
const _is_release = typeof __webpack_require__ === "function";
const root = path.normalize(__dirname + (_is_release ? '/..' : '/../../..'));
const locals_path = path.join(root, 'local.env.js');
const u = __webpack_require__(8);
const locals = fs.existsSync(locals_path) ? u.use(locals_path) : {};

_.extend(process.env, locals);

function _checkValues(s) {
  s.port = parseInt(s.port||6001);
  s.tokenExpiration = parseInt(s.tokenExpiration||5);
}

// Export the config object
// ==============================================
const settings = {
  env: 'development',
  // Root path of server
  root: root,
  // Server ip
  ip:   process.env.NDO6_IP ||
        process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        undefined,
  // Server port
  port: process.env.NDO6_PORT ||
        process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        6001,
  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'ndo6-secret'
  },
  // debug mode
  debug: process.env.NDO6_DEBUG_ACTIVE === 'true',
  // Log options
  log: {
    // Enabled log on file (server-side)
    file: true
  },
  google: {
    key: 'AIzaSyBHW4T8X_iF8xsEwpkMZU4DZI0HMuLcH9M'
  },
  // Path del server
  serverPath: path.normalize(__dirname + '/../..'),
  // Path del client
  clientPath: '',
  // Token expires in minutes
  tokenExpiration: 10,
  // MongoDB connection options
  mongo: {
    uri:  process.env.MONGODB_URI ||
          process.env.MONGOHQ_URL ||
          process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
          'mongodb://localhost/ndo6',
    options: {}
  }
};

// check values
_checkValues(settings);


module.exports = settings;

/* WEBPACK VAR INJECTION */}.call(exports, "server\\config\\environment"))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mongoose = __webpack_require__(4);
const Schema = mongoose.Schema;
const crypto = __webpack_require__(14);
const _ = __webpack_require__(1);

function _notBlankValidator(v) {
  return !!(v || '').length;
}

var ViewSchemaElement = new Schema({
  owner: String,
  name: String,
  type: String,
  content: Schema.Types.Mixed
});

var ViewSchemaPosition = new Schema({
  owner: String,
  latitude: Number,
  longitude: Number,
  timestamp: Number
});

var ViewSchemaMessage = new Schema({
  owner: String,
  text: String,
  icon: String
});

var ViewSchema = new Schema({
  name: {
    type: String,
    validate: {
      isAsync: true,
      validator: function(v, cb) {
        var self = this;
        self.constructor.findOne({name: v}, function(err, view) {
          if(err) throw err;
          if(view) {
            if(self.id === view.id) return cb(true);
            return cb(false);
          }
          cb(true);
        });
      },
      message: 'The specified name is already in use.'
    },
    required: [true, 'Map name cannot be blank']
  },
  owner: {
    type: String,
    validate: {
      validator: _notBlankValidator,
      message: 'Owner cannot be blank'
    },
    required: [true, 'Owner cannot be blank']
  },
  center: String,
  hashedPassword: {
    type: String,
    validate: {
      validator: _notBlankValidator,
      message: 'Password cannot be blank'
    }
  },
  salt: String,
  elements: [ViewSchemaElement],
  positions: [ViewSchemaPosition],
  messages: [ViewSchemaMessage]
}, { versionKey: false });

/**
 * Virtuals
 */
ViewSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });


// Non-sensitive info we'll be putting in the token
ViewSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id
    };
  });

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
ViewSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword)) {
      next(new Error('Invalid password'));
    } else {
      next();
    }
  });

/**
 * Methods
 */
ViewSchema.method({
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
  }
});

module.exports = mongoose.model('View', ViewSchema);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const _ = __webpack_require__(1);
const config = __webpack_require__(0);
const jwt = __webpack_require__(32);
const expressJwt = __webpack_require__(33);
const compose = __webpack_require__(34);
const View = __webpack_require__(2);
const validateJwt = expressJwt({ secret: config.secrets.session });


function _owner(req, res, next) {
  req.owner = (req.body||{}).owner || (req.params||{}).owner;
  next();
}

function _view(req, res, next) {
  View.findOne({_id:(req.user||{}).id}, function (err, view) {
    if (err) {return next(err);}
    if (!view) {return res.send(404);}
    req.view = view;
    next();
  });
}

function owner() {
  return compose()
    // Attach owner to request
    .use(_owner);
}

function isOnView() {
  return compose()
    // Attach owner to request
    .use(_owner)
    // Validate jwt
    .use(validateJwt)
    // Attach view to request
    .use(_view);
}


/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, owner) {
  return jwt.sign({ id: id, owner: owner }, config.secrets.session, { expiresIn: 60*(config.tokenExpiration||10) });
}

exports.signToken = signToken;
exports.owner = owner;
exports.isOnView = isOnView;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const _use =  true ? require : require;
exports.use = _use;
exports.noop = function() {};
exports.random = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _handler=  null;
const _events = {
  onPosition: function(view, pos) {
    if (!_handler) return console.warn('NOT registered events (%s)', pos);
    _handler.emit(view, 'position', pos);
    console.log('SOCKET EMIT view position', pos);
  },
  onElement: function(view, ele) {
    if (!_handler) return console.warn('NOT registered events (%s)', ele);
    _handler.emit(view, 'element', ele);
    console.log('SOCKET EMIT view element', ele);
  },
  onRemoveElement: function(view, ele) {
    if (!_handler) return console.warn('NOT registered events (%s)', ele);
    _handler.emit(view, 'element.remove', ele);
    console.log('SOCKET EMIT remove view element', ele);
  },
  onMessage: function(view, msg) {
    if (!_handler) return console.warn('NOT registered events (%s)', msg);
    _handler.emit(view, 'message', msg);
    console.log('SOCKET EMIT view message', msg);
  }
};

exports.events = _events;

exports.register = function(handler) {
  _handler = handler;
  console.log('NDO6 socket ready');
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const View = __webpack_require__(2);
const config = __webpack_require__(0);
const u = __webpack_require__(8);
const auth = __webpack_require__(6);
const socket = __webpack_require__(9);
const _ = __webpack_require__(1);
const version = __webpack_require__(35);

function _validationError(res, err) {
  return res.json(422, err);
}

function _validate(req, res) {
  if (!req.owner) return res.send(500, 'Undefined owner');
  if (!req.view) return res.send(500, 'Undefined view');
  return true;
}

/**
 * Get list of views
 */
exports.index = function(req, res) {
  View.find({}, '_id name', function (err, views) {
    if(err) return res.send(500, err);
    res.json(200, views);
  });
};

/**
 * Get info
 */
exports.info = function(req, res) {
  const info = _.clone(version.infos);
  info.googleKey = config.google.key;
  info.debug = !!config.debug;
  res.json(200, info);
};


/**
 * Creates a new view
 */
exports.create = function (req, res, next) {
  if (!req.owner) return res.send(500, 'Undefined owner');
  const newView = new View(req.body);
  newView.elements = newView.elements || [];
  newView.owner = req.owner;
  console.log('Nuova view: ', newView);

  newView.save(function(err, view) {
    if (err) return _validationError(res, err);
    const token = auth.signToken(view._id, req.owner);
    res.json({ token: token });
  });
};

/**
 * Get a single view
 */
exports.show = function (req, res, next) {
  if (!req.params.id) return res.send(500, 'Undefined view identity');
  View.findById(req.params.id, function (err, view) {
    if (err) return next(err);
    if (!view) return res.send(401);
    res.json(view.name);
  });
};

/**
 * Deletes a view
 */
exports.destroy = function(req, res) {
  if (!_validate(req, res)) return;
  View.findById(req.view._id, function (err, view) {
    if (view.owner !== req.owner) return res.send(403);
    view.remove(function (err) {
      if (err) return res.send(500, err);
      return res.send(204);
    });
  });
};

/**
 * Change a view password
 */
exports.changePassword = function(req, res, next) {
  if (!_validate(req, res)) return;
  const viewId = req.view._id;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);
  if (!oldPass) return res.send(500, 'Undefined old password');
  if (!newPass) return res.send(500, 'Undefined new password');

  View.findById(viewId, function (err, view) {
    if (view.owner !== req.owner) return res.send(403);
    if(view.authenticate(oldPass)) {
      view.password = newPass;
      view.save(function(err) {
        if (err) return _validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get current view info
 */
exports.view = function(req, res, next) {
  View.findOne({
    _id: req.view._id
  }, '-salt -hashedPassword', function(err, view) {
    if (err) return next(err);
    if (!view) return res.json(401);
    res.json(view);
  });
};


function _setPosition(view, pos, cb) {
  view.positions.push(pos);
  view.save(function(err){
    if (err) return cb(err);
    socket.events.onPosition(view, pos);
    cb(null, pos);
  });
}
exports.setPosition = _setPosition;


function _update(req, res, obj, smethod) {
  req.view.save(function(err){
    if (err) return res.send(500, err);
    res.send(200, obj);
    socket.events[smethod](req.view, obj);
  });
}

/**
 * Insert position
 */
exports.position = function(req, res) {
  if (!_validate(req, res)) return;
  const p = req.body;
  if (!p || !p.latitude || !p.longitude || !p.timestamp) {
    console.error('Invalid position:', p);
    return res.send(500, 'Undefined position');
  }
  const pos = {
    owner: req.owner,
    latitude: p.latitude,
    longitude: p.longitude,
    timestamp: p.timestamp
  };
  _setPosition(req.view, pos, function(err, p){
    if (err) return res.send(500, err);
    res.send(200, p);
  });
};

/**
 * Gets the list of positions for view
 */
exports.positions = function(req, res) {
  if (!_validate(req, res)) return;
  res.json(200, req.view.positions);
};

/**
 * Insert element
 */
exports.element = function(req, res) {
  if (!_validate(req, res)) return;
  const e = req.body;
  if (!e || !e.name || !e.type || !e.content) return res.send(500, 'Undefined element');
  const x = _.find(req.view.elements, function(xe) {
    return xe.name === e.name && xe.type === e.type;
  });
  if (x) return res.send(500, 'Element already exists!');
  const ele = {
    owner: req.owner,
    name: e.name,
    type: e.type,
    content: e.content
  };
  req.view.elements.push(ele);
  _update(req, res, ele, 'onElement');
};

/**
 * Gets the list of elements for view
 */
exports.elements = function(req, res) {
  if (!_validate(req, res)) return;
  res.json(200, req.view.elements);
};

/**
 * Remove an element
 */
exports.removeElement = function(req, res) {
  if (!_validate(req, res)) return;
  const e = req.body;
  if (!e || !e.name || !e.type) return res.send(500, 'Unrecognized element');
  const removed = _.remove(req.view.elements, function(xe){
    return xe.name === e.name && xe.type === e.type && (xe.owner === req.owner || req.view.owner === req.owner);
  });
  if (!(removed||[]).length) return res.send(500, 'Element not found or you cannot remove it!');
  _update(req, res, removed[0], 'onRemoveElement');
};

/**
 * Insert message
 */
exports.message = function(req, res) {
  if (!_validate(req, res)) return;
  const m = req.body;
  if (!m || !m.text) return res.send(500, 'Undefined mesage');
  const msg = {
    owner: req.owner,
    text: m.text,
    icon: m.icon||''
  };
  req.view.messages.push(msg);
  _update(req, res, msg, 'onMessage');
};

/**
 * Gets the list of messages for view
 */
exports.messages = function(req, res) {
  if (!_validate(req, res)) return;
  res.json(200, req.view.messages);
};



exports.test = function(req, res) {
  // inserisce una rilevazione casuale sulla mappa corrente
  if (!_validate(req, res)) return;
  const names = ['ugo','franco','gino'];
  const n = u.random(0,2);

  console.log('Random n=%s', n+'');
  const pos = {
    owner: names[n],
    latitude: 11.0 + Math.random(),
    longitude: 43.0 + Math.random(),
    timestamp: Date.now()
  };
  _setPosition(req.view, pos, function(err, p){
    if (err) return res.send(500, err);
    res.send(200, p);
  });
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log(' _  _ ___   ___   __\n'+
            '| \\| |   \\ / _ \\ / / \n'+
            '| .` | |) | (_) / _ \\\n'+
            '|_|\\_|___/ \\___/\\___/     by Leo\n');

console.log('-----------------------------------------------\nNDO6 starting...');
const express = __webpack_require__(3);
const mongoose = __webpack_require__(4);
const config = __webpack_require__(0);

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
// if(config.seedDB) { require('./config/seed'); }
if(process.env.NDO6_SEED === 'true') { __webpack_require__(13); }

// Setup server
const app = express();
const server = __webpack_require__(15).createServer(app);
const socketio = __webpack_require__(16)(server, {
  serveClient: (config.env !== 'production'),
  path: '/socket.io'
});

__webpack_require__(17)(socketio);
__webpack_require__(18)(app);
__webpack_require__(29)(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('NDO6 listening on %d\n-----------------------------------------------', config.port);
});

// Expose app
exports = module.exports = app;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const View = __webpack_require__(2);

View.find({}).remove(function() {
  console.log('finished clearing views.');
});

// View.find({}).remove(function() {
//   View.create({
//     name: 'Mappina',
//     owner: 'ciccio',
//     password: 'mappina'
//   }, {
//     name: 'Mappazza',
//     owner: 'zotta',
//     password: 'mappazza'
//   }, function () {
//     console.log('finished populating maps');
//   });
// });


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const _ = __webpack_require__(1);
const View = __webpack_require__(2);
const handler = {
  views: {},
  emit: function(view, verb, obj) {
    (this.views[view._id]||[]).forEach(function(s){
      s.emit(verb, obj);
    });
  },
  add: function(view, socket) {
    this.views[view._id] = this.views[view._id] || [];
    this.views[view._id].push(socket);
  },
  remove: function(socket) {
    _.keys(this.views) .forEach(function(v){
      _.remove(v, function(s){
        return s === socket;
      });
    });
  }
};

__webpack_require__(9).register(handler);

function _log(message) {
  const now = new Date();
  return {
    time: now,
    time_str: now.toLocaleTimeString(),
    type: 'info',
    message: message
  };
}

// When the user disconnects.. perform this
function onDisconnect(socket) {
  socket.emit('log', _log('"'+socket.address+'" leave ndo6!'));
  handler.remove(socket);
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s (by socket)', socket.address, JSON.stringify(data, null, 2));
  });
  socket.on('login', function(data){
    console.log('DEBUG >>>> SOCKET login data:', data);
    handler.remove(socket);
    const name = data.name||data.user||data.view;
    View.find({name: name}, function(err, view) {
      if (err) return console.error('[SOCKET.IO] view not found', socket.address);
      handler.add(view, socket);
    });
  });
  // require('../api/view/view.socket').register(clients);

  socket.emit('log', _log('Wellcome "'+socket.address+'" to ndo6!'));
}

module.exports = function (io) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  io.on('connection', function (socket) {
    const hs = socket.handshake.address||{};
    socket.address = hs.address ? hs.address + ':' + hs.port : hs;
    //console.log('handshake:', socket.handshake);

    socket.connectedAt = new Date();
    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[SOCKET.IO on %s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[SOCKET.IO on %s] CONNECTED', socket.address);
  });

  io.on('error', function (err) {
    console.error(err);
  });
};



/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const express = __webpack_require__(3);
const favicon = __webpack_require__(19);
const morgan = __webpack_require__(20);
const compression = __webpack_require__(21);
const bodyParser = __webpack_require__(22);
const methodOverride = __webpack_require__(23);
const cookieParser = __webpack_require__(24);
const errorHandler = __webpack_require__(25);
const path = __webpack_require__(7);
const config = __webpack_require__(0);
const client_path = config.clientPath||'client';
const passport = __webpack_require__(5);
const session = __webpack_require__(26);
const mongoStore = __webpack_require__(27)(session);
const mongoose = __webpack_require__(4);

var _counter = 0;

// CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

// LOG middleware
var serverLog = function(req, res, next) {
  _counter++;
  console.log('Echo-Service request n°%s [%s %s]',_counter, req.method, req.url);
  next();
};

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', path.join(config.serverPath, 'views'));
  app.engine('html', __webpack_require__(28).renderFile);
  app.set('view engine', 'html');
  app.use(compression());

  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

  app.use(methodOverride());
  app.use(allowCrossDomain);
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(serverLog);

  // Persist sessions with mongoStore
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  }));

  app.use(express.static(path.join(config.root, client_path)));
  app.set('appPath', client_path);

  app.use(morgan('dev'));
  app.use(errorHandler()); // Error handler - has to be last
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("errorhandler");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errors = __webpack_require__(30);

module.exports = function(app) {
  app.use('/api/view', __webpack_require__(31));
  app.use('/auth', __webpack_require__(36));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Error responses
 */



module.exports[404] = function pageNotFound(req, res) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  res.render(viewFilePath, function (err) {
    if (err) { return res.json(result, result.status); }

    res.render(viewFilePath);
  });
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(3);
var controller = __webpack_require__(10);
var auth = __webpack_require__(6);

var router = express.Router();

router.get('/', controller.index);
router.get('/info', controller.info);
// router.get('/positions/:owner', auth.isOnView(), controller.positions);
// router.get('/messages/:owner', auth.isOnView(), controller.messages);
// router.get('/elements/:owner', auth.isOnView(), controller.elements);

router.post('/', auth.isOnView(), controller.view);
router.post('/create', auth.owner(), controller.create);
router.post('/delete', auth.isOnView(), controller.destroy);
router.post('/password', auth.isOnView(), controller.changePassword);
router.post('/position', auth.isOnView(), controller.position);
router.post('/message', auth.isOnView(), controller.message);
router.post('/element', auth.isOnView(), controller.element);
router.post('/remove', auth.isOnView(), controller.removeElement);


//router.post('/test', auth.isOnView(), controller.test);

module.exports = router;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("composable-middleware");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.infos = {
  ver: '0.0.1',
  notes: 'new version',
  history:[{
    '0.0.0': 'old version'
  }]
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const express = __webpack_require__(3);
const passport = __webpack_require__(5);
const config = __webpack_require__(0);
const auth = __webpack_require__(6);
const View = __webpack_require__(2);
const controller = __webpack_require__(10);
// const socket = require('../config/socketio');

// Passport Configuration
__webpack_require__(37).setup(View, config);

const router = express.Router();

router.post('/login', function(req, res, next) {
  const data = req.body;
  if (!data.name) return res.send(500, 'Undefined view');
  if (!data.password) return res.send(500, 'Undefined password');
  if (!data.owner) return res.send(500, 'Undefined nickname');

  passport.authenticate('local', function (err, view, info) {
    const error = err || info;
    if (error) return res.json(401, error);
    if (!view) return res.json(404, {message: 'Something went wrong, please try again.'});

    const token = auth.signToken(view._id, data.owner);
    // console.log('TOKEN=', token);
    res.json({token: token});
    if (data.position) {
      data.position.owner = data.owner;
      controller.setPosition(view, data.position, function(err){
        if (err) console.error(err);
      });
    }
  })(req, res, next);
});


router.post('/logout', function(req, res, next) {
  // TODO....
  res.json(200);
});

module.exports = router;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(5);
var LocalStrategy = __webpack_require__(38).Strategy;

exports.setup = function (View, config) {
  passport.use(new LocalStrategy({
      usernameField: 'name',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(name, password, done) {
      View.findOne({
        name: name
      }, function(err, view) {
        if (err) {return done(err);}

        if (!view) {
          return done(null, false, { message: 'This view is not registered.' });
        }
        if (!view.authenticate(password)) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        return done(null, view);
      });
    }
  ));
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ })
/******/ ]);