window.addEventListener('DOMContentLoaded', function () {

    const sp1    = document.getElementById("sp1")
    const b1     = document.getElementById("b1")
    const b2     = document.getElementById("b2")
    const b3     = document.getElementById("b3")
    const BLogin = document.getElementById("BLogin")
    const d1 = document.getElementById("d1")
    

    BLogin.addEventListener('click',function(){
    let l_opacity = 0;        
    let start = Date.now(); // запомнить время начала

    let timer = setInterval(function() {
    // сколько времени прошло с начала анимации?
    let timePassed = Date.now() - start;

    if (timePassed >= 1000) {
        clearInterval(timer); // закончить анимацию через 2 секунды
        return;
    }

    // отрисовать анимацию на момент timePassed, прошедший с начала анимации
    draw(timePassed);

    }, 20);

    // в то время как timePassed идёт от 0 до 2000
    // left изменяет значение от 0px до 400px
    function draw(timePassed) {
        l_opacity = l_opacity + 0.02;
        sp1.style.bottom = 800 + timePassed / 6 + 'px';
        sp1.style.opacity = l_opacity;
        b1.style.bottom = 750 + timePassed / 6 + 'px';
        b1.style.opacity = l_opacity;
        b2.style.bottom = 750 + timePassed / 6 + 'px';
        b2.style.opacity = l_opacity;
        b3.style.bottom = 750 + timePassed / 6 + 'px';
        b3.style.opacity = l_opacity;
        d1.style.bottom = 650 + timePassed / 6 + 'px';
        d1.style.opacity = l_opacity;

        
    }
})
})