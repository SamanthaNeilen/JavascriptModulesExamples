describe('Search using Name', function () {
    beforeEach(() => {
        const testProjectRoot = '../../../';
        jest.resetModules();

        require(testProjectRoot + 'TestUtilities.js');
        global.TestUtilitiesModule.initialize();
        require(testProjectRoot + 'Builders/CustomerOverviewHtmlBuilder.js');

        let wwwRoot = testProjectRoot + global.TestUtilitiesModule.wwwRoot;
        require(wwwRoot + 'js/utilities.js');
        require(wwwRoot + 'js/customer-overview.js');

        //arrange initial state
        let htmlTemplate = global.customerOverviewHtmlBuilderModule
            .new()
            .clearDataRows()
            .hideLoadingRow()
            .withDataRow('first customer', 'first customer email', 'first customer country')
            .withDataRow('second customer', 'second customer email', 'second customer country')
            .withDataRow('testcustomer', 'testcustomer email', 'testcustomer country')
            .build();

        document.body.innerHTML = '';
        document.body.appendChild(htmlTemplate);
    });

    it("WHEN 3 rows loaded THEN Search with full Name SHOULD filter to show one row", function () {
        //arrange
        let searchNameValue = 'second customer';
        let initialVisibleRows = getVisibleRows();
        let initialInvisibleRows = getInvisibleRows();

        //act
        $("#searchCustomerName").val(searchNameValue);
        window.customerOverviewModule.filterData();

        //assert intial state
        expect(initialVisibleRows).toHaveLength(3);
        expect(initialInvisibleRows).toHaveLength(1);

        //assert state after action
        let filteredVisibleRows = getVisibleRows();
        let filteredInvisibleRows = getInvisibleRows();
        
        expect(filteredVisibleRows).toHaveLength(1);
        expect(filteredInvisibleRows).toHaveLength(3);

        let actualVisibleRowSearchName = getSearchNameValueForSingleRow(filteredVisibleRows[0]);
        expect(actualVisibleRowSearchName).toBe(searchNameValue);
    });

    function getSearchNameValueForSingleRow(row) {
        return $(row).find('td')[0].innerHTML;
    }

    function getVisibleRows() {
        
        return $.grep(getAllRows(), function (row) { return !$(row).hasClass('display-none'); });
    }

    function getInvisibleRows() {
        return $.grep(getAllRows(), function (row) { return $(row).hasClass('display-none'); });
    }

    function getAllRows() {
        return $('#customer-table-body').find('tr');
    }
});
