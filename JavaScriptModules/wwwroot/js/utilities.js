(function ($) {
    const CURRENT_MODULE = {},
        DISPLAY_NONE_CLASS = 'display-none';

    CURRENT_MODULE.isMatchForFilter = function (searchValue, valueInRow) {
        return searchValue === '' ||
            valueInRow.indexOf(searchValue) !== -1;
    };

    CURRENT_MODULE.hideElement = function (elementSelector, parentSelector) {
        let parent = getParent(parentSelector);
        parent.find(elementSelector).addClass(DISPLAY_NONE_CLASS);
    };

    CURRENT_MODULE.showElement = function (elementSelector, parentSelector) {
        let parent = getParent(parentSelector);
        parent.find(elementSelector).removeClass(DISPLAY_NONE_CLASS);
    };

    function getParent(parentSelector) {
        let parent = $(document);
        if (parentSelector !== undefined) {
            parent = $(parentSelector);
        }

        return parent;
    }

    window.utilitiesModule = CURRENT_MODULE;
})(jQuery);