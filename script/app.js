let products = [
    {
        id: 1,
        name: 'Crazy',
        price: 31000,
        amount: 0,
        img: 'images/products/burger-1.png',
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 2,
        name: 'Light',
        price: 26000,
        amount: 0,
        img: 'images/products/burger-2.png',
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 3,
        name: 'CheeseBurger',
        price: 29000,
        amount: 0,
        img: 'images/products/burger-3.png',
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 4,
        name: 'dBurger',
        price: 24000,
        amount: 0,
        img: 'images/products/burger-4.png',
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 5,
        name: 'BestBurger',
        price: 50000,
        amount: 0,
        img: 'images/products/best.jpg',
        get totalSum() {
            return this.price * this.amount
        }
    },
    
]

let wrapperList = document.querySelector('.wrapper__list');

// Функция которая выводит в wrapperList на сайт все данные из массива products

function outBurgers() {
    products.forEach(el => {
        let { name, price, img } = el
        wrapperList.innerHTML += `<div class="wrapper__list-card" >
                    <p class="wrapper__list-count"></p>
                    <img class="wrapper__list-image" src="${img}" alt="">
                    <h3 class="wrapper__list-title">${name}</h3>
                    <div class="wrapper__list-sub">
                        <p class="wrapper__list-text">${price} сум</p>
                        <button class="wrapper__list-btn"><img src="images/sell-icon.svg" alt=""></button>
                    </div>
                </div>`
    })
    
}
outBurgers()


let burgersBtn = document.querySelectorAll('.wrapper__list-btn'),
    btnBasket = document.querySelector('.wrapper__navbar-btn'),
    basket    = document.querySelector('.wrapper__navbar-basket'),
    btnClose  = document.querySelector('.wrapper__navbar-close'),
    basketCount = document.querySelector('.warapper__navbar-count'),
    basketTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    basketList = document.querySelector('.wrapper__navbar-checklist');
    
let korzina = []
    
btnBasket.addEventListener('click', () => basket.classList.add('active'))
btnClose.addEventListener('click', () => basket.classList.remove('active'))


burgersBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        addAmount(btn)
    })
})

// Функция которая будет прибавлять кол-во нашему бургеру на кнопку которого мы нажимаем

function addAmount(btn) {
    // closest() - метод который подключаеться к указаному родителю
    let burgerName = btn.closest('.wrapper__list-card').querySelector('.wrapper__list-title').innerHTML
    let currentBurger = products.find(item => item.name ==  burgerName)
  
    if(currentBurger.amount < 10) {
        currentBurger.amount++
    }
   
    addToKorzina(currentBurger)
}


function addToKorzina(currentBurger) {
    if(currentBurger.amount > 0) {
        if(!korzina.includes(currentBurger)) {
            korzina.push(currentBurger)
        }
    }
    outAmountAndSum()
    outInKorzina()
}


function outAmountAndSum() {
    
    basketTotalPrice.innerHTML = getTotalSum()
    let allAmount = getTotalAmount()
    if(allAmount > 0) {
        basketCount.classList.add('active')
        basketCount.innerHTML = allAmount
    }else {
        basketCount.classList.remove('active')
        basketCount.innerHTML = ''
    }
    
}

function getTotalAmount() {
    let sum = products.reduce((acc, item) => acc + item.amount,0)
    return sum    
}
function getTotalSum() {
    let sum = products.reduce((acc, item) => acc + item.totalSum,0)
    return sum + ' сумм'
}


function outInKorzina() {
    
    basketList.innerHTML = ''
    
    korzina.forEach((burger) => {
        basketList.innerHTML +=  `
        <div class="navbar__item">
            <div class="navbar__item-left">
                <img src="${burger.img}" alt="">
                <div class="navbar__item-left-info">
                    <p class="navbar__item-left-name">${burger.name}</p>
                    <p class="navbar__item-left-price">${burger.totalSum} сум</p>
                </div>
            </div>
            <div class="navbar__item-right">
                <button data-symbol="-" class="navbar__item-btn">-</button>
                <output class="navbar__item-count">${burger.amount}</output>
                <button data-symbol="+" class="navbar__item-btn">+</button>
            </div>
        </div>`
    })
}




// делегирование событий 

window.addEventListener('click', (event) => {
    if(event.target.classList.contains('navbar__item-btn')) {
        let btn = event.target
        let dataSymbol = btn.getAttribute('data-symbol')
        let burgerName = btn.closest('.navbar__item').querySelector('.navbar__item-left-name').innerHTML
        
        let currentBurger = products.find((item) => item.name == burgerName)
        if(dataSymbol == '+' && currentBurger.amount < 10) {
            currentBurger.amount++
        }else if(dataSymbol == '-') {
            currentBurger.amount--
        }
        korzina = korzina.filter((burger) =>  burger.amount > 0)
        outInKorzina()
        outAmountAndSum()
        
    }
})


function solve(integer, count) {
    let array = []
    for(let i = integer;i <= count; i++) {
        if(i %integer == 0) {
            array.push(i)
        }
    }
    
    return array
}

console.log(solve(5,25)); 
console.log(solve(4,9)); 
console.log(solve(7,112)); 

