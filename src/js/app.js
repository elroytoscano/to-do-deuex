const addTaskInputMain = document.querySelector('#inputTask');
const submitBtn = document.querySelector('#submitBtn');
const taskListElement = document.querySelector('#task-list');
const clearTaskBtn = document.querySelector('#clearTaskBtn');
const body = document.querySelector('#body');
const divForm = document.querySelector('#inputForm');

let modalHolder;
let taskList = [];

// new Sortable(taskListElement, {
//   animation: 350,
// });

const completeTask = (taskId) => {
  const task = document.getElementById(`taskId${taskId}`);
  const span = document.createElement('span');
  span.className = 'absolute w-full h-1 bg-black -translate-y-1/2 top-1/2';
  span.id = `completedTask-${taskId}`;
  task.appendChild(span);
};

const removeCompleteTask = (taskId) => {
  const task = document.getElementById(`taskId${taskId}`);
  const removeSpan = document.getElementById(`completedTask-${taskId}`);
  task.removeChild(removeSpan);
};

addTaskInputMain.addEventListener('input', () => {
  addTaskInputMain.classList.remove('border-red-400');
  const errorSpan = document.getElementById('errorInput');
  if (errorSpan) {
    divForm.removeChild(errorSpan);
    divForm.classList.remove('mb-10');
    divForm.classList.add('mb-4');
  }
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const taskId = Date.now();
  if (addTaskInputMain.value !== '') {
    const newTask = { value: addTaskInputMain.value, taskId, completed: false };
    taskList.push(newTask);
    const task = createTask(addTaskInputMain.value, taskId);
    taskListElement.appendChild(task);
    addTaskInputMain.value = '';
    taskList.forEach(({ taskId, value }) => {
      const editTask = document.getElementById(`edit${taskId}`);
      const deleteTask = document.getElementById(`delete${taskId}`);
      const editId = editTask.id;
      const deleteId = deleteTask.id;
      editTask.addEventListener('click', () => {
        modalHolder = modalElement(
          `Edit Task`,
          value,
          editTaskFn,
          editId,
          editTaskElement
        );
        body.appendChild(modalHolder);
      });
      deleteTask.addEventListener('click', () => {
        modalHolder = modalElement(
          'Delete Task',
          value,
          deleteTaskFn,
          deleteId,
          deleteTaskElement
        );
        body.appendChild(modalHolder);
      });
    });
  } else {
    addTaskInputMain.classList.add('border-red-400');
    const errorSpan = document.createElement('span');
    errorSpan.className = 'absolute -bottom-6 text-sm left-2 text-red-400';
    errorSpan.textContent = 'Please provide a task';
    errorSpan.id = 'errorInput';
    divForm.appendChild(errorSpan);
    divForm.classList.add('mb-10');
  }
});

const createSVGElement = (path, svgId, colors, viewBox) => {
  const xmlns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(xmlns, 'svg');
  svg.id = svgId;
  svg.classList = `fill-current  h-4 w-4 cursor-pointer transition ease-in-out ${colors}`;
  svg.setAttribute('viewBox', viewBox);

  const svgPath = document.createElementNS(xmlns, 'path');
  svgPath.setAttribute('d', path);
  svg.appendChild(svgPath);

  return svg;
};

const createTask = (value, taskId) => {
  const taskElement = document.createElement('li');
  taskElement.className =
    'p-4 border rounded hover:cursor-pointer flex justify-between align-baseline gap-x-4 w-full';
  taskElement.id = `li${taskId}`;

  const div = document.createElement('div');
  div.className = 'flex w-full items-start gap-x-2 align-middle relative';
  div.id = `taskId${taskId}`;
  taskElement.appendChild(div);

  const input = document.createElement('input');
  input.id = taskId;
  input.ariaRoleDescription = 'Task';
  input.type = 'checkbox';
  input.onclick = (e) => {
    const task = taskList.find(
      ({ taskId }) => taskId === parseInt(e.target.id)
    );
    if (!task.completed) {
      task.completed = !task.completed;
      completeTask(e.target.id);
    } else {
      task.completed = !task.completed;
      removeCompleteTask(e.target.id);
    }
  };
  input.className =
    'bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded';
  div.appendChild(input);

  const label = document.createElement('label');
  label.htmlFor = taskId;
  label.className =
    'text-sm ml-2 font-medium text-gray-900 h-4 leading-[0rem] w-full';
  label.textContent = value;
  div.appendChild(label);

  const outerDiv = document.createElement('div');
  outerDiv.className = 'flex justify-end align-middle gap-x-4';
  taskElement.appendChild(outerDiv);

  const editSVG = createSVGElement(
    'M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z',
    `edit${taskId}`,
    `text-blue-400 hover:text-blue-600 `,
    '0 0 512 512'
  );

  taskElement.appendChild(editSVG);

  const deleteSVG = createSVGElement(
    'M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z',
    `delete${taskId}`,
    `text-red-400 hover:text-red-600`,
    '0 0 448 512'
  );

  taskElement.appendChild(deleteSVG);

  return taskElement;
};

clearTaskBtn.addEventListener('click', () => {
  taskList.splice(0, taskList.length);
  taskListElement.innerHTML = '';
});

