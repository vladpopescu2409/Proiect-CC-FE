import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackFormService } from 'src/app/services/feedback-form.service';
//https://stackoverflow.com/questions/50995170/angular-mattabledatasource-error
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';


import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class FeedbackFormComponent implements OnInit, AfterViewInit {
  feedbackForm: FormGroup; //Tracks the value and validity state of a group of FormControl instances.
  feedbacks: Feedback[] = []; // array that will hold the feedback object
  columnsToDisplay: string[] = [
    'id',
    'type',
    'title',
    'body',
    'createdBy',
    'rating',
    'delete'
   
  ]; //column of the tabel
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource = new MatTableDataSource(this.feedbacks);

  expandedElement!: Feedback | null;

  feedbackAuthor!: string | null;

  @Input() userRole?: string;

  constructor(private feedbackService: FeedbackFormService) {
    this.feedbackForm = new FormGroup({
      type: new FormControl('feedback'),
      title: new FormControl(''),
      body: new FormControl(''),
    });
  }
  @ViewChild('paginator') paginator!: MatPaginator;


  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getFeedbacks();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   
  }

  getFeedbacks() {
    this.feedbackService.getFeedback().subscribe((response) => {
      this.feedbacks = response.reverse();
     
      this.dataSource = new MatTableDataSource(this.feedbacks); //sets the dataSource property
     console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; //sets the paginator property
    });
  }

  //method when we submit the form
  saveFeedback() {
    //if the form is valid
    if (this.feedbackForm.valid) {
      this.feedbackService
        .addFeedback(this.feedbackForm.value)
        .subscribe(() => {
          this.feedbackForm.reset();
          this.getFeedbacks();
        });
    }
  }
  deleteFeedback(id:number ) {
    this.feedbackService.deleteFeedback(id).subscribe(() => {
      this.getFeedbacks()
    });
  }
  

  toggleFavourite(feedback: Feedback) {
    feedback.rating = !feedback.rating; //inverts the boolean value

    this.feedbackService.updateFeedback(feedback).subscribe(() => {
      this.getFeedbacks();
    });
  }
  isExpansionDetailRow = (index: number, row: any) =>
    row.hasOwnProperty('detailRow');

    collapseAll() {
      this.expandedElement = null;
    }
    
  
    }

