import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Publication } from "../entity/Publication";


export class PublicationSeeder implements Seeder{
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const publicationRepository = dataSource.getRepository(Publication)

        const publicationData = [{
            name: 'Descubren nueva especie de dinosaurio',
            slug: 'descubren-nueva-especie-de-dinosaurio',
            initialContent: 'Un grupo de paleontólogos descubrió los restos de un nuevo dinosaurio en la Patagonia argentina. Se trata de un saurópodo gigante que habitó la Tierra hace unos 90 millones de años. Los expertos creen que este animal medía más de 35 metros de largo y pesaba alrededor de 70 toneladas.',
            finalContent: 'Un grupo de paleontólogos descubrió los restos de un nuevo dinosaurio en la Patagonia argentina. Se trata de un saurópodo gigante que habitó la Tierra hace unos 90 millones de años. Los expertos creen que este animal medía más de 35 metros de largo y pesaba alrededor de 70 toneladas.'
        },{
            name: 'Lanzan nueva versión del videojuego más popular',
            slug: 'lanzan-nueva-version-del-videojuego-mas-popular',
            initialContent: 'La empresa desarrolladora del videojuego más popular del momento lanzó una nueva versión con más niveles y personajes. El juego está disponible para todas las consolas y dispositivos móviles. Los fanáticos de este videojuego están emocionados por las nuevas características y los desafíos que les esperan.',
            finalContent: 'La empresa desarrolladora del videojuego más popular del momento lanzó una nueva versión con más niveles y personajes. El juego está disponible para todas las consolas y dispositivos móviles. Los fanáticos de este videojuego están emocionados por las nuevas características y los desafíos que les esperan.'
        },{
            name: 'Nuevo parque temático de dinosaurios abre sus puertas',
            slug: 'nuevo-parque-tematico-de-dinosaurios-abre-sus-puertas',
            initialContent: 'Un nuevo parque temático de dinosaurios abrió sus puertas en la ciudad. Los visitantes pueden explorar una réplica de un hábitat jurásico, ver dinosaurios robóticos en acción y aprender sobre la historia y la ciencia de los dinosaurios. También hay actividades para niños, como excavaciones de fósiles y montañas rusas temáticas.',
            finalContent: 'Un nuevo parque temático de dinosaurios abrió sus puertas en la ciudad. Los visitantes pueden explorar una réplica de un hábitat jurásico, ver dinosaurios robóticos en acción y aprender sobre la historia y la ciencia de los dinosaurios. También hay actividades para niños, como excavaciones de fósiles y montañas rusas temáticas.'
        },{
            name: 'Estudiantes crean robot para ayudar a personas mayores',
            slug: 'estudiantes-crean-robot-para-ayudar-a-personas-mayores',
            initialContent: 'Un grupo de estudiantes de ingeniería creó un robot para ayudar a personas mayores en sus tareas diarias. El robot está programado para hacer la limpieza del hogar, llevar objetos pesados y ayudar en la movilidad de las personas con problemas de movilidad. El invento ha sido muy bien recibido por la comunidad de personas mayores y se espera que se pueda comercializar próximamente.',
            finalContent: 'Un grupo de estudiantes de ingeniería creó un robot para ayudar a personas mayores en sus tareas diarias. El robot está programado para hacer la limpieza del hogar, llevar objetos pesados y ayudar en la movilidad de las personas con problemas de movilidad. El invento ha sido muy bien recibido por la comunidad de personas mayores y se espera que se pueda comercializar próximamente.'
        },{
            name: 'Nuevo descubrimiento en el espacio',
            slug: 'nuevo-descubrimiento-en-el-espacio',
            initialContent: 'La NASA acaba de anunciar el descubrimiento de un nuevo planeta fuera del sistema solar. El planeta, llamado Kepler-452b, tiene un tamaño similar al de la Tierra y se encuentra a unos 1400 años luz de distancia. Los científicos creen que podría tener condiciones similares a las de nuestro planeta y estar en la zona habitable de su estrella.',
            finalContent: 'La NASA acaba de anunciar el descubrimiento de un nuevo planeta fuera del sistema solar. El planeta, llamado Kepler-452b, tiene un tamaño similar al de la Tierra y se encuentra a unos 1400 años luz de distancia. Los científicos creen que podría tener condiciones similares a las de nuestro planeta y estar en la zona habitable de su estrella.'
        },{
            name: 'Descubren un nuevo exoplaneta habitable',
            slug: 'descubren-un-nuevo-exoplaneta-habitable',
            initialContent: 'Un equipo de astrónomos ha descubierto un nuevo exoplaneta que podría ser habitable. El planeta, que ha sido llamado Kepler-438b, se encuentra a unos 640 años luz de la Tierra y tiene una masa similar a la de nuestro planeta. Los científicos creen que este exoplaneta podría tener una atmósfera similar a la de la Tierra y podría albergar vida.',
            finalContent: 'Un equipo de astrónomos ha descubierto un nuevo exoplaneta que podría ser habitable. El planeta, que ha sido llamado Kepler-438b, se encuentra a unos 640 años luz de la Tierra y tiene una masa similar a la de nuestro planeta. Los científicos creen que este exoplaneta podría tener una atmósfera similar a la de la Tierra y podría albergar vida.'
        },{
            name: 'Despega misión espacial europea que pretende explorar Júpiter y sus tres lunas',
            slug: 'despega-mision-espacial-europea-que-pretende-expĺorar-jupiter-y-sus-tren-lunas',
            initialContent: 'El cohete Ariane 5, que transporta la misión europea Juice a Júpiter y a sus tres grandes lunas oceánicas, despegó este viernes desde el puerto espacial en Kurú, en Guayana Francesa, a las 12:14 GMT. Después del retraso sufrido ayer por meteorología adversa, Juice, equipada con diez instrumentos de última generación, emprende hoy un largo y difícil viaje de ocho años hasta llegar al gigante gaseoso Júpiter y a sus satélites Calisto, Europa y Ganímedes para estudiar si reúnen condiciones de habitabilidad.',
            finalContent: 'El cohete Ariane 5, que transporta la misión europea Juice a Júpiter y a sus tres grandes lunas oceánicas, despegó este viernes desde el puerto espacial en Kurú, en Guayana Francesa, a las 12:14 GMT. Después del retraso sufrido ayer por meteorología adversa, Juice, equipada con diez instrumentos de última generación, emprende hoy un largo y difícil viaje de ocho años hasta llegar al gigante gaseoso Júpiter y a sus satélites Calisto, Europa y Ganímedes para estudiar si reúnen condiciones de habitabilidad.'
        },{
            name: 'Hielo antártico anota mínimos históricos en 2023 y acelera su erosión',
            slug: 'hielo-antartico-anota-minimos-historicos-en-2023-y-acelera-su-erosion',
            initialContent: 'El hielo de la Antártica, la reserva de agua dulce más grande el mundo, no para de recibir malas noticias: en las últimas semanas dos estudios distintos hicieron saltar las alarmas y revelaron que se derrite cada vez más rápido, lo que podría provocar el colapso en un futuro cercano de varios grandes glaciares. El Centro Nacional de Datos de Hielo y Nieve de Estados Unidos (Nsidc, sus siglas en inglés) desveló en febrero que el hielo marino que rodea el continente se redujo a 1,91 millones de kilómetros cuadrados, registrando su mínimo histórico en 45 años.',
            finalContent: 'El hielo de la Antártica, la reserva de agua dulce más grande el mundo, no para de recibir malas noticias: en las últimas semanas dos estudios distintos hicieron saltar las alarmas y revelaron que se derrite cada vez más rápido, lo que podría provocar el colapso en un futuro cercano de varios grandes glaciares. El Centro Nacional de Datos de Hielo y Nieve de Estados Unidos (Nsidc, sus siglas en inglés) desveló en febrero que el hielo marino que rodea el continente se redujo a 1,91 millones de kilómetros cuadrados, registrando su mínimo histórico en 45 años.'
        },{
            name: 'ONU prevé que fenómeno de "El Niño" comience antes de septiembre',
            slug: 'onu-preve-que-fenomeno-de-el-niño-comience-antes-de-septiembre',
            initialContent: 'La Organización Meteorológica Mundial (OMM) estima que el fenómeno meteorológico de "El Niño" –que desencadena sequías e inundaciones y provoca aumento de temperaturas en distintas partes del mundo podría registrarse antes del mes de septiembre de este año. Según el último boletín de la organización, presentado este miércoles en Ginebra, Suiza, las posibilidades de que se desencadene "El Niño" antes de julio son del 60%. Mientras que la probabilidad de que el fenómeno comience entre julio y septiembre se eleva hasta el 80%. La duración y la intensidad de este periodo de "El Niño" aún no se pueden pronosticar, aunque habitualmente sus ciclos van desde los dos hasta los siete años y los episodios más extremos de este patrón climático suelen extenderse entre nueve meses y un año.',
            finalContent: 'La Organización Meteorológica Mundial (OMM) estima que el fenómeno meteorológico de "El Niño" –que desencadena sequías e inundaciones y provoca aumento de temperaturas en distintas partes del mundo podría registrarse antes del mes de septiembre de este año. Según el último boletín de la organización, presentado este miércoles en Ginebra, Suiza, las posibilidades de que se desencadene "El Niño" antes de julio son del 60%. Mientras que la probabilidad de que el fenómeno comience entre julio y septiembre se eleva hasta el 80%. La duración y la intensidad de este periodo de "El Niño" aún no se pueden pronosticar, aunque habitualmente sus ciclos van desde los dos hasta los siete años y los episodios más extremos de este patrón climático suelen extenderse entre nueve meses y un año.'
        },{
            name: '¿Puedes distinguir imágenes reales de algunas creadas por inteligencia artificial?',
            slug: 'puedes-distinguir-imagenes-reales-de-algunas-creadas-por-inteligencia-artificial',
            initialContent: 'Un fotógrafo alemán obtuvo el primer puesto en el concurso de fotografía Sony World Photography Awards con una imagen hecha con inteligencia artificial, aunque luego rechazó el premio al decir que sólo había postulado para ver si los jueces estaban preparados para diferenciar una imagen real de una generada por IA . Este hito, que ya se ha repetido en más de una ocasión, resalta las dificultades que en ocasiones significa poder reconocer que una fotografía no fue tomada en el mundo real, sino que fue creada por algún sistema de IA que permite generar imágenes a través de comandos de texto. En este test visual ponemos a prueba tus sentidos para ver si puedes diferenciar qué imágenes son reales y cuáles son generadas por inteligencia artificial.',
            finalContent: 'Un fotógrafo alemán obtuvo el primer puesto en el concurso de fotografía Sony World Photography Awards con una imagen hecha con inteligencia artificial, aunque luego rechazó el premio al decir que sólo había postulado para ver si los jueces estaban preparados para diferenciar una imagen real de una generada por IA . Este hito, que ya se ha repetido en más de una ocasión, resalta las dificultades que en ocasiones significa poder reconocer que una fotografía no fue tomada en el mundo real, sino que fue creada por algún sistema de IA que permite generar imágenes a través de comandos de texto. En este test visual ponemos a prueba tus sentidos para ver si puedes diferenciar qué imágenes son reales y cuáles son generadas por inteligencia artificial.'
        }]

        const newPublication = publicationRepository.create(publicationData)
        await publicationRepository.save(newPublication)
    }
}