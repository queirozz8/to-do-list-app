// Pegando os elementos

let language = 'pt-BR';


const body = document.querySelector('body');
const header = document.querySelector('header');
    // Linha horizontal que separa o título do resto do site
    let line = document.querySelector('#line');
    
    
    // Aside é onde o Pomodoro ficará
    const aside = document.querySelector('aside');
    let divPomodoroTitle = document.querySelector('#title-pomodoro');
    let divPomodoroTimer = document.querySelector('#pomodoro-timer-div');
    // Minutos do timer:
    let timerMinutes = document.querySelector('#pomodoro-minutes');
    // Segundos do timer:
    let timerSeconds = document.querySelector('#pomodoro-seconds');

    // Div onde ficará os botões do Pomodoro
    const divPomodoroButton = document.querySelector('#div-pomodoro-button');
    // O botão de start e pause é declarado com o let porque são 2 botões em 1 só, o ícone muda
    let startPausePomodoroButton = document.querySelector('#start-pause-pomodoro');
    // Svgs dos botões
    const startSvg = startPausePomodoroButton.innerHTML;
    const pauseSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" fill="none" stroke="#808189" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>';
    const resetPomodoroButton = document.querySelector('#reset-pomodoro');
    
    // Timer de Pomodoro
    aside.insertBefore(divPomodoroTimer, divPomodoroButton)
    

    // Botão para escolher entre PT-BR ou Inglês
    const langButton = document.querySelector('#lang-button');
    
    
    let lightDarkButton = document.querySelector('#light-dark-mode');
    // Svgs dos ícones do botão de modo claro e escuro
    const sunSvg = lightDarkButton.innerHTML;
    const moonSvg = '<svg class="moon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
    
    
    // Constructor da data, será por ele que os elementos de data pegarão a data de hoje
    const date = new Date();
    // Div da data de hoje
    const dateDiv = document.querySelector('#date-div');
    const day = document.createElement('h2');
    // Título onde ficará a data.
    const month = document.createElement('h2');
    // Conteúdo do month, que vai usar a api para pegar o mês atual, e mostrar na tela com o idioma atual
    let monthName = new Intl.DateTimeFormat(language, { month: 'long' }).format(date);
    const year = document.createElement('h2');
    
    // Configurações iniciais da data
    day.textContent = `${date.getDate()} de`;
    day.classList.add('text-3xl');

    month.textContent = monthName;
    month.classList.add('text-3xl');

    year.textContent = date.getFullYear();
    
    
    // Frase motivacional do Mike Tyson
    let phrase = document.querySelector('#phrase');
    
    
    // Inserir a data na dateDiv
    header.insertBefore(dateDiv, phrase);
    document.addEventListener("DOMContentLoaded", () => { dateDiv.append(day, month, year) }) // Ex: 18 de novembro, ou November 18th
    

// Input das tarefas
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
        /* Quando a qtde já for 10, ele instantaneamente vai chamar a função. 
        Essa linha existe para que o usuário não tenha que tentar adicionar mais uma tarefa para que a função seja chamada */
        if (main.children.length === 10) addAlertAndDisableInput()
    } else if (main.children.length > 10) addAlertAndDisableInput()
}
})

clearAllTasks.addEventListener('click', () => {
    main.replaceChildren() // Substitui todas as tarefas por nada
    taskInput.disabled = false
    if (body.contains(divTasksLimitAlert)) body.removeChild(divTasksLimitAlert) // Se houver o aviso do limite de tarefas, ele é removido também
})


