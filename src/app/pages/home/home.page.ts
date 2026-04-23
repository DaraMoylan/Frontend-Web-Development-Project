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
import { StorageService } from 'src/app/services/storage';


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
  totalBooks: number = 0;
  finishedBooks: number = 0;

  constructor(public bookService: BookService, private router: Router, private storageService: StorageService) { }

  async ionViewWillEnter() { 
    const readingList = await this.storageService.getReadingList();
    this.totalBooks = readingList.length;
    this.finishedBooks = 0;

    for(let i = 0; i < readingList.length; i++) { 
      if(readingList[i].status === 'finished') { 
        this.finishedBooks++;
      }
    }
  }

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
