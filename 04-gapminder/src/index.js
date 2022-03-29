import * as d3 from 'd3'
import { svg } from 'd3';
import { csv, json } from 'd3-fetch'
// Pour importer les données
// import file from '../data/data.csv'
//console.log("bonjour");

//récupération des données
/*
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
                */

Promise.all([
    csv('income_per_person_gdppercapita_ppp_inflation_adjusted.csv'),
    csv('life_expectancy_years.csv'),
    csv('population_total.csv')
])
    .then(([income, lifeExpectency, population]) => {
        //console.log(income, lifeExpectency, population)


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
        //console.log(countries)


        let countries2021Datas = []
        //rassemblement des données des pays
        //console.log(countries)
        for (let i = 0; i < income.length; i++) {
            let countrieDatas = []
            countrieDatas.country = countries[i];
            countrieDatas.lifeExpectancy = countries2021LifeExpectancy[i]
            countrieDatas.income = countries2021IncomeDatas[i]
            countrieDatas.population = countries2021Populations[i]
            countries2021Datas.push(countrieDatas);
        }
        console.log(countries2021Datas)

        //Transformation des données 


        //formatage des données 
        countries2021Datas.forEach(data => {
            //console.log("data", data)
            data.lifeExpectancy = cleanData(data.lifeExpectancy);
            data.income = cleanData(data.income)
            data.population = cleanData(data.population, data);
        });







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
            .domain([0, 130000])
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
        //console.log(svgToGrow)
        let newHeight = height + 20
        svgToGrow.setAttribute("height", "420")
        //console.log(svgToGrow)


        //Mise à l'échelle du rayon de chaque cercle
        const rScaled = d3.scaleSqrt()
            .domain([0, 5000000000])
            .range([0, 30]);

        //DEssin des données sous forme de cercle
        svg.selectAll("countries")
            .data(countries2021Datas)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.income))
            .attr("cy", d => y(d.lifeExpectancy))
            .attr("r", d => rScaled(d.population))
            .style("fill", "pink")
            .attr("transform", "translate(100, 10)")
            .attr("class", (d) => `countryCircle ${d.country}`)

            displayCountriesOnHover(countries2021Datas);
    });



//Affichage des informations lorsque le cercle est mouseover
function displayCountriesOnHover(countriesData){
    let countryCircles = document.querySelectorAll('.countryCircle')

countryCircles.forEach(circle => {
    circle.addEventListener('mouseover', (e) => {
        e.target.classList.remove("countryCircle")

        //Récupération des données du pays
        let jsonCountry = countriesData.filter(jsonCountry => jsonCountry.country == e.target.getAttribute("class"));
        console.log("json2",jsonCountry);
        document.querySelector(".countryNameInfo").textContent = e.target.getAttribute("class");
        document.querySelector(".income").textContent = "PIB par habitant: :" + jsonCountry[0].income + " $";
        document.querySelector(".population").textContent = "Population: " + jsonCountry[0].population + " habitants";
        document.querySelector(".lifeExpectancy").textContent ="Espérance de vie: " + jsonCountry[0].lifeExpectancy + " ans";
    })
});
}



//Transformation des données numériques en données exploitables
function cleanData(data, object) {
    if (isNaN(data)) {
        if (data.includes("k")) {
            const n = data.split("k")[0];
            data = Number.parseFloat(n) * 1000;
        } else if (data.includes("M")) {
            const n = data.split("M")[0];
            data = Number.parseFloat(n) * 1000000;
        } else if (data.includes("B")) {
            const n = data.split("B")[0];
            data = Number.parseFloat(n) * 1000000000;
        }
    }
    if (data == "") {
        data = 0;
    }
    return data;
}
