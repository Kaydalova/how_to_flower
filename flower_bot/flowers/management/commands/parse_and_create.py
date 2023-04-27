from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup
from django.conf import settings
from django.core.management.base import BaseCommand

from flowers.models import Flower

FIRST_URL = 'https://roots-store.ru/plants/care/'
BASE_URL = 'https://roots-store.ru/'


class Command(BaseCommand):
    help = 'Parse flowers data and create flower objects'

    def handle(self, *args, **options):
        def cook_soup(url):
            response = requests.get(url)
            response.encoding = 'utf-8'
            return BeautifulSoup(response.text, 'lxml')

        upload_list = []
        Flower.objects.all().delete()
        print('deleted')
        soup = cook_soup(FIRST_URL)
        instructions = soup.find('div', attrs={
            'class': 'plant_instructions_list'})
        flower_links = [link['href'] for link in instructions.find_all('a')]
        for link in flower_links:
            soup = cook_soup(urljoin(BASE_URL, link))
            type = 'TODO'
            name = soup.find('h1').text
            text_descriptions = [
                desc.text.replace('\xa0', ' ') for desc in soup.find(
                    'div', attrs={'class': 'text_block m4_mb'}).find_all('p')]
            image = soup.find(
                'div', attrs={'class': 'main_images'}).find('img')['data-src']
            image_url = urljoin(BASE_URL, image)
            response = requests.get(image_url)
            filename = f'{name.replace(" ","")}.jpg'
            # downloads = f'{
            # settings.BASE_DIR}/media/flowers/images/{filename}'
            # downloads = f'{settings.MEDIA_ROOT}/flowers/images/{filename}'
            downloads = f'{settings.MEDIA_ROOT}/flowers/images/{filename}'
            # downloads = f'{settings.MEDIA_ROOT}/flowers/images/{filename}'
            d1 = downloads.split('media/')[-1]
            with open(downloads, 'wb') as file:
                file.write(response.content)
            temperature = text_descriptions[1]
            light = text_descriptions[2]
            watering = text_descriptions[3] + text_descriptions[4]
            pot = text_descriptions[7]
            pet_friendly = 0
            newby = Flower(
                name=name,
                type=type,
                image=d1,
                temperature=temperature,
                light=light,
                watering=watering,
                pet_friendly=pet_friendly,
                pot=pot)
            if newby not in upload_list:
                upload_list.append(newby)
        Flower.objects.bulk_create(upload_list)
