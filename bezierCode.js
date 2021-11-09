const diff = 1 / 5000;
let points = [];
// Set maxPoints to 0 to disable it
let maxPoints = 0;
let interpUsed = 1;
let updated = true;

function setup() {
  createCanvas(document.body.clientWidth, document.body.clientHeight);
}

function draw() {
  if (updated) {
    background(180);

    strokeWeight(1);
    if (points.length > 0) {
      stroke("black");
      strokeWeight(5);
      points.forEach((pt) => point(pt));
      strokeWeight(1);
      bez(points);
    }
    
    updated = false;
  }
}

function bez(arr) {
  for (let t = 0; t < 1; t += diff) {
    if (interpUsed == 1) {
      directInterp(arr, t);
    } else {
      interp(arr, t);
    }
  }
}

function pascalsTriangle(depth) {
  if (depth == 0) {
    return [1];
  }
  let arr = [1];
  let newArr;
  for (let i = 0; i < depth; i++) {
    newArr = [];
    newArr.push(1);
    for (let j = 1; j < arr.length; j++) {
      newArr.push(arr[j - 1] + arr[j]);
    }
    newArr.push(1);
    arr = newArr;
  }
  return arr;
}

function directInterp(arr, t) {
  // The recursive lerping matches binomial expansion for polynomials
  // so we don't actually have to recursively interpolate, doing many steps
  // instead we can use pascal's triangle to get the necessary coefficients
  // and we know how the powers change, so we can just determine the overall
  // weight of each point towards the final point and add that directly
  // So this runs in just O(n) time
  let total = arr.length - 1;
  let p = createVector(0, 0);
  let coefficients = pascalsTriangle(total);
  for (let i = 0; i < arr.length; i++) {
    let oneMinusT = pow(1 - t, total - i);
    let T = pow(t, i);
    let coefficient = coefficients[i];

    let factor = oneMinusT * T * coefficient;
    p.add(arr[i].x * factor, arr[i].y * factor);
  }
  stroke("red");
  point(p);
}

function interp(arr, t) {
  // Recursively interpolates, that means it'll run n then n - 1 then n - 2 etc. times, overall O(n^2)
  if (arr.length == 2) {
    stroke("blue");
    point(getPoint(arr[0], arr[1], t));
    // line(arr[0].x, arr[0].y, arr[1].x, arr[1].y);
  } else {
    let lerped = [];
    for (let i = 0; i < arr.length - 1; i++) {
      lerped.push(getPoint(arr[i], arr[i + 1], t));
    }
    interp(lerped, t);
  }
}

function getPoint(p1, p2, t) {
  return createVector(p1.x * (1 - t) + t * p2.x, p1.y * (1 - t) + t * p2.y);
}

function mouseClicked() {
  updated = true;
  if (maxPoints != 0 && points.length == maxPoints) {
    points = points.slice(1);
    points.push(createVector(mouseX, mouseY));
  } else {
    points.push(createVector(mouseX, mouseY));
  }

  console.log(points[points.length - 1]);
}

function keyPressed() {
  updated = true;
  interpUsed = 1 - interpUsed;
}
