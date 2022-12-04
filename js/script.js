

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
  var tot_amt = qty.replace(/,/g, "") * pri.replace(/,/g, ""); //수량, 또는 금액 값에 ","" 가 입력되있을 때 오류를 방지하기 위해 .replace 로  "," 제거

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



///////////////////////////////// 저장된값 불러와서 표시하기
function page1_local_data_display() {
  // 저장값 불러오기
  var json_data = JSON.parse(localStorage.getItem("price"));
  
  document.getElementById("page1_price_1").innerText = json_data['폐기물처리,철거']
  document.getElementById("page1_price_2").innerText = json_data['문공사']
  document.getElementById("page1_price_3").innerText = json_data['창호공사']
  document.getElementById("page1_price_4").innerText = json_data['도배,바닥공사']
  document.getElementById("page1_price_5").innerText = json_data['필름공사']
  document.getElementById("page1_price_6").innerText = json_data['타일,욕실공사']
  document.getElementById("page1_price_7").innerText = json_data['목공사']
  document.getElementById("page1_price_8").innerText = json_data['전기공사']
  document.getElementById("page1_price_9").innerText = json_data['확장공사']
  document.getElementById("page1_price_10").innerText = json_data['철물공사']
  document.getElementById("page1_price_11").innerText = json_data['기타공사']
  document.getElementById("page1_price_12").innerText = json_data['도장공사']
  document.getElementById("page1_price_13").innerText = json_data['가구공사']
  document.getElementById("page1_price_14").innerText = json_data['이윤 및 공과잡비']
  document.getElementById("page1_price_15").innerText = json_data['소계']
  document.getElementById("page1_price_16").innerText = json_data['부가세']
  document.getElementById("page1_price_17").innerText = json_data['합계']
}





