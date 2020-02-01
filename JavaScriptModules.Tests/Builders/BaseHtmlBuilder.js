(function ($) {
    let currentModule = {};
    currentModule.createTextInput = function (id) {
        let input = document.createElement('input');
        input.id = id;
        input.type = 'text';
        return input;
    };

    currentModule.createButton = function (id) {
        let button = document.createElement('button');
        button.id = id;
        button.type = 'button';
        return button;
    };

    currentModule.createRow = function (rowDefinition) {
        let rowElement = document.createElement('tr');
        rowElement.id = rowDefinition.Id;
        rowElement.className = rowDefinition.className;

        let cells = currentModule.createCells(rowDefinition.cells);
        $.each(cells,
            function (index, cell) {
                rowElement.appendChild(cell);
            });

        return rowElement;
    };

    currentModule.createCells = function (cells) {
        let resultingCells = [];

        $.each(cells,
            function (index, cell) {
                let cellElement = document.createElement('td');
                cellElement.className = cell.className;
                cellElement.innerHTML = cell.innerHTML;
                resultingCells.push(cellElement);
            });

        return resultingCells;
    };

    global.BaseHtmlBuilderModule = currentModule;
})(jQuery);