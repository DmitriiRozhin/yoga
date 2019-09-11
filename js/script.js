window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContent = (a) => {
        for (let i = a; i< tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };
    hideTabContent(1);

    let showTabContent =  (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');  
        }
    };

    info.addEventListener ('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i< tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

//timer

let deadline = '2019-09-06';

function getTimeRemaining (endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/1000/60/60));

        return {
            'total' : t,
            'seconds' : seconds,
            'minutes' : minutes,
            'hours' : hours
        };

}

    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

            function updateClock () {
                let t = getTimeRemaining(endtime);

                let addZero = (num) => {
                    if(num <= 9) {
                        return '0' + num;
                    } else return num;
                };



                hours.textContent = addZero(t.hours);
                minutes.textContent = addZero(t.minutes);
                seconds.textContent = addZero(t.seconds);
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                    hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
                }

            }
    };

    setClock('timer', deadline);


//modal
let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');


more.addEventListener ('click', function () {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow='hidden';
});

close.addEventListener('click', function() {
    overlay.style.display = 'none';
    more.classList.remove('more-splash'); 
    document.body.style.overflow='';
});

//Form

let message ={
    loading:'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так'
};

let form = document.querySelector ('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    let request =new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    let formData = new FormData(form);
    request.send(formData);

    request.addEventListener ('readystatechange', function() {
        if (request.readyState < 4) {
            statusMessage.innerHTML = message.loading;
        } else if (request.readyState === 4 && request.status == 200) {
            statusMessage.innerHTML = message.success;
        } else {statusMessage.innerHTML = message.failure;}
    });

    for (let i = 0; i < input.length; i++) {
        input[i].value ='';
    }
});

//Slider
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        dots = document.querySelectorAll ('.dot'),
        dotWrap = document.querySelector('.slider-dots'),
        prev = document.querySelector ('.prev'),
        next = document.querySelector ('.next');

        showSlides(slideIndex);

        function showSlides (n) {

            if (n > slides.length) {
                slideIndex = 1;
            }

            if (n < 1) {
                slideIndex = slides.length;
            }

            slides.forEach((item)=> item.style.display='none');
            dots.forEach((item) => item.classList.remove('dot-active'));

            slides[slideIndex-1].style.display = 'block';
            dots[slideIndex-1].classList.add('dot-active');

        }

        function plusSlide (n) {
            showSlides(slideIndex += n);
        }

        function currentSlide (n) {
            showSlides (slideIndex = n);
        }

        prev.addEventListener ('click', function () {
            plusSlide(-1);
        });

        next.addEventListener ('click', function() {
            plusSlide(1);
        });

        dotWrap.addEventListener ('click', function(event) {
            for (let i=0; i<dots.length + 1; i++) {
                if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                    currentSlide(i);
                }
            } 
        });

});

