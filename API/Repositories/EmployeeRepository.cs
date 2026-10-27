using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class EmployeeRepository: IEmployeeRepository
{
    private readonly EmployeeDbContext _context;

    public EmployeeRepository(EmployeeDbContext context)
    {
        _context = context;
    }

    public async Task<List<Employee>> GetAll()
    {
        return await _context.Employees.ToListAsync();
    }

    public async Task<Employee?> GetById(int id)
    {
        return await _context.Employees.FindAsync(id);
    }

    public async Task<Employee> Create(Employee employee)
    {
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return employee;
    }

    public async Task<bool> Update(int id, Employee employee)
    {
        var existingEmployee = await _context.Employees.FindAsync(id);
        if(existingEmployee == null) return false;

        existingEmployee.Name = employee.Name;
        existingEmployee.Email = employee.Email;
        existingEmployee.Age = employee.Age;
        existingEmployee.Department = employee.Department;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> Delete(int id)
    {
        var existingEmployee = await _context.Employees.FindAsync(id);
        if(existingEmployee == null) return false;

        _context.Employees.Remove(existingEmployee);
        await _context.SaveChangesAsync();

        return true;
    }
}