# Доработать приложение с профилем и изображениями

Начал разработку приложения react + firebase + .net 6

Разработал: 
- добавил систему IdentityCore

- добавил систему Identity Core
- добавил DbContext с PostgreSQL
- CQRS

На клиенте-

- Разработана часть логики по загрузке и выгрузке изображения из firebase
- Есть html/css констркуция input

Доработать

- [x]  Доделать UserModel(добавить свойства)
- [x]  Генерация JWT (appsettings.json (options pattern) , интерфейсы)
- [ ]  Разобраться почему не работает DefaultTokenProvider
- [x]  Сделать метод регистрации пользователя
- [x]  Попробовать привести проект с CQRS(Command Query Responsibility Segregation)
- [ ]  Создать generic для response
- [ ]  Переделать стили для image input
- [ ]  Внедрить редис?
- [ ]  Добавить CORS и затестить регистрацию
