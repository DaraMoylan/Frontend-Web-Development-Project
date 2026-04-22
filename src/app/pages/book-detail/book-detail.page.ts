import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton,
  IonSpinner,
  IonBackButton,
  IonButtons,
  IonIcon,
 } from '@ionic/angular/standalone';
 import { addIcons } from 'ionicons';
 import { addCircleOutline, removeCircleOutline, shareSocialOutline } from 'ionicons/icons';
 import { BookService, Book } from '../../services/book';
 import { StorageService } from '../../services/storage';
 import { ActivatedRoute } from '@angular/router';
 import { Share } from '@capacitor/share';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSpinner, IonBackButton, IonButtons, IonIcon, CommonModule, FormsModule]
})
export class BookDetailPage implements OnInit {

  book: Book | null = null;
  loading = true;
  isSaved = false;

  constructor(
    private route: ActivatedRoute,
    public bookService: BookService, 
    private storageService: StorageService
  ) { 
    addIcons({ addCircleOutline, removeCircleOutline, shareSocialOutline });
  }

  ngOnInit() {

    const key = this.route.snapshot.paramMap.get('id');
    if(key) { 
      const fullKey = `/works/${key}`;
      this.bookService.getBookDetails(fullKey).subscribe((book) => { 
        this.book = book;
        this.loading = false; 
        this.checkIfSaved();
      });
    }
  }

  async checkIfSaved() { 
    if(this.book) { 
      this.isSaved = await this.storageService.isBookSaved(this.book.key);
    }
  }

  async toggleSave() { 
    if(!this.book) return;
    if(this.isSaved) { 
      await this.storageService.removeBook(this.book.key);
    } 
    else { 
      await this.storageService.addBook(this.book);
    }
    this.isSaved = !this.isSaved;
  }

  async shareBook() { 
    if(!this.book) return;

    await Share.share({
      title: this.book.title, 
      text: `Check out "${this.book.title}" by ${this.book.author}`,
      url: `https://openlibrary.org${this.book.key}`
    });
  }
}