////////////////////////////////////////          page2            ////////////////////////////////////////////////


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

  // 11번 카테고리까지 합 구하기
  let total_sum_1_to_11 = 0;

  // part_sum_array
  var part_sum_array = [15, 19, 23, 29 , 41, 53, 60, 70, 73, 76, 82, 85, 99] // i값

  for(let i = 0; i < table.rows.length-1; i++)  {  // 마지막행 제외하고 계산
    if (part_sum_array.includes(i)){
      let value = stringNumberToInt(table.rows[i].cells[5].innerText);
      // 만약 value가 Nan 이라면 0으로 처리
      // sum 시켜주기
      if (isNaN(value)) {
          value = 0
        }
      total_sum_1_to_11 += value
    }
  }
  // 공과잡비와 이윤 및 경비 넣어주기
  var utility_bills = Math.ceil ( total_sum_1_to_11 * 0.05 );  // 5% 
  var utility_bills = utility_bills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById("tot_amt_102").innerHTML = utility_bills;

  var profit = Math.ceil( total_sum_1_to_11 * 0.07 );  // 7% 
  var profit = profit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById("tot_amt_103").innerHTML = profit;

  calcSumPart(index=14)



  // 합계 계산
  let total_sum = 0;

  // part_sum_array
  var part_sum_array = [15, 19, 23, 29 , 41, 53, 60, 70, 73, 76, 82, 85, 99,103] // i값

  for(let i = 0; i < table.rows.length-1; i++)  {  // 마지막행 제외하고 계산
    if (part_sum_array.includes(i)){
      let value = stringNumberToInt(table.rows[i].cells[5].innerText);
      // 만약 value가 Nan 이라면 0으로 처리
      // sum 시켜주기
      if (isNaN(value)) {
          value = 0
        }
      console.log("part_sum_value: "+value)
      total_sum += value
      // sum += parseInt(table.rows[i].cells[5].innerText);
    }
  }

  // 부가세가 안더해진 값 저장하기
  var total_sum_without_vat = total_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 1.1 부가세 값 넣어주기
  var vat = Math.ceil( total_sum * 0.1 );
  var vat = vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // document.getElementById("txt_pri_105").value = vat;
  var vat_replace = vat.replace(/,/g, "");

  total_sum += stringNumberToInt(vat_replace)

  // 합계 출력
  total_sum = total_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	//총 금액컬럼에 계산된 금액 입력. 3자리마다 "," 입력.
  document.getElementById('tot_amt_last_page2').innerText = total_sum_without_vat;

  // 가격 데이터 page간 전달을 위한 json
  var price = {
      "폐기물처리,철거" : table.rows[part_sum_array[0]].cells[5].innerText,
      "문공사" : table.rows[part_sum_array[1]].cells[5].innerText,
      "창호공사" : table.rows[part_sum_array[2]].cells[5].innerText,
      "도배,바닥공사" : table.rows[part_sum_array[3]].cells[5].innerText,
      "필름공사" : table.rows[part_sum_array[4]].cells[5].innerText,
      "타일,욕실공사" : table.rows[part_sum_array[5]].cells[5].innerText,
      "목공사" : table.rows[part_sum_array[6]].cells[5].innerText,
      "전기공사" : table.rows[part_sum_array[7]].cells[5].innerText,
      "확장공사" : table.rows[part_sum_array[8]].cells[5].innerText,
      "철물공사" : table.rows[part_sum_array[9]].cells[5].innerText,
      "기타공사" : table.rows[part_sum_array[10]].cells[5].innerText,
      "도장공사" : table.rows[part_sum_array[11]].cells[5].innerText,
      "가구공사" : table.rows[part_sum_array[12]].cells[5].innerText,
      "이윤 및 공과잡비" : table.rows[part_sum_array[13]].cells[5].innerText,
      "소계" :total_sum_without_vat,
      "부가세" : vat,
      "합계" : total_sum,
  };

  // Json Object를 저장하기
  localStorage.setItem("price", JSON.stringify(price));
  
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
  if (index==14){
    var part_array = [101,102]
    var tot_amt_id = 'tot_amt_104'
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




  var all_part_array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,
    17,18,
    21,22,
    25,26,27,28,
    31,32,33,34,35,36,37,38,39,40,
    43,44,45,46,47,48,49,50,51,52,
    55,56,57,58,59,
    62,63,64,65,66,67,68,69,
    72,
    75,
    78,79,80,81,
    84,
    87,88,89,90,91,92,93,94,95,96,97,98
  ]

  // console.log(table.rows[i].cells[4].innerText);

  // 가격 데이터 page간 전달을 위한 json // 수량 데이터
  var all_part_num_data = {};

  for(let i = 0; i < table.rows.length-1; i++)  {  // 마지막행 제외하고 계산
    if (all_part_array.includes(i)){
      // let value = stringNumberToInt(table.rows[i].cells[0].innerText);
      
      var qty_name = "txt_qty_" + String(i+1);	//수량 컬럼의 ID
      var inputValue = document.getElementById(qty_name).value;

      // console.log(value)
      all_part_num_data[i+1] = inputValue
    }
  }

  // Json Object를 저장하기
  localStorage.setItem("all_part_num_data", JSON.stringify(all_part_num_data));






  // 가격 데이터 page간 전달을 위한 json 
  var all_part_price_data = {};

  for(let i = 0; i < table.rows.length-1; i++)  {  // 마지막행 제외하고 계산
    if (all_part_array.includes(i)){
      // let value = stringNumberToInt(table.rows[i].cells[0].innerText);
      
      var pri_name = "txt_pri_" + String(i+1);	//수량 컬럼의 ID
      var inputValue = document.getElementById(pri_name).value;

      // console.log(value)
      all_part_price_data[i+1] = inputValue
    }
  }

  // Json Object를 저장하기
  localStorage.setItem("all_part_price_data", JSON.stringify(all_part_price_data));


} 



