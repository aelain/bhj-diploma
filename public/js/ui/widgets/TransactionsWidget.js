/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Переданный элемент TransactionsWidget не существует');
    }

    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const btnCreateIncome = document.querySelector('.create-income-button');
    const btnCreateExpense = document.querySelector('.create-expense-button');

    btnCreateIncome.addEventListener('click', event => {
      event.preventDefault();
      App.getModal('newIncome').open();
    });

    btnCreateExpense.addEventListener('click', event => {
      event.preventDefault();
      App.getModal('newExpense').open();
    });
  }
}
