(function ($) {
    const CURRENT_MODULE = {},
        CUSTOMER_URI = 'https://localhost:44313/api/customer';

    CURRENT_MODULE.getCustomers = function (successCallBack) {
        $.get(CUSTOMER_URI)
            .done(function (customerList, textStatus, jqXHR) {
                successCallBack(customerList);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + ' ' + errorThrown);
            });
    };
  
    window.customerService = CURRENT_MODULE;
})(jQuery);
