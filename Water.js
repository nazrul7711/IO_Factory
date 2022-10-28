let inp = [0, 4, 0, 0, 0, 6, 0, 6, 4, 0];
let maximum = Math.max(...inp) + 2;

let leftArr = [];
let rightArr = [];
leftArr[0] = inp[0];
for (let i = 1; i < inp.length; i++) {
  leftArr[i] = Math.max(inp[i], leftArr[i - 1]);
}
rightArr[inp.length - 1] = inp[inp.length - 1];
for (let i = inp.length - 2; i >= 0; i--) {
  rightArr[i] = Math.max(inp[i], rightArr[i + 1]);
}
let ans = 0;
let arr1 = [];
for (let i = 0; i < inp.length; i++) {
  arr1.push(Math.min(leftArr[i], rightArr[i]) - inp[i]);
  ans += Math.min(leftArr[i], rightArr[i]) - inp[i];
}

let arr3 = [];
for (let i = 0; i < inp.length; i++) {
  let arr2 = [0, 0, 0, 0, 0, 0, 0, 0];
  if (arr1[i] != 0) {
    arr2.fill(1, 0, arr1[i]);
  }
  arr3.push(arr2);
}
function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}
let arr4 = transpose(arr3);
let arr5 = [];
for (let i = 7; i >= 0; i--) {
  arr5.push(arr4[i]);
}

var table = document.createElement("table"),
  tr,
  td,
  row,
  cell;

for (let row = 0; row < maximum; row++) {
  tr = document.createElement("tr");
  for (let cell = 0; cell < 10; cell++) {
    td = document.createElement("td");
    tr.append(td);
    if (arr5[row][cell] == 1) {
      td.innerHTML = `<div style="background-color:blue;width:50px">yes</div>`;
    } else {
      td.innerHTML = `<div style="background-color:red;width:50px">no</div>`;
    }
  }

  table.appendChild(tr);
}
document.getElementById("container").appendChild(table);
