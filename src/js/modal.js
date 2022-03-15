const body = document.querySelector('#body');
let modalHolder;
let div = document.createElement('div');
let section = document.createElement('section');

const createModal = (title, value) => {
  div.id = 'modal';
  div.className =
    'w-screen h-screen transition ease-in-out absolute left-0 top-0 grid place-items-center';
  div.onclick = modalClick;

  section.className = 'z-10 p-8 border rounded bg-white shadow opacity-100';
  div.appendChild(section);

  let h2 = document.createElement('h2');
  h2.className = 'text-center';
  h2.textContent = title + value;
  section.appendChild(h2);
};

function modalClick() {
  body.removeChild(modalHolder);
}

export { div, section, createModal, modalHolder };
