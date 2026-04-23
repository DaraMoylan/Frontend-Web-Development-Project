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
  IonSegment,
  IonSegmentButton

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
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  CommonModule, FormsModule]
})
export class ReadingListPage {

  allBooks: Book[] = [];
  filteredBooks: Book[] = [];
  activeFilter = 'all';


  constructor(
    private storageService: StorageService,
    public bookService: BookService, 
    private router: Router
  ) { }

  async ionViewWillEnter() { 
    this.allBooks = await this.storageService.getReadingList();
    this.applyFilter();
  }

  applyFilter() { 
    if(this.activeFilter === 'all')  {
      this.filteredBooks = this.allBooks;
    }
    else { 
      this.filteredBooks = [];

      for(let i = 0; i < this.allBooks.length; i++) { 
        if(this.allBooks[i].status === this.activeFilter) { 
          this.filteredBooks.push(this.allBooks[i]);
        }
      }
    }
  }

  onFilterChange(event: any) { 
    this.activeFilter = event.detail.value;
    this.applyFilter();
  }


  viewBook(book: Book) { 
    const id = book.key.replace('/works/', '');
    this.router.navigate(['/book-detail', id]);
  }

  async removeBook(bookKey: string) { 
    await this.storageService.removeBook(bookKey);
    this.allBooks = await this.storageService.getReadingList();
    this.applyFilter();
  }

  async updateStatus(book: Book) { 
    if(book.status)  { 
      await this.storageService.updateBookStatus(book.key, book.status);
      this.applyFilter();
    }
  }
}
