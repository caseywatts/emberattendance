eval("//# sourceURL=vendor/ember-cli/loader.js");

;eval("define(\"emberattendance/adapters/application\", \n  [\"ember-data\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    // /* globals Firebase */\n\n    // // import DS from \'ember-data\';\n\n    // // export default DS.FirebaseAdapter.extend({\n    // //   firebase: new Firebase(\'https://emberattendance.firebaseio.com\')\n    // // });\n\n    var DS = __dependency1__[\"default\"];\n\n    __exports__[\"default\"] = DS.LSAdapter.extend({\n      namespace: \'emberattendance\'\n    });\n  });//# sourceURL=emberattendance/adapters/application.js");

;eval("define(\"emberattendance/app\", \n  [\"ember\",\"ember/resolver\",\"ember/load-initializers\",\"emberattendance/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    var Resolver = __dependency2__[\"default\"];\n    var loadInitializers = __dependency3__[\"default\"];\n    var config = __dependency4__[\"default\"];\n\n    Ember.MODEL_FACTORY_INJECTIONS = true;\n\n    var Attendance = Ember.Application.extend({\n      modulePrefix: config.modulePrefix,\n      podModulePrefix: config.podModulePrefix,\n      Resolver: Resolver\n    });\n\n    loadInitializers(Attendance, config.modulePrefix);\n\n    __exports__[\"default\"] = Attendance;\n  });//# sourceURL=emberattendance/app.js");

;eval("define(\"emberattendance/controllers/presences\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n\n    __exports__[\"default\"] = Ember.ArrayController.extend({\n      actions: {\n        makeAbsent: function(person) {\n          person.set(\'isPresent\', false);\n          person.save();\n        },\n        makePresent: function(person) {\n          person.set(\'isPresent\', true);\n          person.save();\n        },\n        createAbsentPerson: function() {\n          var newName = this.get(\'newAbsenceName\');\n          var person = this.store.createRecord(\'presence\', {\n            isPresent: false,\n            name: newName\n          });\n          this.set(\'newAbsenceName\', \'\');\n          person.save();\n        },\n        createPresentPerson: function() {\n          var newName = this.get(\'newPresenceName\');\n          var person = this.store.createRecord(\'presence\', {\n            isPresent: true,\n            name: newName\n          });\n          this.set(\'newPresenceName\', \'\');\n          person.save();\n        },\n        removePerson: function(person) {\n          person.deleteRecord();\n          person.save();\n        },\n        importPeople: function() {\n          var peopleList = this.get(\'importList\');\n          var peopleArray = peopleList.split(\"\\n\");\n          var store = this.store;\n          peopleArray.forEach(function(name){\n            var person = store.createRecord(\'presence\', {\n              isPresent: false,\n              name: name\n            });\n            person.save();\n          });\n          this.set(\'importList\', \'\');\n        }\n      },\n\n      //calculated properties\n      present: function() {\n        return this.get(\'model\').filterProperty(\'isPresent\', true);\n      }.property(\'model.@each.isPresent\'),\n\n      absent: function() {\n        return this.get(\'model\').filterProperty(\'isPresent\', false);\n      }.property(\'model.@each.isPresent\'),\n    });\n  });//# sourceURL=emberattendance/controllers/presences.js");

;eval("define(\"emberattendance/initializers/export-application-global\", \n  [\"ember\",\"emberattendance/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    var config = __dependency2__[\"default\"];\n\n    function initialize(container, application) {\n      var classifiedName = Ember.String.classify(config.modulePrefix);\n\n      if (config.exportApplicationGlobal) {\n        window[classifiedName] = application;\n      }\n    };\n    __exports__.initialize = initialize;\n    __exports__[\"default\"] = {\n      name: \'export-application-global\',\n\n      initialize: initialize\n    };\n  });//# sourceURL=emberattendance/initializers/export-application-global.js");

;eval("define(\"emberattendance/models/presence\", \n  [\"ember-data\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var DS = __dependency1__[\"default\"];\n\n    __exports__[\"default\"] = DS.Model.extend({\n      name: DS.attr(\'string\'),\n      isPresent: DS.attr(\'boolean\')\n    });\n  });//# sourceURL=emberattendance/models/presence.js");

