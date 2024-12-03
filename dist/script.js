// Pegando os elementos

let language = 'pt-BR';

// Coloquei o alerta de tela muito pequena aqui em cima pois ele é o elemento que aparece no topo da tela
const displayAlert = document.querySelector('#display-alert')

const body = document.querySelector('body');
const header = document.querySelector('header');
// Linha horizontal que separa o título do resto do site
let line = document.querySelector('#line');


// Aside é onde o Pomodoro ficará
const aside = document.querySelector('aside');
let divPomodoroTitle = document.querySelector('#title-pomodoro');
let divPomodoroTimer = document.querySelector('#pomodoro-timer-div');
let timerMinutes = document.querySelector('#pomodoro-minutes');
let timerSeconds = document.querySelector('#pomodoro-seconds');

const divPomodoroButton = document.querySelector('#div-pomodoro-button');
let startPausePomodoroButton = document.querySelector('#start-pause-pomodoro');
// Svgs dos botões do Pomodoro
const startSvg = startPausePomodoroButton.innerHTML;
const pauseSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" fill="none" stroke="#808189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>';
    const resetPomodoroButton = document.querySelector('#reset-pomodoro');
    
    aside.insertBefore(divPomodoroTimer, divPomodoroButton)
    
    
    const langButton = document.querySelector('#lang-button');
    
    
    let lightDarkButton = document.querySelector('#light-dark-mode');
    // Svgs dos ícones do botão de modo claro e escuro
    const sunSvg = lightDarkButton.innerHTML;
    const moonSvg = '<svg class="moon-svg" xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    
    
    // Constructor da data, será por ele que os elementos de data pegarão a data de hoje
    const date = new Date();
    
    const dateDiv = document.querySelector('#date-div');
    const day = document.createElement('h2');
    const month = document.createElement('h2');
    let monthName = new Intl.DateTimeFormat(language, { month: 'long' }).format(date);
    const year = document.createElement('h2');
    
    day.textContent = `${date.getDate()} de`;
    day.classList.add('text-3xl');

    month.textContent = monthName;
    month.classList.add('text-3xl');
    
    year.textContent = date.getFullYear();
    
    
    // Frase motivacional do Mike Tyson
    let phrase = document.querySelector('#phrase');
    
    document.addEventListener("DOMContentLoaded", () => { dateDiv.append(day, month, year) })
    header.insertBefore(dateDiv, phrase);
    
    
    const taskInput = document.querySelector('#task-input');
    let addTaskButton = document.querySelector('#add-task-button');
    const clearAllTasks = document.querySelector('#clear-all-tasks');
    // Dentro do main é onde ficam as tarefas
    const main = document.querySelector('main');
    
    
    
    // Funcionalidade principal do site, adicionar as tarefas
    
    // Para o botão de adicionar tarefa, usando o mouse
    addTaskButton.addEventListener('click', () => {
        if (taskInput.value.length >= 1 && main.children.length < 10) {
            addTask()
            if (main.children.length === 10) addAlertAndDisableInput() // Se após adicionar, a quantidade de tarefas for igual a 10, executa a função
        } else if (main.children.length > 10) addAlertAndDisableInput()
        })
        
        // Para a tecla Enter do teclado
        taskInput.addEventListener("keydown", (event) => { if (event.key === 'Enter') {
            if (taskInput.value.length >= 1 && main.children.length < 10) {
                addTask()
                // Essa linha existe para que o usuário não tenha que tentar adicionar mais uma tarefa para que a função seja chamada
                if (main.children.length === 10) addAlertAndDisableInput()
                } else if (main.children.length > 10) addAlertAndDisableInput()
        }
    })
    
    clearAllTasks.addEventListener('click', () => {
        main.replaceChildren()
        taskInput.disabled = false
        if (body.contains(divTasksLimitAlert)) divTasksLimitAlert.removeChild(alert)
    })
    
    
    function addTask() {
        let task = document.createElement('article')
        task.setAttribute('class', 'flex justify-center items-center text-center gap-3 rounded rounded-2xl p-2 lg:p-3 border bg-secondaryColor border-zinc-500')
        
        // Botão para subir a tarefa na lista
        let upArrow = document.createElement('button')
        upArrow.innerHTML = '<svg class="hidden sm:inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg> <svg class="inline sm:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>'
        
        // Botão para descer a tarefa na lista
        let downArrow = document.createElement('button')
        downArrow.innerHTML = '<svg class="hidden sm:inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg> <svg class="inline sm:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'
        
        upArrow.addEventListener('click', () => {
            let prevTask = task.previousSibling
            // Se existir um elemento anterior (prevTask) ao atual, então adicionamos a task atual antes do anterior
            if (prevTask) main.insertBefore(task, prevTask)
        })
        
        downArrow.addEventListener('click', () => {
            let nextTask = task.nextSibling
            if (nextTask) main.insertBefore(nextTask, task)
        })
        let clearButton = document.createElement('button')
        clearButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
        clearButton.setAttribute('class', 'relative left-1')
        
        clearButton.addEventListener('click', () => {
        // Remove o pai do clearButton que foi clicado, ou seja, a task
        main.removeChild(clearButton.parentElement)
        taskInput.disabled = false
        body.removeChild(divTasksLimitAlert)
    })
    
    let taskText = document.createElement('p')
    taskText.textContent = taskInput.value
    // Abrevia o texto da task em 50 caracteres caso o tamanho do texto for maior do que 55 caracteres
    if (taskText.textContent.length >= 55) taskText.textContent = taskText.textContent.slice(0, 51) + '...'
    task.append(taskText, upArrow, downArrow, clearButton)
    main.append(task)
    taskInput.value = ''
}



