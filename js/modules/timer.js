function timer(id, deadline) {
  


    function addZero(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }

    }


    function getTimeRemaining(endtime) {
        ///преобразовываем дедлайн к мс
        ///И отнимаем от него текущую дату
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))), ///переводим мс в дни
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // в часы
            minutes = Math.floor((t / 1000 / 60) % 60), ///минуты
            seconds = Math.floor((t / 1000) % 60); /// секунды

        return { ///возвращаем данные для дальнейшего использования
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };

    }


    function setClock(endtime, selector) {
        const timer = document.querySelector('.timer'),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');


        setTime();




        function setTime() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            setTimeout(setTime, 1000);

        }

    }

    setClock(deadline, id);


    

   
}

export default timer;