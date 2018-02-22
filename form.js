
window.onload = getWord;
function getWord() {
    var words = [
        'rock', 'paper', 'scissors', 'megaerror', 'escapology',
        'brightwork', 'verkrampte', 'protectrix', 'nudibranch', 'grandchild',
        'newfangled', 'flugelhorn', 'mythologer', 'pluperfect', 'jellygraph',
        'quickthorn', 'rottweiler', 'technician', 'cowpuncher', 'middlebrow',
        'jackhammer', 'triphthong', 'wunderkind', 'dazzlement', 'jabberwock',
        'witchcraft', 'pawnbroker', 'thumbprint', 'motorcycle', 'cryptogram'
    ];

    result = words[Math.floor(Math.random() * words.length)];
    document.getElementById('any').value = result;

    AddEnter();
}

function check() {
    var any = document.getElementById('any').value;
    var result = document.getElementById('userinput').value; 
    var splitString = result.split(""); 
    // ["h", "e", "l", "l", "o"]
    var reverseArray = splitString.reverse(); 
    // ["o", "l", "l", "e", "h"]
      var joinArray = reverseArray.join("");
    // "olleh"

    //Step 4. Return the reversed string
    // "olleh"

    if (joinArray == any) {
        alert("Excelent!");
        return;
    }

    alert("Wrong!");


    ///alert(result2);
    //return joinArray; 
}

function AddEnter() {
    document.getElementById('userinput')                    //Entre on click
        .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById('button').click();
        }
    });
}