import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Question } from "../entity/Questions";


export class QuestionSeeder implements Seeder{
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const questionRepository = dataSource.getRepository(Question)

        const questionData = [{
            question : '¿Qué es un saurópodo gigante y cuál es su característica principal?',
            answer : 'Los saurópodos gigantes son un grupo de dinosaurios herbívoros de cuello largo y cola larga que vivieron en la Tierra hace millones de años. Su característica principal es su gran tamaño, que puede alcanzar más de 30 metros de largo y pesar hasta 100 toneladas.',
            publication : {
                id: 1
            }
        }, {
            question : '¿Dónde se encontraron los restos fósiles del nuevo dinosaurio y cuántos años se estima que tiene?',
            answer : 'Los restos fósiles del nuevo dinosaurio se encontraron en la Patagonia argentina. Se estima que el dinosaurio vivió hace unos 90 millones de años.',
            publication : {
                id: 1
            }
        }, {
            question : '¿Qué se ha lanzado por parte de la empresa desarrolladora del videojuego más popular del momento?',
            answer : 'La empresa desarrolladora del videojuego más popular del momento ha lanzado una nueva versión del juego con más niveles y personajes.',
            publication : {
                id: 2
            }
        }, {
            question : '¿Qué impacto ha tenido el lanzamiento de esta nueva versión en los fanáticos del videojuego?',
            answer : 'Los fanáticos del videojuego están emocionados por las nuevas características y desafíos que les esperan en la nueva versión del juego, lo que sugiere un impacto positivo en su entusiasmo y compromiso con el juego.',
            publication : {
                id: 2
            }
        }, {
 
            question : '¿Qué tipo de atracciones ofrece el nuevo parque temático de dinosaurios?',
            answer : 'El nuevo parque temático de dinosaurios ofrece una réplica de un hábitat jurásico, dinosaurios robóticos en acción, oportunidades para aprender sobre la historia y la ciencia de los dinosaurios, y actividades para niños como excavaciones de fósiles y montañas rusas temáticas.',
            publication : {
                id: 3
            }
        }, {
            question : '¿Qué puede esperar un visitante al parque temático de dinosaurios en términos de experiencia educativa y de entretenimiento?',
            answer : 'Un visitante al parque temático de dinosaurios puede esperar una experiencia educativa y de entretenimiento emocionante y atractiva, que incluye la oportunidad de aprender sobre la historia y la ciencia de los dinosaurios, interactuar con dinosaurios robóticos y disfrutar de atracciones temáticas para niños y adultos.',
            publication : {
                id: 3
            }
        }, {
            question : '¿Qué hace el robot creado por el grupo de estudiantes de ingeniería?',
            answer : 'El robot creado por el grupo de estudiantes de ingeniería está programado para ayudar a personas mayores en sus tareas diarias, incluyendo la limpieza del hogar, la movilidad y la carga de objetos pesados.',
            publication : {
                id: 4
            }
        }, {
            question : '¿Cómo ha sido recibido el invento por la comunidad de personas mayores y cuál es el siguiente paso para el robot?',
            answer : 'El invento ha sido muy bien recibido por la comunidad de personas mayores, lo que sugiere que hay una demanda real para este tipo de tecnología. El siguiente paso es la comercialización del robot, que se espera que esté disponible en el mercado en un futuro próximo.',
            publication : {
                id: 4
            }
        }, {
            question : '¿Qué ha anunciado la NASA recientemente?',
            answer : 'La NASA ha anunciado el descubrimiento de un nuevo planeta fuera del sistema solar llamado Kepler-452b.',
            publication : {
                id: 5
            }
        }, {
            question : '¿Qué se sabe hasta ahora sobre el nuevo planeta y qué posibilidades existen sobre su habitabilidad?',
            answer : 'El nuevo planeta Kepler-452b tiene un tamaño similar al de la Tierra y se encuentra a unos 1400 años luz de distancia. Los científicos creen que podría tener condiciones similares a las de nuestro planeta y estar en la zona habitable de su estrella, lo que sugiere que podría ser un candidato para la habitabilidad.',
            publication : {
                id: 5
            }
        }, {
            question : '¿Qué descubrieron los astrónomos y cómo se llama el planeta?',
            answer : 'Los astrónomos descubrieron un nuevo exoplaneta llamado Kepler-438b que podría ser habitable.',
            publication : {
                id: 6
            }
        }, {
            question : '¿Qué características tiene Kepler-438b que lo hacen un posible candidato para la habitabilidad?',
            answer : 'Kepler-438b tiene una masa similar a la de la Tierra, y los científicos creen que su atmósfera podría ser similar a la de nuestro planeta, lo que lo convierte en un posible candidato para la habitabilidad y la presencia de vida.',
            publication : {
                id : 6
            }
        }, {
            question : '¿Qué misión espacial fue lanzada por el cohete Ariane 5 y a dónde se dirige?',
            answer : 'La misión europea Juice fue lanzada por el cohete Ariane 5 y se dirige a Júpiter y a sus tres grandes lunas oceánicas: Calisto, Europa y Ganímedes.',
            publication : {
                id: 7
            }
        }, {
            question : '¿Qué objetivo tiene la misión Juice y qué instrumentos lleva a bordo?',
            answer : 'El objetivo de la misión Juice es estudiar si los satélites de Júpiter reúnen condiciones de habitabilidad. La misión lleva a bordo diez instrumentos de última generación para llevar a cabo esta tarea.',
            publication : {
                id: 7
            }
        }, {
            question : '¿Cuál es la preocupación actual sobre el hielo de la Antártica?',
            answer : 'La preocupación actual es que se está derritiendo cada vez más rápido, lo que podría provocar el colapso en un futuro cercano de varios grandes glaciares.',
            publication : {
                id: 8
            }
        }, {
            question : '¿Qué entidad reveló que el hielo marino que rodea el continente antártico se redujo a su mínimo histórico en 45 años?',
            answer : 'El Centro Nacional de Datos de Hielo y Nieve de Estados Unidos (Nsidc, sus siglas en inglés) reveló en febrero que el hielo marino que rodea el continente se redujo a 1,91 millones de kilómetros cuadrados, registrando su mínimo histórico en 45 años.',
            publication : {
                id: 8
            }
        }, {
            question : '¿Qué es "El Niño" y qué efectos puede tener en el clima mundial?',
            answer : 'El Niño" es un fenómeno meteorológico que desencadena sequías e inundaciones y provoca aumento de temperaturas en distintas partes del mundo. Puede afectar la producción de alimentos, el suministro de agua potable y la seguridad energética, entre otros aspectos.',
            publication : {
                id: 9
            }
        }, {
            question : '¿Cuáles son las posibilidades de que se desencadene "El Niño" antes de septiembre según la Organización Meteorológica Mundial?',
            answer : 'Según la Organización Meteorológica Mundial, las posibilidades de que se desencadene "El Niño" antes de julio son del 60%, mientras que la probabilidad de que el fenómeno comience entre julio y septiembre se eleva hasta el 80%.',
            publication : {
                id: 9
            }
        }, {
            question : '¿Por qué el fotógrafo alemán rechazó el premio en el concurso de fotografía Sony World Photography Awards?',
            answer : 'El fotógrafo alemán rechazó el premio al decir que solo había postulado para ver si los jueces estaban preparados para diferenciar una imagen real de una generada por IA.',
            publication : {
                id: 10
            }
        }, {
            question : '¿Qué dificultades se han presentado en ocasiones para reconocer si una fotografía fue generada por inteligencia artificial o fue tomada en el mundo real?',
            answer : 'En ocasiones, resulta difícil reconocer si una fotografía fue generada por inteligencia artificial o fue tomada en el mundo real, lo que destaca las dificultades que se presentan para diferenciar entre las dos opciones.',
            publication : {
                id: 10
            }
        }]

        const newQuestion = questionRepository.create(questionData)
        await questionRepository.save(newQuestion)
    }
}