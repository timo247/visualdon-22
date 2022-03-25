import * as d3 from 'd3'
import { svg } from 'd3';
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
    csv('life_expectancy_years.csv'),
    csv('population_total.csv')
])
    .then(([income, lifeExpectency, population]) => {
    console.log(income, lifeExpectency, population)


    //Mise dans un tableau les revenus annuels 2021 de chacun des pays
    let countries2021IncomeDatas = []
    income.forEach(countryIncomes => {
        countries2021IncomeDatas.push(countryIncomes['2021'])
    });
    //console.log(countries2021IncomeDatas)

    //Mise dans un tableau de l'espérence de vie 2021 de chacun des pays
    let countries2021LifeExpectancy = []
    lifeExpectency.forEach(countryLifeExpectancies => {
        countries2021LifeExpectancy.push(countryLifeExpectancies['2021'])
    });
    //console.log(countries2021LifeExpectancy)


    let countries2021Populations = []
    population.forEach(countryPopulations => {
        countries2021Populations.push(countryPopulations["2021"])
    });
    //console.log(countries2021Populations)


    //Mise de tous les pays dans un seul tableau
    let countries = []
    income.forEach(countryIncome => {
        //console.log(countryIncome["country"])
        countries.push(countryIncome["country"]);
    });
    console.log(countries)


    let countries2021Datas = []
    //rassemblement des données des pays
    //console.log(countries)
    for(let i =0; i < income.length; i++ ){
       let  countrieDatas = []
       countrieDatas.country = countries[i];
       countrieDatas.lifeExpectancy = countries2021LifeExpectancy[i]
       countrieDatas.income =  countries2021IncomeDatas[i]
       countrieDatas.population = countries2021Populations[i]
       countries2021Datas.push(countrieDatas);
       /*
        countries2021Datas[i] = NaN
        countries2021Datas[i]["country"] = countries[i];
        countries2021Datas[i]["lifeExpectancy"] = countries2021LifeExpectancy[i]
        countries2021Datas[i]["income"] = countries2021IncomeDatas[i]
        countries2021Datas[i]["population"] = countries2021Populations[i]
        */
    }
    console.log(countries2021Datas)


    //formatage des données 














    //dessin
    const margin = { top: 10, right: 40, bottom: 10, left: 40 },
    width = 450 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    let translateHeight = height + 10;
    let translateWidth = width + 10;
    let svg = d3.select(".graphique");


svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("class", "firstGroup")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width])


    //axe x
svg.append('g')
    .attr('class', "xAxis")
    .attr("transform", "translate(100," + translateHeight + ")")
    .call(d3.axisBottom(x));

const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])

    //axe y
svg.append('g')
    .call(d3.axisLeft(y))
    .attr('class', "yAxis")
    .attr("transform", "translate(100, 10)")


svg.append("circle")
    .attr("cx", x(10)).attr("cy", y(60)).attr("r", 40).style("fill", "blue");
svg.append("circle")
    .attr("cx", x(50)).attr("cy", y(60)).attr("r", 40).style("fill", "red");
svg.append("circle")
    .attr("cx", x(100)).attr("cy", y(60)).attr("r", 40).style("fill", "green");


    //Réagrandissement du svg pour que les axes s'affichent complètement
    let svgToGrow = document.querySelector(".graphique");
    console.log(svgToGrow)
    let newHeight = height + 20
    svgToGrow.setAttribute("height", "420")
    console.log(svgToGrow)
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
