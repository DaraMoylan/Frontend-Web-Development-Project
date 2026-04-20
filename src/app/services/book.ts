import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Book {
  key: string;
  title: string;
  author: string;
  coverId: number | null;
  firstPublishYear: number | null;
}

@Injectable({
  providedIn: 'root',
})

export class BookService { 
  private apiUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) {}

  
  searchBooks(query: string): Observable<Book[]> { 
    return this.http
      .get<any>(`${this.apiUrl}?q=${encodeURIComponent(query)}&limit=20`)
      .pipe(
        map((response) => 
          response.docs.map((doc: any) => ({
            key: doc.key, 
            title: doc.title, 
            author: doc.author_name ? doc.author_name[0] : 'Unknown',
            coverId: doc.cover_i || null, 
            firstPublishYear: doc.first_publish_year || null,
          }))
        )
      );
  }

  getCoverUrl(coverId: number, size: string = 'M'): string { 
    return 'https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg';
  }
}