import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SignalPipe } from './pipes/signal.pipe';

/**
 *
 */
@Component({
  imports: [RouterOutlet, SignalPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('FindMovies');
}
