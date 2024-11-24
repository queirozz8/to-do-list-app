// Pegando os elementos
const date = new Date();

const body = document.querySelector('body')
const header = document.querySelector('header');
const main = document.querySelector('main');
let line = document.querySelector('#line')

const dateDiv = document.querySelector('#date-div');
const input = document.querySelector('#input');

const langButton = document.querySelector('#lang-button');

const day = document.createElement('h2');
const month = document.createElement('h2');
const year = document.createElement('h2');

let phrase = document.querySelector('#phrase');
let addTaskButton = document.querySelector('#add-task-button');

let language = 'pt-BR';

let monthName = new Intl.DateTimeFormat(language, { month: 'long' }).format(date);
let lightDarkMode = document.querySelector('#light-dark-mode')

let divPomodoroTitle = document.querySelector('#title-pomodoro')
let divPomodoroTimer = document.querySelector('#pomodoro-timer-div')
let aside = document.querySelector('aside')
let timerMinutes = document.querySelector('#pomodoro-minutes')
let timerSeconds = document.querySelector('#pomodoro-seconds')
const divPomodoroButton = document.querySelector('#div-pomodoro-button')
let startPomodoroButton = document.querySelector('#start-pomodoro')
const resetPomodoroButton = document.querySelector('#reset-pomodoro')

let timerAlert = document.createElement('div')
let title = document.createElement('h1')
const okAlertButton = document.createElement('button')
timerAlert.setAttribute('class', 'flex flex-col justify-center items-center gap-10 absolute w-[500px] h-38 p-3 z-50 border border-borderTimerAlertDark bg-timerAlertMainDark text-timerAlertTextDark')
title.setAttribute('class', 'text-2xl')
okAlertButton.setAttribute('class', 'text-1xl p-2')

const sunSvg = lightDarkMode.innerHTML
const moonSvg = '<svg class="moon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'

const startSvg = startPomodoroButton.innerHTML
const pauseSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" fill="none" stroke="#808189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>'

const clearAllTasks = document.querySelector('#clear-all-tasks')



// Configurações iniciais
day.textContent = `${date.getDate()} de`;
day.classList.add('text-3xl');
month.textContent = monthName;
month.classList.add('text-3xl');
year.textContent = date.getFullYear();

// Inserir a data na dateDiv
header.insertBefore(dateDiv, phrase);
document.addEventListener("DOMContentLoaded", () => { dateDiv.append(day, month, year) }) // Ex: 18 de novembro, ou November 18th

// Timer de Pomodoro
aside.insertBefore(divPomodoroTimer, divPomodoroButton)

let interval
let isRunning = false
startPomodoroButton.addEventListener('click', () => {
    if (startPomodoroButton.innerHTML.trim() === startSvg.trim()) {
        if (timerMinutes.value && timerSeconds.value) {
            if (timerMinutes.value >= 0 && timerMinutes.value <= 60 && timerSeconds.value >= 0 && timerSeconds.value <= 60) {
                if (timerSeconds.value === 60) timerSeconds.value = 59
                startPomodoroButton.innerHTML = pauseSvg
                isRunning = true
                if (!interval) {
                    interval = setInterval(() => {
                        if (isRunning) {
                            timer()
                            if (timerMinutes.value == 0 && timerSeconds.value == 0) {
                                clearInterval(interval)
                                timerMinutes.value = 25 // Reinicia o timer
                                interval = null // Limpa o ID para permitir reinício no futuro
                                startPomodoroButton.innerHTML = startSvg
                                
                                
                                if (language === 'pt-BR') {
                                    title.textContent = 'Timer acabado! Descanse um pouco...'
                                } else {
                                    title.textContent = 'Timer ended! Rest for a while...'
                                }
                                okAlertButton.textContent = 'Ok'
                                body.insertBefore(timerAlert, header)
                                timerAlert.append(title, okAlertButton)
                                okAlertButton.addEventListener('click', () => {body.removeChild(timerAlert)})
                                const beep = new Audio('../sounds/beep.wav')
                                let counter = 0
                                beep.play()
                                let beepInterval = setInterval(() => {
                                    beep.play()
                                    counter++
                                    if (counter === 2) clearInterval(beepInterval)
                                    }, 2000);
                            }
                        }
                    }, 1000);
                }
            }
        } else {
            timerMinutes.value = 25
            timerSeconds.value = '00'
        }
    } else {
        startPomodoroButton.innerHTML = startSvg
        isRunning = false
        clearInterval(interval) // Cancela o intervalo
        interval = null // Limpa o ID para permitir reinício no futuro
    }
});

