

//////////////////////////////////////////////////// row 합계 구하기
function losFocus(id) {
  //ID 형식 :  txt + "_" + OOO(축약어) + "_" + index 
  //따라서 앞에 고정 문자열의 개수는 8개(txt_ooo_)
  var pDefault_lenght = 8;
  
  //전달받은 ID의 끝자리 Index를 추출해서 
  //동일 Index를 가지고 있는 ID의 이름에 Index 를 붙여줌.
  var pIndex = String(id.substring(pDefault_lenght, id.length));
  
  var pri_name = "txt_pri_" + pIndex;	//가격 컬럼의 ID
  var qty_name = "txt_qty_" + pIndex;	//수량 컬럼의 ID
  var tot_name = "tot_amt_" + pIndex; //총 금액 컬럼의 ID


  var qty = document.getElementById(qty_name).value;	//해당 수량컬럼의 값을 qty 에 저장
  var pri = document.getElementById(pri_name).value;	//해당 가격컬럼의 값을 pri 에 저장
  var tot_amt = qty.replace(",", "") * pri.replace(",", ""); //수량, 또는 금액 값에 ","" 가 입력되있을 때 오류를 방지하기 위해 .replace 로  "," 제거

  document.getElementById(tot_name).innerHTML = tot_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	//총 금액컬럼에 계산된 금액 입력. 3자리마다 "," 입력.
}

function showKeyCode(event, name) {
  event = event || window.event;
  var keyID = (event.which) ? event.which : event.keyCode;
  if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 188) {
    return;
  } else {
    return false;
  }

}







/////////////////////////////////////// 숫자 입력 (마이너스, 소수점, 콤마)
function numberFormat(val, isMinus, isFloat, isComma){
    var str = val;
    //일단 마이너스, 소수점을 제외한 문자열 모두 제거
    str = str.replace(/[^-\.0-9]/g, '');
    //마이너스
    if(isMinus){
       str = chgMinusFormat(str);   
    } else {
       str = str.replace('-','');
    }
    
    //소수점
    if(isFloat){
       str = chgFloatFormat(str);       
    } else {
       if(!isMinus ){
          str = str.replace('-','');
       }
       str = str.replace('.','');
       if(str.length>1){
          str = Math.floor(str);
          str = String(str);
       }
    }
    
    //콤마처리
    if(isComma){
       var parts = str.toString().split('.');
       if(str.substring(str.length - 1, str.length)=='.'){
          str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",") +".";
       } else {
          str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",") + (parts[1] ? "." + parts[1] : "");
       }
    }
  
    return str;
  }
  
function chgFloatFormat(str){
var idx = str.indexOf('.');  
if(idx<0){  
    return str;
} else if(idx>0){
    var tmpStr = str.substr(idx+1);    
    if(tmpStr.length>1){             
        if(tmpStr.indexOf('.')>=0){        
            tmpStr =  tmpStr.replace(/[^\d]+/g, '');                  
            str = str.substr(0,idx+1) + tmpStr;
        }
    }    
} else if(idx==0){
        str = '0'+str;
}
return str;  
}
    
function chgMinusFormat(str){
var idx = str.indexOf('-');
if(idx==0){
var tmpStr = str.substr(idx+1);
    //뒤에 마이너스가 또 있는지 확인
    if(tmpStr.indexOf('-')>=0){
            tmpStr = tmpStr.replace('-','');
        str = str.substr(0,idx+1) + tmpStr;  
    }
} else if(idx>0){
        str = str.replace('-','');
} else if(idx<0){
        return str;
}
    return str;
}



/////////////////////////////////////////////// 총합계구하기  

function calcSum() {
    // table element 찾기
    const table = document.getElementById('page1_table_id');

    // 합계 계산
    let sum = 0;

    for(let i = 0; i < table.rows.length-1; i++)  {  // 마지막행 제외하고 계산
        let value = stringNumberToInt(table.rows[i].cells[5].innerText);
        // 만약 value가 Nan 이라면 0으로 처리
        // sum 시켜주기
        if (isNaN(value)) {
            value = 0
          }
        console.log("value: "+value)
        sum += value
        // sum += parseInt(table.rows[i].cells[5].innerText);
    }

    // 합계 출력
    sum = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	//총 금액컬럼에 계산된 금액 입력. 3자리마다 "," 입력.
    document.getElementById('tot_amt_last').innerText = sum;

    }

function stringNumberToInt(stringNumber){
    return parseInt(stringNumber.replace(/,/g , ''));
}





////////////////////////////////////////          page2            ////////////////////////////////////////////////



// //////////////////////////////////////////////////// row 합계 구하기
// function losFocus_part(id) {
//   //ID 형식 :  txt + "_" + OOO(축약어) + "_" + index 
//   //따라서 앞에 고정 문자열의 개수는 8개(txt_ooo_)
//   var pDefault_lenght = 8;
  
//   //전달받은 ID의 끝자리 Index를 추출해서 
//   //동일 Index를 가지고 있는 ID의 이름에 Index 를 붙여줌.
//   var pIndex = String(id.substring(pDefault_lenght, id.length));
//     var tot_name = "tot_amt_" + pIndex; //총 금액 컬럼의 ID

//   // var tot_amt_value = document.getElementById(tot_name).value; // 각줄의 tot_amt 값 가져오기

//   // if (isNaN(tot_amt_value)) {  // nan이면 0으로
//   //   tot_amt_value = 0
//   // }

