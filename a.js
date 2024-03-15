let method = document.querySelector("#methodSelect").value;
const linearMethodHeadText =
  "<th style='width: 5%'>i</th> <th style='width: 45%'>Yi</th> <th style='width: 25%'>Xi</th> <th style='width: 25%'>Ri</th>";
const multiMethodHeadText =
  "<th style='width: 5%'>i</th><th style='width: 50%'>X</th><th style='width: 45%'>Ri</th>";
const table = document.querySelector("#table");
let obs = document.querySelector("#obs");
const tableHead = document.querySelector("#tableHead");
let a_gen = "1";
let k = 0;
let p = 0;
let a = 0;

// selection of  method
document.querySelector("#methodSelect").addEventListener("change", () => {
  method = document.querySelector("#methodSelect").value;
  console.log(method);
  hideInputs();
  if (method === "Cuadrados medios") {
    document.querySelector("#squareMethodForm").style.display = "flex";
  }
  if (method === "Productos medios") {
    document.querySelector("#multiMethodForm").style.display = "flex";
  }

  if (method === "Lineal") {
    document.querySelector("#aditiveMethodForm").style.display = "flex";
  }

  if (method === "Multiplicativo") {
    document.querySelector("#multiplicativeMethodForm").style.display = "flex";
  }
});

const btn = document.querySelector("#button").addEventListener("click", () => {
  console.log("asda");
  let randArray = Array();
  if (method === "Cuadrados medios") {
    tableHead.innerHTML = linearMethodHeadText;
    randArray = squareMethodImpl();
    generateObservations(randArray);
  }
  if (method === "Productos medios") {
    tableHead.innerHTML = linearMethodHeadText;
    randArray = multiMethodImpl();
    generateObservations(randArray);
  }
  if (method === "Lineal") {
    tableHead.innerHTML = multiMethodHeadText;
    randArray = aditiveMethodImpl();
  }
  if (method === "Multiplicativo") {
    tableHead.innerHTML = multiMethodHeadText;
    randArray = multiplicativeMethodImpl();
  }
  table.style.display = "block";

  document.querySelector("#tableBody").innerHTML = generateTable(
    randArray,
    method
  );
});

document.querySelector("#k").addEventListener("input", (event) => {
  k = parseInt(event.target.value);
  generateObservations();
});

document.querySelector("#p1").addEventListener("input", (event) => {
  p = parseInt(event.target.value);
  generateObservations();
});

document.querySelector("#p").addEventListener("input", (event) => {
  p = parseInt(event.target.value);
  generateObservations();
});
document
  .querySelectorAll("input[name='a_gen']")[0]
  .addEventListener("change", (event) => {
    a_gen = event.target.value;
    generateObservations();
  });

document
  .querySelectorAll("input[name='a_gen']")[1]
  .addEventListener("change", (event) => {
    a_gen = event.target.value;
    generateObservations();
  });

const squareMethodImpl = () => {
  const quantity2 = document.querySelector("#quantity2");
  const seed = document.querySelector("#seed");
  const rand = (randArray = squareMethod(
    parseInt(seed.value),
    parseInt(quantity2.value)
  ));
  // seed.value = "";
  // quantity2.value = "";

  return rand;
};

const multiMethodImpl = () => {
    const quantity1 = document.querySelector("#quantity1");
  const seed1 = document.querySelector("#seed1");
  const seed2 = document.querySelector("#seed2");

  if (inputValidation([seed1, seed2]) === false) {
    return;
  }

  const rand = (randArray = multiMethod(
    parseInt(seed1.value),
    parseInt(seed2.value),
    parseInt(quantity1.value)
  ));

  // seed1.value = "";
  // seed2.value = "";
  // quantity1.value = "";
  return rand;
};

const aditiveMethodImpl = () => {
  const seedAditive = document.querySelector("#seedAditive");
  const a = document.querySelector("#a");
  const c = document.querySelector("#c");
  const p = document.querySelector("#p");

  if (
    inputValidation([
      parseInt(a.value),
      parseInt(c.value),
      parseInt(p.value),
      parseInt(seedAditive.value),
    ]) === false
  ) {
    return;
  }
  const rand = (randArray = aditiveMethod(
    parseInt(a.value),
    parseInt(c.value),
    parseInt(p.value),
    parseInt(seedAditive.value)
  ));
  // seedAditive.value = "";
  // a.value = "";
  // c.value = "";
  // p.value = "";

  return rand;
};

const multiplicativeMethodImpl = () => {
  const seedAditive = document.querySelector("#seedMutiplicative");
  const p = document.querySelector("#p1");
  if (
    inputValidation([
      parseInt(a),
      parseInt(p.value),
      parseInt(seedAditive.value),
    ]) === false
  ) {
    return;
  }
  const rand = (randArray = multiplicativeMethod(
    parseInt(a),
    parseInt(p.value),
    parseInt(seedAditive.value)
  ));
  // seedAditive.value = "";
  // a.value = "";
  // c.value = "";
  // p.value = "";

  return rand;
};

hideInputs = () => {
  document.querySelector("#squareMethodForm").style.display = "none";
  document.querySelector("#multiMethodForm").style.display = "none";
  document.querySelector("#aditiveMethodForm").style.display = "none";
  document.querySelector("#multiplicativeMethodForm").style.display = "none";
};

generateObservations = (randArray) => {
  let g;
  let observation = "";
  console.log(method);
  if (method === "Lineal") {
    if (p !== 0 && Number.isNaN(p) === false) {
      g = Math.log2(p);
      observation = `g = ${g} <br>`;
    }
  }
  if (method === "Multiplicativo") {
    if (p !== 0 && Number.isNaN(p) === false) {
      g = Math.log2(p) + 2;
      observation += `g = ${g} <br>`;
      console.log(p);
    }
    if (Number.isNaN(k) === false) {
      a = a_gen === "1" ? 8 * k + 3 : 8 * k + 5;
      observation += `a = ${a}`;
      console.log(k);
    }
  }
  if (method === "Productos medios" || method === "Cuadrados medios") {
    console.log(randArray.repeated.message);
    observation = randArray.repeated.message;
  }
  obs.innerHTML = observation;
};

generateTable = (randArray, method) => {
  let tableBody = "";
  console.log(method);
  if (method === "Cuadrados medios" || method === "Productos medios") {
    randArray.randArray.forEach((element, index) => {
      tableBody += `<tr><td>${index + 1}</td><td>${element.y}</td><td>${
        element.x
      }</td><td>${element.r}</td></tr>`;
    });
  }
  if (method === "Lineal" || method === "Multiplicativo") {
    randArray.forEach((element, index) => {
      tableBody += `<tr><td>${index + 1}</td><td>${element.x}</td><td>${
        element.r
      }</td></tr>`;
    });
  }
  return tableBody;
};

inputValidation = (inputs) => {
  for(let i = 0; i < inputs.length; i++){
    if(Number.isNaN(inputs[i]) === true){
      return false;
    }
  }
  return true;
};