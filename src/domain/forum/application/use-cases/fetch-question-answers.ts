import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface FetchQuestionAnswersRequest {
  page: number
  questionId: string
}

type FetchQuestionAnswersResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswers {
  constructor(private readonly answersRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({
      answers,
    })
  }
}
