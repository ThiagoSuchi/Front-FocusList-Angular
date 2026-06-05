import { Component, signal, type OnDestroy, type OnInit } from '@angular/core';

@Component({
  selector: 'app-design-auth',
  imports: [],
  templateUrl: './design-auth.html',
  styleUrl: './design-auth.css',
})
export class DesignAuth implements OnInit, OnDestroy {
  words = ['sempre.', 'hoje.', 'mais.'];
  currentIndex = signal(0);
  animated = signal(false);
  private interval: any;

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.animated.set(true);

      setTimeout(() => {
        this.currentIndex.update(i => (i + 1) % this.words.length);
        this.animated.set(false)
      }, 400);
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
