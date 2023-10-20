import { type AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export type AnswerAttachmentRepository = {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
