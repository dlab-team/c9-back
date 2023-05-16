import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Question } from "../entity/Questions";


export class QuestionSeeder implements Seeder{
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const questionRepository = dataSource.getRepository(Question)

        const questionData = [{
            question : '¿Cuál es la importancia de los bosques de algas en la Patagonia chilena en términos de captura de carbono?',
            answer : 'Los bosques de algas en la Patagonia chilena son uno de los ecosistemas que captura más carbono en el mundo, junto con la Amazonía. Tienen un poder capturador de carbono incluso mayor que el del Amazonas.',
            publication : {
                id: 1
            }
        }, {
            question : '¿Cuál es la función de los bosques de algas en el ecosistema marino de la Patagonia?',
            answer : 'Los bosques de algas en la Patagonia chilena mantienen la estructura de las costas, regulan el pH de las aguas y proporcionan un lugar de refugio, desove y alimento a invertebrados y peces. Son vitales para muchas especies, como jureles, sardinas, chungungos, huillines, locos, erizos y pulpos.',
            publication : {
                id: 1
            }
        }, {
            question : '¿Qué porcentaje de los encuestados considera que el desarrollo científico y tecnológico ha aportado al desarrollo de Chile en los últimos dos años?',
            answer : 'Según la encuesta, un 74,2% de los encuestados cree que el desarrollo científico y tecnológico ha sido un aporte al desarrollo de Chile en los últimos dos años.',
            publication : {
                id: 2
            }
        }, {
            question : '¿Cuál es la percepción de los encuestados sobre la dependencia de la ciencia y la fe?',
            answer : 'Según la encuesta, un 61,4% de los encuestados está de acuerdo con la frase "dependemos demasiado de la ciencia y no suficiente de la fe".',
            publication : {
                id: 2
            }
        }, {
 
            question : '¿Cuál es la finalidad del pangenoma humano de referencia según el director del Programa de Referencia del Genoma Humano?',
            answer : 'Según el director del Programa de Referencia del Genoma Humano, el pangenoma de alta calidad permitirá a los científicos y profesionales sanitarios comprender mejor cómo influyen las variantes genómicas en la salud y la enfermedad, avanzando hacia un futuro en el que la medicina genómica beneficie a todos.',
            publication : {
                id: 3
            }
        }, {
            question : '¿Cuál es la proporción de las secuencias genómicas utilizadas en el primer borrador del pangenoma humano según su origen étnico?',
            answer : 'Según el texto, el 51% de las secuencias genómicas utilizadas en el primer borrador del pangenoma humano son de origen africano, el 34% americano, el 13% asiático y solo un 2% europeo.',
            publication : {
                id: 3
            }
        }, {
            question : '¿Cuáles son las características principales de la pintura desarrollada por el Grupo de Investigación de Nanoóptica de la Universidad Central de Florida?',
            answer : 'La pintura desarrollada se basa en el uso de nanoestructuras de aluminio y óxido de aluminio para manipular la luz de formas que no pueden ser replicadas con pigmentaciones convencionales. Estas nanoestructuras permiten que la pintura sea multicolor y que con una sola capa se pueda colorear cualquier superficie.',
            publication : {
                id: 4
            }
        }, {
            question : '¿Cuáles son las ventajas medioambientales y económicas de la pintura desarrollada por el equipo de la Universidad Central de Florida?',
            answer : 'La pintura desarrollada es más respetuosa con el medio ambiente, ya que utiliza materiales no tóxicos y de bajo costo, como el aluminio y el óxido de aluminio. Además, la pintura es más ligera, lo que reduce la cantidad necesaria para cubrir una superficie, y más económica en comparación con las pinturas tradicionales.',
            publication : {
                id: 4
            }
        }, {
            question : '¿En qué consiste el tratamiento de donación mitocondrial (MDT) utilizado en el Reino Unido y cuál es su objetivo principal?',
            answer : 'El tratamiento de donación mitocondrial (MDT) utiliza tejido de los óvulos de mujeres donantes sanas para crear embriones en Fecundación In Vitro (FIV) libres de mutaciones dañinas que portan las madres y que podrían transmitir a sus hijos. El objetivo principal es ayudar a las mujeres con mitocondrias mutadas a tener bebés sin el riesgo de transmitir trastornos genéticos.',
            publication : {
                id: 5
            }
        }, {
            question : '¿Cuál es la proporción de ADN proveniente de cada progenitor en una guagua nacida a través del tratamiento de donación mitocondrial (MDT)?',
            answer : 'La guagua resultante tiene ADN de la madre y el padre, pero también contiene una pequeña cantidad de material genético (alrededor de 37 genes) proveniente de la donante. Aunque hay ADN de una donante, el 99,8% del ADN del recién nacido procede de la madre y el padre.',
            publication : {
                id: 5
            }
        }, {
            question : '¿En qué consiste el tratamiento de donación mitocondrial (MDT) y cuál es su objetivo principal?',
            answer : 'El tratamiento de donación mitocondrial (MDT) utiliza tejido de los óvulos de mujeres donantes sanas para crear embriones libres de mutaciones dañinas que portan las madres y que podrían transmitirse a sus hijos. El objetivo principal es evitar que los niños hereden enfermedades incurables asociadas a trastornos mitocondriales.',
            publication : {
                id: 6
            }
        }, {
            question : '¿Cómo se lleva a cabo el procedimiento de donación mitocondrial (MDT) en el Centro de Fertilidad de Newcastle en el Reino Unido?',
            answer : 'El proceso de Newcastle consta de varios pasos. Primero, se utiliza el esperma del padre para fecundar los óvulos de la madre afectada y una donante sana. Luego, se extrae el material genético nuclear del óvulo de la donante y se reemplaza con el del óvulo fertilizado de la pareja. El óvulo resultante contiene un conjunto completo de cromosomas de ambos padres y las mitocondrias sanas de la donante. Finalmente, el embrión se implanta en el útero de la madre.',
            publication : {
                id : 6
            }
        }, {
            question : '¿Qué descubrieron los astrónomos por primera vez y cuál es su relevancia para entender el futuro de la Tierra?',
            answer : 'Los astrónomos detectaron por primera vez el momento en que una estrella, sin combustible, traga un planeta. Este hallazgo es relevante porque proporciona una visión de lo que ocurrirá en aproximadamente 5.000 millones de años cuando el Sol muera y engulla los planetas interiores del sistema solar, incluida la Tierra.',
            publication : {
                id: 7
            }
        }, {
            question : '¿Cómo pudieron los científicos explicar el estallido inicial observado y qué evidencia les llevó a concluir que se trataba de un planeta chocando contra su estrella?',
            answer : 'Los científicos calcularon la cantidad total de energía liberada por la estrella desde el estallido inicial y descubrieron que era sorprendentemente pequeña en comparación con otras fusiones estelares observadas. A partir de estos datos, concluyeron que lo que se fusionó con la estrella debía ser 1.000 veces más pequeño que cualquier otra estrella conocida. Además, notaron que la masa de Júpiter es aproximadamente 1/1.000 la masa del Sol, lo que les llevó a la conclusión de que el estallido era resultado de un planeta del tamaño de Júpiter chocando contra su estrella.',
            publication : {
                id: 7
            }
        }, {
            question : '¿Qué revelaron dos estudios recientes sobre el hielo de la Antártica y cuáles podrían ser las consecuencias en el futuro?',
            answer : 'Dos estudios recientes revelaron que el hielo de la Antártica se está derritiendo cada vez más rápido, lo que podría provocar el colapso en un futuro cercano de varios grandes glaciares. El hielo marino alrededor del continente alcanzó su mínimo histórico en 45 años, y se registró un segundo nivel más bajo en la historia en marzo, con un 28% menos de masa que el promedio.',
            publication : {
                id: 8
            }
        }, {
            question : '¿Cuáles son los factores que están contribuyendo al rápido deshielo en la Antártica y cómo se retroalimentan?',
            answer : 'El aumento de las temperaturas en la Antártica se combina con otros fenómenos que se retroalimentan y aceleran el cambio climático en la región. Las precipitaciones en forma de lluvia erosionan el hielo, y la disminución del hielo marino expone al océano a una mayor radiación solar, lo que provoca un calentamiento más rápido. Estos factores contribuyen al rápido deshielo del hielo antártico.',
            publication : {
                id: 8
            }
        }, {
            question : '¿Cuáles son algunas de las recomendaciones para crear contraseñas seguras según los expertos?',
            answer : 'Algunas de las recomendaciones para crear contraseñas seguras son: utilizar contraseñas largas y complejas, mezclar letras mayúsculas y minúsculas, números y símbolos especiales, evitar datos fáciles de adivinar, no utilizar contraseñas comunes, no utilizar la misma contraseña en varios sitios y hacer uso de herramientas mnemotécnicas o gestores de contraseñas.',
            publication : {
                id: 9
            }
        }, {
            question : '¿Qué medidas adicionales se pueden tomar para mejorar la seguridad de las contraseñas y proteger la información personal en línea?',
            answer : 'Además de crear contraseñas seguras, se pueden tomar medidas adicionales como cambiar las contraseñas regularmente, no guardar las contraseñas en lugares fácilmente accesibles, no compartirlas con nadie, utilizar otras formas de autenticación como códigos de verificación o reconocimiento biométrico, y mantener actualizados los software y sistemas operativos para protegerse contra las últimas amenazas cibernéticas.',
            publication : {
                id: 9
            }
        }, {
            question : '¿Cuál fue el precio de venta del tiranosaurio Trinity en la subasta de Zúrich?',
            answer : 'El tiranosaurio Trinity fue vendido por 4,8 millones de francos suizos, equivalente a 4,8 millones de euros o 5,2 millones de dólares.',
            publication : {
                id: 10
            }
        }, {
            question : '¿De dónde fueron desenterrados los tres tiranosaurios que componen a Trinity y cuánto tiempo se estima que vivieron?',
            answer : 'Los tres tiranosaurios que componen a Trinity fueron desenterrados en los yacimientos estadounidenses de Hell Creek y Lance Creek, en las Montañas Rocosas de Montana y Wyoming (Estados Unidos). Se estima que vivieron hace más de 65 millones de años durante el periodo Cretácico tardío.',
            publication : {
                id: 10
            }
        }]

        const newQuestion = questionRepository.create(questionData)
        await questionRepository.save(newQuestion)
    }
}