resetPomodoroButton.addEventListener('click', () => {
    timerMinutes.value = 25
    timerSeconds.value = '00'
    isRunning = false
    clearInterval(interval) // Cancela o intervalo
    startPomodoroButton.innerHTML = startSvg
    interval = null // Limpa o ID para permitir reinício no futuro
})

function timer() {
    if (timerSeconds.value != 0) {
        timerSeconds.value--
    }
    else if (timerMinutes.value != 0 && timerSeconds.value == 0) {
        timerMinutes.value--
        timerSeconds.value = 59
    }
    if (timerMinutes.value.length === 1) {
        timerMinutes.value = '0' + timerMinutes.value
    }
    if (timerSeconds.value.length === 1) timerSeconds.value = '0' + timerSeconds.value
}

// Lógica para adicionar os elementos na tela, criando assim uma lista
// Para o botão de adicionar tarefa, usando o mouse
addTaskButton.addEventListener('click', () => {
    if (input.value.length >= 1) {
        if (main.children.length < 10) {
            addTask()
            if (main.children.length === 10) addAlertAndDisableInput() 
            } else addAlertAndDisableInput()
    }
})
// Para a tecla Enter do teclado
input.addEventListener("keydown", (event) => { if (input.value.length >= 1) if (event.key === 'Enter') {
    if (main.children.length < 10) {
        addTask()
        if (main.children.length === 10) addAlertAndDisableInput() 
        } else addAlertAndDisableInput()
}
})

clearAllTasks.addEventListener('click', () => {
    main.replaceChildren()
    input.disabled = false
    body.removeChild(divAlert)
})

lightDarkMode.addEventListener('click', () => {
    if (lightDarkMode.innerHTML.trim() === sunSvg.trim()) {
        lightDarkMode.innerHTML = moonSvg
        body.classList.remove('bg-mainColorDark')
        body.classList.remove('text-textColorDark')
        
        body.classList.add('bg-mainColorLight')
        body.classList.add('text-textColorLight')
        
        input.classList.remove('bg-secondaryColorDark')
        input.classList.add('bg-secondaryColorLight')
        input.classList.add('placeholder-zinc-600')
        
        addTaskButton.classList.remove('bg-buttonColorDark')
        addTaskButton.classList.add('bg-buttonColorLight')
        addTaskButton.classList.add('text-black')
        
        dateDiv.classList.remove('bg-secondaryColorDark')
        dateDiv.classList.add('bg-secondaryColorLight')
        
        timerAlert.classList.remove('bg-timerAlertMainDark')
        timerAlert.classList.add('bg-timerAlertMainLight')
        
        timerAlert.classList.remove('border-timerAlertBorderDark')
        timerAlert.classList.add('border-timerAlertBorderLight')

        timerAlert.classList.remove('text-timerAlertTextDark')
        timerAlert.classList.add('text-timerAlertTextLight')

        line.classList.add('border-black')

        aside.classList.remove('bg-secondaryColorDark')
        aside.classList.add('bg-secondaryColorLight')

        divPomodoroTitle.classList.remove('text-zinc-300')
        divPomodoroTitle.classList.add('text-zinc-700')

        divPomodoroTimer.classList.add('text-black')
    } else {
        lightDarkMode.innerHTML = sunSvg
        body.classList.remove('bg-mainColorLight')
        body.classList.remove('text-textColorLight')
        
        body.classList.add('bg-mainColorDark')
        body.classList.add('text-textColorDark')
        
        input.classList.remove('bg-secondaryColorLight')
        input.classList.add('bg-secondaryColorDark')
        
        addTaskButton.classList.remove('bg-buttonColorLight')
        addTaskButton.classList.remove('text-black')
        addTaskButton.classList.add('bg-buttonColorDark')
        
        dateDiv.classList.remove('bg-secondaryColorLight')
        dateDiv.classList.add('bg-secondaryColorDark')
        
        timerAlert.classList.remove('bg-timerAlertMainLight')
        timerAlert.classList.add('bg-timerAlertMainDark')
        
        timerAlert.classList.remove('border-timerAlertBorderLight')
        timerAlert.classList.add('border-timerAlertBorderDark')
        
        timerAlert.classList.remove('text-timerAlertTextLight')
        timerAlert.classList.add('text-timerAlertTextDark')
        
        line.classList.remove('border-black')
        
        aside.classList.remove('bg-secondaryColorLight')
        aside.classList.add('bg-secondaryColorDark')
        
        divPomodoroTitle.classList.remove('text-zinc-700')
        divPomodoroTitle.classList.add('text-zinc-300')

        divPomodoroTimer.classList.remove('text-black')
    }
})

