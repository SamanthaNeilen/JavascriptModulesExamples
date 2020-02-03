describe('Search using Name', function () {

    it("WHEN 3 rows loaded THEN Search with full Name SHOULD filter to show one row", function () {
        let scenario = global.SearchCustomerNameScenarioBuilderModule.new();

        //arrange
        const valueToSearch = 'second customer';
        const expectedNumberOfVisibleRows = 1;
        const expectedNumberOfInvisibleRows = 3;
        
        scenario.arrange_Page_With_3_Initial_DataRows();

        //act
        scenario.act_SearchName(valueToSearch);

        //assert
        scenario.assert_Number_Of_Visible_Rows(expectedNumberOfVisibleRows)
            .assert_Number_Of_Invisible_Rows(expectedNumberOfInvisibleRows)
            .assert_Visible_Rows_Name_Is_Complete_SearchValue(valueToSearch)
            .assert_Invisible_Rows_Name_Do_Not_Contain_SearchValue(valueToSearch);
    });

    it("WHEN 3 rows loaded THEN Search with partial Name SHOULD filter to show one row", function () {
        let scenario = global.SearchCustomerNameScenarioBuilderModule.new();

        //arrange
        const valueToSearch = 'test';
        const expectedNumberOfVisibleRows = 1;
        const expectedNumberOfInvisibleRows = 3;

        scenario.arrange_Page_With_3_Initial_DataRows();

        //act
        scenario.act_SearchName(valueToSearch);

        //assert
        scenario.assert_Number_Of_Visible_Rows(expectedNumberOfVisibleRows)
            .assert_Number_Of_Invisible_Rows(expectedNumberOfInvisibleRows)
            .assert_Visible_Rows_Name_Contains_SearchValue(valueToSearch)
            .assert_Invisible_Rows_Name_Do_Not_Contain_SearchValue(valueToSearch);
    });

    it("WHEN 3 rows loaded THEN Search with empty Name SHOULD filter to show all rows", function () {
        let scenario = global.SearchCustomerNameScenarioBuilderModule.new();

        //arrange
        const valueToSearch = '';
        const expectedNumberOfVisibleRows = 3;
        const expectedNumberOfInvisibleRows = 1;

        scenario.arrange_Page_With_3_Initial_DataRows();

        //act
        scenario.act_SearchName(valueToSearch);

        //assert
        scenario.assert_Number_Of_Visible_Rows(expectedNumberOfVisibleRows)
            .assert_Number_Of_Invisible_Rows(expectedNumberOfInvisibleRows);
    });


    (function (jest, expect) {
        let currentModule = {};

        currentModule.new = function() {
            const testProjectRoot = '../../../';
            jest.resetModules();

            require(testProjectRoot + 'TestUtilities.js');
            global.TestUtilitiesModule.initialize();
            require(testProjectRoot + 'Builders/CustomerOverviewHtmlBuilder.js');

            let wwwRoot = testProjectRoot + global.TestUtilitiesModule.wwwRoot;
            require(wwwRoot + 'js/utilities.js');
            require(wwwRoot + 'js/customer-overview.js');

            return currentModule;
        };

        currentModule.arrange_Page_With_3_Initial_DataRows = function () {
            document.body.innerHTML = '';

            const template = global.customerOverviewHtmlBuilderModule
                .new()
                .clearDataRows()
                .hideLoadingRow()
                .withDataRow('first customer', 'first customer email', 'first customer country')
                .withDataRow('second customer', 'second customer email', 'second customer country')
                .withDataRow('testcustomer', 'testcustomer email', 'testcustomer country')
                .build();

            document.body.appendChild(template);

            return currentModule;
        };

        currentModule.act_SearchName = function (nameToSearch) {
            $("#searchCustomerName").val(nameToSearch);
            window.customerOverviewModule.filterData();

            return currentModule;
        };

        currentModule.assert_Number_Of_Visible_Rows = function (numberOfRows) {
            expect(getVisibleRows()).toHaveLength(numberOfRows);

            return currentModule;
        };

        currentModule.assert_Number_Of_Invisible_Rows = function (numberOfRows) {
            expect(getInvisibleRows()).toHaveLength(numberOfRows);

            return currentModule;
        };

        currentModule.assert_Visible_Rows_Name_Is_Complete_SearchValue = function (nameToSearch) {
            let rows = getVisibleRows();
            $.each(rows,
                function (index, row) {
                    if (!isLoadingRow(row)) {
                        expect($(row).find('td')[0].innerHTML).toBe(nameToSearch);
                    }
                });

            return currentModule;
        };

        currentModule.assert_Visible_Rows_Name_Contains_SearchValue = function (nameToSearch) {
            let rows = getVisibleRows();
            $.each(rows,
                function (index, row) {
                    if (!isLoadingRow(row)) {
                        expect($(row).find('td')[0].innerHTML).toEqual(expect.stringContaining(nameToSearch));
                    }
                });

            return currentModule;
        };

        currentModule.assert_Invisible_Rows_Name_Do_Not_Contain_SearchValue = function (nameToSearch) {
            let rows = getInvisibleRows();
            $.each(rows,
                function (index, row) {
                    if (!isLoadingRow(row)) {
                        expect($(row).find('td')[0].innerHTML).toEqual(expect.not.stringContaining(nameToSearch));
                    }
                });

            return currentModule;
        };

        function isLoadingRow(row) {
            return $(row).hasClass('loading-row');
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

        global.SearchCustomerNameScenarioBuilderModule = currentModule;

    })(jest, expect);
});
