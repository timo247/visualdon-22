import * as d3 from 'd3'
import { csv, json } from 'd3-fetch'

// Pour importer les données
// import file from '../data/data.csv'
console.log("bonjour");

//récupération des données

d3.json('../data/life_expectancy_years.csv')
		.then( function(data) {
            console.log(data)
				const notesParEleve = data.reduce((r, d) => {
  				const notes = r[d.nom] || []
  				return { ...r, [d.nom]: [...notes, d.note] }
			}, {})

			 	})
		.catch(function(error){
				console.log(error);
				})



