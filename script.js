"use strict"
// На странице находится форма: инпут для ввода текста и кнопка.
// Пользователь может ввести что-то в инпут и нажать на кнопку, после этого в списке ниже должна отобразится строка, с тем что было введено в инпуте. После этого инпут в форме должен очистится
// Добавить в каждую строку кнопку “Delete”, при клике на которую элемент удаляется из списка
// Если пользователь нажимает на кнопку “Add” - а инпут пустой, то выводить ошибку. Ошибка должна исчезать - если пользователь снова начал вводить текст в инпут.
// - У каждого элемента LI будет внутри также checkbox - перед текстом
// - При нажатии на этот checkbox - кнопка и checkbox должны стать неактивными (disabled),
// а текст внутри LI должен быть зачеркнутым. Это будет значить что Todo выполнена

const container = document.querySelector(".container");
const form = document.forms.addItem;
const input = form.input;
const select = form.select;
const button = form.querySelector("button");
const title = document.querySelector(".title");
const errorMessage = document.querySelector(".error_message");

const addItem = () => {
    let list = document.querySelector(`.list`);

    let listItem = document.createElement('li');
    select.selectedIndex ? list.prepend(listItem) : list.append(listItem);
    listItem.className = "list_item";
    listItem.innerHTML = input.value;

    let inputCheckbox = document.createElement('input');
    listItem.prepend(inputCheckbox);
    inputCheckbox.setAttribute("type", "checkbox");
    inputCheckbox.className = "checkbox form-check-margin-auto";

    let deleteButton = document.createElement('button');
    listItem.append(deleteButton);
    deleteButton.className = "btn btn-outline-danger btn-sm delete_button";
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>';

    form.reset();
    showCountItems();
}

form.onsubmit = (event) => {
  event.preventDefault();

  if (input.value.trim().length === 0) {
    input.classList.add("error");
    errorMessage.innerHTML = "ToDo field is required";
    return;
  }
  addItem();
}

input.onfocus = () => {
  const isErrorField = input.classList.contains("error");
if (isErrorField) {
      input.classList.remove("error");
      errorMessage.innerHTML = "";
    }
}

container.addEventListener("click", (event) => {
    const isRemoveButton = event.target.classList.contains("delete_button");
    if (isRemoveButton) {
      event.target.closest(".list_item").remove();
      showCountItems();
      }
});

container.addEventListener("change", (event) => {
  const isCheckboxChange = event.target.classList.contains("checkbox");
  if (isCheckboxChange) {
    let markedItem = event.target.closest(".list_item");
    event.target.disabled = true;
    markedItem.querySelector(".delete_button").disabled = true;
    markedItem.classList.toggle("marked_item");
    }
});

const showCountItems = () => {
  let count = document.querySelectorAll(".list_item").length;
  title.innerHTML = `ToDo list (${count} items):`;
}

showCountItems();