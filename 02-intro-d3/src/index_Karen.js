import * as d3 from 'd3';
import { select } from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!
// créer 3 cercles

const WIDTH = 3000
const HEIGHT = 1000

console.log("Coucou");

   const div = d3.select(".cercle")
               .append("svg")
               .attr("class", "svgCercle")
               .attr("width", WIDTH)
               .attr("height", HEIGHT)
               .append("circle")
                  .attr("cx", "50")
                  .attr("cy", "50")
                  .attr("r", "40px")
                  .attr("fill", "orange")
                  

    let cercleViolet = d3.select(".svgCercle")
            .append("circle")
                  .attr("cx", "150")
                  .attr("cy", "150")
                  .attr("r", "40px")
                  .attr("fill", "purple")
    
    let cercleJaune = d3.select(".svgCercle")
            .append("circle")
                .attr("cx", "250")
                .attr("cy", "250")
                .attr("r", "40px")
                .attr("fill", "yellow")


// changer la couleur du 2ème cercle
cercleViolet ={
fill : Violet
}
                
        
                  
