import { AppDataSource } from '../../data-source';
import { NextFunction, Request, Response } from 'express';
import { Question } from '../../entity/Questions';
import { Publication } from '../../entity/Publication';
import { Any } from 'typeorm';

export class QuestionController {
    private questionRepository = AppDataSource.getRepository(Question);

    async all(request: Request, response: Response, next: NextFunction) {
        const questions = await this.questionRepository.find({
            relations: {
                publication: {
                    user: true
                },
            },
            select: {
                question: true,
                answer: true,
                publication: {
                    name: true,
                    user: {
                        name: true
                    }
                }
            }
        });
        return (questions);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const question = await this.questionRepository.findOne({
                where: { id },
                relations: {
                    publication: {
                        user: true
                    }
                },
                select: {
                    id: true,
                    question: true,
                    answer: true,
                    publication: {
                        name: true,
                        user : {
                            name: true
                        }
                    },
                }
            });
            if (!question) {
                return response.json({ message: "La pregunta que se busca no existe" }) // REVISAR RESPUESTA YA QUE DA ERROR DE HEADERS
            }
            return (question);
        } catch (error) {
            response.json({ message: "Ha ocurrido un error trayendo una pregunta", error: error.detail })
        }

    };

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const { question, answer, publication_id } = request.body;
            const questionCreate = this.questionRepository.create({
                question,
                answer,
                publication: {
                    id: publication_id
                }
            });
            const results = await this.questionRepository.save(questionCreate);
            return results;
        } catch (error) {
            response.json({ message: "Ha ocurrido un error creando una pregunta con su respuesta", error: error.detail })
        }

    };

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);
            const questionToRemove = await this.questionRepository.findOneBy({ id });
            if (!questionToRemove) {
                response.json({ message: "La pregunta que intenta eliminar no existe" })
            }
            await this.questionRepository.remove(questionToRemove);
            response.json({ message: "La pregunta se ha borrado de forma exitosa" })

        } catch (error) {
            response.json({ message: "Ha ocurrido un error eliminando una pregunta con su respuesta", error: error.detail })
        }
    };

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const questionUpdate = await this.questionRepository.findOne({
                where: { id },
            });
            if (!questionUpdate) {
                return response.json({ message: "No se encontró la pregunta a actualizar"})
            }
            const { question, answer } = request.body;
            questionUpdate.question = question;
            questionUpdate.answer = answer;
            await this.questionRepository.save(questionUpdate);
            return questionUpdate;
        } catch (error) {
             response.json({ message: "Ha ocurrido un error actualizando una pregunta con su respuesta", error: error.detail })
        }

    }
}