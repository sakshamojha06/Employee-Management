import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css'
})
export class EditEmployee implements OnInit {

  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private notificationService = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private changeDetector = inject(ChangeDetectorRef);

  readonly router = inject(Router);

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

  departments = ['IT', 'HR', 'Finance'];

  employeeId!: number;

  isSubmitting = false;
  isLoading = true;

  ngOnInit(): void {

    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadEmployee();
  }

  get f() {
    return this.employeeForm.controls;
  }

  loadEmployee(): void {

    this.employeeService.getEmployeeById(this.employeeId).subscribe({

      next: (employee) => {

        this.employeeForm.patchValue({
          name: employee.name,
          email: employee.email,
          age: employee.age,
          department: employee.department
        });

        this.isLoading = false;
        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Error loading employee:', error);
        this.isLoading = false;
        this.notificationService.show('Person not found.', 'danger');
        this.router.navigate(['/']);
      }

    });
  }

  onSubmit(): void {

    if (this.employeeForm.invalid || this.isSubmitting) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.employeeService.updateEmployee(
      this.employeeId,
      this.employeeForm.value
    ).subscribe({

      next: () => {
        this.notificationService.show('Person updated successfully.', 'success');
        this.router.navigate(['/']);
      },

      error: (error) => {
        console.error('Error updating employee:', error);
        this.notificationService.show('Unable to update person.', 'danger');
        this.isSubmitting = false;
      }

    });
  }
}