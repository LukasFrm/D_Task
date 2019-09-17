// MAIN FUNCTIONS
function clearData() {
  document.getElementById("optimalRouteDiv").innerHTML = "";
  document.getElementById("arrayEntered").innerHTML = "";
  document.getElementById("searchTxt").value = "";
  document.getElementById("arrayWinnable").innerHTML = "";
}

var arrayWinnableText = "";
function arrayUnwinnable() {
  var arrayWinnableText = "NO";
  document.getElementById(
    "arrayWinnable"
  ).innerHTML = `<b>${arrayWinnableText}</b>`;
  document.getElementById("arrayWinnable").style.color = "red";

  // clearData();
}

function arrayWinnable() {
  var arrayWinnableText = "YES";
  document.getElementById("arrayWinnable").innerHTML = `${arrayWinnableText}`;
}

function arraySubmitted() {
  // Check if array has been previously submitted already
  if (document.getElementById("arrayEntered").innerHTML != "") {
    clearData();
  }

  //Extract the input value
  var value = document.getElementById("searchTxt").value;

  //Convert it to an array
  var array = new Array();
  var splitArray = value.split(",");
  splitArray.map(item => {
    array.push(parseInt(item));
  });

  // Check if array doesn't start with 0
  if (array[0] === 0) {
    alert(
      "Array unwinnable. Please check, if the first value in your array should truly be 0"
    );
    clearData();
  }

  //  Check if all indexes are numbers
  for (i = 0; i < array.length; i++) {
    if (isNaN(array[i])) {
      alert("All values must be integer numbers");
      clearData();
    }
  }

  var newPossibleSteps = new Array();
  var trueValues = new Array();
  var trueArrayValues = new Array();

  //Create an array representation with each array number in a span element
  // most optimal numbers will be marked red

  for (i = 0; i < array.length; i++) {
    var z = document.createElement("span");
    z.innerHTML = array[i];
    var y = document.createElement("i");
    if (i === array.length - 1) {
      y.innerHTML = "";
      document.getElementById("optimalRouteDiv").appendChild(z);
    } else y.innerHTML = ",";
    document.getElementById("optimalRouteDiv").appendChild(z);
  }

  // Check for the most optimal route
  for (i = 0; i < array.length; i++) {
    console.log(`i is ${i}`);

    newPossibleSteps[i] = [];
    trueValues[i] = [];
    trueArrayValues[i] = [];
    // if (newPossibleSteps[i].length == 1) {
    //   trueValues[i].push(parseInt(newPossibleSteps[i][0]));
    // }
    // Loop from index within a range of that index's value
    var endOfSteps = parseInt(array[i] + 1);
    for (var j = 1; j < endOfSteps; j++) {
      var step = array[i + j];
      if (!step) {
        console.log(`step @ index ${i} and j ${j} is undefined`);
        if (newPossibleSteps[i].length === 1) {
          console.log(
            `It has found the one! newPossibleSteps[i][0] is ${
              newPossibleSteps[i][0]
            } @ i ${i}`
          );
          trueValues[i].push(newPossibleSteps[i][0]);
        }
      } else if (!newPossibleSteps[i]) {
        newPossibleSteps[i].push(step);
      } else if (newPossibleSteps[i]) {
        newPossibleSteps[i].push(step);
        trueArrayValues[i].push(i + j);

        // If there are no more steps to add to current steps array
        if (j === parseInt(endOfSteps - 1)) {
          var possibleStepsMax = Math.max(...newPossibleSteps[i]);
          if (possibleStepsMax === 0) {
            alert("It works");
          }

          for (z = 0; z < newPossibleSteps[i].length; z++) {
            trueValues[i].push(newPossibleSteps[i][z] + z);
          }

          if (trueValues[i].length > 0) {
            var max = Math.max(...trueValues[i]);
            var biggestIndex = trueValues[i].indexOf(max);
            var calculatedOptimalStep = newPossibleSteps[i][biggestIndex];
            var highlightValue = trueArrayValues[i][biggestIndex];

            document
              .getElementsByTagName("span")
              .item(highlightValue).style.backgroundColor = "#8cff66";
          }
        }
      }
    }
    if (trueArrayValues[i] == "undefined" || trueArrayValues[i].length == 0) {
      document.getElementsByTagName("span").item(i + 1).style.backgroundColor =
        "red";
    }

    i += biggestIndex;
  }

  // NEGATIVE ARRAY FUNCTIONALITY

  // Get array
  var a = [-2, -5, -3, -1, -1, -1, -2, -1];
  // Convert array into positive
  var b = a.map(item => {
    return (item *= -1);
  });

  // Reverse the array
  var c = b.reverse();
  
  console.log(`c is ${c}`);
  console.log(d);

  console.warn(trueValues);
  console.warn(newPossibleSteps);
  console.warn(trueArrayValues);

  document.getElementById("arrayEntered").innerHTML = array.toString();

  if (
    parseInt(trueArrayValues[trueArrayValues.length - 1]) ===
    array.length - 1
  ) {
    console.log("Array is winnable!");
    arrayWinnable();

    document.getElementsByTagName("span").item(0).style.backgroundColor =
      "#8cff66";
    document
      .getElementsByTagName("span")
      .item(array.length - 1).style.backgroundColor = "#8cff66";
    return;
  } else arrayUnwinnable();
}
