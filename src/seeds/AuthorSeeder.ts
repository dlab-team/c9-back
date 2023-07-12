import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Author } from "../entity/Author";

export class AuthorSeeder implements Seeder {
   async run(
      dataSource: DataSource,
      factoryManager: SeederFactoryManager
   ): Promise<any> {
      const authorRepository = dataSource.getRepository(Author);

      const authorsData = [
         {
            name: "Author One",
            email: "author_one@mail.com",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet malesuada arcu, non faucibus mauris. Praesent id orci et est rhoncus pulvinar sit amet quis libero. Duis ut lectus mattis, maximus lacus vel, pharetra odio. Vestibulum ornare massa sem, non pretium velit molestie a. Nunc id arcu ut quam commodo rutrum at eget eros. Mauris pretium diam eu ornare consectetur. Etiam et dolor lacinia, sollicitudin velit et, maximus magna. Nullam quam ipsum, placerat ac mattis vitae, egestas et dui. Duis suscipit scelerisque cursus.",
            photo: "authorOne.jpg"
         },
         {
            name: "Author Two",
            email: "author_two@mail.com",
            description: "Nulla nec sollicitudin leo, vel cursus sapien. Curabitur tempus faucibus accumsan. Phasellus augue enim, semper sit amet lacinia id, aliquam sed mi. Suspendisse potenti. Pellentesque vestibulum sapien ante, ac dignissim ligula feugiat ut. Maecenas hendrerit felis mollis fermentum tempus. Vivamus condimentum imperdiet felis, et vulputate nisi varius eget. Nulla nec arcu ut augue mattis tempus id quis diam. Aenean ipsum nisi, scelerisque in dapibus vel, volutpat non tellus. Proin tempus commodo orci, placerat fermentum ligula maximus a. Suspendisse posuere mauris a nunc accumsan dignissim. Maecenas tempor erat id massa mattis lobortis.",
            photo: "authorTwo.jpg"
         },
         {
            name: "Author Three",
            email: "author_three@mail.com",
            description: "Sed quam mi, suscipit a mi vitae, ullamcorper iaculis odio. Integer eget ex sodales mauris semper pretium et ut ligula. Mauris hendrerit augue fringilla finibus bibendum. Sed consectetur turpis est, vitae porta lorem tempor vel. Proin feugiat justo et quam faucibus, quis dapibus magna luctus. Morbi luctus viverra dictum. Sed luctus dui a ligula fermentum dapibus. Mauris molestie quam sed nunc hendrerit, ut finibus nisi congue. Suspendisse nec lorem non sapien commodo feugiat at ut velit. Sed a iaculis dolor. Praesent nec convallis ante. Proin euismod nisl sed mollis viverra. Etiam odio ligula, pharetra et purus id, sagittis vehicula magna. Integer congue facilisis fermentum.",
            photo: "authorThree.jpg"
         },
         {
            name: "Author Four",
            email: "author_four@mail.com",
            description: "Etiam ullamcorper dictum fermentum. Etiam posuere fringilla diam sit amet mattis. Pellentesque vehicula malesuada auctor. Pellentesque in libero lectus. Duis id risus eget tellus viverra lacinia. Phasellus ac blandit erat, vitae consequat tortor. In hac habitasse platea dictumst. In vitae massa malesuada, tempor risus sed, laoreet augue. Morbi rhoncus id erat quis venenatis. Aenean gravida arcu a ligula ornare, ut fermentum odio lobortis.",
            photo: "authorFour.jpg"
         },
      ];

      const authors = authorRepository.create(authorsData);
      await authorRepository.save(authors);
   }
}
