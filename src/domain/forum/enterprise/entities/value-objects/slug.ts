export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string): Slug {
    return new Slug(slug)
  }

  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/, '-')
      .replace(/--+/, '-')
      .replace(/^-/, '')
      .replace(/-$/, '')

    return new Slug(slugText)
  }
}
