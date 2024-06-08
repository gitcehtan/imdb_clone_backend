const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Movie = require("./models/Movie");
const cors = require("cors");
dotenv.config();
  
app.use(express.json());
app.use(cors());

const URI = process.env.URI;
 
const insertDummyData = async () => {
  let movieList = [
    {
        "name": "1. The Shawshank Redemption",
        "image": "https://i.ibb.co/p1vNXMP/Movie01.png ",
        "details": `Tim Robbins stars as Andy Dufresne, a banker sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence. Over the decades, Andy befriends fellow prisoner Ellis "Red" Redding (Morgan Freeman) and becomes instrumental in a money-laundering operation led by the prison warden. The film explores themes of hope, resilience, and friendship.`
    },
    {
        "name": "2. The Godfather",
        "image": "https://i.ibb.co/jbTZpTF/Movie02.png ",
        "details": `Marlon Brando plays Vito Corleone, the aging patriarch of an organized crime dynasty in post-war New York City. His youngest son, Michael (Al Pacino), initially reluctant to join the family business, gets drawn deeper into the world of crime after a series of violent events. The film depicts the complex dynamics within the Corleone family and the ruthless nature of the mafia.`
    },
    {
        "name": "3. The Dark Knight",
        "image": "https://i.ibb.co/Wyh0c35/Movie03.png",
        "details": `In this sequel to "Batman Begins," Christian Bale returns as Batman, facing his greatest adversary yet, the Joker (Heath Ledger). Gotham City descends into chaos as the Joker launches a campaign of terror. The film explores themes of morality, chaos, and heroism, culminating in a dramatic showdown between Batman and the Joker.`
    },
    {
        "name": "4. The Godfather Part II",
        "image": "https://i.ibb.co/9yHvNPY/Movie04.png",
        "details": `Al Pacino stars as Michael Corleone, who expands his family's crime empire while dealing with personal and political betrayals. The film also explores the early life of his father, Vito Corleone (Robert De Niro), showing his rise to power in the early 20th century. It's a tale of power, loyalty, and the consequences of crime.`
    },
    {
        "name": "5. 12 Angry Men",
        "image": "https://i.ibb.co/2M9SGTB/Movie05.png",
        "details": `This courtroom drama follows twelve jurors as they deliberate the guilt or innocence of a defendant in a murder trial. Led by Juror #8 (Henry Fonda), who initially votes "not guilty," the jurors confront their prejudices and preconceptions. The film is a powerful exploration of justice, reasonable doubt, and human nature.`
    },
    {
        "name": "6. Schindler's List",
        "image": "https://i.ibb.co/YZGWGSn/Movie06.png",
        "details": `Liam Neeson stars as Oskar Schindler, a German industrialist who saves over a thousand Polish Jews during the Holocaust by employing them in his factories. The film, directed by Steven Spielberg, portrays the horrors of the Nazi regime and the impact one individual can have in the face of atrocity.`
    },
    {
        "name": "7. The Lord of the Rings: The Return of the King",
        "image": "https://i.ibb.co/0f7NvdX/Movie07.png",
        "details": `In the final installment of the epic trilogy, Frodo and Sam continue their journey to Mount Doom to destroy the One Ring, while Aragorn, Gandalf, and the rest lead the forces of Middle-earth against Sauron's army. The film culminates in the climactic Battle of Pelennor Fields and the destruction of the Ring, bringing peace to Middle-earth.`
    },
    {
        "name": "8. Pulp Fiction",
        "image": "https://i.ibb.co/YjzV2Fs/Movie08.png",
        "details": `This Quentin Tarantino film weaves together multiple storylines involving hitmen, a boxer, a gangster and his wife, and two diner bandits. Known for its nonlinear narrative, sharp dialogue, and eclectic soundtrack, "Pulp Fiction" explores themes of crime, redemption, and the unpredictability of life.`
    },
    {
        "name": "9. The Lord of the Rings: The Fellowship of the Ring",
        "image": "https://i.ibb.co/zhpnm2Q/Movie09.png ",
        "details": `The first film in the trilogy follows Frodo Baggins and the Fellowship as they begin their journey to destroy the One Ring. Along the way, they face numerous dangers, including the dark forces of Sauron. The film sets the stage for the epic battle between good and evil in Middle-earth.`
    },
    {
        "name": "10. The Good, the Bad and the Ugly",
        "image": "https://i.ibb.co/QMWTLsv/Movie10.png",
        "details": `Set during the American Civil War, this spaghetti western follows three gunslingers—Blondie (the Good), Angel Eyes (the Bad), and Tuco (the Ugly)—as they search for a hidden fortune in gold. The film is renowned for its iconic music, cinematography, and tense standoffs.`
    },
    {
        "name": "11. Forrest Gump",
        "image": "https://i.ibb.co/vBfyGk9/Movie11.png",
        "details": `Tom Hanks stars as Forrest Gump, a man with a low IQ who inadvertently influences several historical events in the 20th century United States. Through his adventures, Forrest experiences love, loss, and the complexities of life. The film is a heartwarming tale of innocence and perseverance.`
    },
    {
        "name": "12. The Lord of the Rings: The Two Towers",
        "image": "https://i.ibb.co/9TWRcWF/Movie12.png",
        "details": `The second film in the trilogy follows the split Fellowship as they continue their quest. Frodo and Sam inch closer to Mordor with the help of Gollum, while Aragorn, Legolas, and Gimli aid the people of Rohan in the battle against Saruman's forces. The film features the epic Battle of Helm's Deep.`
    },
    {
        "name": "13. Fight Club",
        "image": "https://i.ibb.co/PxQgzFJ/Movie13.png",
        "details": `Brad Pitt and Edward Norton star in this film about an insomniac office worker who forms an underground fight club with a soap salesman, Tyler Durden. As the club's popularity grows, it evolves into something much more sinister. The film explores themes of identity, consumerism, and rebellion.`
    },
    {
        "name": "14. Inception",
        "image": "https://i.ibb.co/1R9xfzV/Movie14.png",
        "details": `Leonardo DiCaprio stars as Dom Cobb, a thief who enters the subconscious of his targets to steal secrets. He is given a chance to have his criminal record erased if he can successfully plant an idea into a target's mind—a process known as inception. The film is a mind-bending exploration of dreams and reality.`
    },
    {
        "name": "15. Star Wars: Episode V - The Empire Strikes Back",
        "image": "https://i.ibb.co/0jjSr5z/Movie15.png",
        "details": `The second film in the original Star Wars trilogy follows the Rebel Alliance's struggle against the Galactic Empire. Luke Skywalker trains with Jedi Master Yoda, while Han Solo and Princess Leia evade capture. The film culminates in a dramatic confrontation between Luke and Darth Vader, revealing a shocking family secret.`
    },
    {
        "name": "16. The Matrix",
        "image": "https://i.ibb.co/zZ07t6w/Movie16.png",
        "details": `Keanu Reeves stars as Neo, a computer hacker who discovers that reality is a simulated construct controlled by machines. Guided by Morpheus and Trinity, he learns about his role as "the One" who can free humanity. The film is a groundbreaking blend of action, philosophy, and special effects.
`
    },
    {
        "name": "17. Goodfellas",
        "image": "https://i.ibb.co/rcGVjx0/Movie17.png",
        "details": `Directed by Martin Scorsese, this film follows the rise and fall of Henry Hill (Ray Liotta) in the world of organized crime. Alongside his partners, Jimmy Conway (Robert De Niro) and Tommy DeVito (Joe Pesci), Henry navigates the highs and lows of being a gangster. The film is a gritty, realistic portrayal of mob life.`
    },
    {
        "name": "18. One Flew Over the Cuckoo's Nest",
        "image": "https://i.ibb.co/Jr4Qz8w/Movie18.png",
        "details": `Jack Nicholson stars as R.P. McMurphy, a criminal who fakes insanity to serve his sentence in a mental institution. He clashes with the oppressive Nurse Ratched, inspiring fellow patients to rebel against the dehumanizing conditions. The film is a powerful critique of mental health care and institutionalization.`
    },
    {
        "name": "19. Se7en",
        "image": "https://i.ibb.co/P4GjFfy/Movie19.png ",
        "details": `Brad Pitt and Morgan Freeman star as detectives investigating a series of gruesome murders, each inspired by one of the seven deadly sins. The film's dark, moody atmosphere and shocking ending have made it a classic in the crime thriller genre.`
    },
    {
        "name": "20. Interstellar",
        "image": "https://i.ibb.co/xMyf6zz/Movie20.png",
        "details": `Matthew McConaughey stars as Cooper, a former pilot who joins a team of astronauts on a mission to find a new habitable planet for humanity. Directed by Christopher Nolan, the film explores themes of love, sacrifice, and the survival of the human race against the backdrop of a visually stunning space adventure.`
    }
];

      
      // console.log(Movie.findOne({movieList}))
        if(await (Movie.findOne()) === null)
          {

            try {
              await Movie.insertMany(movieList);
            console.log("Dummy data inserted successfully");
          } catch (error) {
            
            console.log(`This is an Error while inserting the data`,error);
          }
        }
}

 



const retrieveData = async() =>  {
    try {
        const result = await Movie.find();
        return result;
       } catch (error) {
        console.log("Error while retrieving the data: ", error.message);
        return [];
       }
};
 

mongoose.connect(URI);
 
// Get the default connection
const db = mongoose.connection; 
 
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to get notification of successful connection)
db.once('open', async() => {
  
 await insertDummyData();
  
});  

const PORT = process.env.PORT


app.get("/", async(req,res) => {
    const result = await retrieveData();
    // deleteAllMovies(); 
    res.json(result);
})



app.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`);
})