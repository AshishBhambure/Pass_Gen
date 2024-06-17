// [] attribute selector
const inputSlider=document.querySelector('[data-length-slider]');
const lengthDisplay=document.querySelector('[data-length-number]');
const passwordDisplay=document.querySelector('[data-password-Display]');
const coppyButton=document.querySelector('[data-copy]');
const CopyMessage=document.querySelector('[data-copy-message]');
const lowecaseCheck=document.querySelector('#lowercase');
const uppercaseCheck=document.querySelector('#uppercase');
const numberscheck=document.querySelector('#numbers');
const symbolsCheck=document.querySelector('#symbols');
const indicator=document.querySelector('[data-indicator]');
const genrateButton=document.querySelector('.genrateBtn');
const allcheckbox=document.querySelectorAll('input[type=checkbox]');
let password = "";
let passwordlength=10;
let checkCount=0;
// 
// passwordDisplay.value="MOnya";
const symbols="~!@#$%^&*())_+<>:{}?/-+";

// Set krta hai pass ki length ko 
handleSlider();
function handleSlider(){
   inputSlider.value =passwordlength; 
   lengthDisplay.innerText=passwordlength;
   
   const min = inputSlider.min;
  const max = inputSlider.max;
  // inputSlider.style.cssText=""
    ( (passwordlength - min) * 100) / (max - min) + "% 100%";

}

function setIndicator(color){
    //  indicator.computedStyleMap.
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
    // indicator.style.cssText= 'box-shadow: 0 0 50px color'
    // background-color:pink;font-size:55px;border:2px dashed green;color:white;
    // Shadow 

}

function getRandomInteger(min , max ){
   return   Math.floor(Math.random()*(max-min)) + min;

}

function genrateRandomNumber(){
  let a = getRandomInteger(0,9)
  console.log(a);
     return a ;

     
}

if(passwordlength)
{
  coppyButton.classList.add('copyactive');
}

function genrateLowecase(){
  return   String.fromCharCode(getRandomInteger(97,123));
}

function genrateUppecase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function genrateSymbols(){
     const random = getRandomInteger(0,symbols.length)

     return symbols.charAt(random);
}
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowecaseCheck.checked) hasLower = true;
    if (numberscheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordlength >= 6
    ) 
    {
      setIndicator("#ff0");
    } 
    else {
      setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        // navigator.clipboard.writeText ==> async kaam kr rhe hai 
        await navigator.clipboard.writeText(passwordDisplay.value);
        CopyMessage.innerText="copied";
    }
    catch(e){
                CopyMessage.innerText="Failed"; 
    }
       
       CopyMessage.classList.add("active");
     
    //    3 sec tk dikhana hai 
       setTimeout(() => {
            CopyMessage.classList.remove("active")
       }, 2000);

}

inputSlider.addEventListener('input',(e)=>{
  // target will return that element (i.e input slider wala )
     passwordlength=e.target.value;

     handleSlider();
})







// Not able to increment checkcount  ///////Error 
function handlecheckboxchange(){
     checkCount=0;

   allcheckbox.forEach((checkbox)=>{
    if(checkbox.checked)
    checkCount+=1;
   })




    // console.log(checkCount);

   if(passwordlength < checkCount){

    passwordlength=checkCount;
    handleSlider();
   }
}

allcheckbox.forEach((checkbox)=>{
  // console.log("Here");
  // change is either check or uncheck 
  checkbox.addEventListener('change',handlecheckboxchange())
})






allcheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    checkCount = 0;

    allcheckbox.forEach((check) => {

      if (check.checked) checkCount += 1;
      
    });

    if (passwordlength < checkCount) {
      passwordlength = checkCount;
      handleSlider();
    }
  });

});






function shufflepassword(array){
  // Fisher Yates Method (for Shuffling )
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  let str = "";
  array.forEach((el) => String((str += el)));
  return str;

}



genrateButton.addEventListener('click',()=>{
  // no boxes selected
  if(checkCount<=0) return;

  if(passwordlength<checkCount)
  {
     passwordlength=checkCount;
     handleSlider();
  }
  


  // remove old pass
  password="";
  if(checkCount==0)
  {
    passwordDisplay.value='';
    return;
  }

// if(uppercaseCheck.checked)
// {
//   password+=genrateUppecase() ;
// }

// if(lowecaseCheck.checked)
// {
//   password+=genrateLowecase() ;
// }

// if(numberscheck.checked)
// {
//   password+=genrateRandomNumber() ;
// }

// if(symbolsCheck.checked)
// {
//   password+=genrateSymbols() ;
// }

let functArr=[];
if(uppercaseCheck.checked)
{
 functArr.push(genrateUppecase);
}

if(lowecaseCheck.checked)
{
 functArr.push(genrateLowecase) ;
}

if(numberscheck.checked)
{
 functArr.push(genrateRandomNumber );
}

if(symbolsCheck.checked)
{
  functArr.push(genrateSymbols);
}

// complusory addition

for(let i=0;i<functArr.length;i++)
{
  password+=functArr[i]();
}

// rem addition 
for(let i=0;i<passwordlength-functArr.length;i++)
{
  let reandomIndex=getRandomInteger(0,functArr.length);
  password+=functArr[reandomIndex]();
}


// password is ready

password = shufflepassword(Array.from(password));
passwordDisplay.value=password;
// calculate strength
calcStrength();




});