// Outras funcionalidades

let timerAlertDiv = document.createElement('div');
let title = document.createElement('h1');
const okAlertButton = document.createElement('button');

timerAlertDiv.setAttribute('class', 'flex flex-col justify-center items-center gap-10 fixed md:w-[25rem] md:absolute md:left-[31rem] lg:w-[31rem] h-38 p-3 z-50 border border-borderTimerAlertDark bg-timerAlertMainDark text-timerAlertTextDark')
title.setAttribute('class', 'text-2xl')
okAlertButton.setAttribute('class', 'text-1xl p-2')


// Utilizada para definir e acabar o intervalo de tempo
let interval
// Verifica se o timer está rodando. Utilizada para sair do intervalo quando estiver em outros escopos
let isRunning = false
startPausePomodoroButton.addEventListener('click', () => {
    // Se o botão for o de começar o timer
    if (startPausePomodoroButton.innerHTML.trim() === startSvg.trim()) {
        if (timerMinutes.value && timerSeconds.value) {
            if (timerMinutes.value >= 0 && timerMinutes.value <= 60 && timerSeconds.value >= 0 && timerSeconds.value <= 60) {
                startPausePomodoroButton.innerHTML = pauseSvg
                isRunning = true
                if (!interval) {
                    interval = setInterval(() => {
                        if (isRunning) {
                            timer()
                            if (timerMinutes.value === '00' && timerSeconds.value === '00') {
                                clearInterval(interval)
                                timerMinutes.value = 25
                                interval = null
                                startPausePomodoroButton.innerHTML = startSvg
                                
                                if (language === 'pt-BR') title.textContent = 'Timer acabado! Descanse um pouco...'
                                else title.textContent = 'Timer ended! Rest for a while...'
                                
                                okAlertButton.textContent = 'Ok'
                                body.insertBefore(timerAlertDiv, header)
                                timerAlertDiv.append(title, okAlertButton)
                                okAlertButton.addEventListener('click', () => {
                                    body.removeChild(timerAlertDiv)
                                    if (beepInterval) clearInterval(beepInterval)
                                })
                                const beep = new Audio('./sounds/beep.wav') // Toca o áudio de notificação
                                let counter = 0 // Esse contador será utilizado para repetir o áudio 3 vezes
                                // Define o intervalo de 2 segundos
                                let beepInterval = setInterval(() => {
                                    beep.play()
                                    counter++
                                    if (counter === 3) clearInterval(beepInterval)
                                    }, 2000);
                            }
                        }
                    }, 1000);
                }
            }
        } else { // Se algum dos valores do timer do Pomodoro estiver vazio
            timerMinutes.value = 25
            timerSeconds.value = '00'
        }
    } else { // Se for o ícone de pausar
        startPausePomodoroButton.innerHTML = startSvg
        isRunning = false
        clearInterval(interval)
        interval = null
    }
});


resetPomodoroButton.addEventListener('click', () => {
    startPausePomodoroButton.innerHTML = startSvg
    timerMinutes.value = 25
    timerSeconds.value = '00'
    isRunning = false
    clearInterval(interval)
    interval = null
})