// Função para criar uma tarefa
function addTask() {
    let task = document.createElement('article')
    task.setAttribute('class', 'flex justify-center items-center text-center gap-3 rounded rounded-2xl p-3 border bg-secondaryColor border-zinc-500')
    
    // Botão para subir a tarefa na lista
    let upArrow = document.createElement('button')
    upArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>'
    
    // Botão para descer a tarefa na lista
    let downArrow = document.createElement('button')
    downArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>'
    
    // EventListener do upArrow
    upArrow.addEventListener('click', () => {
        let prevTask = task.previousSibling
        // Se existir um elemento anterior (prevTask) ao atual, então adicionamos a task atual antes do anterior
        if (prevTask) main.insertBefore(task, prevTask)
    })
    
    // EventListener do downArrow
    downArrow.addEventListener('click', () => {
        let nextTask = task.nextSibling
        if (nextTask) main.insertBefore(nextTask, task)
    })
    
    // Botão de excluir a tarefa
    let clearButton = document.createElement('button')
    clearButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
    clearButton.setAttribute('class', 'relative left-1')

    // EventListener do botão de excluir a tarefa
    clearButton.addEventListener('click', () => {
        // Remove o pai do clearButton que foi clicado, ou seja, a task
        main.removeChild(clearButton.parentElement)
        // Se o input estiver desabilitado por estar no limite, habilita ele de novo, e remove o alerta de limite de tarefas
        if (taskInput.disabled === true) {
            taskInput.disabled = false
            divTasksLimitAlert.removeChild(alert)
        }
    })

    // taskText é o conteúdo da task, é onde vai ficar o texto dela
    let taskText = document.createElement('p')
    taskText.textContent = taskInput.value
    // Abrevia o texto da task em 50 caracteres caso o tamanho do texto for maior do que 55 caracteres
    if (taskText.textContent.length >= 55) taskText.textContent = taskText.textContent.slice(0, 51) + '...'
    // Adiciona os elementos da task dentro dela
    task.append(taskText, upArrow, downArrow, clearButton)
    main.append(task)
    // Reseta o valor do taskInput
    taskInput.value = ''
}


// Outras funcionalidades

// Div de alerta quando o timer chega a 0
let timerAlertDiv = document.createElement('div');
    // Título do alerta
    let title = document.createElement('h1');
    const okAlertButton = document.createElement('button');

    timerAlertDiv.setAttribute('class', 'flex flex-col justify-center items-center gap-10 absolute w-[500px] h-38 p-3 z-50 border border-borderTimerAlertDark bg-timerAlertMainDark text-timerAlertTextDark')
    title.setAttribute('class', 'text-2xl')
    okAlertButton.setAttribute('class', 'text-1xl p-2')