const editTaskElement = (section, value, title, taskId, func) => {
  let h2 = document.createElement('h2');
  h2.className = 'text-center text-2xl font-semibold';
  h2.textContent = title + ' ' + `${value}`;
  section.appendChild(h2);

  let form = document.createElement('form');
  form.className = 'px-4 mt-8';
  section.appendChild(form);

  let input = document.createElement('input');

  input.type = 'text';
  input.id = `input-${taskId}`;
  input.value = value;

  input.className =
    'block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';
  form.appendChild(input);

  let button = document.createElement('button');
  button.id = 'updateTask';
  button.className =
    'text-center w-full border rounded border-gray-300 mt-4 p-2 transition ease-in-out hover:bg-gray-300';
  button.textContent = `Update Task ${value}`;
  button.type = 'submit';
  button.onclick = () => func(taskId);
  form.appendChild(button);
};

const deleteTaskElement = (section, value, title, taskId) => {
  let h2 = document.createElement('h2');
  h2.className = 'text-center text-2xl font-semibold';
  h2.textContent = `Are you sure you want to ${title}` + ' ' + `${value}`;
  section.appendChild(h2);

  let sectionDiv = document.createElement('div');
  sectionDiv.className = 'flex w-full flex-row gap-x-4';
  section.appendChild(sectionDiv);

  let cancelBtn = document.createElement('button');
  cancelBtn.id = taskId;
  cancelBtn.className =
    'text-center w-full border rounded border-gray-300 mt-4 p-2 transition ease-in-out hover:bg-gray-300';
  cancelBtn.textContent = `Cancel`;
  cancelBtn.type = 'delete';
  cancelBtn.onclick = modalClick;

  let deleteBtn = document.createElement('button');
  deleteBtn.id = taskId;
  deleteBtn.className =
    'text-center w-full border rounded border-gray-300 mt-4 p-2 transition ease-in-out hover:bg-gray-300';
  deleteBtn.textContent = `Delete`;
  deleteBtn.type = 'delete';
  deleteBtn.onclick = () => deleteTaskFn(taskId);

  sectionDiv.appendChild(cancelBtn);
  sectionDiv.appendChild(deleteBtn);
};

const modalElement = (title, value, func, taskId, modalBody) => {
  let div = document.createElement('div');
  let section = document.createElement('section');
  div.id = 'modal';
  div.className =
    'w-screen h-screen transition ease-in-out absolute left-0 top-0 grid place-items-center';
  div.onclick = modalClick;

  section.className = 'z-10 p-8 border rounded bg-white shadow opacity-100';
  section.onclick = sectionClick;
  div.appendChild(section);

  modalBody(section, value, title, taskId, func);

  let div2 = document.createElement('div');
  div2.className =
    'opacity-30 absolute transition ease-in-out bg-gray-700 w-full h-full';
  div.appendChild(div2);

  return div;
};

function sectionClick(e) {
  e.preventDefault();
  e.stopPropagation();
}

function modalClick() {
  body.removeChild(modalHolder);
}

function editTaskFn(editTaskId) {
  const editId = editTaskId.split('edit')[1];
  const task = taskList.find(({ taskId }) => taskId === parseInt(editId));
  const input = document.getElementById(`input-${editTaskId}`);
  task.value = input.value;
  body.removeChild(modalHolder);

  const editedTask = createTask(task.value, editId);
  const taskElement = document.getElementById(`li${editId}`);
  taskListElement.removeChild(taskElement);
  taskListElement.appendChild(editedTask);

  taskList.forEach(({ taskId, value }) => {
    const editTask = document.getElementById(`edit${taskId}`);
    const deleteTask = document.getElementById(`delete${taskId}`);
    const editId = editTask.id;
    const deleteId = deleteTask.id;

    editTask.addEventListener('click', () => {
      modalHolder = modalElement(
        `Edit Task`,
        value,
        editTaskFn,
        editId,
        editTaskElement
      );
      body.appendChild(modalHolder);
    });
    deleteTask.addEventListener('click', () => {
      modalHolder = modalElement(
        'Delete Task',
        value,
        deleteTaskFn,
        deleteId,
        deleteTaskElement
      );
      body.appendChild(modalHolder);
    });
  });
}

function deleteTaskFn(deleteTaskId) {
  const deleteId = deleteTaskId.split('delete')[1];
  const task = taskList.find(({ taskId }) => taskId === parseInt(deleteId));
  body.removeChild(modalHolder);

  const taskElement = document.getElementById(`li${deleteId}`);
  taskListElement.removeChild(taskElement);
  taskList = taskList.filter((task) => task.taskId !== parseInt(deleteId));
  console.log(taskList);

  taskList.forEach(({ taskId, value }) => {
    const editTask = document.getElementById(`edit${taskId}`);
    const deleteTask = document.getElementById(`delete${taskId}`);
    const editId = editTask.id;
    const deleteId = deleteTask.id;
    editTask.addEventListener('click', () => {
      modalHolder = modalElement(
        `Edit Task`,
        value,
        editTaskFn,
        editId,
        editTaskElement
      );
      body.appendChild(modalHolder);
    });
    deleteTask.addEventListener('click', () => {
      modalHolder = modalElement(
        'Delete Task',
        value,
        deleteTaskFn,
        deleteId,
        deleteTaskElement
      );
      body.appendChild(modalHolder);
    });
  });
}
