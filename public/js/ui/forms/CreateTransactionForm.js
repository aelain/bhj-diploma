/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      const accountsSelect = this.element.querySelector('.accounts-select');
      accountsSelect.innerHTML = '';

      if (response && response.success) {
        if (response.data) {
          response.data.forEach(item => {
            accountsSelect.innerHTML += `<option value="${item.id}">${item.name}</option>`;
          });
        }
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    if (data.sum[0] === '-') {
      data.sum = data.sum.slice(1);
    }

    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        const modalNewIncome = (App.getModal('newIncome').element.style.display === 'block') ? true : false;

        if (modalNewIncome) {
          App.getModal('newIncome').close();
        } else {
          App.getModal('newExpense').close();
        }

        App.update();
      } else {
        alert(err);
      }
    });
  }
}