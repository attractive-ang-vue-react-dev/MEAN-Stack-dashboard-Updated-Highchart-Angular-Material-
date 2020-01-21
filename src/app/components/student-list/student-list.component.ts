import { Student } from './../../shared/student';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  StudentData: any = [];
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'student_name', 'student_email', 'section', 'action'];

  constructor(private studentApi: ApiService) {
    this.studentApi.GetStudents().subscribe(data => {
      this.StudentData = data;
      this.dataSource = new MatTableDataSource<Student>(this.StudentData);
      console.log(this.StudentData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() {
  }

  deleteStudent(index: number, e) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.studentApi.DeleteStudent(e._id).subscribe();
    }
  }

}
