using API.Models;

namespace API.Services;

public interface IEmployeeService
{
    public Task<List<Employee>> GetAll();
    public Task<Employee?> GetById(int id);
    public Task<Employee> Create(Employee employee);
    public Task<bool> Update(int id, Employee employee);
    public Task<bool> Delete(int id);
}