;eval("define(\"emberattendance/router\", \n  [\"ember\",\"emberattendance/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    var config = __dependency2__[\"default\"];\n\n    var Router = Ember.Router.extend({\n      location: config.locationType\n    });\n\n    Router.map(function() {\n      this.resource(\'presences\', { path: \'/\' }, function(){\n        // this.route(\'all\');\n        // this.route(\'absent\');\n        // this.route(\'present\');\n      });\n    });\n\n\n    __exports__[\"default\"] = Router;\n  });//# sourceURL=emberattendance/router.js");

;eval("define(\"emberattendance/routes/presences\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n\n    __exports__[\"default\"] = Ember.Route.extend({\n      model: function() {\n        return this.store.find(\'presence\');\n      },\n      // actions: {\n      //   makeAbsent: function() {\n      //       // var person = this.store.find(\'presence\', 1);\n      //       this.set(\'isPresent\', false);\n      //       this.save();\n      //       //find the user\n      //       //make the user absent\n      //       //save\n      //   },\n      // }\n    });\n  });//# sourceURL=emberattendance/routes/presences.js");

;eval("define(\"emberattendance/templates/application\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      var buffer = \'\', stack1;\n\n\n      data.buffer.push(\"<h2 id=\'title\'>Attendance Application</h2>\\n<div class=\\\"container\\\">\\n  \");\n      stack1 = helpers._triageMustache.call(depth0, \"outlet\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n</div>\");\n      return buffer;\n      \n    });\n  });//# sourceURL=emberattendance/templates/application.js");