/////////////////////////////// 전에 계산했던 데이터 불러오기
function DataloadPage2() {
  // table element 찾기
  const table = document.getElementById('page2_table_id');

  var all_part_array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,
    17,18,
    21,22,
    25,26,27,28,
    31,32,33,34,35,36,37,38,39,40,
    43,44,45,46,47,48,49,50,51,52,
    55,56,57,58,59,
    62,63,64,65,66,67,68,69,
    72,
    75,
    78,79,80,81,
    84,
    87,88,89,90,91,92,93,94,95,96,97,98
  ]

  var all_part_num_data= JSON.parse(localStorage.getItem("all_part_num_data"));
  var all_part_price_data= JSON.parse(localStorage.getItem("all_part_price_data"));
  var price= JSON.parse(localStorage.getItem("price"));

  for(let i = 0; i < table.rows.length-1; i++)  {  // 마지막행 제외하고 계산
    if (all_part_array.includes(i)){
      // let value = stringNumberToInt(table.rows[i].cells[0].innerText);
      
      var qty_name = "txt_qty_" + String(i+1);	//수량 컬럼의 ID
      document.getElementById(qty_name).value = all_part_num_data[i+1];

      var pri_name = "txt_pri_" + String(i+1);	//단가 컬럼의 ID
      document.getElementById(pri_name).value = all_part_price_data[i+1];

      CalcRow(i+1)
    }
  }

  // document.getElementById("txt_pri_105").value = price['부가세'];

  calcSumPage2()  

}

//////////////////////////////////////////////////// row 합계 구하기
function CalcRow(id) {
  //ID 형식 :  txt + "_" + OOO(축약어) + "_" + index 
  //따라서 앞에 고정 문자열의 개수는 8개(txt_ooo_)
  var pDefault_lenght = 8;
  
  //전달받은 ID의 끝자리 Index를 추출해서 
  //동일 Index를 가지고 있는 ID의 이름에 Index 를 붙여줌.
  var pIndex = String(id);
  
  var pri_name = "txt_pri_" + pIndex;	//가격 컬럼의 ID
  var qty_name = "txt_qty_" + pIndex;	//수량 컬럼의 ID
  var tot_name = "tot_amt_" + pIndex; //총 금액 컬럼의 ID

  var qty = document.getElementById(qty_name).value;	//해당 수량컬럼의 값을 qty 에 저장
  var pri = document.getElementById(pri_name).value;	//해당 가격컬럼의 값을 pri 에 저장
  var tot_amt = qty.replace(/,/g, "") * pri.replace(/,/g, ""); //수량, 또는 금액 값에 ","" 가 입력되있을 때 오류를 방지하기 위해 .replace 로  "," 제거

  document.getElementById(tot_name).innerHTML = tot_amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	//총 금액컬럼에 계산된 금액 입력. 3자리마다 "," 입력.
}



////////////////////////////////////////  select 함수


function artwallValue(){
  var value = document.getElementById('artwall');
  var text = value.options[value.selectedIndex].text;
  if( text == 'MDF' ){
    document.getElementById('txt_pri_4').value = "120,000";
  }
  if( text == '대리석돌' ){
    document.getElementById('txt_pri_4').value = "220,000";
  }
}


function doorValue(){
  var value = document.getElementById('door');
  var text = value.options[value.selectedIndex].text;
  if( text == '문/문틀' ){
    document.getElementById('txt_pri_12').value = "34,000";
  }
  if( text == '문' ){
    document.getElementById('txt_pri_12').value = "13,000";
  }
}


function middoorValue(){
  var value = document.getElementById('middoor');
  var text = value.options[value.selectedIndex].text;
  if( text == '3연동슬림' ){
    document.getElementById('txt_pri_18').value = "1,050,000";
  }
  if( text == '스윙도어' ){
    document.getElementById('txt_pri_18').value = "1,250,000";
  }
  if( text == '프리미엄슬라이딩' ){
    document.getElementById('txt_pri_18').value = "1,200,000";
  }
}


function roomdoorValue(){
  var value = document.getElementById('roomdoor');
  var text = value.options[value.selectedIndex].text;
  if( text == 'ABS도어' ){
    document.getElementById('txt_pri_19').value = "350,000";
  }
  if( text == '문짝' ){
    document.getElementById('txt_pri_19').value = "145,000";
  }
  if( text == '문틀' ){
    document.getElementById('txt_pri_19').value = "195,000";
  }
}
function tunningdoorValue(){
  var value = document.getElementById('tunningdoor');
  var text = value.options[value.selectedIndex].text;
  if( text == '' ){
    document.getElementById('txt_pri_22').value = "";
  }
  if( text == '' ){
    document.getElementById('txt_pri_22').value = "";
  }
  if( text == '' ){
    document.getElementById('txt_pri_22').value = "";
  }
  if( text == '' ){
    document.getElementById('txt_pri_22').value = "";
  }
  if( text == '' ){
    document.getElementById('txt_pri_22').value = "";
  }
}

