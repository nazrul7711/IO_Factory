let options = ["P", "T", "C"];
let timeArr = [4, 5, 10];
let priceArr = [1000, 1500, 3000];
let n = priceArr.length;
function maxProfit(timeArr, priceArr, time, n) {
  if (n == 0 || time == 0) {
    return 0;
  } else if (timeArr[n - 1] <= time) {
    return Math.max(
      priceArr[n - 1] +
        maxProfit(timeArr, priceArr, time - timeArr[n - 1], n - 1),
      maxProfit(timeArr, priceArr, time, n - 1)
    );
  } else {
    return maxProfit(timeArr, priceArr, time, n - 1);
  }
}
let ansTwo = maxProfit(timeArr, priceArr, 8, 3);

let arr = [];
for (let i = 0; i < timeArr.length; i++) {
  if (ansTwo % priceArr[i] == 0) {
    let a = ansTwo / priceArr[i];
    let b = 8;
    let c = 0;
    for (let j = 0; j < a; j++) {
      b -= timeArr[i];
      c += b * priceArr[i];
    }
    arr.push(c);
  }
}
let val2 = [0, 0, 0];
let answerInd = arr.indexOf(Math.max(...arr));
let val1 = Math.floor(ansTwo / priceArr[answerInd]);
val2[answerInd] = val1;

let answer = {};
for (let i = 0; i < priceArr.length; i++) {
  answer[options[i]] = val2[i];
}
//answer
