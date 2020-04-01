import { Author } from './author.model';

export class Quote {

  constructor({
    id,
    text,
    author,
    size,
  }) {
    this.id = id;
    this.text = text;
    this.size = size;
    this.author = new Author(author);
  }

}
