/*
 * This module is just an example of an IFE and has no real functionality *
 *
 */

(function ($, someOtherInjectedModule) {
    const CURRENT_MODULE = {};
    const PRIVATE_VARIABLE = 'Hello world!';

    CURRENT_MODULE.myPublicFunction = function() {
        privateFunction();
    };

    function privateFunction() {
        alert(PRIVATE_VARIABLE);
    }

    window.ModuleExample = CURRENT_MODULE;

})(jQuery, window.SomeOtherModule);

$(document).ready(function() {
    window.ModuleExample.myPublicFunction();
});