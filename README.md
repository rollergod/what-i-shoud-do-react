# React + .Net + Firebase application 

Простое приложение, с возможностью регистрации пользователя со своим изображением для профиля.
Регистрация основана на JWT токенах(access, refresh)

## Запуск приложения

Скачать либо склонировать проект. Запустить .sln файл в папке проекта. В среде разработки запутсить проект(CTRL+F5)

## О приложении

REST api для игры крестики нолики.

Апи имеет 4 endpoint`а

![image](https://user-images.githubusercontent.com/91565374/224567483-a6f7e28a-0768-4d61-a67b-c087b9f93baf.png)

* *get* **/api/game** - возвращает игровую таблицу.
* *post* **/api/game** - принимает два параметра - координата по оси x и коордитана по оси y. Два раза одни и те же координаты указывать нельзя.
* *get* **/api/game/free-coordinates** - возвращает строки с координатами пустых клеток
* *post* **/api/game/new-game** - создает новую игру

## Пример ввода координат

**Request:**
```json
POST /login HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
    "xCord": "1",
    "yCord": "1" 
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
   "table": "...
             .X.
             ..."
}

```
**Failed Response:**
```json
HTTP/1.1 401 Unauthorized
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "code": 400,
    "message": "bad request",
    "resolve": "Координата с позицией x и y занята"
}
``` 

