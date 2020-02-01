(function() {
    let currentModule = {};
    let wwwRootScriptsFolder = '../JavaScriptModules/wwwroot/';

    currentModule.wwwRoot = wwwRootScriptsFolder;

    currentModule.initialize = function () {
        global.jQuery = global.$ = require(wwwRootScriptsFolder + 'lib/jquery/jquery.js');
        require('./Builders/BaseHtmlBuilder.js');
    };
    
    global.TestUtilitiesModule = currentModule;
})();