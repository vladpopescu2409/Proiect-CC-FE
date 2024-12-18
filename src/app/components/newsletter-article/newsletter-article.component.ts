import { Component, Input, OnInit } from '@angular/core';
import { NewsletterArticle } from 'src/app/models/newsletter-article';
import { MatDialog } from '@angular/material/dialog';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { AddArticleModalComponent } from '../add-article-modal/add-article-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


// to filter by title used this tutorial: https://www.youtube.com/watch?v=lTOQ7Fjhcvk

@Component({
  selector: 'app-newsletter-article',
  templateUrl: './newsletter-article.component.html',
  styleUrls: ['./newsletter-article.component.css'],
})
export class NewsletterArticleComponent implements OnInit {

  @Input() userRole?: string;

  articles: NewsletterArticle[] = [];
  _filterText: string = '';
  filteredArticles: NewsletterArticle[] = [];
  //this is for pagination, starting page
  p: number = 1;
  selectedCategory: string = '';
  

  modalCloseCause:string = ''; 

  get filterText() {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value; //equal to what we add in the text box
    this.filterArticles(); //whenever the text is changed we reimplement filterArticles() also due to NgModel we get the result of this function
  }


  constructor(
    private articlesService: NewsletterService,
    public dialog: MatDialog,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }
  ngOnInit() {
    this.getArticles();
  }



  getArticles() {
    this.articlesService.getNewsletterArticles().subscribe((response) => {

      // this.articles = response.sort((a, b) => b.orderNumber - a.orderNumber); // nu e good practice si ar trebui din backend sa sortam aceste articole ca cel nou sa fie in fata
      this.articles = response.reverse(); // nu e good practice si ar trebui din backend sa sortam aceste articole ca cel nou sa fie in fata
      this.filteredArticles = this.articles; // we make sure that filteredArticles array is a copy of articles | we will use filteredArticles in our function
      console.log(response);

      this.filteredArticles.forEach((article) => {
        this.getCoverImage(article)
      })

    });
  }
  editArticle(article: NewsletterArticle) {

    const dialogRef = this.dialog.open(AddArticleModalComponent, {
      data: { ...article }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.modalCloseCause = result;
      this.getArticles();
    }); 
    
  }


  editCoverImage(article: NewsletterArticle) {

    const dialogRef = this.dialog.open(AddArticleModalComponent, {
      data: { ...article, coverImageState: 'editCoverImage' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.modalCloseCause = result;
      this.getArticles();
    });

  }



  getCoverImage(article: NewsletterArticle) {
    
      this.articlesService.getCoverImage(article.id).subscribe((response: Blob) => {
        const reader = new FileReader();  // FileReader class allows reading the contents of files
        reader.onloadend = () => { // Assigns a callback function to the onloadend event of the FileReader. The callback function will be executed when the reading operation is completed.
          article.coverImageUrl = reader.result;
          // The result property of the FileReader contains the loaded data as a data URL string.
          // The data URL represents the profile picture in a format that can be directly used as the source (src) for an <img> tag.  
        };
        reader.readAsDataURL(response);
        // initiates the reading operation by calling the readAsDataURL method of the FileReader.
        // The response object, which is a Blob representing the profile picture, is passed as an argument to read its contents.
      });
  }

  addArticle() {
    // Getting the last article in the articles list.  If the list is empty, lastArticle will be undefined.
    //const lastArticle = this.articles[this.articles.length - 1];
    // If lastArticle exists, get its orderNumber and add 1 to it. If lastArticle doesn't exist, set newOrderNumber to 1.
    //const newOrderNumber = lastArticle ? lastArticle.orderNumber + 1 : 1;

    const dialogRef = this.dialog.open(AddArticleModalComponent, {

      data: { title: '', createdBy: '', createdDate: '', content: '', contentType: '' }

    });
    dialogRef.afterClosed().subscribe(result => {
      this.modalCloseCause = result;
      this.getArticles();
    });
  }
  deleteArticle(id: number) {
    this.articlesService.deleteNewsletterArticle(id).subscribe(() => {
      this.modalCloseCause = 'articleDeleteSuccess'
      this.getArticles()
    });
  }
  //filters the articles and keeps the ones where what we add in the textbox exists in an article title

  filterArticles() {

    this.filterByCategory();

    if (this.articles.length === 0 || this._filterText === '') {
      // this.filteredArticles = this.articles; // if the textbox is empty or we have no articles we keep the status quo 
      //-- this one above is required if we don't implement the filter by category (there is already this.filteredArticles = this.articles; in the filter by category) - now if the field is empty do nothing - 
    } else {
      //found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#searching_in_array
      this.filteredArticles = this.articles.filter((article) => //filter function creates a new array which includes only the items that match the filter - article is a parameter that reprisents one item of the articles array
      {
        return article.title.toLowerCase().includes(this._filterText.toLowerCase()); // we return each article that includes whats written in the textbox
      })
    }

  }

  filterByCategory() {
    // We copy all the articles in filteredArticles
    this.filteredArticles = this.articles; //required so we always revert to the full articles

    // Filter by category if a category is selected
    if (this.selectedCategory !== '') {
      this.filteredArticles = this.articles.filter(article => article.contentType === this.selectedCategory);
    }



  }
}