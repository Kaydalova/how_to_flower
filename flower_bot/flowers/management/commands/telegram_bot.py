from datetime import datetime

import schedule
from django.conf import settings
from django.core.management.base import BaseCommand
from telegram import Bot

from flowers.models import Schedule

ACTION_DICT = {
    0: 'опрыскать',
    1: 'полить',
    2: 'подкормить',
}


class Command(BaseCommand):
    help = 'Запуск бота How to flower'

    def handle(self, *args, **options):
        """
        Функция проверяет
        """
        def send_notification(bot, today_schedule):
            chat_id = today_schedule.flower.owner.chat_id
            flower_name = today_schedule.flower.name
            action = today_schedule.action
            text = f'Самое время {ACTION_DICT.get(action)} {flower_name}!'
            bot.send_message(chat_id, text)
            return schedule.CancelJob

        def check_schedule():
            today = datetime.weekday(datetime.now())
            today_schedules = Schedule.objects.filter(day=today)
            secret_token = settings.TELEGRAM_TOKEN
            bot = Bot(token=secret_token)

            for schedule_item in today_schedules:
                schedule.every().day.at(
                    str(schedule_item.time)).do(
                        send_notification(bot, schedule_item))

        schedule.every().day.at('00:01').do(check_schedule)
