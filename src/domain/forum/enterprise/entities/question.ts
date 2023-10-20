import { Slug } from './value-objects/slug'
import { type UniqueEntityId } from '@/core/entities/unique-entity-id'

import { type Optional } from '@/core/@types/optional'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { QuestionAttachmentList } from './question-atachment-list'
import { QuestionBestAnswerChosenEvent } from '../events/question-best-answer-chosen-event'

export interface QuestionProps {
  slug: Slug
  title: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
  attachments: QuestionAttachmentList
  authorId: UniqueEntityId
  bestAswerId?: UniqueEntityId | null
}

export class Question extends AggregateRoot<QuestionProps> {
  get content() {
    return this.props.content
  }

  set content(value: string) {
    this.props.content = value
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get title() {
    return this.props.title
  }

  set title(value: string) {
    this.props.title = value
    this.props.slug = Slug.createFromText(value)
    this.touch()
  }

  get bestAswerId() {
    return this.props.bestAswerId
  }

  set bestAswerId(value: UniqueEntityId | undefined | null) {
    if (this.bestAswerId && this.bestAswerId !== this.props.bestAswerId) {
      this.addDomainEvent(
        new QuestionBestAnswerChosenEvent(this, this.bestAswerId),
      )
    }

    this.props.bestAswerId = value
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList([]),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
