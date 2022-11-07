
function numberOfHits(a1, a2) {
    var userArr = [...a1];
    var answerArr = [...a2];

    var numberOfSamePosition = 0;
    for (let i = 0; i < userArr.length; i++) {
        if (answerArr[i] == userArr[i]) {
            answerArr[i] = null;
            userArr[i] = null;
            numberOfSamePosition++;
        }
    }

    var numberOfWrongPosition = 0;
    for (let i = 0; i < userArr.length; i++) {
        if (userArr[i] != null) {
            for (let j = 0; j < answerArr.length; j++) {
                if (answerArr[j] != null && userArr[i] == answerArr[j]) {
                    userArr[i] = null;
                    answerArr[j] = null;
                    numberOfWrongPosition++;
                }
            }
        }
    }

    return {
        numberOfSamePosition: numberOfSamePosition,
        numberOfWrongPosition: numberOfWrongPosition,
    };
}

$(document).ready(function () {
    function getRandom() {
        var randomNumber = Math.floor(Math.random() * 6 + 1);

        if (randomNumber == 1) {
            return 'T';
        }
        if (randomNumber == 2) {
            return 'Sr';
        }
        if (randomNumber == 3) {
            return 'K';
        }
        if (randomNumber == 4) {
            return 'P';
        }
        if (randomNumber == 5) {
            return 'Sk';
        }
        if (randomNumber == 6) {
            return 'Z';
        }
    }

    function getImage(sign) {
        if (sign == 'T') {
            return './znakovi/tref.png';
        }
        if (sign == 'P') {
            return './znakovi/pik.png';
        }
        if (sign == 'K') {
            return './znakovi/karo.png';
        }
        if (sign == 'Sr') {
            return './znakovi/srce.png';
        }
        if (sign == 'Sk') {
            return './znakovi/skocko.png';
        }
        if (sign == 'Z') {
            return './znakovi/zvezda.png';
        }
    }

    var answer = [];
    for (var i = 0; i <= 3; i++) {
        answer.push(getRandom());
    }
    console.log(answer);

    var cellId;

    $('.js-cell').on('click', function () {
        var rowId = $(this).parent().attr('id');

        var rowIndex = rowId.substring(4, rowId.length);

        var previousRowIndex = rowIndex - 1;

        // console.log(previousRowIndex);

        cellId = $(this).attr('id');

        var previousRow = $('#row-' + previousRowIndex);
        // console.log("blabla", previousRow);

        if (
            (previousRowIndex == -1 || previousRow.hasClass('js-done')) &&
            !$('#' + rowId).hasClass('js-done') &&
            !previousRow.hasClass('js-completed')
        ) {
            $('#myModal').addClass('show-modal');
        }
    });

    $('#close-modal').on('click', function () {
        $('#myModal').removeClass('show-modal');
    });

    $('.js-picker').on('click', function () {
        $('#myModal').removeClass('show-modal');

        var imgUrl = $(this).attr('data-imgsrc');
        $('#' + cellId).css('background-image', 'url(' + imgUrl + ')');

        var shortAnswer = '';
        if (imgUrl == './znakovi/tref.png') {
            shortAnswer = 'T';
        }
        if (imgUrl == './znakovi/pik.png') {
            shortAnswer = 'P';
        }
        if (imgUrl == './znakovi/srce.png') {
            shortAnswer = 'Sr';
        }
        if (imgUrl == './znakovi/karo.png') {
            shortAnswer = 'K';
        }
        if (imgUrl == './znakovi/skocko.png') {
            shortAnswer = 'Sk';
        }
        if (imgUrl == './znakovi/zvezda.png') {
            shortAnswer = 'Z';
        }
        $('#' + cellId).attr('data-answer', shortAnswer);
        $('#' + cellId).attr('data-img-url', imgUrl);
    });

    $('.js-ok-button').on('click', function () {
        var rowId = $(this).parent().attr('id');

        // var joca = $('p').removeClass('znak-pitanja');

        // var addQuestionMark = 
        var rowCells = $('#' + rowId).find('.js-cell');

        var rowHitCells = $('#' + rowId).find('.js-cell-hit');

        var numberOfAnswersInRow = 0;
        for (let i = 0; i <= rowCells.length - 1; i++) {
            if (rowCells.eq(i).attr('data-answer')) {
                numberOfAnswersInRow++;
            }
        }

        if (numberOfAnswersInRow == 4) {
            var userAnswers = [];
            for (let i = 0; i < rowCells.length; i++) {
                userAnswers.push(rowCells.eq(i).attr('data-answer'));
            }

            var numOfHits = numberOfHits(userAnswers, answer);

            for (let i = 0; i <= numOfHits.numberOfSamePosition - 1; i++) {
                rowHitCells.eq(i).css('background-color', 'green');
            }
            for (
                let i = numOfHits.numberOfSamePosition;
                i <=
                numOfHits.numberOfWrongPosition -
                1 +
                numOfHits.numberOfSamePosition;
                i++
            ) {
                rowHitCells.eq(i).css('background-color', 'yellow');
            }

            $('#' + rowId).addClass('js-done');

            if (numOfHits.numberOfSamePosition == 4 || rowId == 'row-5') {

                let resenjeCells = $('.js-resenje-cell');

                for (let i = 0; i <= answer.length; i++) {
                    var imgUrl = getImage(answer[i]);
                    resenjeCells
                        .eq(i)
                        .css('background-image', 'url(' + imgUrl + ')')
                        .css('background-position', 'center');
                    $('#cell-6' + i).find('i').hide();



                }
            }
            if (numOfHits.numberOfSamePosition == 4) {
                $('#' + rowId).addClass('js-completed');
            }
        }
    });

    $('.dugme-reset').on('click', function () {
        console.log('jocaaaaaaa');

        for (let i = 0; i <= 5; i++) {
            $('#row-' + i).removeClass('js-done');
        }

        for (var i = 0; i <= 5; i++) {
            for (var j = 0; j <= 3; j++) {
                $('#cell-' + i + j).css({ 'background-image': 'url()' });
                $('#cell-' + i + j).removeAttr('data-answer data-img-url');
            }
        }
        for (var j = 0; j <= 3; j++) {
            $('#cell-6' + j).css({ 'background-image': '' });
            $('#cell-6' + j).find('i').show();

        }

        $('.js-cell-hit').css('background-color', 'rgba(54, 7, 7, 0.408)');



    });
});



