const addTaskInputMain = document.querySelector('#inputTask');
const submitBtn = document.querySelector('#submitBtn');
const form = document.querySelector('#form');
const taskListElement = document.querySelector('#task-list');
const clearTaskBtn = document.querySelector('#clearTaskBtn');

const taskList = [];

new Sortable(taskListElement, {
  animation: 350,
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  taskList.push(addTaskInputMain.value);
  const allTasks = taskList.map((task) => createElement(task)).join('');
  taskListElement.innerHTML = allTasks;
  addTaskInputMain.value = '';
});

const createElement = (task) => {
  const element = `
  <li class="py-2 hover:cursor-pointer">
  <div class="flex items-center align-middle p-4 border rounded">
              <input
                id=${Date.now()}
                aria-describedby=${Date.now()}
                type="checkbox"
                class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded "
              />
              <label
                for=${Date.now()}
                class="text-sm ml-3 font-medium text-gray-900 h-4 leading-[0rem]"
                >${task}
              </label>
            </div>
  </li>
  `;
  return element;
};

clearTaskBtn.addEventListener('click', () => {
  taskList.splice(0, taskList.length);
  const allTasks = taskList.map((task) => createElement(task)).join('');
  taskListElement.innerHTML = allTasks;
});
