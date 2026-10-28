import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee {

  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  readonly router = inject(Router);

  isSubmitting = false;

  departments = ['IT', 'HR', 'Finance'];

  employeeForm: FormGroup = this.fb.group({

    name: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    age: ['', [
      Validators.required,
      Validators.min(18),
      Validators.max(65)
    ]],

    department: ['', Validators.required]

  });

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit(): void {

    if (this.employeeForm.invalid || this.isSubmitting) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.employeeService.addEmployee(this.employeeForm.value).subscribe({

      next: () => {
        alert('Employee added successfully!');
        this.router.navigate(['/']);
      },

      error: (error) => {
        console.error('Error adding employee:', error);
        alert('Unable to add employee.');
        this.isSubmitting = false;
      }

    });
  }
}