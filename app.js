const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const dropDowns=document.querySelectorAll(".dropdown select");
const btn =document.querySelector("form button");
const to=document.querySelector(".to select");
const from=document.querySelector(".from select");
const msg=document.querySelector(".msg");
const updateFlag=(code)=>{
    try{
     countryCode=countryList[code.value];
    const img=code.parentElement.querySelector("img");
    img.src=`https://flagsapi.com/${countryCode}/flat/64.png`
    }
   catch(err)
   {
    console.log(err);
   }
}
for(let select of dropDowns){
    for(let code in countryList)
    {
        let newOpt=document.createElement("option");
        newOpt.innerText=code;
        newOpt.value=code;
        if(select.name==="from" && code==="USD"){
            newOpt.selected="select";
        }
        if(select.name==="to" && code==="PKR"){
            newOpt.selected="select";
            
           
        }
        select.appendChild(newOpt);


    }
       select.addEventListener("change",(e)=>{
                updateFlag(e.target);
        })

}
const getExchangeRates=async (url,from,to) => {
    try{
        const res =await fetch(url);
        const data=await res.json();
        return data[from][to];
    }
    catch(err){
        console.log(err);
        return null;
    }
}

btn.addEventListener("click",async (e)=>{
    e.preventDefault();
    let amount =document.querySelector("form input");
    let ammountValue=amount.value;
    if(ammountValue==="" ||ammountValue<0){
        ammountValue=1;
        amount.value=1;
    }
    const from_ = from.value.toLowerCase();
    const to_=to.value.toLowerCase();
    const url=`${BASE_URL}${from_}.json`
    const exchangeRate=await getExchangeRates(url,from_,to_)
    const finalAmount=ammountValue * exchangeRate;
    msg.innerHTML=`${ammountValue} ${from.value} = ${finalAmount} ${to.value}`;

    
})