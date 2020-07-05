//Variables
function HTMLUI() {};
const dateSelected = document.getElementById('year');
const submitForm = document.getElementById('request-quote');





//Event Listeners
document.addEventListener("DOMContentLoaded",function(){
    const htmlui = new HTMLUI();
    htmlui.loadYears();
});
//Funtions
function Insurance (make,year,level) {
    this.make = make;
    this.year = year;
    this.level = level;
};
Insurance.prototype.differnceYear = function(year){
    const currentYear = new Date().getFullYear();
    return (currentYear - year);
}
Insurance.prototype.calculateQuote = function (insurance){
    make = insurance.make;
    year = insurance.year;
    level= insurance.level;
    let price;
    let basePrice = 2000;
    /* Makes
    1 = American * 1.15
    2 = Asian * 1.05
    3 = European * 1.35
    */
   //Calculate the price bace on maker
   if(make = 1) price= basePrice*1.15;
   else if(make = 2) price= basePrice*1.05;
   else if(make = 3) price= basePrice*1.35;
   //Calculate the price based on year
   const differnce = this.differnceYear(year);
    price = price - (differnce*0.03*price);
    //Calculate the level of insurance
    price = this.insuranceLevel(price,level);
    return price;
}
Insurance.prototype.insuranceLevel = function (p,l){
    if(l==='basic')return p*1.3;
    else return p*1.5;
}
HTMLUI.prototype.loadYears = function () {
        //Load the options for the last 20 years, this company does not insure cars which are more than 20 years old
        //Get the curren year
        let years = [];
        let currentYear = new Date().getFullYear();
        let minYear = currentYear - 20;
        //There are many ways to chich this can be done
        //Create an array in decending order
        for(let _year = currentYear; _year >=minYear; _year--){
            years.push(_year);
        }
        //****This is one of the ways using an array***/
        years.forEach((item) =>{
            option = document.createElement('option');
            option.value = item;
            option.text = item;
            dateSelected.appendChild(option);
        });
        /*****Method 2****/
        // years.forEach((item,index) =>{
        //     dateSelected[index] = new Option(item,item);
        // });
}
submitForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const make = document.getElementById('make').value;
    const year = document.getElementById('year').value;
    const level = document.querySelector("input[name='level']:checked").value;
    if(make == '' || year == '' || level == '' ){
        const div = document.createElement('div');
        div.classList ='error';
        div.innerHTML = `<p>PLease fill the form CORRECTLY!!!<p>`;
        submitForm.insertBefore(div, document.querySelector('.form-group'));
        setTimeout(function (){
            document.querySelector('.error').remove();
        },3000);
        console.log(div.classList);
    }
    else{
        //emplty result div
        if(document.getElementById('result').firstChild){
            document.getElementById('result').firstChild.remove();
        }
        //Make Calculation
        const quoter= new Insurance(make,year,level);
        const price = quoter.calculateQuote(quoter);
        displayQuote(quoter, price);
        console.log('%s,%s,%s',make,year,level)
    }
});
function displayQuote (quoter, price){
    const results = document.getElementById('result');
    let makeText;
    if(quoter.make == 1 ) makeText = 'American';
    if(quoter.make == 2 ) makeText = 'Asian';
    if(quoter.make == 3 ) makeText = 'European';
    // Create div
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src ="img/spinner.gif"
    img.style.display = "block"
    result.appendChild(img)
    setTimeout(function () {
        if(result.firstChild){
            result.firstChild.remove();
        }
        // Insert the result
        div.innerHTML = `
        <p class="header">Summary:</p>
        <p>Make: ${makeText}</p>
        <p>Year: ${quoter.year}</p>
        <p>Level: ${quoter.level}</p>
        <p class="total">Total: $ ${price}</p>
        `;
        result.appendChild(div);
    }, 3000);

}

