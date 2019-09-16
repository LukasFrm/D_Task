// MAIN FUNCTION
function arraySubmitted() {
  //Extract the input value
  var value = document.getElementById("searchTxt").value;
  var arrayWinnable = new Boolean();

  //Convert it to an array
  var array = new Array();

  console.log(value);
  var splitArray = value.split(",");
  splitArray.map(item => {
    array.push(parseInt(item));
  });

  //  Check if all indexes numbers
  for (i = 0; i < array.length; i++) {
    if (isNaN(array[i])) {
      alert("All values must be numbers");
      document.getElementById("searchTxt").value = "";
    }
  }

  var newPossibleSteps = new Array();
  var optimalArray = new Array();
  var trueValues = new Array();
  var optimalRouteDisplay

  //Create and array representation with each index in a span element
  // most optimal indexes will be marked red

  for (i = 0; i < array.length; i++) {
    var z = document.createElement('span')
    z.innerHTML = array[i]
  var y = document.createElement('i')
  y.innerHTML = ','
     document.getElementById("optimalRouteDiv").appendChild(z)
     document.getElementById("optimalRouteDiv").appendChild(y)
  }

  // Check for the most optimal route
  for (i = 0; i < array.length; i++) {
    newPossibleSteps[i] = [];
    trueValues[i] = [];
    if (newPossibleSteps[i].length == 1) {
      trueValues[i].push(parseInt(newPossibleSteps[i][0]));
    }
    // Loop from index within a range of that index's value
    var endOfSteps = parseInt(array[i] + 1);
    for (j = 1; j < endOfSteps; j++) {
      var step = array[i + j];
      if (!step) {
        console.log("step is undefined");
      } else if (!newPossibleSteps[i]) {
        newPossibleSteps[i].push(step);
      } else if (newPossibleSteps[i]) {
        newPossibleSteps[i].push(step);
        // trueValues[i].push(parseInt(newPossibleSteps[i].indexOf(step)) + parseInt(step));
        // If there are no more steps to add to current steps array
        if (j === parseInt(endOfSteps - 1)) {
          console.warn(
            "newPossibleSteps[i].length is: " + newPossibleSteps[i].length
          );
          // Extract true value of each index (its value + its position in the array)

          // Extract the biggest value in the trueValues array <-- change this
          // var max = Math.max(...newPossibleSteps[i]);
          // console.log("Biggest value in the current array is: " + max);

          for (z = 0; z < newPossibleSteps[i].length; z++) {
            console.log("Should include 1: " + newPossibleSteps[i]);
            trueValues[i].push(newPossibleSteps[i][z] + z);
          }

          if (trueValues[i].length > 0) {
            var max = Math.max(...trueValues[i]);

            var biggestIndex = trueValues[i].indexOf(max);
            var calculatedOptimalStep = newPossibleSteps[i][biggestIndex];

            // var calculatedOptimalStep = newPossibleSteps[biggestIndex]
            console.warn("calculatedOptimalStep is: " + calculatedOptimalStep);
            optimalArray.push(calculatedOptimalStep);
            // if (i = 0) {
            //   // mark the first element red
            // }
            i = i + biggestIndex;
          }
        }
      }
    }
    //When the loop is finished add first and last
    // index values of the array to the optimal array

    if (i === array.length - 1) {

      // Tik jeigu array winnable
      // optimalArray = [array[0], ...optimalArray, array[[array.length - 1]]];
    }
    console.warn(trueValues);
    console.warn(newPossibleSteps);

    document.getElementById("arrayEntered").innerHTML = array.toString();
    document.getElementById("optimalRoute").innerHTML = optimalArray.toString();
  }
}

function arrayCleared() {
  document.getElementById("optimalRoute").innerHTML = "";
  document.getElementById("searchTxt").value = "";
}
