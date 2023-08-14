<div align="center">
<h3 >How to flower</h3>
Приложение поможет вам заботиться о комнатных растениях. Здесь вы можете посмотреть советы по освещению и влажности, а так же настроить оповещения о поливах и опрыскиваниях для каждого вашего любимца в телеграм.
</div>

### Используемые технологии
- :snake: Python 3.9
- :incoming_envelope: DRF 3.12.4
- :package: PostgreSQL 13.0
- :memo: SQLite (для локального запуска)


## Доступ
Приложение доступно в тестовом режиме по ссылке http://how-to-flower.ru/
В данный момент ведется доработка фронтенда.

#### REST API:
Регистрация и получение токена:
- Эндпоинт '/api/users/' принимает POST запрос с указанием username, password, email.
Пример запроса:

```
{
  "username": "DanaX",
  "first_name": "Dana",
  "email": "dana@example.com",
  "password": "MulderSucks"
}
```

- Чтобы получить токен, нужно отправить POST запрос на '/api/auth/token/login/'
Пример запроса:

```
{
  "email": "dana@example.com",
  "password": "MulderSucks"
}
```

Пример ответа:
```
{
    "auth_token": "e54d3940c1cff251f9e2a1d3f0b47987b754b554"
}
```

Полученный токен нужно отправлять при каждом запросе:
```
KEY Authorization 
VALUE Token e54d3940c1cff251f9e2a1d3f0b47987b754b554
```
- POST запрос на '/api/my_flowers/' создает в БД новую запись о цветочке пользователя. Пример запроса:
```
{
  "flower_type": 1,
  "name": "Игорь"
}
```

Пример ответа:
```
{
    "id": 1,
    "flower_type": 1,
    "name": "Игорь",
    "owner": 1,
    "image": "http://127.0.0.1:8000/media/flowers/images/00c6058bb1bf68a8d81e3723d068a9c9.png",
    "notification": false
}
```

- Изменить информацию о растении можно передав PATCH  запрос на '/api/my_flowers/{id}/'

Пример запроса:
```
{
"flower_type": 1,
"name": "Олег",
"notification": true
}
```

- Чтобы включить уведомления нужно отправить PATCH  запрос на '/api/my_flowers/{id}/'
Пример запроса:

```
{
  "flower_type": 1,
  "name": "Игорь второй",
  "notification": true
}
```
- Кроме этого, чтобы получить уведомления в телеграм нужно добавить в свой профиль chat id Telegram. Отправим PATCH запрос на 'api/users/me/' с указанием чат id:

```
{
"chat_id": "488501713"
}
```


#### Локальный запуск API:
1. Клонировать репозиторий, создать виртуальное окружение, установить зависимости:

```
git clone git@github.com:Kaydalova/how_to_flower.git
```

```
python3 -m venv venv
. venv/bin/activate
cd flower_bot
pip install -r  requirements.txt
```

2. Убедитесь, что в настройка в файле flower_bot/flower_bot/settings.py указаны корректные настройки БД для локального запуска:

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

3. Создайте и примените миграции:

```
python manage.py makemigrations
python manage.py migrate
```

4. Создайте телеграм бота и запросите токен к нему в https://t.me/BotFather.
Добавьте токен в .env файл:

```
TOKEN=5706906543:AAHCxReGGxu_uTVD2HodrSsnOooOp-XXX_X
```

5. После запуска проекта полная документация к API будет доступна по адресу http://127.0.0.1:8000/redoc/

#### Над проектом работали
Backend https://github.com/Kaydalova
Frontend https://github.com/krokodila888