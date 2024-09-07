import { formatCurrecny } from "../scripts/utils/money.js";
//Basic test case
console.log('test suite: format currency')
console.log('converts cents into dollars')
if(formatCurrecny(2095)==='20.95'){
  console.log('passed');
}
else{
  console.log('falied');
}

//Edge test cases
console.log('works with 0')
if(formatCurrecny(0)==='0.00'){
  console.log('passed');
}
else{
  console.log('falied');
}
console.log('rounds up to the nearst cent')
if(formatCurrecny(2000.5)==='20.01'){
  console.log('passed');
}
else{
  console.log('falied');
}


if(formatCurrecny(2000.4)==='20.00'){
  console.log('passed');
}
else{
  console.log('falied');
}
