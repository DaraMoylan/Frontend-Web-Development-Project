import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
 } from '@ionic/angular/standalone';
 import { addIcons } from 'ionicons';
 import { searchOutline, bookOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, CommonModule, FormsModule]
})
export class TabsPage {

  constructor() { 
    addIcons({ searchOutline, bookOutline });
  }
}
