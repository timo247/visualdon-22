import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

//cercles 
const WIDTH = 1000
   const HEIGHT = 1000


   let orangeCirc= d3.select('.cercles')
                .attr("style", "display: flex; flex-direction:column")
               .append("svg")
               .attr("width", 1000)
               .attr("height", 1000)
               .attr("class", "svgCircles") 
               .append("circle")
                  .attr("cx", "50px")
                  .attr("cy", "50px")
                  .attr("r", "40")
                  .attr("fill", "orange");

let greenCirc = d3.select('.svgCircles')   
.append("circle")  
.attr("cx", "150px")
  .attr("cy", "150px")
  .attr("r", "40")
  .attr("fill", "green")



  let blueCirc = d3.select('.svgCircles')   
  .append("circle")  
  .attr("cx", "250px")
    .attr("cy", "250px")
    .attr("r", "40")
    .attr("fill", "blue")



    //changer la couleur du deuxième cercle
let svgCircles = document.querySelector('.svgCircles');
let secondCirc = svgCircles.children[1];
secondCirc.setAttribute("fill", 'pink')
console.log(svgCircles)