let divAlert = document.createElement('div')
divAlert.setAttribute('class', 'flex justify-center items-center absolute top-[520px]')
let alert = document.createElement('h3')
// Função para adicionar o alerta e desabilitar o input
function addAlertAndDisableInput () {
    alert.setAttribute('class', 'flex gap-2 text-red-500')
    if (language === 'pt-BR') alert.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> <p id="alertPhrase">Limite de tarefas atingido. Por favor, cumpra tarefas antigas para poder adicionar mais.</p>'
    else alert.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> <p id="alertPhrase">Limit of tasks reached. Please, complete other old tasks to be able to add more.</p>'
    
    input.disabled = true
    divAlert.append(alert)
    body.append(divAlert)
}

// Função para criar a tarefa
function addTask() {
    let task = document.createElement('article')
    task.setAttribute('class', 'flex justify-center items-center text-center gap-3 rounded rounded-2xl p-3 border bg-secondaryColor border-zinc-500')

    let clearButton = document.createElement('button')
    clearButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
    clearButton.setAttribute('class', 'relative left-1')
    clearButton.addEventListener('click', () => {
        main.removeChild(clearButton.parentElement)
        if (input.disabled === true) {
            input.disabled = false
            divAlert.removeChild(alert)
        }
    })

    let upArrow = document.createElement('button')
    upArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>'
    
    let downArrow = document.createElement('button')
    downArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>'
    
    upArrow.addEventListener('click', () => {
        let parent = upArrow.parentElement
        let prevTask = parent.previousSibling
        if (prevTask) main.insertBefore(task, prevTask)
    })
    
    downArrow.addEventListener('click', () => {
        let parent = downArrow.parentElement
        let nextTask = parent.nextSibling
        if (nextTask) main.insertBefore(nextTask, task)
    })

    let taskText = document.createElement('p')
    taskText.textContent = input.value
    if (taskText.textContent.length >= 55) taskText.textContent = taskText.textContent.slice(0, 51) + '...'
    task.append(taskText, upArrow, downArrow, clearButton)
    main.append(task)
    input.value = ''
}


// Alterna o idioma ao clicar no botão
langButton.addEventListener('click', () => {
    language = language === 'pt-BR' ? 'en-US' : 'pt-BR';
    changeLanguage();
});


// Atualiza a data no idioma escolhido
function changeLanguage() {
    // Muda a data
    const dayName = date.getDate();
    monthName = new Intl.DateTimeFormat(language, { month: 'long' }).format(date);
    
    let connector = '';
    
    if (language === 'en-US') {
        // Adiciona o sufixo no inglês
        if (dayName === 1 || dayName === 21 || dayName === 31) connector = 'st';
        else if (dayName === 2 || dayName === 22) connector = 'nd';
        else if (dayName === 3 || dayName === 23) connector = 'rd';
        else connector = 'th';
        
        // Exibe a data no formato "Month Dayth"
        day.textContent = `${monthName} ${dayName}${connector}`;
        month.style.display = 'none'; // Oculta o mês

        // Muda o input
        input.setAttribute('placeholder', 'Type your task here')
        // Muda o título
        phrase.innerHTML = '&OpenCurlyDoubleQuote;<strong class="text-4xl font-extrabold inline">Discipline</strong> is doing what you hate to do, but nonetheless doing it like you love it.&CloseCurlyDoubleQuote; - Mike Tyson';
        addTaskButton.textContent = 'Add task'
        // Muda o alerta de limite de tarefas atingido
        if (alert.textContent.length > 0) {
            let message = document.querySelector('#alertPhrase')
            message.textContent = 'Limit of tasks reached. Please, complete other old tasks to be able to add more.'
        }

        if (timerAlert) title.textContent = 'Timer ended! Rest for a while...'
    } else {
        // Exibe a data no formato "Day de Month"
        day.textContent = `${dayName} de`;
        month.textContent = monthName;
        month.style.display = 'block'; // Garante que o mês apareça
        
        input.setAttribute('placeholder', 'Digite aqui sua tarefa')
        phrase.innerHTML = '&OpenCurlyDoubleQuote;<strong class="text-4xl font-extrabold inline">Disciplina</strong> é fazer o que não gosta como se você amasse fazer isso.&CloseCurlyDoubleQuote; - Mike Tyson';
        addTaskButton.textContent = 'Adicionar tarefa'

        if (alert.textContent.length > 0) {
            let message = document.querySelector('#alertPhrase')
            message.textContent = 'Limite de tarefas atingido. Por favor, cumpra tarefas antigas para poder adicionar mais.' 
        }

        if (timerAlert) title.textContent = 'Timer acabado! Descanse um pouco...'
    }
}
