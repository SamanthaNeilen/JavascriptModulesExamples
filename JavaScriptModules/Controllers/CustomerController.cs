using System;
using JavaScriptModules.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace JavaScriptModules.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            var customerList = new List<Customer>();

            for (int index = 0; index < 100; index++)
            {
                customerList.Add(CreateCustomerFromNumer(index));
            }

            return customerList;
        }

        private Customer CreateCustomerFromNumer(int index)
        {
            return new Customer
            {
                Name = $"Customer {Guid.NewGuid()}",
                Email = $"info@customer{index}.com",
                Country = "Netherlands"
            };
        }
    }
}
