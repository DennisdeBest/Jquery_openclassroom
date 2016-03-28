$(function () {

        var ok = 1;

        function scroll() {
        $('#car2').animate({top: '-=600'}, 2500, 'linear', function() {
            var car2X = Math.floor(Math.random() * 194) + 70;
            var car2Y = 400;
            $('#car2').css('top', car2Y);
            $('#car2').css('left', car2X);
            ok = 1;
        });
        $('.bg').animate({
                top: '-=360'
            },
            1000,
            'linear',
            function(){
                $('.bg').css('top', 0);
                scroll();
            });
    }

    $(document).keydown(function (e) {
        if(e.keyCode == 39){
            var car1X = parseInt($('#car1').css('left'));
            if(car1X < 260)
                $('#car1').css('left', car1X+30);
        };
        if(e.keyCode == 37){
            var car1X = parseInt($('#car1').css('left'));
            if(car1X > 60)
                $('#car1').css('left', car1X-30);
        }
    });

    function collision()
    {
        car1X = parseInt($('#vj').css('left'));
        car2X = parseInt($('#vr').css('left'));
        car1Y = 5;
        vrY = parseInt($('#vr').css('top'));
        if (((car2X > car1X) && (car2X < (car1X+66)) && (vrY > car1Y) && (vrY < (car1Y+150)) && (ok == 1))

            || ((car1X > car2X) && (car1X < (car2X+66)) && (vrY > car1Y) && (vrY < (car1Y+150)) && (ok == 1)))
        {
            collision = parseInt($('#info').text()) + 1;
            $('#info').text(collision);
            ok = 0;
        }
    }
    scroll();
    setInterval(collision, 20);
});