import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgoPipe'
})
export class TimeAgoPipePipe implements PipeTransform {

  transform(value: Date | string, ...args: unknown[]): string {
    const now = new Date().getTime();
    const past = new Date(value).getTime();
    const diff = now - past;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

}
