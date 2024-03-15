const middleNumbers = (number, digits) => {
    const isEven = digits % 2 == 0;
    let numberText = number.toString();
    let numberDigits = numberText.length;
    if (isEven != (numberDigits % 2 == 0)) {
      numberText = "0" + numberText;
      numberDigits = numberText.length;
    }
    const digitDifference = numberDigits - digits;
    const arr = numberText.split("");
    let newArr = Array();
    for (let i = 0; i < digits; i++) {
      newArr.push(arr[digitDifference / 2 + i]);
    }
    const middle = parseInt(newArr.join(""));
    return parseInt(middle);
  };
  const digitsCalc = (number) => {
    let x = 0;
    while (number > 10) {
      number = number / 10;
      x++;
    }
    x++;
    return x;
  };
  
  const repeatComprobation = (number, array) => {
    let repeated = false;
    let index = 0;
    let message = "";
    for (let i = 0; i < array.length; i++) {
      //console.log(array[i], number);
      if (number === array[i].r && repeated === false) {
        message = `El número ${number} de la posicion ${
          i + 1
        } se repite en la posición ${array.length + 1}`;
        repeated = true;
        index = i;
        break;
      }
    }
    return { number: number, repeated: repeated, index: index, message: message };
  };
  
  const Ceros = (number, digits) => {
    number = number.toString();
    let ceros = "";
    if (number.length < digits) {
      for (let i = 0; i < digits - number.length; i++) {
        ceros += "0";
      }
    }
    return ceros + number;
  };
  const squareMethod = (seed, quantity2) => {
    let y = 0;
    let x = seed;
    let randArray = Array();
    let digits = digitsCalc(seed);
    let repeated = { repeated: false };
  
    while (quantity2 != 0) {
      y = x * x;
      let rand = {
        y: `(${x} * ${x}) = ${y}`,
      };
      x = middleNumbers(y, digits);
      r = (x / Math.pow(10, digits)).toFixed(digits);
      if (repeated.repeated === false) {
        repeated = repeatComprobation(r, randArray);
      }
      rand = {
        ...rand,
        x: Ceros(x, digits),
        r: r,
      };
      randArray.push(rand);
      quantity2=quantity2-1;
    }
    return { randArray: randArray, repeated: repeated };
  };
  
  const multiMethod = (seed1, seed2, quantity1) => {
    console.log(seed1, seed2);
    let repeated = { repeated: false };
    let y = 0;
    let x1 = seed1;
    let x2 = seed2;
    let randArray = Array();
    let digits = digitsCalc(seed1);
    while (quantity1 != 0) {
      y = x1 * x2;
      let rand = {
        y: `(${x1} * ${x2}) = ${y}`,
      };
      x1 = x2;
      x2 = middleNumbers(y, digits);
      r = (x2 / Math.pow(10, digits)).toFixed(digits);
      if (repeated.repeated === false) {
        repeated = repeatComprobation(r, randArray);
      }
      rand = {
        ...rand,
        x: Ceros(x2, digits),
        r: r,
      };
      randArray.push(rand);
      quantity1=quantity1-1;
    }
    return { randArray: randArray, repeated: repeated };
  };
  
  aditiveMethod = (a, c, quantity, seed) => {
    let x = seed;
    let randArray = Array();
    for (let i = 0; i < quantity + 1; i++) {
      x = (a * x + c) % quantity;
      console.log(x);
      r = x / (quantity - 1);
      randArray.push({ r: r.toFixed(4), x: x });
    }
    return randArray;
  };
  multiplicativeMethod = (a, quantity, seed) => {
    console.log(a, quantity, seed);
    let x = seed;
    let m = Math.pow(2, Math.log2(quantity) + 2);
    let randArray = Array();
    for (let i = 0; i < quantity + 1; i++) {
      console.log(x);
      x = (a * x) % m;
      r = x / (m - 1);
      randArray.push({ r: r.toFixed(4), x: x });
    }
    return randArray;
  };