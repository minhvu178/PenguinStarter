var classDataPromise = d3.json("classData.json");

function displayTable(classData) { 
    var rows = d3.select(".maintable tbody")
      .selectAll("tr")
      .data(classData)
      .enter()
        .append("tr")

    rows.append("td")
        .append("img")
        .attr('src', (function(penguin){
            return "imgs/"+penguin.picture;}))

    rows.append("td")
        .text(function(penguin){
            var allGrade = penguin.quizes.map(function(qz){return qz.grade;})
            return d3.mean(allGrade)
        });

    rows.append("td")
        .text(function(penguin){
            var allGrade = penguin.homework.map(function(hw){return hw.grade;})
            return d3.mean(allGrade)
        });

    rows.append("td")
        .text(function(penguin){
            var allGrade = penguin.test.map(function(test){return test.grade;})
            return d3.mean(allGrade)
        });

    rows.append("td")
        .text(function(penguin){
            var allGrade = penguin.final.map(function(final){return final.grade;})
            finals = allGrade
            return allGrade
        });
}

var compare = function(first, second) 
{
    var f_final = first.final[0].grade
    
    var s_final = second.final[0].grade

    if (f_final == s_final){return 0}
    else if (f_final > s_final){return -1}
    else {return 1}
}

function sortFinal(classData) {
    d3.select("#finals").on('click', function(){classData.sort(compare)
    d3.select("table tbody").selectAll('*').remove()
    console.log(classData)
    displayTable(classData)})
}

var successFCN = function(classData)
{
    
    displayTable(classData)
    sortFinal(classData)
}

var failFCN = function(errorMsg)
{
    console.log("Something went wrong", errorMSG);
}

classDataPromise.then(successFCN,failFCN);