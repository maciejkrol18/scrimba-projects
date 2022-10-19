const tasks = [
    {
        name: 'Wash Car',
        cost: 15,
    },

    {
        name: 'Mow Lawn',
        cost: 20,
    },

    {
        name: 'Pull Weeds',
        cost: 30,
    },

    // {
    //     name: 'Walk the dog',
    //     cost: 40,
    // },

    // {
    //     name: 'Water the plants',
    //     cost: 10,
    // },

];

const gigBtns = [
    document.querySelector('.gig-1'),
    document.querySelector('.gig-2'),
    document.querySelector('.gig-3'),
    // document.querySelector('.gig-4'),
    // document.querySelector('.gig-5'),
];

const tasksContainer = document.querySelector('.tasks-container');
const sendBtn = document.querySelector('.send-btn');
const tasksUl = document.querySelector('.tasks-list');
const tasksCostTotal = document.querySelector('.total-amount');
let taskCostSum = 0;

function renderTaskCost() {
    tasksCostTotal.textContent = "$"+taskCostSum;
}

function renderButtons() {
    for (let i = 0; i < gigBtns.length; i++) {
        gigBtns[i].textContent = `${tasks[i].name}: $${tasks[i].cost}`
    }
}

if (tasks) {
    renderButtons();
}

for (let i = 0; i < gigBtns.length; i++) {
    gigBtns[i].addEventListener("click", function() {
        tasksUl.innerHTML += 
        `
            <li class="li-${i}">
                <span>
                    <span class="task-name"> ${tasks[i].name} </span>
                </span>
                <span class="task-cost"> ${tasks[i].cost} </span>
            </li>
        `
        taskCostSum += tasks[i].cost;
        renderTaskCost();
        gigBtns[i].disabled = true;
    });
}

// function removeList(listIndex) {
//     document.remove(this.add--
// }

sendBtn.addEventListener("click", function() {
    tasksUl.innerHTML="";
    taskCostSum = 0;
    renderTaskCost();
    for (let i = 0; i < gigBtns.length; i++) {
        gigBtns[i].textContent = `${tasks[i].name}: $${tasks[i].cost}`
        gigBtns[i].disabled = false;
    }
});