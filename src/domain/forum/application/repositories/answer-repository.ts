import { PaginationParams } from '@/core/repositories/pagination-params'
import { type Answer } from '@/domain/forum/enterprise/entities/answer'

export type AnswerRepository = {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
}
