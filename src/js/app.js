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
  <li class=" p-4 border rounded hover:cursor-pointer flex justify-between align-baseline">
  <div class="flex items-start gap-x-2 align-middle">
              <input
                id=${Date.now()}
                aria-describedby=${Date.now()}
                type="checkbox"
                class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded "
              />
              <label
                for=${Date.now()}
                class="text-sm ml-2 font-medium text-gray-900 h-4 leading-[0rem]"
                >${task}
              </label>
            </div>
            <div class="flex justify-end align-middle gap-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-red-400 hover:text-red-600 h-4 w-4 cursor-pointer transition ease-in-out" viewBox="0 0 512 512"><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="fill-current hover:text-blue-600 h-4 w-4 cursor-pointer text-blue-400 transition ease-in-out" viewBox="0 0 448 512" ><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
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
