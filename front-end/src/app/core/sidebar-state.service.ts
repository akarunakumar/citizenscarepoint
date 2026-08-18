import { Injectable, signal } from '@angular/core';

/**
 * Replaces the old nav.js pattern of manually toggling CSS classes on
 * DOM elements. Header and Sidebar are separate components that don't
 * know about each other directly — this shared, injectable service is
 * the idiomatic Angular way to let them communicate.
 */
@Injectable({ providedIn: 'root' })
export class SidebarStateService {
  isOpen = signal(false);

  toggle(): void {
    this.isOpen.update((value: boolean) => !value);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
