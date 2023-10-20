import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { type AnswerRepository } from '../repositories/answer-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

interface ChooseQuestionBestAswerUseCaseRequest {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAswerUseCase {
  constructor(
    private readonly anwersRepository: AnswerRepository,
    private readonly questionRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAswerUseCaseRequest): Promise<ChooseQuestionBestAswerUseCaseResponse> {
    const answer = await this.anwersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toValue(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toValue()) {
      return left(new NotAllowedError())
    }

    question.bestAswerId = answer.id
    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
