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


Promise.all([
    csv('income_per_person_gdppercapita_ppp_inflation_adjusted.csv'),
    csv('life_expectancy_years.csv')
])
    .then(([income, lifeExpectency]) => {
    console.log(income, lifeExpectency)
 

    //dessin
    const margin = { top: 10, right: 40, bottom: 10, left: 40 },
    width = 450 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    let svg = d3.select(".graphique");


svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width])


    //axe x
svg.append('g')
    .attr('class', "xAxis")
    .attr("transform", "translate(100," + height + ")")
    .call(d3.axisBottom(x));

const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])

    //axe y
svg.append('g')
    .call(d3.axisLeft(y))
    .attr('class', "yAxis")
    .attr("transform", "translate(100, 0)")


svg.append("circle")
    .attr("cx", x(10)).attr("cy", y(60)).attr("r", 40).style("fill", "blue");
svg.append("circle")
    .attr("cx", x(50)).attr("cy", y(60)).attr("r", 40).style("fill", "red");
svg.append("circle")
    .attr("cx", x(100)).attr("cy", y(60)).attr("r", 40).style("fill", "green");
    });

/*
d3.csv('income_per_person_gdppercapita_ppp_inflation_adjusted.csv')
           .then( function(data) {
           console.log("population", data)
              })
           .catch(function(error){
           // Gérer l'erreur ici!
            })

*/