//   // objName 체크 
//   if ( document.getElementById("tot_name")  == null ) { 
//     var tot_amt_value = 0
//   }
//   else{
//     var tot_amt_value = document.getElementById(tot_name).value;
//   }
//   console.log(tot_amt_value)


//   // var tot_amt = tot_amt_value.replace(",", "");  // ',' 제거
  
//   let sum = 0

//   if (pIndex>0 && pIndex<15){
//     var tot_name_part = "tot_amt_15"
//     for(let i = 0; i < 14; i++){
//       let value = stringNumberToInt(table.rows[i].cells[5].innerText);
//       sum += value
//     }

//   }

//   document.getElementById(tot_name_part).innerHTML = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	//총 금액컬럼에 계산된 금액 입력. 3자리마다 "," 입력.
//   // document.getElementById(tot_name).innerHTML = tot_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	//총 금액컬럼에 계산된 금액 입력. 3자리마다 "," 입력.
// }

// function showKeyCode(event, name) {
//   event = event || window.event;
//   var keyID = (event.which) ? event.which : event.keyCode;
//   if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 188) {
//     return;
//   } else {
//     return false;
//   }
// }





///////////////////////////////////////////////  page2 총합계구하기
function calcSumPage2() {

  calcSumPart(index=1)
  calcSumPart(index=2)
  calcSumPart(index=3)
  calcSumPart(index=4)
  calcSumPart(index=5)
  calcSumPart(index=6)
  calcSumPart(index=7)
  calcSumPart(index=8)
  calcSumPart(index=9)
  calcSumPart(index=10)
  calcSumPart(index=11)
  calcSumPart(index=12)
  calcSumPart(index=13)


  // table element 찾기
  const table = document.getElementById('page2_table_id');

  // 합계 계산
  let total_sum = 0;

  // part_sum_array
  var part_sum_array = [0, 15, 19, 23, 29 , 41, 53, 60, 70, 73, 76, 82, 85, 99] // i값

  for(let i = 0; i < table.rows.length-1; i++)  {  // 마지막행 제외하고 계산
    if (part_sum_array.includes(i)){
      let value = stringNumberToInt(table.rows[i].cells[5].innerText);
      // 만약 value가 Nan 이라면 0으로 처리
      // sum 시켜주기
      if (isNaN(value)) {
          value = 0
        }
      console.log("value: "+value)
      total_sum += value
      // sum += parseInt(table.rows[i].cells[5].innerText);
    }
  }

  // 합계 출력
  total_sum = total_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	//총 금액컬럼에 계산된 금액 입력. 3자리마다 "," 입력.
  document.getElementById('tot_amt_last_page2').innerText = total_sum;

}

function stringNumberToInt(stringNumber){
  return parseInt(stringNumber.replace(/,/g , ''));
}



///////////////////////////////////////////////  파트 합계구하기
function calcSumPart(index) {
  // table element 찾기
  const table = document.getElementById('page2_table_id');

  // 합계 계산
  let total_sum = 0;

  // part_sum_array
  if (index==1){
    var part_array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14] // id값
    var tot_amt_id = 'tot_amt_16' // k값 
  }
  if (index==2){
    var part_array = [17,18]
    var tot_amt_id = 'tot_amt_20'
  }
  if (index==3){
    var part_array = [21,22]
    var tot_amt_id = 'tot_amt_24'
  }
  if (index==4){
    var part_array = [25,26,27,28]
    var tot_amt_id = 'tot_amt_30'
  }
  if (index==5){
    var part_array = [31,32,33,34,35,36,37,38,39,40]
    var tot_amt_id = 'tot_amt_42'
  }
  if (index==6){
    var part_array = [43,44,45,46,47,48,49,50,51,52]
    var tot_amt_id = 'tot_amt_54'
  }
  if (index==7){
    var part_array = [55,56,57,58,59]
    var tot_amt_id = 'tot_amt_61'
  }
  if (index==8){
    var part_array = [62,63,64,65,66,67,68,69]
    var tot_amt_id = 'tot_amt_71'
  }
  if (index==9){
    var part_array = [72]
    var tot_amt_id = 'tot_amt_74'
  }
  if (index==10){
    var part_array = [75]
    var tot_amt_id = 'tot_amt_77'
  }
  if (index==11){
    var part_array = [78,79,80,81]
    var tot_amt_id = 'tot_amt_83'
  }
  if (index==12){
    var part_array = [84]
    var tot_amt_id = 'tot_amt_86'
  }
  if (index==13){
    var part_array = [87,88,89,90,91,92,93,94,95,96,97,98]
    var tot_amt_id = 'tot_amt_100'
  }


  for(let i = 0; i < table.rows.length-1; i++)  {  // 마지막행 제외하고 계산
    if (part_array.includes(i)){
      let value = stringNumberToInt(table.rows[i].cells[5].innerText);
      // 만약 value가 Nan 이라면 0으로 처리
      // sum 시켜주기
      if (isNaN(value)) {
          value = 0
        }
      console.log("value: "+value)
      total_sum += value
      // sum += parseInt(table.rows[i].cells[5].innerText);
    }
  }

  // 합계 출력
  total_sum = total_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	//총 금액컬럼에 계산된 금액 입력. 3자리마다 "," 입력.
  document.getElementById(tot_amt_id).innerText = total_sum;

}