function balconydoorValue(){
  var value = document.getElementById('balconydoor');
  var text = value.options[value.selectedIndex].text;
  if( text == '' ){
    document.getElementById('txt_pri_23').value = "";
  }
  if( text == '' ){
    document.getElementById('txt_pri_23').value = "";
  }
  if( text == '' ){
    document.getElementById('txt_pri_23').value = "";
  }
  if( text == '' ){
    document.getElementById('txt_pri_23').value = "";
  }
  if( text == '' ){
    document.getElementById('txt_pri_23').value = "";
  }
}
function roomValue(){
  var value = document.getElementById('room');
  var text = value.options[value.selectedIndex].text;
  if( text == '강마루' ){
    document.getElementById('txt_pri_29').value = "115,000";
  }
  if( text == '장판2.2t' ){
    document.getElementById('txt_pri_29').value = "55,000";
  }
  if( text == '데코타일' ){
    document.getElementById('txt_pri_29').value = "48,000";
  }
}
function bathtubValue(){
  var value = document.getElementById('bathtub');
  var text = value.options[value.selectedIndex].text;
  if( text == 'SMC' ){
    document.getElementById('txt_pri_48').value = "270,000";
  }
  if( text == '조적욕조' ){
    document.getElementById('txt_pri_48').value = "520,000";
  }
}
function faucetValue(){
  var value = document.getElementById('faucet');
  var text = value.options[value.selectedIndex].text;
  if( text == '거위목' ){
    document.getElementById('txt_pri_92').value = "140,000";
  }
  if( text == '슈티에' ){
    document.getElementById('txt_pri_92').value = "270,000";
  }
}
function hoodValue(){
  var value = document.getElementById('hood');
  var text = value.options[value.selectedIndex].text;
  if( text == '빌트인' ){
    document.getElementById('txt_pri_93').value = "90,000";
  }
  if( text == '침니' ){
    document.getElementById('txt_pri_93').value = "280,000";
  }
  if( text == '아일랜드후드' ){
    document.getElementById('txt_pri_93').value = "490,000";
  }
}
function opencloseValue(){
  var value = document.getElementById('openclose');
  var text = value.options[value.selectedIndex].text;
  if( text == '여닫이' ){
    document.getElementById('txt_pri_96').value = "124,000";
  }
  if( text == '슬라이딩한샘' ){
    document.getElementById('txt_pri_96').value = "185,000";
  }
}



// 19 , roomdoor = "<select id='roomdoor' onchange='roomdoorValue()' style='width:90%'><option>ABS도어</option><option>문짝</option><option>문틀</option></select>"
// 22, tunningdoor = "<select id='tunningdoor' onchange='tunningdoorValue()' style='width:90%'><option>LG</option><option>대우</option><option>현대</option><option>KCC</option><option>한샘</option></select>"
// 23, balconydoor = "<select id='balconydoor' onchange='balconydoorValue()' style='width:90%'><option>LG</option><option>대우</option><option>현대</option><option>KCC</option><option>한샘</option></select>"
// 29, room = "<select id='room' onchange='roomValue()' style='width:90%'><option>강마루</option><option>장판2.2t</option><option>데코타일</option></select>"
// 48, bathtub = "<select id='bathtub' onchange='bathtubValue()' style='width:90%'><option>SMC</option><option>조적욕조</option></select>"
// 92, faucet = "<select id='faucet' onchange='faucetValue()' style='width:90%'><option>거위목</option><option>슈티에</option></select>"
// 93, hood = "<select id='hood' onchange='hoodValue()' style='width:90%'><option>빌트인</option><option>침니</option><option>아일랜드후드</option></select>"
// 96, openclose = "<select id='openclose' onchange='opencloseValue()' style='width:90%'><option>여닫이</option><option>슬라이딩한샘</option></select>"



