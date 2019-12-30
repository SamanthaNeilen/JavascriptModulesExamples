(function ($, customerService, utilitiesModule) {
    const CURRENT_MODULE = {},
        CUSTOMER_ROW_SELECTOR = '.customer-row',
        LOADING_ROW_SELECTOR = '.loading-row',
        CUSTOMER_TABLE_BODY = $('#customer-table-body');

    CURRENT_MODULE.initialize = function() {
        $('#customerOverviewSearchButton').on('click', CURRENT_MODULE.filterData);
        CURRENT_MODULE.loadData();
    };

    CURRENT_MODULE.loadData = function () {
        showLoader();

        customerService.getCustomers(showCustomerData);
    };

    CURRENT_MODULE.filterData = function () {
        showLoader();

        const customerRows = CUSTOMER_TABLE_BODY.find(CUSTOMER_ROW_SELECTOR);
        const searchName = $('#searchCustomerName').val();
        const searchEmail = $('#searchEmail').val();
        const searchCountry = $('#searchCountry').val();

        const rowsToShow = $.grep(customerRows,
            function (customerRow) {
                const columns = $(customerRow).find('td');

                return utilitiesModule.isMatchForFilter(searchName, columns[0].innerHTML) &&
                    utilitiesModule.isMatchForFilter(searchEmail, columns[1].innerHTML) &&
                    utilitiesModule.isMatchForFilter(searchCountry, columns[2].innerHTML);
            });

        showCustomerRows(rowsToShow);
    };

    function showCustomerData(customerList) {
        CUSTOMER_TABLE_BODY.html(getDataRows(customerList));
        showCustomerRows();
    }

    function getDataRows(customerList) {
        const outerHtmlProperty = 'outerHTML';
        const dataRowTemplateId = 'data-row-template';
        const rowTemplate = $('#' + dataRowTemplateId).prop(outerHtmlProperty)
            .replace('id="' + dataRowTemplateId + '"', '');

        let dataRows = $(LOADING_ROW_SELECTOR).prop(outerHtmlProperty);

        $.each(customerList,
            function (index, customer) {
                dataRows += rowTemplate
                    .replace('{name}', customer.name)
                    .replace('{email}', customer.email)
                    .replace('{country}', customer.country);
            });

        return dataRows;
    }

    function showLoader() {
        utilitiesModule.showElement(LOADING_ROW_SELECTOR, CUSTOMER_TABLE_BODY);

        forEachCustomerRow(function (row) {
            utilitiesModule.hideElement(row, CUSTOMER_TABLE_BODY);
        });
    }

    function showCustomerRows(filteredRows) {
        forEachCustomerRow(function (row) {
            utilitiesModule.showElement(row, CUSTOMER_TABLE_BODY);
        }, filteredRows);

        utilitiesModule.hideElement(LOADING_ROW_SELECTOR, CUSTOMER_TABLE_BODY);
    }

    function forEachCustomerRow(callBack, filteredRows) {
        let customerRows = CUSTOMER_TABLE_BODY.find(CUSTOMER_ROW_SELECTOR);
        if (filteredRows !== undefined) {
            customerRows = filteredRows;
        }

        $.each(customerRows,
            function (index, row) {
                callBack($(row));
            });
    }

    window.customerOverviewModule = CURRENT_MODULE;

})(jQuery, window.customerService, window.utilitiesModule);

$(document).ready(function () {
    window.customerOverviewModule.initialize();
});