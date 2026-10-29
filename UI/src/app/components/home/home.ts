import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private employeeService = inject(EmployeeService);
  private notificationService = inject(NotificationService);

  employees = signal<Employee[]>([]);
  pendingDeleteId = signal<number | null>(null);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees.set(data);
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  deleteEmployee(id: number): void {
    this.pendingDeleteId.set(id);
  }

  cancelDelete(): void {
    this.pendingDeleteId.set(null);
  }

  confirmDelete(): void {
    const id = this.pendingDeleteId();

    if (id === null) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.pendingDeleteId.set(null);
        this.notificationService.show('Person deleted successfully.', 'success');
        this.loadEmployees();
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        this.pendingDeleteId.set(null);
        this.notificationService.show('Unable to delete person.', 'danger');
      }
    });
  }
}