import * as d3 from 'd3'

// Pour importer les données
import populationData from '../data/population_total.csv'
import lifeData from '../data/life_expectancy_years.csv'
import incomeData from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'


// Récupère toutes les années
const annees = Object.keys(populationData[0])

console.log(annees)


let converterSI = (array, variable, variableName) => {


    let convertedVariable = array.map(d => {

        // Trouver le format SI (M, B, k)
        let SI = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? d[variable.toString()].slice(-1) : d[variable.toString()];

        // Extraire la partie numérique
        let number = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? parseFloat(d[variable.toString()].slice(0, -1)) : d[variable.toString()];

        // Selon la valeur SI, multiplier par la puissance
        switch (SI) {
            case 'M': {
                return {"country": d.country, [variableName] : Math.pow(10, 6) * number};
                break;
            }
            case 'B': {
                return {"country": d.country, [variableName] : Math.pow(10, 9) * number};
                break;
            }
            case 'k': {
                return {"country": d.country, [variableName]: Math.pow(10, 3) * number};
                break;
            }
            default: {
                return {"country": d.country, [variableName] : number};
                break;
            }
        }
    })
    return convertedVariable;
};




let pop = [],
    income = [],
    life = [],
dataCombined = [];


// Merge data
const mergeByCountry = (a1, a2, a3) => {
    let data = [];
    a1.map(itm => {

        let newObject = {
        ...a2.find((item) => (item.country === itm.country) && item),
        ...a3.find((item) => (item.country === itm.country) && item),
        ...itm
    }
    data.push(newObject);
    })
    return data;
}


annees.forEach(annee => {
    pop.push({"annee":annee, "data" : converterSI(populationData, annee, "pop")})
    income.push({"annee":annee, "data" : converterSI(incomeData, annee, "income")})
    life.push({"annee":annee, "data" : converterSI(lifeData, annee, "life")})

    const popAnnee = pop.filter(d => d.annee == annee).map(d => d.data)[0];
    const incomeAnnee = income.filter(d => d.annee == annee).map(d => d.data)[0];
    const lifeAnnee = life.filter(d => d.annee == annee).map(d => d.data)[0];

    dataCombined.push({"annee": annee, "data": mergeByCountry(popAnnee, incomeAnnee, lifeAnnee)})
});


// Visualisation statique //
// Data 2021
const data2021 = dataCombined.filter(d => d.annee == 2021).map(d => d.data)[0]

const margin = {top : 10, right: 40, bottom: 20, left: 40},
    width = 0.8*window.innerWidth - margin.left - margin.right,
    height = 0.7*window.innerHeight + margin.top + margin.bottom;

const figure = d3.select('#vizArea')
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


const popScale = d3.scaleSqrt()
    .domain([0,d3.max(data2021.map(d => d.pop))])
    .range([2,30]);

const incomeScale = d3.scaleLinear()
    .domain([0,d3.max(data2021.map(d => d.income))])
    .range([0,width]);

const lifeScale = d3.scalePow()
    .domain([0,d3.max(data2021.map(d => d.life))])
    .range([height,0])
        .exponent(3);

figure.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(incomeScale));

figure.append('g')
    .call(d3.axisLeft(lifeScale));

figure.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("income per capita, inflation-adjusted (dollars)");

figure.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("life expectancy (years)");



// Carte choroplète
const map = d3.select('#mapArea')
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


const projection = d3.geoMercator()
    .scale(70)
    .center([0,20])
    .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);


const colorScale = d3.scaleLinear()
    .domain([d3.min(data2021.map(d=>d.income)), d3.max(data2021.map(d=>d.income))])
    .range(["white", "steelblue"]);

d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then((data) => {

    // Changer le nom USA (Pour les autres pays, il faudrait faire le même exercice)
    const index = data2021.map(d=> d.country).indexOf('United States');
    console.log(index)
    if (index !== -1) {
        data2021[index].country= 'USA';
    }

    // Draw the map
        map.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
        .attr("d", path)
        .attr("fill", d => {
            let dataFiltered = data2021.find(dc => dc.country == d.properties.name);
            return dataFiltered ? colorScale(dataFiltered.income) : 'grey';
        })

})



// Animation
// variable to store our intervalID
let nIntervId;

function animate() {
    // check if already an interval has been set up
    if (!nIntervId) {
        nIntervId = setInterval(play, 100);
    }
}

let i = 0;
function play() {
    if(dataCombined[i].annee == 2021 ) {
        i = 0;
    } else {
        i++;
    }

    d3.select('#paragraphe').text(dataCombined[i].annee)
    updateChart(dataCombined[i].data);

}

function stop() {
    clearInterval(nIntervId);
    // release our intervalID from the variable
    nIntervId = null;
}


function updateChart(data_iteration) {
    figure.selectAll('circle')
        .data(data_iteration)
        .join(enter => enter.append('circle')
                .attr('cx', d => incomeScale(d.income))
                .attr('cy', d => lifeScale(d.life))
                .attr('r', 0)
                .transition(d3.transition()
                    .duration(500)
                    .ease(d3.easeLinear))
                .attr('r', d=> popScale(d.pop))
                .attr('fill', 'rgba(0,0,0,.5)')
            ,
            update => update.transition(d3.transition().duration(500).ease(d3.easeLinear))
                        .attr('cx', d => incomeScale(d.income))
                        .attr('cy', d => lifeScale(d.life)).attr('r', d=> popScale(d.pop)),
            exit => exit.remove())
}


document.getElementById("play").addEventListener("click", animate);
document.getElementById("stop").addEventListener("click", stop);







