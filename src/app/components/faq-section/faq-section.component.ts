import { Component, Input, OnInit } from '@angular/core';
import { FaqContent } from 'src/app/models/faq';
import { MatDialog } from '@angular/material/dialog';
import { FaqService } from 'src/app/services/faq.service';
import { AddFaqModalComponent } from '../add-faq-modal/add-faq-modal.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



// to filter by title used this tutorial: https://www.youtube.com/watch?v=lTOQ7Fjhcvk

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.css']
})
export class FaqSectionComponent implements OnInit {

  @Input() userRole?: string;

  modalCloseCause:string = '';

  // all categories, helps us structure in html - put every item in its category an later
  faqCategories: string[] = [
    
     "Important_HR_announcement",
     "Upcoming_events",
     "Policy_changes",
     "Training_opportunities",
     "News"
  ];

  faqsByCategory: {[key: string]: FaqContent[]} = {};
  faqs: FaqContent[] = [];
  _filterText: string = ''; 
  filteredFaqs: FaqContent [] = []; 
  filteredFaqsByCategory: {[key: string]: FaqContent[]} = {};
  // Add a new field to remember which category we're dragging from
draggingFromCategory!: string;


get filterText(){
  return this._filterText;
}

set filterText(value: string){
  this._filterText = value; //equal to what we add in the text box
  this.filterFaqs(); //whenever the text is changed we reimplement filterArticles() also due to NgModel we get the result of this function
}
constructor(
  private faqsService: FaqService,
  public dialog: MatDialog
) {}
ngOnInit() {
    
  console.log('Faq content component works');
  this.getFaqs();
  
}
getFaqs() {
  this.faqsService.getFaqContent().subscribe((response) => { // makes hhtp request - fetches the faqs - sends back the response
    this.faqCategories.forEach(category => { //This line is looping through each category in the faqCategories array
      this.faqsByCategory[category] = response.filter(faq => faq.category === category); // so for each item in the key category we add the faq for instance we will have "Recruitment & Onboarding": [{...faq1}, etc.
    });
    this.filterFaqs(); 
    console.log(response);
    
  });
}
editFaq(faq: FaqContent) {
  const dialogRef = this.dialog.open(AddFaqModalComponent, {
    data: { ...faq }
  });
  dialogRef.afterClosed().subscribe(result => {
    this.modalCloseCause = result;
    this.getFaqs();
  });
}






addPDF(faq:FaqContent) {
  const dialogRef = this.dialog.open(AddFaqModalComponent, {
    data: {...faq, documentState:'editPDF' }
  });
  dialogRef.afterClosed().subscribe(result => {
    this.modalCloseCause = result;
    this.getFaqs();
  });
}



downloadPDF(id:number): void {
  this.faqsService.getPDF(id).subscribe((file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = `document_${id}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  });
}
// The downloadPDF() method is called when the user clicks the "Download PDF" button.
// It retrieves the id from the faqContent object (assuming you have the faqContent property containing the data).
// The getPDF(id) method is called on your service to fetch the PDF file as a File object.
// The subscribe() function is used to handle the response and trigger the download process.
// Inside the subscription, a temporary URL is created using URL.createObjectURL() for the File object.
// A dynamic <a> element is created, and the temporary URL and desired filename are set.
// The link is triggered programmatically using link.click(), initiating the download of the PDF file.
// After the download is completed, URL.revokeObjectURL() is called to release the temporary URL.









addFaq() {
  const dialogRef = this.dialog.open(AddFaqModalComponent, {
    data: { category:'',title: '', content: '' , orderNumber:'', documentUrl:''}
  });
  dialogRef.afterClosed().subscribe(result => {
    this.modalCloseCause = result;
    this.getFaqs();
  });
}

deleteFaq(id:number ) {
  this.faqsService.deleteFaqContent(id).subscribe(() => {
    this.modalCloseCause = 'faqDeleteSuccess'
    this.getFaqs();
  });
}

//filters the articles and keeps the ones where what we add in the textbox exists in a faq title - it will still show by category
filterFaqs() {
  if (this._filterText === '') {
    this.filteredFaqsByCategory = {...this.faqsByCategory}; // if filter empty - create a new object with the same properties and values as this.faqsByCategory
  } else {
    for (let category of this.faqCategories) { // the function goes through each category in this.faqCategories using a for loop - then filters based on what was written in the textbox
      this.filteredFaqsByCategory[category] = this.faqsByCategory[category].filter((faq) => {

        console.log('FAQ #'+faq.id+ ' Document State: '+faq.documentState+' Document URL: '+faq.documentUrl+' faqFilePath: '+faq.faqFilePath) 

         //found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#searching_in_array
        return faq.title.toLowerCase().includes(this._filterText.toLowerCase()); // the filtered Faqs gets the filtered items that match the filter for the title and then are presented on the page - see filteredFaqsByCategory[category] in html
        
      });
    }
  }
}



//when you drop an item checks if is in the same category then updates the order
drop(event: CdkDragDrop<FaqContent[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.updateFaqOrders(event.container.data);
  }
}
// updates the faq order and sends the update to the database
updateFaqOrders(faqs: FaqContent[]) {
  faqs.forEach((faq, index) => {
    faq.orderNumber = index + 1;
    this.faqsService.updateFaqContent(faq).subscribe();
  });
}

// Method to remember from which category we're starting the drag
startDrag(category: string) {
  this.draggingFromCategory = category;
}

// This is how we change the display name of the categories in the HTML
categoryDisplayNames: {[key: string]: string} = {

  "Important_HR_announcement": "Payroll and Compensation",
  "Upcoming_events": "Performance",
  "Policy_changes": "Time Off and Leave",
  "Training_opportunities": "Training and Development",
  "News": "Workplace Safety"
};
//Method that uses scrollIntoView to get you to your desired category section
scrollToCategory(category: string) {
  const element = document.getElementById(category);
  if (element) {
    element.scrollIntoView();
  }
}

}