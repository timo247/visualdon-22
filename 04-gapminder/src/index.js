import * as d3 from 'd3'
import { svg } from 'd3';
import file from'../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv';
import file from'../data/life_expectancy_years.csv';

// Pour importer les données
// import file from '../data/data.csv'
console.log("bonjour");

/*
const x = d3.scaleLinear()
			.domain([0, 100])
			.range([0, 400]);
 
svg.call(d3.axisBottom(x));
 
svg.append("circle")
		.attr("cx", x(10))
		.attr("cy", x(100))
		.attr("r", 40)
		.style("fill", "blue");
*/

const margin = {top : 10, right: 40, bottom: 10, left: 40},
		   width = 450 - margin.left - margin.right,
		   height = 400 - margin.top - margin.bottom;
 
svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
const x = d3.scaleLinear()
		.domain([0,100])
		.range([0,width])
 
svg.append('g')
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));
 
const y = d3.scaleLinear()
		.domain([0,100])
		.range([height,0])
 
svg.append('g')
  .call(d3.axisLeft(y));
 
 
svg.append("circle")
   .attr("cx", x(10)).attr("cy", y(60)).attr("r", 40).style("fill", "blue");
svg.append("circle")
   .attr("cx", x(50)).attr("cy", y(60)).attr("r", 40).style("fill", "red");
svg.append("circle")
    .attr("cx", x(100)).attr("cy", y(60)).attr("r", 40).style("fill", "green");
       
