import { type QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export type QuestionAttachmentRepository = {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
}