;eval("define(\"emberattendance/templates/presences\", \n  [\"ember\",\"exports\"],\n  function(__dependency1__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    __exports__[\"default\"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {\n    this.compilerInfo = [4,\'>= 1.0.0\'];\n    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};\n      var buffer = \'\', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;\n\n    function program1(depth0,data) {\n      \n      var buffer = \'\', stack1;\n      data.buffer.push(\"\\n        <li class=\\\"btn btn-default\\\" \");\n      data.buffer.push(escapeExpression(helpers.action.call(depth0, \"makePresent\", \"person\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:[\"STRING\",\"ID\"],data:data})));\n      data.buffer.push(\">\\n          \");\n      stack1 = helpers._triageMustache.call(depth0, \"person.name\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n          <button type=\\\"button\\\" class=\\\"close\\\" \");\n      data.buffer.push(escapeExpression(helpers.action.call(depth0, \"removePerson\", \"person\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:[\"STRING\",\"ID\"],data:data})));\n      data.buffer.push(\">&times;</button>\\n        </li>\\n      \");\n      return buffer;\n      }\n\n    function program3(depth0,data) {\n      \n      var buffer = \'\', stack1;\n      data.buffer.push(\"\\n        <li class=\\\"btn btn-default\\\" \");\n      data.buffer.push(escapeExpression(helpers.action.call(depth0, \"makeAbsent\", \"person\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:[\"STRING\",\"ID\"],data:data})));\n      data.buffer.push(\">\\n          \");\n      stack1 = helpers._triageMustache.call(depth0, \"person.name\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:[\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n          <button type=\\\"button\\\" class=\\\"close\\\" \");\n      data.buffer.push(escapeExpression(helpers.action.call(depth0, \"removePerson\", \"person\", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:[\"STRING\",\"ID\"],data:data})));\n      data.buffer.push(\">&times;</button>\\n        </li>\\n      \");\n      return buffer;\n      }\n\n      data.buffer.push(\"<div class=\\\"container\\\">\\n  <div class=\\\"col-md-3\\\">\\n    <form \");\n      data.buffer.push(escapeExpression(helpers.action.call(depth0, \"importPeople\", {hash:{\n        \'on\': (\"submit\")\n      },hashTypes:{\'on\': \"STRING\"},hashContexts:{\'on\': depth0},contexts:[depth0],types:[\"STRING\"],data:data})));\n      data.buffer.push(\">\\n      \");\n      data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{\n        \'id\': (\"import-list\"),\n        \'placeholder\': (\"List of Names\"),\n        \'value\': (\"importList\"),\n        \'rows\': (10)\n      },hashTypes:{\'id\': \"STRING\",\'placeholder\': \"STRING\",\'value\': \"ID\",\'rows\': \"INTEGER\"},hashContexts:{\'id\': depth0,\'placeholder\': depth0,\'value\': depth0,\'rows\': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, \"textarea\", options))));\n      data.buffer.push(\"\\n        <button class=\\\"btn btn-primary btn-block\\\" type=\\\"submit\\\">Save</button>\\n    </form>\\n  </div>\\n  <div class=\\\"col-md-3\\\">\\n    <h3>Absent People</h3>\\n    <ul id=\\\"absent-list\\\" class=\\\"btn-group-vertical clearfix\\\">\\n          \");\n      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{\n        \'type\': (\"text\"),\n        \'id\': (\"new-absent\"),\n        \'placeholder\': (\"Bob\"),\n        \'value\': (\"newAbsenceName\"),\n        \'action\': (\"createAbsentPerson\")\n      },hashTypes:{\'type\': \"STRING\",\'id\': \"STRING\",\'placeholder\': \"STRING\",\'value\': \"ID\",\'action\': \"STRING\"},hashContexts:{\'type\': depth0,\'id\': depth0,\'placeholder\': depth0,\'value\': depth0,\'action\': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n      data.buffer.push(\"\\n      \");\n      stack1 = helpers.each.call(depth0, \"person\", \"in\", \"absent\", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:[\"ID\",\"ID\",\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n    </ul>\\n  </div>\\n  <div class=\\\"col-md-3\\\">\\n    <h3>Present People</h3>\\n    <ul id=\\\"present-list\\\" class=\\\"btn-group-vertical clearfix\\\">\\n    \");\n      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{\n        \'type\': (\"text\"),\n        \'id\': (\"new-present\"),\n        \'placeholder\': (\"Bob\"),\n        \'value\': (\"newPresenceName\"),\n        \'action\': (\"createPresentPerson\")\n      },hashTypes:{\'type\': \"STRING\",\'id\': \"STRING\",\'placeholder\': \"STRING\",\'value\': \"ID\",\'action\': \"STRING\"},hashContexts:{\'type\': depth0,\'id\': depth0,\'placeholder\': depth0,\'value\': depth0,\'action\': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, \"input\", options))));\n      data.buffer.push(\"\\n      \");\n      stack1 = helpers.each.call(depth0, \"person\", \"in\", \"present\", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:[\"ID\",\"ID\",\"ID\"],data:data});\n      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }\n      data.buffer.push(\"\\n    </ul>\\n  </div>\\n</div>\");\n      return buffer;\n      \n    });\n  });//# sourceURL=emberattendance/templates/presences.js");

;eval("define(\"emberattendance/tests/adapters/application.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - adapters\');\n    test(\'adapters/application.js should pass jshint\', function() { \n      ok(true, \'adapters/application.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/adapters/application.jshint.js");

;eval("define(\"emberattendance/tests/app.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - .\');\n    test(\'app.js should pass jshint\', function() { \n      ok(true, \'app.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/app.jshint.js");

;eval("define(\"emberattendance/tests/controllers/presences.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - controllers\');\n    test(\'controllers/presences.js should pass jshint\', function() { \n      ok(true, \'controllers/presences.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/controllers/presences.jshint.js");

;eval("define(\"emberattendance/tests/emberattendance/tests/helpers/resolver.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - emberattendance/tests/helpers\');\n    test(\'emberattendance/tests/helpers/resolver.js should pass jshint\', function() { \n      ok(true, \'emberattendance/tests/helpers/resolver.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/emberattendance/tests/helpers/resolver.jshint.js");

;eval("define(\"emberattendance/tests/emberattendance/tests/helpers/start-app.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - emberattendance/tests/helpers\');\n    test(\'emberattendance/tests/helpers/start-app.js should pass jshint\', function() { \n      ok(true, \'emberattendance/tests/helpers/start-app.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/emberattendance/tests/helpers/start-app.jshint.js");

