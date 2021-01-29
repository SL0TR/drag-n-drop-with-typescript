// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/enums.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectStatus = void 0;
var ProjectStatus;

(function (ProjectStatus) {
  ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
  ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
},{}],"src/classes/project.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Project = void 0;

var Project =
/** @class */
function () {
  function Project(id, title, description, people, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.people = people;
    this.status = status;
  }

  return Project;
}();

exports.Project = Project;
},{}],"src/classes/state.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectState = void 0;

var enums_1 = require("../enums");

var project_1 = require("./project");

var State =
/** @class */
function () {
  function State() {
    this.listeners = [];
  }

  State.prototype.addListener = function (listenerFn) {
    this.listeners.push(listenerFn);
  };

  return State;
}();

var ProjectState =
/** @class */
function (_super) {
  __extends(ProjectState, _super);

  function ProjectState() {
    var _this = _super.call(this) || this;

    _this.projects = [];
    return _this;
  }

  ProjectState.getInstance = function () {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  };

  ProjectState.prototype.addProject = function (project) {
    var newProject = new project_1.Project(Math.random().toString(), project.title, project.description, project.people, enums_1.ProjectStatus.Active);
    this.projects.push(newProject);

    for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
      var listenerFn = _a[_i];
      listenerFn(this.projects.slice());
    }
  };

  return ProjectState;
}(State);

exports.ProjectState = ProjectState;
},{"../enums":"src/enums.ts","./project":"src/classes/project.ts"}],"src/classes/component.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = void 0;

var Component =
/** @class */
function () {
  function Component(tempId, hostElemId, insetAtStart, newElId) {
    this.insetAtStart = insetAtStart;
    this.templateElem = document.getElementById(tempId);
    this.hostElem = document.getElementById(hostElemId);
    var tempNode = document.importNode(this.templateElem.content, true);
    this.appContainerElem = tempNode.firstElementChild;

    if (newElId) {
      this.appContainerElem.id = newElId;
    }

    this.attach(insetAtStart);
  }

  Component.prototype.attach = function (position) {
    this.hostElem.insertAdjacentElement(position ? 'afterbegin' : 'beforeend', this.appContainerElem);
  };

  return Component;
}();

exports.Component = Component;
},{}],"src/classes/projectList.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectList = void 0;

var enums_1 = require("../enums");

var component_1 = require("./component");

var state_1 = require("./state");

var projectState = state_1.ProjectState.getInstance();

var ProjectList =
/** @class */
function (_super) {
  __extends(ProjectList, _super);

  function ProjectList(type) {
    var _this = _super.call(this, 'project-list', 'app', false, type + "-projects") || this;

    _this.type = type;
    _this.assignedProjects = [];

    _this.configure(type);

    _this.renderContent();

    return _this;
  }

  ProjectList.prototype.renderProjects = function () {
    var listEl = document.getElementById(this.type + "-project-list");
    listEl.innerHTML = '';

    for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
      var item = _a[_i];
      var listItem = document.createElement('li');
      listItem.textContent = item.title;
      listEl.appendChild(listItem);
    }
  };

  ProjectList.prototype.configure = function (projType) {
    var _this = this;

    projectState.addListener(function (projects) {
      var relevantProjects = projects.filter(function (proj) {
        return projType === 'active' ? proj.status === enums_1.ProjectStatus.Active : proj.status === enums_1.ProjectStatus.Finished;
      });
      _this.assignedProjects = relevantProjects;

      _this.renderProjects();
    });
  };

  ProjectList.prototype.renderContent = function () {
    var listId = this.type + "-project-list";
    this.appContainerElem.querySelector('ul').id = listId;
    this.appContainerElem.querySelector('h2').textContent = this.type.toUpperCase() + ' Projects';
  };

  return ProjectList;
}(component_1.Component);

exports.ProjectList = ProjectList;
},{"../enums":"src/enums.ts","./component":"src/classes/component.ts","./state":"src/classes/state.ts"}],"src/decorators.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoBind = void 0;

function AutoBind(_, _2, descriptor) {
  var originalMethod = descriptor.value;
  var adjDescriptor = {
    configurable: true,
    get: function get() {
      var boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

exports.AutoBind = AutoBind;
},{}],"src/validators.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;
var ErrorMessagegs = {
  required: function required() {
    return 'This field is required';
  },
  minL: function minL(val) {
    return "Field requires minimum of " + val + " characters";
  },
  maxL: function maxL(val) {
    return "Field requires maximum of " + val + " characters";
  },
  min: function min(val) {
    return "Field requires minimum of " + val + " value";
  },
  max: function max(val) {
    return "Field requires maximum of " + val + " value";
  }
};

function validate(input) {
  var errors = [];

  if (input.required) {
    if (input.value.toString().trim().length === 0) {
      errors = __spreadArrays(errors, [ErrorMessagegs.required()]);
    }
  }

  if (input.minL != null && typeof input.value === 'string') {
    if (input.value.length < input.minL) {
      errors = __spreadArrays(errors, [ErrorMessagegs.minL(input.minL)]);
    }
  }

  if (input.maxL != null && typeof input.value === 'string') {
    if (input.value.length < input.maxL) {
      errors = __spreadArrays(errors, [ErrorMessagegs.maxL(input.maxL)]);
    }
  }

  if (input.min != null && typeof input.value === "number") {
    if (input.value < input.min) {
      errors = __spreadArrays(errors, [ErrorMessagegs.min(input.min)]);
    }
  }

  if (input.max != null && typeof input.value === "number") {
    if (input.value > input.max) {
      errors = __spreadArrays(errors, [ErrorMessagegs.max(input.max)]);
    }
  }

  return errors;
}

exports.validate = validate;
},{}],"src/helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKeyValue = void 0;

