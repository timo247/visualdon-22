//On importe tout ce qu'il faut
import * as d3 from 'd3';
import { csv, json } from 'd3-fetch'
//Promise.all récuère des données depuis des sources différentes et les met dans un array
Promise.all([
    json('https://jsonplaceholder.typicode.com/posts'),
    json('https://jsonplaceholder.typicode.com/users')
])
//Une fois les données récupérées, la function
    .then(([users, posts]) => {

        users.forEach(user => {
            //définir combien on leur attribue de posts

            //Créer un tableau vide qui stocke les posts chosen_posts

            //Faire un for qui itère jusquà n posts choisis. On crée chaaque fois un n aléatoire compris entre 0 et nombre post. On push ensuite dans la liste de posts le post concerné.

            //Ensuite user["posts"] = chosen_posts

        });
        // Dessiner ici!
        console.log(data)
        const notesParEleve = data.reduce((r, d) => {
            const notes = r[d.nom] || []
            return { ...r, [d.nom]: [...notes, d.note] }
      }, {})
      })
    


