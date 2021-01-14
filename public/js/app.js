console.log("you are doing good Wazid");

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

fetch('http://localhost:3000/weather?address=Hyderabad').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
        console.log(data.error);
        }else{
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'Hello Wazid';

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
        }else{
            messageOne.textContent = data.location;
            messageTwo.textContent = "current temprature is "+data.forecast.currenttemp+", but it feels like "+data.forecast.feelslike;
            //console.log(data.location);
            //console.log(data.forecast);
        }
    })
})
})