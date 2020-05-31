console.log('client side javascript file is loaded');

fetch('http://puzzle.mead.io/puzzle').then((Response)=>{
    Response.json().then((data)=>{
        console.log(data);
    })
});




const weatherform =document.querySelector('form');
const searchText = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location= searchText.value;
    console.log(location);
    messageOne.textContent= 'loading data...';
    messageTwo.textContent='';
    if(!location.length>0){
    return messageOne.textContent= 'please provide the location';;
    }
    else{
        fetch(`/weather?address=${location}`).then((Response)=>{
            Response.json().then((data)=>{
                if(data.error){
                    messageOne.textContent= data.error;
                }else{
                    messageOne.textContent= data.location;
                    messageTwo.textContent=data.forecast;
                console.log(data.address);
                }
            })
        })
    }
})
