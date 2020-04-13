function insert(num) { //функция увеличивает(символьно) содержимое в textview на нажатую кнопку
    document.form.textview.value += num;
}

function equal() { // функция вычисляет значение того что находится в textview, возвращает в textview результат

    let task = document.form.textview.value;

    for(let i = 0; i++; i < task.length) {
        if (task[i] == '1' ||
            task[i] == '2' ||
            task[i] == '3' ||
            task[i] == '4' ||
            task[i] == '5' ||
            task[i] == '6' ||
            task[i] == '7' ||
            task[i] == '8' ||
            task[i] == '9' ||
            task[i] == '0' ||
            task[i] == '+' ||
            task[i] == '-' ||
            task[i] == '*' ||
            task[i] == '/' ||           
            task[i] == ' ') {
                continue;
            }
        document.form.textview.value = 'Error!';
        return;
    }
    document.form.textview.value = calcStr(task);
}

function clearTextview() { //очищает textview (кнопка clear)
    document.form.textview.value = "";
}

function deleteSymbol() { //удаляет крайний символ
    let len = document.form.textview.value.length;
    document.form.textview.value = document.form.textview.value.substr(0, len-1);
}




function calcStr(strFirst) {  //вычисляет математически содержимое строки strFirst, возвращает результат

    let signAmmount = 0, //счетчик количества знаков в строке
        currentSignPriority, //приоритет текущего (в цикле) знака
        minSign, //максимальный знак
        minSignPriority = 0, //максимальный приоритет знака, который есть в строке 
        minSignPlace; //номер(i) знака обладающего максимальным приоритетом




    for (let i = 0; i < strFirst.length; i++) { //проходим весь strFirst
        if (strFirst[i] === '+' || strFirst[i] === '-' || strFirst[i] === '*' || strFirst[i] === '/') { //если наткнулись на знак знак то....

            signAmmount ++; //увеличиваем счеткий количества знаков в строке на 1;

            currentSignPriority = getSignPriority(strFirst[i]); //определяем приоритет текущего знака
            if (currentSignPriority >= minSignPriority) { //если приоритет выше или равен минимальному в строке, то...
                minSignPriority = currentSignPriority; //мин приоритет = текущий
                minSignPlace = i; //а так же записываем его номер в отдельную переменную
                minSign = strFirst[i]; //ну и сам знак
            }
        }
    }

    if (signAmmount === 0) return Number(strFirst);



    let left = strFirst.substring(0, minSignPlace); //делим все выражение на левую и правую часть относительно знака с минимальным приоритетом выполнения
    let right = strFirst.substring(minSignPlace+1, strFirst.length);


    if (signAmmount === 1) { //если в выражении один знак, то определяем результат выражения и возвращаем численное значение ответ
        let leftNumber = Number(left);
        let rightNumber = Number(right);

        return getAnswerEasyCalc(leftNumber, minSign, rightNumber)

    } else if (signAmmount > 1) { //а иначе самое интересное выполняем рекурсивно функцию для левой и правой части и результаты уже калькулируем
        let leftNumber = calcStr(left);
        let rightNumber = calcStr(right);

        return getAnswerEasyCalc(leftNumber, minSign, rightNumber);

        }
    }



 function getSignPriority (sign) { //в качестве параметра принимает знак и возвращает его приоритет (ЧЕМ ВАЖНЕЕ - ТЕМ БОЛЬШЕ ЧИСЛО!)
     if (sign === '+' || sign === '-') {
         return 2;
     } else if (sign === '*' || sign === '/') {
         return 1;
     }
 }

 function getAnswerEasyCalc (leftNumber, sign, rightNumber) { //в качестве параметров: левая часть, знак, правая часть. Возвращает результат выражения с одним действием!
    if (sign === '+') {
        answer = leftNumber + rightNumber;
    } else if (sign === '-') {
        answer = leftNumber - rightNumber;
    } else if (sign === '*') {
        answer = leftNumber * rightNumber;
    } else if (sign === '/') {
        answer = leftNumber / rightNumber;
    }
    // j++;
    // console.log(`${j}. ${leftNumber} ${sign} ${rightNumber} = ${answer}`); //вывод в консольтекущего завершенного действия

    return answer;
 }




//  console.log(calcStr("85+6"));