import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar,
  IonSearchbar,
  IonList,
  IonItem,
  IonThumbnail,
  IonSpinner,
  IonLabel,
 } from '@ionic/angular/standalone';

 import {BookService, Book} from '../../services/book';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonSearchbar,
  IonList,
  IonItem,
  IonThumbnail,
  IonSpinner,
  IonLabel]
})
export class HomePage {
  searchQuery = '';
  books: Book[] = [];
  loading = false;

  constructor(public bookService: BookService, private router: Router) { }

  onSearch() { 
    if(this.searchQuery.trim().length < 2) return;
    this.loading = true;
    this.bookService.searchBooks(this.searchQuery).subscribe((results) => { 
      this.books = results;
      this.loading = false;
    });
  }

  viewBook(book: Book) {
    const id = book.key.replace('/works/', ''); 
    this.router.navigate(['/book-detail', id]);
  }

}
