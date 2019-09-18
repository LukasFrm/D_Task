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
  if (document.getElementById("optimalRouteDiv").innerHTML !== "") {
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
  var negativeArray = false;
  //  Check if all indexes are numbers and if array is negative
  for (i = 0; i < array.length; i++) {
    if (isNaN(array[i])) {
      alert("All values must be integer numbers");
      clearData();
    } else if (array[i] <= 0) {
      negativeArray = true;
      console.log(`last negativeNumber value is ${negativeArray}`);
    } else if (array[i] > 0) {
      negativeArray = false;
      i = array.length;
    }
  }
  // NEGATIVE ARRAY FUNCTIONALITY

  if (negativeArray) {
    // Convert the array into positive
    var array = array.map(item => {
      return (item *= -1);
    });

    // Reverse the array
    var array = array.reverse();
    console.log("Whole array is negative");
    console.log(`array here should be reversed: ${array}`);
  }

  function mirrorIndexValue(x) {
    if (negativeArray) {
      return array[parseInt(array.length - x)];
    } else return x;
  }

  var newPossibleSteps = new Array();
  var trueValues = new Array();
  var trueArrayValues = new Array();

  //Create an array representation with each array number in a span element
  // most optimal numbers will be marked green

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

    // Loop from current index + 1, within a range of that index's value
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
            if (negativeArray) {
              i = array.length - i - 1;
            } else i;
            const receivedMirrorIndex = mirrorIndexValue(i);
            var max = Math.max(...trueValues[i]);
            var biggestIndex = trueValues[i].indexOf(max);
            console.warn(`receivedMirrorIndex is ${receivedMirrorIndex}`);
            console.warn(`array is ${array}`);
            console.warn(`array.length is ${array.length}`);
            console.warn(`array.length - i is ${array.length - i}`);
            console.warn(`mirrorIndexValue(i) is ${mirrorIndexValue(i)}`);
            console.warn(`${trueArrayValues}`);
            console.warn(
              `trueArrayValues[array.length - i] is ${
                trueArrayValues[array.length - i]
              }`
            );

            // When array is negative, i should be inverted, as in:
            // i = array.length - i
            // this belongs somewhere else!

            negativeArray
              ? (highlightValue =
                  trueArrayValues[trueArrayValues.length - i][biggestIndex])
              : (highlightValue = trueArrayValues[i][biggestIndex]);

            document
              .getElementsByTagName("span")
              .item(highlightValue).style.backgroundColor = "#8cff66";
          }
        }
      }
    }
    // if (trueArrayValues[i] == "undefined" || trueArrayValues[i].length == 0) {
    //   document.getElementsByTagName("span").item(i + 1).style.backgroundColor =
    //     "red";
    // }

    i += biggestIndex;
  }

  console.warn(trueValues);
  console.warn(newPossibleSteps);
  console.warn(trueArrayValues);

  document.getElementById("arrayEntered").innerHTML = array.toString();

  // Rewrite this condition?
  for (let z = trueArrayValues.length; z > 0; z--) {
    if (trueArrayValues[z].length !== "undefined") {
      if (
        trueArrayValues[z][trueArrayValues[z].length - 1] ===
        array.length - 1
      ) {
        console.warn(`z is ${z}`);
        console.log("Array is winnable!");
        arrayWinnable();

        document.getElementsByTagName("span").item(0).style.backgroundColor =
          "#8cff66";
        document
          .getElementsByTagName("span")
          .item(array.length - 1).style.backgroundColor = "#8cff66";
        return;
      }
    } else arrayUnwinnable();
  }
}