;eval("define(\"emberattendance/tests/emberattendance/tests/test-helper.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - emberattendance/tests\');\n    test(\'emberattendance/tests/test-helper.js should pass jshint\', function() { \n      ok(true, \'emberattendance/tests/test-helper.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/emberattendance/tests/test-helper.jshint.js");

;eval("define(\"emberattendance/tests/emberattendance/tests/unit/adapters/application-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - emberattendance/tests/unit/adapters\');\n    test(\'emberattendance/tests/unit/adapters/application-test.js should pass jshint\', function() { \n      ok(true, \'emberattendance/tests/unit/adapters/application-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/emberattendance/tests/unit/adapters/application-test.jshint.js");

;eval("define(\"emberattendance/tests/emberattendance/tests/unit/controllers/presences-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - emberattendance/tests/unit/controllers\');\n    test(\'emberattendance/tests/unit/controllers/presences-test.js should pass jshint\', function() { \n      ok(true, \'emberattendance/tests/unit/controllers/presences-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/emberattendance/tests/unit/controllers/presences-test.jshint.js");

;eval("define(\"emberattendance/tests/emberattendance/tests/unit/models/presence-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - emberattendance/tests/unit/models\');\n    test(\'emberattendance/tests/unit/models/presence-test.js should pass jshint\', function() { \n      ok(true, \'emberattendance/tests/unit/models/presence-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/emberattendance/tests/unit/models/presence-test.jshint.js");

;eval("define(\"emberattendance/tests/emberattendance/tests/unit/routes/presences-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - emberattendance/tests/unit/routes\');\n    test(\'emberattendance/tests/unit/routes/presences-test.js should pass jshint\', function() { \n      ok(true, \'emberattendance/tests/unit/routes/presences-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/emberattendance/tests/unit/routes/presences-test.jshint.js");

;eval("define(\"emberattendance/tests/emberattendance/tests/unit/views/presences-test.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - emberattendance/tests/unit/views\');\n    test(\'emberattendance/tests/unit/views/presences-test.js should pass jshint\', function() { \n      ok(true, \'emberattendance/tests/unit/views/presences-test.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/emberattendance/tests/unit/views/presences-test.jshint.js");

;eval("define(\"emberattendance/tests/helpers/resolver\", \n  [\"ember/resolver\",\"emberattendance/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __exports__) {\n    \"use strict\";\n    var Resolver = __dependency1__[\"default\"];\n    var config = __dependency2__[\"default\"];\n\n    var resolver = Resolver.create();\n\n    resolver.namespace = {\n      modulePrefix: config.modulePrefix,\n      podModulePrefix: config.podModulePrefix\n    };\n\n    __exports__[\"default\"] = resolver;\n  });//# sourceURL=emberattendance/tests/helpers/resolver.js");

;eval("define(\"emberattendance/tests/helpers/start-app\", \n  [\"ember\",\"emberattendance/app\",\"emberattendance/router\",\"emberattendance/config/environment\",\"exports\"],\n  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {\n    \"use strict\";\n    var Ember = __dependency1__[\"default\"];\n    var Application = __dependency2__[\"default\"];\n    var Router = __dependency3__[\"default\"];\n    var config = __dependency4__[\"default\"];\n\n    __exports__[\"default\"] = function startApp(attrs) {\n      var App;\n\n      var attributes = Ember.merge({}, config.APP);\n      attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;\n\n      Router.reopen({\n        location: \'none\'\n      });\n\n      Ember.run(function() {\n        App = Application.create(attributes);\n        App.setupForTesting();\n        App.injectTestHelpers();\n      });\n\n      App.reset(); // this shouldn\'t be needed, i want to be able to \"start an app at a specific URL\"\n\n      return App;\n    }\n  });//# sourceURL=emberattendance/tests/helpers/start-app.js");

;eval("define(\"emberattendance/tests/models/presence.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - models\');\n    test(\'models/presence.js should pass jshint\', function() { \n      ok(true, \'models/presence.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/models/presence.jshint.js");

;eval("define(\"emberattendance/tests/router.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - .\');\n    test(\'router.js should pass jshint\', function() { \n      ok(true, \'router.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/router.jshint.js");