var getKeyValue = function getKeyValue(obj) {
  return function (key) {
    return obj[key];
  };
};

exports.getKeyValue = getKeyValue;
},{}],"src/classes/projectTemplate.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectTemplate = void 0;

var decorators_1 = require("../decorators");

var validators_1 = require("../validators");

var helpers_1 = require("../helpers");

var state_1 = require("./state");

var component_1 = require("./component");

var projectState = state_1.ProjectState.getInstance();

var ProjectTemplate =
/** @class */
function (_super) {
  __extends(ProjectTemplate, _super);

  function ProjectTemplate() {
    var _this = _super.call(this, 'project-template', 'app', true) || this;

    _this.formElem = _this.appContainerElem.querySelector('#project-form');
    _this.titleInputElement = _this.appContainerElem.querySelector('#title');
    _this.descriptionInputElement = _this.appContainerElem.querySelector('#description');
    _this.peopleInputElement = _this.appContainerElem.querySelector('#people');

    _this.configure();

    return _this;
  }

  ProjectTemplate.prototype.getUserInput = function () {
    var titleVal = this.titleInputElement.value;
    var descVal = this.descriptionInputElement.value;
    var peopleVal = +this.peopleInputElement.value;
    var validatableTitle = {
      value: titleVal,
      required: true
    };
    var validatableDesc = {
      value: descVal,
      required: true,
      minL: 7
    };
    var validatablePeople = {
      value: peopleVal,
      required: true,
      min: 1,
      max: 7
    };
    var InputErrorVals = {
      title: validators_1.validate(validatableTitle),
      description: validators_1.validate(validatableDesc),
      people: validators_1.validate(validatablePeople)
    };
    return {
      errors: InputErrorVals,
      inputVals: {
        title: titleVal,
        description: descVal,
        people: peopleVal
      }
    };
  };

  ProjectTemplate.prototype.getAndPrintErrors = function (key, errorArr) {
    var inputEl = this.appContainerElem.querySelector("#" + key);
    var errorSpan = inputEl.nextElementSibling;

    if (errorArr.length > 0) {
      if (errorSpan && errorSpan.innerHTML === '') {
        for (var i = 0; i < errorArr.length; i++) {
          var err = errorArr[i];
          var isLastIndex = i === errorArr.length - 1;
          var node = document.createTextNode("" + (isLastIndex ? err : err + ', '));
          errorSpan.appendChild(node);
        }
      }

      return false;
    } else {
      errorSpan.innerHTML = '';
      return true;
    }
  };

  ProjectTemplate.prototype.resolveErrors = function (errors) {
    var errArray = [];

    for (var key in errors) {
      var errorArr = helpers_1.getKeyValue(errors)(key);
      errArray.push(this.getAndPrintErrors(key, errorArr));
    }

    return errArray.every(function (el) {
      return el === true;
    });
  };

  ProjectTemplate.prototype.submitHandler = function (e) {
    e.preventDefault();

    var _a = this.getUserInput(),
        errors = _a.errors,
        inputVals = _a.inputVals;

    if (this.resolveErrors(errors)) {
      projectState.addProject(inputVals);
    }
  };

  ProjectTemplate.prototype.renderContent = function () {};

  ProjectTemplate.prototype.configure = function () {
    this.formElem.addEventListener('submit', this.submitHandler);
  };

  __decorate([decorators_1.AutoBind], ProjectTemplate.prototype, "submitHandler", null);

  return ProjectTemplate;
}(component_1.Component);

exports.ProjectTemplate = ProjectTemplate;
},{"../decorators":"src/decorators.ts","../validators":"src/validators.ts","../helpers":"src/helpers.ts","./state":"src/classes/state.ts","./component":"src/classes/component.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state_1 = require("./classes/state");

var projectList_1 = require("./classes/projectList");

var projectTemplate_1 = require("./classes/projectTemplate");

var projectState = state_1.ProjectState.getInstance();
var projTemp = new projectTemplate_1.ProjectTemplate();
var activeProjectList = new projectList_1.ProjectList('active');
var finishedProjectList = new projectList_1.ProjectList('finished');
console.log({
  projTemp: projTemp,
  activeProjectList: activeProjectList,
  finishedProjectList: finishedProjectList,
  projectState: projectState
});
},{"./classes/state":"src/classes/state.ts","./classes/projectList":"src/classes/projectList.ts","./classes/projectTemplate":"src/classes/projectTemplate.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "3706" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/build/src.f10117fe.js.map