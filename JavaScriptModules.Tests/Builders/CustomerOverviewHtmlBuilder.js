(function ($, baseHtmlBuilder) {
    let currentModule = {};
    let root = document.createElement('div');

    currentModule.new = function () {
        root = document.createElement('div');

        let searchForm = createSearchForm();
        root.appendChild(searchForm);

        let dataGrid = createEmptyGrid();
        root.appendChild(dataGrid);

        let rowTemplates = createRowTemplates();
        root.appendChild(rowTemplates);

        return currentModule;
    };


    currentModule.clearDataRows = function() {
        let customerTable = $(root).find('#customer-table-body');
        let loadingRow = customerTable.find('.loading-row');
        customerTable.html('');
        customerTable.append(loadingRow);

        return currentModule;
    };

    currentModule.hideLoadingRow = function () {
        let customerTable = $(root).find('#customer-table-body');
        let loadingRow = customerTable.find('.loading-row');
        loadingRow.addClass('display-none');

        return currentModule;
    };
    
    currentModule.withDataRow = function (name, email, country) {
        let customerTable = $(root).find('#customer-table-body');
        let row = baseHtmlBuilder.createRow(
            {
                Id: '',
                className: 'customer-row',
                cells: [
                    { innerHTML: name },
                    { innerHTML: email },
                    { innerHTML: country }]
            }
        );
        customerTable.append(row);

        return currentModule;
    };

    currentModule.build = function () {
        return root;
    };

    function createSearchForm() {
        let searchform = document.createElement('div');
        searchform.id = 'search-customer';

        searchform.appendChild(baseHtmlBuilder.createTextInput('searchCustomerName'));
        searchform.appendChild(baseHtmlBuilder.createTextInput('searchEmail'));
        searchform.appendChild(baseHtmlBuilder.createTextInput('searchCountry'));
        searchform.appendChild(baseHtmlBuilder.createButton('customerOverviewSearchButton'));

        return searchform;
    }

    function createEmptyGrid() {
        let table = document.createElement('table');

        let tableBody = document.createElement('tbody');
        tableBody.id = 'customer-table-body';
        table.appendChild(tableBody);

        let row = document.createElement('tr');
        row.className  = 'loading-row';
        tableBody.appendChild(row);

        return table;
    }

    function createRowTemplates() {
        let table = document.createElement('table');
        table.className = 'display-none';

        let row = baseHtmlBuilder.createRow(
            {
                id: 'data-row-template',
                className: 'customer-row',
                cells: [
                    { innerHTML: '' },
                    { innerHTML: '' },
                    { innerHTML: '' }]
            }
        );
        table.appendChild(row);
        
        return table;
    }

    global.customerOverviewHtmlBuilderModule = currentModule;
})(jQuery, global.BaseHtmlBuilderModule);