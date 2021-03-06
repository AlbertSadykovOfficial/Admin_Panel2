#  Admin panel Vue.js

## Описание
В репозитории представлен вариант условного приложения, необходимо:
- внести доработки, описанные в "Функциональных требованиях";
- реализовать это в коде согласно "Нефункциональным требованиям".

## Stage 1
### Функциональные требования
- Реализовать методы загрузки данных в сервисе `ApiService` (src/api/service.js).
- Реализовать в `App` загрузку данных из апи с использованием `ApiService` (src/store/index.js).
- Реализовать вывод списка сотрудников с группировкой по должностям (`Person.position`) с заголовком (см. [Изображение 1](#shot-1)) (src/components/PagePosition.vue)
- Выводить в карточке сотрудника в углу аватара (см. [Изображение 1](#shot-1)) количество комментариев (`Person.comments`) (src/components/Cards/PersonCard.vue + src/store/index.js -> mutations -> setComments)
- Добавить поле фильтрации и реализовать фильтрацию по списку сотрудников (по совпадению начальных символов имени, фамилии, или email – как части до @, так и домена) (см. [Изображение 2](#shot-2)) (src/App.vue -> Row -> 30, 65); не отображать группу, если в ней при фильтрации не оказалось сотрудников (src/components/PagePosition.vue -> Row 4).
- Реализовать функциональность формы редактирования данных сотрудника (src/components/Addons/Popup.vue):
    - все поля являются обязательными;
    - `name` должно состоять как минимум из двух слов, каждое из которых должно начинаться с прописной буквы (Row 80);
    - `email` должен соответствовать формату (Row 83);
    - делать кнопку "Сохранить" доступной для нажатия только при наличии изменений. При наличии изменений и нажатии "Отменить" – спрашивать подтверждение отмены в ещё одном всплывающем окне (Row 69);
    - после подтверждения, сделанные изменения должны отображаться в списке

### Нефункциональные требования
- Переписать вёрстку карточки (блок `class="card"`) с табличной на `flex`.
- Реализовать компонент `PersonGroup` для отображения группы со списком сотрудников определенной должности (название группы + список сотрудников) (src/components/PageGroup.vue).
- Выделить компонент `PersonCard` "карточки" сотрудника используемого в списке (src/components/Cards/PersonCard.vue)
  - единственным доступным публичным свойствой должно быть `:person`, принимающим объект типа `Person`.
- Сделать отдельный компонент (на основе компонента `PersonCard`, например, с отличающимися стилями) 
 для отображения должности `Manager` (src/components/Cards/ManagerCard.vue).
- Реализовать переиспользуемую утилитарную функцию-фабрику, возвращающую функцию фильтрации для поиска-фильрациии по списку сотрудников (src/addons/fabric.js + src/App.vue -> Row 29):
  - Аргументы функции:
    - название поля в объкте `Person`;
    - строка запроса;
    - логическая функция проверки значение на соответсвие поисковому запросу;
  - Возвращаемое значение:
    - логическая функция для использования в коде поиска-фильтрации

- Названия методов, свойств и переменных должны быть семантичными.
- Методы/функции должны стремиться быть "чистыми" (pure function).
- Значения переменных в коде должны стремиться быть иммутабельными.
  (в идеале не должно быть использования `let` в пользу `const`, вместо мутаций объектов должны создаваться новые).
- Исправить ошибки / недочёты по коду допущенные в исходной реализации.
- Приветствуется наличие `JSDoc` для описания и минимальной типизации.

## Stage 2
### Требования
- Реализовать функцию форматирования и обеспечить возможность переиспользования её при
  выводе `Person.name` в `PersonCard`, которая бы использовалась для "подсвечивания" совпавших частей при поиске / фильтрации: "<mark>Фами</mark>лия Имя" при отображении имени сотрудника в карточке. (src/components/Cards/PersonCard.vue -> -> methods -> mark Row 41)
  - Мотивация:
    - Компонент карточки сотрудника не должен знать ничего о существовании поиска в родительском компоненте
    - Нужен доступ к контексту родительского компонента
  - Ограничения:
    - нельзя добавлять новые свойства (кроме существующего `person`) к публичному интерфейсу компонентов карточки и формы;
    - нельзя менять / расширять инстанс объекта типа `Person`, меняя / добавляя к нему новые поля уже с форматированием;
    
- Реализовать функцию возвращающую на основе передаваемого – новый компонент с расширенным поведением. (src/components/PagePosition.vue (Row 25) + src/addons/clone.js + src/addons/deepClone.js)
  - Мотивация:
    - Не хотим впоследствии менять/расширять БЛ родительского компонента, отображающего карточки сотрудников, 
       ни код базового компонента карточки, внося дополнительные условия
    - Хотим переиспользовать шаблон и базовое поведение карточки сотрудника

  - Аргументы функции:
    - Компонент карточки сотрудника;
    - Список названий полей из `Person`, которые надо "засекретить" звёздочками;
    - Символ "маскировки";
  - Возвращаемое значение:
    - Новый компонент карточки, который вместо значений указанных "секретных" полей,
      выводит строку из "звёздочек"
      <br/>
```js
const SecurePersonCard = withSecretPersonProps(PersonCard, ['email'], '*');
```
Использовать этот компонент для вывода карточки сотрудника на должности `Manager` и маскировки поля `Person.email`.

- Реализовать отложенный рендеринг списка сотрудников в компоненте `PersonGroup` (см. [Изображение 3](#shot-3)) (src/main.js (Row 25) + src/components/PagePosition.vue -> methods -> handleScroll -> debounce)

## Улучшения
### Свой Vuex (src/store)
Я решил, что будет удобно централизованно хранить информацию.
Так как нельзя было использовать расширения и модули, то я написал свой.
Через прототип Vue поместил его в глобальную область и далее я работал через него. 


### Стили (src/assets/styles)
Стили были написаны в компонентах, я вынес их в отдельные файлы.
Так же привел классы в соотвествие с методолгоией БЭМ

### Декомпозиция
Провел декомпозицию на компоненты из исходного монолитного компонента

### Маршрутизация (src/addons/statement.js)
Сделал маршрутизацию между 2мя вкладками, 
создал специальный компонент для управления состоянием, 
который легко может быть расширен

### Объект модального окна
Сделал объект модального окна для удобного доступа к ифнормации,
хранения и изменения информации

## Изображения
<a name="shot-1"></a>
<figure>
  <figcaption>Изображение 1. Список сотрудников с группировкой по должностям</figcaption>
  <img src="raw/public/docs/shot-2.png" />
</figure>
<br/>
<a name="shot-2"></a>
<figure id="shot-2">
  <figcaption>Изображение 2. Поиск/Фильтрация по списку</figcaption>
  <img src="raw/public/docs/shot-1.png" />
</figure>
<br/>
<a name="shot-3"></a>
<figure id="shot-3">
  <figcaption>Изображение 3. Отложенный рендеринг списка сотрудников</figcaption>
  <img src="raw/public/docs/shot-3.png" />
</figure>