;eval("define(\"emberattendance/tests/routes/presences.jshint\", \n  [],\n  function() {\n    \"use strict\";\n    module(\'JSHint - routes\');\n    test(\'routes/presences.js should pass jshint\', function() { \n      ok(true, \'routes/presences.js should pass jshint.\'); \n    });\n  });//# sourceURL=emberattendance/tests/routes/presences.jshint.js");

;eval("define(\"emberattendance/tests/test-helper\", \n  [\"emberattendance/tests/helpers/resolver\",\"ember-qunit\"],\n  function(__dependency1__, __dependency2__) {\n    \"use strict\";\n    var resolver = __dependency1__[\"default\"];\n    var setResolver = __dependency2__.setResolver;\n\n    setResolver(resolver);\n\n    document.write(\'<div id=\"ember-testing-container\"><div id=\"ember-testing\"></div></div>\');\n\n    QUnit.config.urlConfig.push({ id: \'nocontainer\', label: \'Hide container\'});\n    var containerVisibility = QUnit.urlParams.nocontainer ? \'hidden\' : \'visible\';\n    document.getElementById(\'ember-testing-container\').style.visibility = containerVisibility;\n  });//# sourceURL=emberattendance/tests/test-helper.js");

;eval("define(\"emberattendance/tests/unit/adapters/application-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var moduleFor = __dependency1__.moduleFor;\n    var test = __dependency1__.test;\n\n    moduleFor(\'adapter:application\', \'ApplicationAdapter\', {\n      // Specify the other units that are required for this test.\n      // needs: [\'serializer:foo\']\n    });\n\n    // Replace this with your real tests.\n    test(\'it exists\', function() {\n      var adapter = this.subject();\n      ok(adapter);\n    });\n  });//# sourceURL=emberattendance/tests/unit/adapters/application-test.js");

;eval("define(\"emberattendance/tests/unit/controllers/presences-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var moduleFor = __dependency1__.moduleFor;\n    var test = __dependency1__.test;\n\n    moduleFor(\'controller:presences\', \'PresencesController\', {\n      // Specify the other units that are required for this test.\n      // needs: [\'controller:foo\']\n    });\n\n    // Replace this with your real tests.\n    test(\'it exists\', function() {\n      var controller = this.subject();\n      ok(controller);\n    });\n  });//# sourceURL=emberattendance/tests/unit/controllers/presences-test.js");

;eval("define(\"emberattendance/tests/unit/models/presence-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var moduleForModel = __dependency1__.moduleForModel;\n    var test = __dependency1__.test;\n\n    moduleForModel(\'presence\', \'Presence\', {\n      // Specify the other units that are required for this test.\n      needs: []\n    });\n\n    test(\'it exists\', function() {\n      var model = this.subject();\n      // var store = this.store();\n      ok(!!model);\n    });\n  });//# sourceURL=emberattendance/tests/unit/models/presence-test.js");

;eval("define(\"emberattendance/tests/unit/routes/presences-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var moduleFor = __dependency1__.moduleFor;\n    var test = __dependency1__.test;\n\n    moduleFor(\'route:presences\', \'PresencesRoute\', {\n      // Specify the other units that are required for this test.\n      // needs: [\'controller:foo\']\n    });\n\n    test(\'it exists\', function() {\n      var route = this.subject();\n      ok(route);\n    });\n  });//# sourceURL=emberattendance/tests/unit/routes/presences-test.js");

;eval("define(\"emberattendance/tests/unit/views/presences-test\", \n  [\"ember-qunit\"],\n  function(__dependency1__) {\n    \"use strict\";\n    var moduleFor = __dependency1__.moduleFor;\n    var test = __dependency1__.test;\n\n    moduleFor(\'view:presences\', \'PresencesView\');\n\n    // Replace this with your real tests.\n    test(\'it exists\', function() {\n      var view = this.subject();\n      ok(view);\n    });\n  });//# sourceURL=emberattendance/tests/unit/views/presences-test.js");

/* jshint ignore:start */

define('emberattendance/config/environment', ['ember'], function(Ember) {
  var prefix = 'emberattendance';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */


});

if (runningTests) {
  require('emberattendance/tests/test-helper');
} else {
  require('emberattendance/app')['default'].create({"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true});
}

/* jshint ignore:end */
