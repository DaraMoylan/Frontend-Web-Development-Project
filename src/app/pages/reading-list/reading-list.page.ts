import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonList, 
  IonItem,
  IonLabel,
  IonThumbnail,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonSelect,
  IonSelectOption,

 } from '@ionic/angular/standalone';

 import { StorageService } from '../../services/storage';
 import { BookService, Book } from '../../services/book';
 import { Router } from '@angular/router';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.page.html',
  styleUrls: ['./reading-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonList, 
  IonItem,
  IonLabel,
  IonThumbnail,
  IonItemSliding,
  IonItemOptions,
  IonItemOption, 
  IonSelect,
  IonSelectOption, CommonModule, FormsModule]
})
export class ReadingListPage {

  books: Book[] = [];


  constructor(
    private storageService: StorageService,
    public bookService: BookService, 
    private router: Router
  ) { }

  async ionViewWillEnter() { 
    this.books = await this.storageService.getReadingList();
  }

  viewBook(book: Book) { 
    const id = book.key.replace('/works/', '');
    this.router.navigate(['/book-detail', id]);
  }

  async removeBook(bookKey: string) { 
    await this.storageService.removeBook(bookKey);
    this.books = await this.storageService.getReadingList();
  }

  async updateStatus(book: Book) { 
    if(book.status)  { 
      await this.storageService.updateBookStatus(book.key, book.status);
    }
  }
}
