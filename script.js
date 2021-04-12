const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fetch data of random user from API 
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const userData = await res.json();
    const user = userData.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

//Add new user data to data array
function addData(userData) {
    data.push(userData);
    updateDOM();
}

//Double money of each user
function doubleMoney() {
    data = data.map(item => {
        return {...item, money: item.money*2};
    });
    updateDOM();
}

//Sort user data in order of richest
function sortArray() {
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}

//Filter data to the one which only displays millionaires
function showMillionaires()
{
    data = data.filter(item => item.money >= 1000000);
    updateDOM();
}

//Calculate total wealth
function calculateWealth()
{
    const total = data.reduce((acc,user) => (acc += user.money), 0);
    const wealthEle = document.createElement('div');
    wealthEle.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
    main.appendChild(wealthEle);
}

//Update DOM
function updateDOM(availableData = data) {
    //Clear Main Div 
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
    
    //Loop through the array
    availableData.forEach(function(user) {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
        main.appendChild(element);
    });
}

//Format number as currency 
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  
}

//Event listeners 
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortArray);
showMillionairesBtn.addEventListener('click',showMillionaires);
calculateWealthBtn.addEventListener('click',calculateWealth);