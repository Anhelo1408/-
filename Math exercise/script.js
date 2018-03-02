$(document).ready(function () {
    $("correct").hide()
    $("incorrect answers").hide()
    clearLocalStorage();

    AddEnter();

});

function generate(min, max) { //this function generates random numbers for variables: number1, number2
    a = parseInt(Math.floor(Math.random() * (max - min + 1))) + parseInt(min);

    return a;
}





function generateIntoField() {
    if (GenerationValidation()) {
        var min1 = $("#number1min").val();     //document.getElementById("number1min").value;
        var max1 = $("#number1max").val();      //document.getElementById("").value;

        var min2 = $("#number2min").val();        //document.getElementById("").value;
        var max2 = $("#number2max").val();       //document.getElementById("").value;

        number1 = generate(min1, max1);
        number2 = generate(min2, max2);
        while (number1 < number2) {
            number2 = generate(min2, max2); //this loop prevents the value of number2 was biger than number1
        }


        var operator = document.getElementById("optional");
        choice = operator.options[operator.selectedIndex].value;

        //number1 i number2 zapisati v local storage



        //document.getElementById("generated_equation").value = "" + number1 + " " + choice + " " + number2;
        $("#generated_equation").html('<p>' + number1 + ' ' + choice + ' ' + number2 + '</p>');
    }


}


function GenerationValidation() {
    var result = true;

    var number1min = $("#number1min");
    if (!$(number1min).val() || $(number1min).val().length < 1) {
        $(currentItem).addClass("wrongAnswer");
        result = false;
    }
    else {
        $(number1min).removeClass("wrongAnswer");
    }

    var number1max = $("#number1max");
    if (!$(number1max).val() || $(number1max).val().length < 1) {
        $(number1max).addClass("wrongAnswer");
        result = false;
    }
    else {
        $(number1max).removeClass("wrongAnswer");
    }

    var number2min = $("#number2min");
    if (!$(number2min).val() || $(number2min).val().length < 1) {
        $(number2min).addClass("wrongAnswer");
        result = false;
    }
    else {
        $(number2min).removeClass("wrongAnswer");
    }

    var number2max = $("#number2max");
    if (!$(number2max).val() || $(number2max).val().length < 1) {
        $(number2max).addClass("wrongAnswer");
        result = false;
    }
    else {
        $(number2max).removeClass("wrongAnswer");
    }

    if (parseInt($(number1min).val()) > parseInt($(number1max).val()) || parseInt($(number2min).val()) > parseInt($(number2max).val())) {
        result = false;
        $("#wrongValidation").text('*First value of the range should not be bigger than the second value. Please change the value');
    }
    else {
        $("#wrongValidation").text('');
    }

    if ($(number1min).val() < $(number2min).val()) {
        result = false;
        $("#wrongValidationMin").text('*Min value for the first range should not be less than for the second');
    }
    else {
        $("#wrongValidationMin").text('');
    }

    return result;
}

function AddEnter() {
    document.getElementById('userinput')                    //Entre on click
        .addEventListener("keyup", function (event) {
            event.preventDefault();

            if (event.keyCode === 13) { //enter

                var calc = calculate();

                var userinput = document.getElementById("userinput").value;

                if (userinput == calc) {
                    countEnter();
                    generateIntoField();
                    $("#userinput").val("");
                    $("#userinput").focus();
                    $("#userinput").addClass("rightAnswer");
                    $("#userinput").removeClass("wrongAnswer");

                    $("correct").show();
                    $("incorrect answers").show();



                } else {
                    countFails();

                    $("#userinput").val("");
                    $("#userinput").focus();
                    $("#userinput").removeClass("rightAnswer");
                    $("#userinput").addClass("wrongAnswer");


                }
            }
        });
}

function Check() {
    document.getElementById('userinput')
    var usinpt = document.getElementById("userinput").value;
    var calc = calculate();
    if (usinpt == calc) {
        countEnter();
        generateIntoField();
        $("#userinput").val("");
        $("#userinput").focus();
        $("#userinput").addClass("rightAnswer");
        $("#userinput").removeClass("wrongAnswer");

        $("correct").show();
        $("incorrect answers").show();




    } else {
        countFails();
        $("#userinput").removeClass("rightAnswer");
        $("#userinput").addClass("wrongAnswer");

        $("#userinput").val("");
        $("#userinput").focus();

    }

}

var number1;
var number2;

function calculate() {
    var result;
    // get number1 and number2 from local storage

    switch (choice) {
        case "*":
            result = number1 * number2
            break;
        case "/":
            result = parseInt(number1 / number2);
            break;

        case "+":
            result = number1 + number2
            break;

        case "-":
            result = number1 - number2
            break;
    }


    return result;
}


function countEnter() {
    localStorage.entercount = (localStorage.entercount) ? Number(localStorage.entercount) + 1 : 1;
    target.innerHTML = localStorage.entercount || 0;
}

function countFails() {
    localStorage.countFails = (localStorage.countFails) ? Number(localStorage.countFails) + 1 : 1;
    Failscounter.innerHTML = localStorage.countFails || 0;

}

function clearLocalStorage() {
    localStorage.clear();
}
