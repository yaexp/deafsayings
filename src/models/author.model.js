export class Author {

  constructor({
    id,
    name,
    biography,
    placeOfBirth,
    yearOfBirth,
    yearOfDeath,
    status,
  }) {
    this.id = id;
    this.name = name;
    this.biography = biography;
    this.placeOfBirth = placeOfBirth;
    this.yearOfBirth = yearOfBirth;
    this.yearOfDeath = yearOfDeath;
    this.status = status;
  }

  getLifetime() {
    return [this.yearOfBirth, this.yearOfDeath]
      .filter((item) => item)
      .join(' — ');
  }

  get img() {
    // :TODO: ~config paths.public.image
    return `images/author-${this.id}.jpg`;
  }

}
