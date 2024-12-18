import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsletterArticle } from 'src/app/models/newsletter-article';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-full-detailed-article',
  templateUrl: './full-detailed-article.component.html',
  styleUrls: ['./full-detailed-article.component.css']
})
export class FullDetailedArticleComponent implements OnInit {
  articleId: string = '';
  article: NewsletterArticle | undefined;

  constructor(
    private route: ActivatedRoute,
    private articlesService: NewsletterService,
    private userService: UserService
  ) { }

  //this function on initialisation will fetch the value of the 'id' from the rest of parameters. Also this.articleId is never null so we can implement getArticle + parseint makes from string an integer
  //https://medium.com/@tiboprea/accessing-url-parameters-in-angular-snapshot-vs-subscription-efc4e70f9053

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.articleId = id !== null ? id : '';
    this.getArticle(parseInt(this.articleId));
  }
  // response is the data that we require 
  getArticle(id: number) {
    this.articlesService.getNewsletterArticleById(id).subscribe((response) => {
      this.article = response;
      console.log('get article response: '+response);
      this.getCoverImage(this.article)
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


  // loadedProfileImage: string | ArrayBuffer | null = null;

  // getProfilePicture() {
  //   this.userService.getProfilePicture().subscribe((response: Blob) => {
  //     const reader = new FileReader();  // FileReader class allows reading the contents of files
  //     reader.onloadend = () => { // Assigns a callback function to the onloadend event of the FileReader. The callback function will be executed when the reading operation is completed.
  //       this.loadedProfileImage = reader.result;
  //       // The result property of the FileReader contains the loaded data as a data URL string.
  //       // The data URL represents the profile picture in a format that can be directly used as the source (src) for an <img> tag.  
  //     };
  //     reader.readAsDataURL(response);
  //     // initiates the reading operation by calling the readAsDataURL method of the FileReader.
  //     // The response object, which is a Blob representing the profile picture, is passed as an argument to read its contents.
  //   });
  // }

}