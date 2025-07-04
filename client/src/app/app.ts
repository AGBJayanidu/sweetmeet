import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected title = 'SweetMeet';
  protected members = signal<any>([])

  // ngOnInit(): void {
  //     this.http.get('https://localhost:5001/api/members').subscribe({
  //       next: response => this.members.set(response),
  //       error: error => console.log(error),
  //       complete: () => console.log('Completed the http request')
  //     })
  // }

  async ngOnInit() {
      this.members.set(await this.getMembers())
  }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
