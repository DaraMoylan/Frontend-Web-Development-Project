import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Book } from './book';


@Injectable({
  providedIn: 'root',
})

export class StorageService {
  private storageReady = false;

  
  constructor(private storage: Storage) { 
    this.init();
  }

  async init() { 
    await this.storage.create();
    this.storageReady = true;
  }


  async getReadingList(): Promise<Book[]> { 
    if(!this.storageReady) { 
      await this.init();
    }
    const books = await this.storage.get('reading-list');
    return books || [];
  }

  // 
  async addBook(book: Book): Promise<void> { 
    const books = await this.getReadingList();
    let exists = false;
    for(let i = 0; i < books.length; i++) { 
      if(books[i].key === book.key) { 
        exists = true;
        break;
      }
    }

    if(!exists) { 
      book.status = 'to-read';
      books.push(book);
      await this.storage.set('reading-list', books);
    }
  }

  async removeBook(bookKey: string): Promise<void> { 
    let books = await this.getReadingList();
    let filtered = [];
    for(let i = 0; i < books.length; i++) { 
      if(books[i].key !== bookKey) { 
        filtered.push(books[i]);
      }
    }
    await this.storage.set('reading-list', filtered);
  }

  async isBookSaved(bookKey: string): Promise<boolean> { 
    const books = await this.getReadingList();
    
    for(let i = 0; i < books.length; i++) { 
      if(books[i].key === bookKey) { 
        return true;
      }
    }
    return false;
  }

  async updateBookStatus(bookKey: string, status: string): Promise<void> { 

    let books = await this.getReadingList();

    for(let i = 0; i < books.length; i++)  {
      if(books[i].key === bookKey) { 
        books[i].status = status;
        break;
      }
    }
    await this.storage.set('reading-list', books);
  }
}