function timer() {
    if (timerSeconds.value !== '00') timerSeconds.value--
    /* 
    Caso contrário, se o valor dos minutos for diferente de 0 e o valor dos segundos for igual à 00:
    Ele vai REMOVER 1 caractere dos segundos (detalhe: não vai subtrair, e sim transformar 00 em 0, pois é uma string).
    Da próxima vez, o valor vai ser diferente de '00', e ele vai subtrair 1 do valor
    */
   else if (timerMinutes.value !== 0 && timerSeconds.value === '00') {
       timerMinutes.value--
       timerSeconds.value = 59
    }
    if (timerMinutes.value.length === 1) timerMinutes.value = '0' + timerMinutes.value
    if (timerSeconds.value.length === 1) timerSeconds.value = '0' + timerSeconds.value
}


function addAlertAndDisableInput () {
    alert.setAttribute('class', 'flex gap-2 text-red-500')
    // O alerta fica com o texto em português do Brasil
    if (language === 'pt-BR') alert.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> <p id="alert-phrase">Limite de tarefas atingido. Por favor, cumpra tarefas antigas para poder adicionar mais.</p>'
    
    // O alerta fica com o texto em inglês
    else alert.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> <p id="alert-phrase">Limit of tasks reached. Please, complete other old tasks to be able to add more.</p>'
    
    taskInput.disabled = true
    divTasksLimitAlert.append(alert)
    body.insertBefore(divTasksLimitAlert, main)
}

langButton.addEventListener('click', () => {
    language = language === 'pt-BR' ? 'en-US' : 'pt-BR';
    changeLanguage();
});


// Atualiza todos os elementos do site no idioma escolhido
function changeLanguage() {
    const dayName = date.getDate();
    monthName = new Intl.DateTimeFormat(language, { month: 'long' }).format(date);
    
    // Connector será o sufixo do número do dia de hoje em inglês. Define se será vazio, com st, nd, rd ou th
    let connector = '';
    
    // Se o idioma escolhido for o inglês
    if (language === 'en-US') {
        // Adiciona o sufixo no inglês
        if (dayName === 1 || dayName === 21 || dayName === 31) connector = 'st';
        else if (dayName === 2 || dayName === 22) connector = 'nd';
        else if (dayName === 3 || dayName === 23) connector = 'rd';
        else connector = 'th';
        
        if (displayAlert) displayAlert.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>Your device has a too small screen, the website may look a little strange. It is recommendable that you access this website on a computer with at least 1400px of resolution.'
        
        startPausePomodoroButton.setAttribute('title', 'Start/pause timer')
        resetPomodoroButton.setAttribute('title', 'Reset timer')
        
        langButton.setAttribute('title', 'Change language')
        
        lightDarkButton.setAttribute('title', 'Light/Dark Mode')
        
        // Exibe a data no formato "Month Dayth", o jeito padrão dos americanos
        // O dia fica com o conteúdo do mês, para que o mês consiga vir antes do dia. Ex: October 16th
        day.textContent = `${monthName} ${dayName}${connector}`;
        month.style.display = 'none';
        
        phrase.innerHTML = '&OpenCurlyDoubleQuote;<strong class="text-3xl font-extrabold inline">Discipline</strong> is doing what you hate to do, but nonetheless doing it like you love it.&CloseCurlyDoubleQuote; - Mike Tyson';
        
        taskInput.setAttribute('placeholder', 'Type your task here')
        addTaskButton.textContent = 'Add task'
        clearAllTasks.setAttribute('title', 'Clear all tasks')

        if (alert) {
            let message = document.querySelector('#alert-phrase')
            if (message) message.textContent = 'Limit of tasks reached. Please, complete other old tasks to be able to add more.'
        }
        
        if (timerAlertDiv) title.textContent = 'Timer ended! Rest for a while...'
    } else { // Se o idioma escolhido for pt-BR
        if (displayAlert) displayAlert.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>Seu dispositivo possui uma tela muito pequena, o site pode ficar um pouco estranho. É recomendável que você acesse esse site com um computador com no mínimo 1400px de resolução.'

        startPausePomodoroButton.setAttribute('title', 'Iniciar/pausar timer')
        resetPomodoroButton.setAttribute('title', 'Reiniciar timer')
        
        langButton.setAttribute('title', 'Alterar idioma')
        
        lightDarkButton.setAttribute('title', 'Modo claro/escuro')
        
        
        // Exibe a data no formato "Day de Month", o jeito padrão dos brasileiros
        day.textContent = `${dayName} de`;
        month.textContent = monthName;
        month.style.display = 'block'; // Garante que o mês apareça
        
        phrase.innerHTML = '&OpenCurlyDoubleQuote;<strong class="text-3xl font-extrabold inline">Disciplina</strong> é fazer o que não gosta como se você amasse fazer isso.&CloseCurlyDoubleQuote; - Mike Tyson';
        
        taskInput.setAttribute('placeholder', 'Digite aqui sua tarefa')
        addTaskButton.textContent = 'Adicionar tarefa'
        clearAllTasks.setAttribute('title', 'Remover todas as tarefas')
        
        if (alert) {
            let message = document.querySelector('#alert-phrase')
            if (message) message.textContent = 'Limite de tarefas atingido. Por favor, cumpra tarefas antigas para poder adicionar mais.' 
        }
        
        if (timerAlertDiv) title.textContent = 'Timer acabado! Descanse um pouco...'
    }
}

