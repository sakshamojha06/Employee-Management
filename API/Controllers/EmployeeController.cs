using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController: ControllerBase
{
    private readonly IEmployeeService _service;

    public EmployeeController(IEmployeeService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _service.GetAll();
        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var employee = await _service.GetById(id);
        if(employee == null) return NotFound("Employee not found");

        return Ok(employee);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Employee employee)
    {   
        var result = await _service.Create(employee);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Employee employee)
    {
        var result = await _service.Update(id, employee);
        if(!result) return NotFound("Employee not found");

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.Delete(id);
        if(!result) return NotFound("Employee not found");

        return Ok(result);
    }
}