import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords'
})
export class TruncateWordsPipe implements PipeTransform {
  /**
   * Truncate a given string to a specific number of words.
   * 
   * Inputs:
   *   - value: the original string to truncate
   *   - limit: the number of words to keep
   * 
   * Output:
   *   - A string containing only the first 'limit' words from the input.
   *   - Adds "..." at the end if the original string had more words than the limit.
   * 
   * Example:
   *   {{ description | truncateWords:10 }}
   *   // Returns the first 10 words of 'description', followed by "..." if longer
   */
  transform(value: string, limit: number): string {
    return value.split(' ', limit).join(' ');
  }

}