lightDarkButton.addEventListener('click', () => {
    // Se o usuário escolher ir para o tema claro
    if (lightDarkButton.innerHTML.trim() === sunSvg.trim()) {
        lightDarkButton.innerHTML = moonSvg
        
        
        body.classList.remove('bg-mainColorDark')
        body.classList.remove('text-textColorDark')
        
        body.classList.add('bg-mainColorLight')
        body.classList.add('text-textColorLight')
        
        
        line.classList.add('border-black')
        
        
        aside.classList.remove('bg-secondaryColorDark')
        aside.classList.add('bg-secondaryColorLight')
        
        
        divPomodoroTitle.classList.remove('text-zinc-300')
        divPomodoroTitle.classList.add('text-zinc-700')
        
        divPomodoroTimer.classList.add('text-black')
        

        timerAlertDiv.classList.remove('bg-timerAlertMainDark')
        timerAlertDiv.classList.add('bg-timerAlertMainLight')
        
        timerAlertDiv.classList.remove('border-timerAlertBorderDark')
        timerAlertDiv.classList.add('border-timerAlertBorderLight')
        
        timerAlertDiv.classList.remove('text-timerAlertTextDark')
        timerAlertDiv.classList.add('text-timerAlertTextLight')
        

        dateDiv.classList.remove('bg-secondaryColorDark')
        dateDiv.classList.add('bg-secondaryColorLight')
        

        taskInput.classList.remove('bg-secondaryColorDark')
        taskInput.classList.add('bg-secondaryColorLight')
        taskInput.classList.add('placeholder-zinc-600')
        

        addTaskButton.classList.remove('bg-addTaskButtonColorDark')
        addTaskButton.classList.add('bg-addTaskButtonColorLight')
        addTaskButton.classList.add('text-black')
    } else { // Se o usuário escolher ir para o tema escuro
        lightDarkButton.innerHTML = sunSvg
        

        body.classList.remove('bg-mainColorLight')
        body.classList.remove('text-textColorLight')
        
        body.classList.add('bg-mainColorDark')
        body.classList.add('text-textColorDark')
        

        line.classList.remove('border-black')
        

        aside.classList.remove('bg-secondaryColorLight')
        aside.classList.add('bg-secondaryColorDark')
        

        divPomodoroTitle.classList.remove('text-zinc-700')
        divPomodoroTitle.classList.add('text-zinc-300')
        
        divPomodoroTimer.classList.remove('text-black')
        

        timerAlertDiv.classList.remove('bg-timerAlertMainLight')
        timerAlertDiv.classList.add('bg-timerAlertMainDark')
        
        timerAlertDiv.classList.remove('border-timerAlertBorderLight')
        timerAlertDiv.classList.add('border-timerAlertBorderDark')
        
        timerAlertDiv.classList.remove('text-timerAlertTextLight')
        timerAlertDiv.classList.add('text-timerAlertTextDark')
        

        dateDiv.classList.remove('bg-secondaryColorLight')
        dateDiv.classList.add('bg-secondaryColorDark')
        

        taskInput.classList.remove('bg-secondaryColorLight')
        taskInput.classList.add('bg-secondaryColorDark')
        

        addTaskButton.classList.remove('bg-addTaskButtonColorLight')
        addTaskButton.classList.remove('text-black')
        addTaskButton.classList.add('bg-addTaskButtonColorDark')
    }
})

let divTasksLimitAlert = document.createElement('div')
divTasksLimitAlert.setAttribute('class', 'flex justify-center items-center relative bottom-24 sm:bottom-16 md:bottom-12 lg:bottom-10 h-[1px]')

let alert = document.createElement('h3')
