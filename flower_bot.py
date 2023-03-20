import os

from dotenv import load_dotenv
from telegram import Bot, ReplyKeyboardMarkup
from telegram.ext import CommandHandler, Updater

load_dotenv()

# Создаем экземпляр класса Bot для отправки сообщений пользователю
secret_token = os.getenv('TOKEN')
bot = Bot(token=secret_token)
chat_id = os.getenv('CHAT_ID')
text = 'Вам телеграмма!'

bot.send_message(chat_id, text)

# The Updater class continuously fetches new updates from telegram and passes
# them on to the Dispatcher class. If you create an Updater object, it will
# create a Dispatcher for you and link them together with a Queue.
# You can then register handlers of different types in the Dispatcher,
# which will sort the updates fetched by the Updater according to the handlers
# you registered, and deliver them to a callback function that you defined.
updater = Updater(token=secret_token)


def start(update, context):
    """
    Функция начала диалога с пользователем.
    Отправляет приветственное сообщение и добавляет
    в интерфейс кнопки для работы в боте.
    """
    chat = update.effective_chat
    name = update.message.chat.first_name
    text = f'Привет, {name}! Я помогу тебе заботиться о твоих цветах!'
    buttons = ReplyKeyboardMarkup([
        ['Добавить цветок', 'Мои цветы'],
        ['Выбрать цветок']], resize_keyboard=True)
    context.bot.send_message(
        chat_id=chat.id,
        text=text,
        reply_markup=buttons)


def add_flower(update, context):
    """
    Функция принимает на вход:
    update - обновление, которое пришло с сервера
    (в этом объекте есть информация о чате, входящее сообщение),
    context - информация о боте и другая опциональная.
    Функция отправляет в чат с пользователем сообщение.
    """
    chat = update.effective_chat
    text = 'Hello'
    context.bot.send_message(chat_id=chat.id, text=text)


def view_flowers(update, context):
    """
    Список цветов пользователя.
    Args:
        update
        context
    Returns:
        Отправляет пользователю список его растений
        с фотографиями(при наличии)и именем цвекта
    """
    pass


def choose_flower(update, context):
    """
    Функция помогает пользователю выбрать цветок
    по его параметрам
    Args:
        update
        context
    Returns:
        Возвращает список цветов по критериям
    """
    pass

# Регистрируется обработчик CommandHandler;
# он будет отфильтровывать только сообщения с содержимым '/start'
# и передавать их в функцию wake_up()


updater.dispatcher.add_handler(CommandHandler('start', start))


# Регистрируется обработчик MessageHandler;
# из всех полученных сообщений он будет выбирать только текстовые сообщения
# и передавать их в функцию say_hi()


# Метод start_polling() запускает процесс polling,
# приложение начнёт отправлять регулярные запросы для получения обновлений.
updater.start_polling()
# Бот будет работать до тех пор, пока не нажмете Ctrl-C
updater.idle()
