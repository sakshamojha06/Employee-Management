using API.Models;
using API.Repositories;

namespace API.Services;

public class EmployeeService: IEmployeeService
{
    private readonly IEmployeeRepository _repo;

    public EmployeeService(IEmployeeRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Employee>> GetAll()
    {
        return await _repo.GetAll();
    }

    public async Task<Employee?> GetById(int id)
    {
        return await _repo.GetById(id);
    }

    public async Task<Employee> Create(Employee employee)
    {
        return await _repo.Create(employee);
    }

    public async Task<bool> Update(int id, Employee employee)
    {
        return await _repo.Update(id, employee);
    }

    public async Task<bool> Delete(int id)
    {
        return await _repo.Delete(id);
    }
}