// Lógica do timer do Pomodoro
// Declara a variável que será utilizada para definir e acabar o intervalo de tempo
let interval
// isRunning verifica se o timer está rodando. Será utilizada para sair do intervalo quando estiver em outros escopos
let isRunning = false
startPausePomodoroButton.addEventListener('click', () => {
    // Se o botão clicado for o de começar o timer
    if (startPausePomodoroButton.innerHTML.trim() === startSvg.trim()) {
        // Se os inputs tiverem valores
        if (timerMinutes.value && timerSeconds.value) {
            // Se os valores estiverem entre 1 e 60
            if (timerMinutes.value >= 0 && timerMinutes.value <= 60 && timerSeconds.value >= 0 && timerSeconds.value <= 60) {
                // Muda o ícone para o de pausar o timer
                startPausePomodoroButton.innerHTML = pauseSvg
                isRunning = true
                if (!interval) {
                    interval = setInterval(() => {
                        if (isRunning) {
                            timer()
                            // Se o timer estiver finalizado
                            if (timerMinutes.value === '00' && timerSeconds.value === '00') {
                                clearInterval(interval) // Acaba com o intervalo
                                timerMinutes.value = 25 // Reinicia o timer
                                interval = null // Limpa o ID para permitir reinício no futuro
                                startPausePomodoroButton.innerHTML = startSvg
                                
                                if (language === 'pt-BR') title.textContent = 'Timer acabado! Descanse um pouco...' // Tìtulo do alerta fica em PT-BR
                                else title.textContent = 'Timer ended! Rest for a while...' // Título do alerta fica em Inglês

                                okAlertButton.textContent = 'Ok'
                                body.insertBefore(timerAlertDiv, header) // O alerta é inserido no início da página, no topo dela
                                timerAlertDiv.append(title, okAlertButton) // Adiciona o condeúdo da div do alerta
                                okAlertButton.addEventListener('click', () => {body.removeChild(timerAlertDiv)}) // Quando o botão de ok é clicado, o body remove o alerta
                                const beep = new Audio('./sounds/beep.wav') // Toca o áudio de notificação
                                let counter = 0 // Esse contador será utilizado para repetir o áudio 3 vezes
                                beep.play() // Toca o som pela primeira vez
                                // Define o intervalo de 2 segundos
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
        } else { // Se algum dos valores do timer do Pomodoro estiver vazio, ele volta ambos para o padrão (25 minutos)
            timerMinutes.value = 25
            timerSeconds.value = '00'
        }
    } else { // Se for o ícone de pausar ao invés de iniciar
        startPausePomodoroButton.innerHTML = startSvg
        isRunning = false
        clearInterval(interval) // Cancela o intervalo
        interval = null // Limpa o ID para permitir reinício no futuro
    }
});


resetPomodoroButton.addEventListener('click', () => { // Se o botão de reset for apertado
    startPausePomodoroButton.innerHTML = startSvg // Muda o botão para o de iniciar o timer novamente
    timerMinutes.value = 25
    timerSeconds.value = '00'
    isRunning = false
    clearInterval(interval) // Cancela o intervalo
    interval = null // Limpa o ID para permitir reinício no futuro
})


function timer() {
    // Se o valor dos segundos for diferente de 00, ele vai subtrair 1 do valor.
    if (timerSeconds.value !== '00') timerSeconds.value--
    /* 
        Caso contrário, se o valor dos minutos for diferente de 0 e o valor dos segundos for igual à 00:
        Ele vai REMOVER 1 caractere (detalhe: não vai subtrair, e sim transformar 00 em 0, pois é uma string).
        Da próxima vez, o valor vai ser diferente de '00', e ele vai subtrair 1 do valor
    */
    else if (timerMinutes.value !== 0 && timerSeconds.value === '00') {
        timerMinutes.value--
        timerSeconds.value = 59 // Reinicia os segundos, e tira 1 dos minutos
    }
    if (timerMinutes.value.length === 1) timerMinutes.value = '0' + timerMinutes.value // Adiciona 0 no início dos minutos caso o valor de minutos tenha só 1 caractere
    if (timerSeconds.value.length === 1) timerSeconds.value = '0' + timerSeconds.value // Adiciona 0 no início dos segundos caso o valor de segundos tenha só 1 caractere
}


// Função para adicionar o alerta e desabilitar o input
function addAlertAndDisableInput () {
    alert.setAttribute('class', 'flex gap-2 text-red-500')
    // O alerta fica com o texto em português do Brasil
    if (language === 'pt-BR') alert.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> <p id="alert-phrase">Limite de tarefas atingido. Por favor, cumpra tarefas antigas para poder adicionar mais.</p>'
    
    // O alerta fica com o texto em inglês
    else alert.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> <p id="alert-phrase">Limit of tasks reached. Please, complete other old tasks to be able to add more.</p>'
    
    taskInput.disabled = true
    divTasksLimitAlert.append(alert)
    body.append(divTasksLimitAlert)
}

// Alterna o idioma ao clicar no botão
langButton.addEventListener('click', () => {
    language = language === 'pt-BR' ? 'en-US' : 'pt-BR';
    changeLanguage();
});


// Atualiza todos os elementos do site no idioma escolhido
function changeLanguage() {
    // Muda a data
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
        
        // Exibe a data no formato "Month Dayth", o jeito padrão dos americanos
        // O dia fica com o conteúdo do mês, para que o mês consiga vir antes do dia. Ex: October 16th
        day.textContent = `${monthName} ${dayName}${connector}`;
        month.style.display = 'none'; // Oculta o mês

        // Frase motivadora
        phrase.innerHTML = '&OpenCurlyDoubleQuote;<strong class="text-4xl font-extrabold inline">Discipline</strong> is doing what you hate to do, but nonetheless doing it like you love it.&CloseCurlyDoubleQuote; - Mike Tyson';

        // Input de tarefas
        taskInput.setAttribute('placeholder', 'Type your task here')
        // Botão de adicionar tarefa
        addTaskButton.textContent = 'Add task'
        // Conteúdo do alerta de limite de tarefas atingido, caso ele exista
        if (alert) {
            // O id foi definido na criação do innerHTML do alert
            let message = document.querySelector('#alert-phrase')
            message.textContent = 'Limit of tasks reached. Please, complete other old tasks to be able to add more.'
        }

        // Título do "popup" de alerta de fim do timer
        if (timerAlertDiv) title.textContent = 'Timer ended! Rest for a while...'
    } else { // Se o idioma escolhido for pt-BR
        // Exibe a data no formato "Day de Month", o jeito padrão dos brasileiros
        day.textContent = `${dayName} de`;
        month.textContent = monthName;
        month.style.display = 'block'; // Garante que o mês apareça

        // Frase motivadora
        phrase.innerHTML = '&OpenCurlyDoubleQuote;<strong class="text-4xl font-extrabold inline">Disciplina</strong> é fazer o que não gosta como se você amasse fazer isso.&CloseCurlyDoubleQuote; - Mike Tyson';
        
        // Placeholder do input de tarefas
        taskInput.setAttribute('placeholder', 'Digite aqui sua tarefa')
        // Adicionar tarefa
        addTaskButton.textContent = 'Adicionar tarefa'

        // Conteúdo do alerta de limite de tarefas atingido, caso ele exista
        if (alert) {
            // O id foi definido na criação do innerHTML do alert
            let message = document.querySelector('#alert-phrase')
            message.textContent = 'Limite de tarefas atingido. Por favor, cumpra tarefas antigas para poder adicionar mais.' 
        }

        // Título do "popup" de alerta de fim do timer
        if (timerAlertDiv) title.textContent = 'Timer acabado! Descanse um pouco...'
    }
}

// Lógica para mudar a cor de todos os elementos de acordo com o modo escuro e o modo claro
lightDarkButton.addEventListener('click', () => {
    // Se o usuário escolher ir para o tema claro
    if (lightDarkButton.innerHTML.trim() === sunSvg.trim()) {
        // Ícone do botão de mudar tema
        lightDarkButton.innerHTML = moonSvg

        // Body
        body.classList.remove('bg-mainColorDark')
        body.classList.remove('text-textColorDark')
        
        body.classList.add('bg-mainColorLight')
        body.classList.add('text-textColorLight')
        
        // Line
        line.classList.add('border-black')
        
        // Aside
        aside.classList.remove('bg-secondaryColorDark')
        aside.classList.add('bg-secondaryColorLight')

        // DivPomodoroTitle e divPomodoroTimer
        divPomodoroTitle.classList.remove('text-zinc-300')
        divPomodoroTitle.classList.add('text-zinc-700')

        divPomodoroTimer.classList.add('text-black')

        // TimerAlertDiv
        timerAlertDiv.classList.remove('bg-timerAlertMainDark')
        timerAlertDiv.classList.add('bg-timerAlertMainLight')
        
        timerAlertDiv.classList.remove('border-timerAlertBorderDark')
        timerAlertDiv.classList.add('border-timerAlertBorderLight')

        timerAlertDiv.classList.remove('text-timerAlertTextDark')
        timerAlertDiv.classList.add('text-timerAlertTextLight')

        // DateDiv
        dateDiv.classList.remove('bg-secondaryColorDark')
        dateDiv.classList.add('bg-secondaryColorLight')

        // TaskInput
        taskInput.classList.remove('bg-secondaryColorDark')
        taskInput.classList.add('bg-secondaryColorLight')
        taskInput.classList.add('placeholder-zinc-600')
        
        // AddTaskButton
        addTaskButton.classList.remove('bg-addTaskButtonColorDark')
        addTaskButton.classList.add('bg-addTaskButtonColorLight')
        addTaskButton.classList.add('text-black')
    } else { // Se o usuário escolher ir para o tema escuro
        // Ícone do botão de mudar tema
        lightDarkButton.innerHTML = sunSvg

        // Body
        body.classList.remove('bg-mainColorLight')
        body.classList.remove('text-textColorLight')
        
        body.classList.add('bg-mainColorDark')
        body.classList.add('text-textColorDark')
        
        // Line
        line.classList.remove('border-black')

        // Aside
        aside.classList.remove('bg-secondaryColorLight')
        aside.classList.add('bg-secondaryColorDark')
        
        // DivPomodoroTitle e divPomodoroTimer
        divPomodoroTitle.classList.remove('text-zinc-700')
        divPomodoroTitle.classList.add('text-zinc-300')

        divPomodoroTimer.classList.remove('text-black')
        
        // TimerAlertDiv
        timerAlertDiv.classList.remove('bg-timerAlertMainLight')
        timerAlertDiv.classList.add('bg-timerAlertMainDark')
    
        timerAlertDiv.classList.remove('border-timerAlertBorderLight')
        timerAlertDiv.classList.add('border-timerAlertBorderDark')
        
        timerAlertDiv.classList.remove('text-timerAlertTextLight')
        timerAlertDiv.classList.add('text-timerAlertTextDark')

        // DateDiv
        dateDiv.classList.remove('bg-secondaryColorLight')
        dateDiv.classList.add('bg-secondaryColorDark')

        // TaskInput
        taskInput.classList.remove('bg-secondaryColorLight')
        taskInput.classList.add('bg-secondaryColorDark')
        
        // AddTaskButton
        addTaskButton.classList.remove('bg-addTaskButtonColorLight')
        addTaskButton.classList.remove('text-black')
        addTaskButton.classList.add('bg-addTaskButtonColorDark')
    }
})

// Div onde o alerta de limite de tarefas ficará
let divTasksLimitAlert = document.createElement('div')
divTasksLimitAlert.setAttribute('class', 'flex justify-center items-center absolute top-[520px]')
// Conteúdo da divTasksLimitAlert, que é o próprio alert
let alert = document.createElement('h3')
