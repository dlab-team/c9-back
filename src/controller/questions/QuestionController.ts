import { AppDataSource } from "../../data-source";
import { NextFunction, Request, Response } from "express";
import { Question } from "../../entity/Questions";
import { Publication } from "../../entity/Publication";
import { Any } from "typeorm";

export class QuestionController {
  private questionRepository = AppDataSource.getRepository(Question);
    public all = async (request: Request, response: Response, next: NextFunction) => {
        try {
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
            return response.status(200).json(questions)
        } catch (error) {
            return response.status(400).json({ message: "Ha ocurrido un error obteniendo todas las Preguntas", error: error.detail })
        }
    }
    public one = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = parseInt(request.params.id);
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
                        user: {
                            name: true
                        }
                    },
                }
            });
            if (!question) {
                return response.status(404).json({ message: "La pregunta que se busca no existe" })
            }
            return response.status(200).json(question)
        } catch (error) {
            return response.status(400).json({ message: "Ha ocurrido un error obteniendo una pregunta", error: error.detail });
        }

    };

    public save = async (request: Request, response: Response, next: NextFunction) => {
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
            return response.status(201).json(results);
        } catch (error) {
            return response.status(400).json({ message: "Ha ocurrido un error creando una pregunta con su respuesta", error: error.detail });
        }

    };

    public remove = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = parseInt(request.params.id);
            const questionToRemove = await this.questionRepository.findOneBy({ id });
            if (!questionToRemove) {
                return response.status(404).json({ message: "La pregunta que intenta eliminar no existe" });
            }
            await this.questionRepository.remove(questionToRemove);
            return response.status(200).json({ message: "La pregunta se ha borrado de forma exitosa" });
        } catch (error) {
            return response.status(400).json({ message: "Ha ocurrido un error eliminando una pregunta con su respuesta", error: error.detail });
        }
    };

    public update = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = parseInt(request.params.id);
            const questionUpdate = await this.questionRepository.findOne({
                where: { id },
            });
            if (!questionUpdate) {
                return response.status(404).json({ message: "No se encontró la pregunta a actualizar" });
            }
            const { question, answer } = request.body;
            questionUpdate.question = question;
            questionUpdate.answer = answer;
            await this.questionRepository.save(questionUpdate);
            return response.status(200).json(questionUpdate);
        } catch (error) {
            return response.status(400).json({ message: "Ha ocurrido un error actualizando una pregunta con su respuesta", error: error.detail });
        }
    }
  }

