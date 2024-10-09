from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from pyvirtualdisplay import Display
from urllib.parse import quote
from logging.handlers import RotatingFileHandler
import undetected_chromedriver as uc
import logging
import random
import time
import os


log_file_path = "/home/ubuntu/ticket-scraper/backend/logs/searchTicketone.log"

logging.basicConfig(
    level=logging.INFO,  # Set the logging level
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',  # Log message format
    handlers=[
        RotatingFileHandler(log_file_path, maxBytes=1024*1024, backupCount=3),  # 1MB file size, keep 5 backups
        logging.StreamHandler()  # Also print logs to stdout (console)
    ]
)

logger = logging.getLogger(__name__)



def get_random_user_agent():
    user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.89 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.88 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6040.113 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6116.77 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6151.44 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6204.58 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.6252.80 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:111.0) Gecko/20100101 Firefox/111.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6308.76 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6373.112 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6421.84 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6479.99 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6534.62 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:112.0) Gecko/20100101 Firefox/112.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:113.0) Gecko/20100101 Firefox/113.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6590.50 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6647.71 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6701.45 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.6754.33 Safari/537.36']
    return random.choice(user_agents)

def get_chrome_main_version():
    chrome_path = uc.find_chrome_executable()
    bare_version = os.popen(f"{chrome_path} --version").read().strip()
    main_version = bare_version.split()[1].split('.')[0]
    return int(main_version)  

def get_proxy():
    proxies = [
    "80.71.229.50:50100",
    "80.71.229.38:50100",
    "80.71.229.215:50100",
    "213.204.21.16:50100",
    "213.204.21.67:50100"]
    return random.choice(proxies)  

def get_search_results(search_term):
    display = None
    try:
        search_term = search_term.replace('+', ' ')
        logger.info('Start frontend searching: ' + search_term)

        display = Display(visible=0, size=(1280, 800))
        display.start()
        version_main = get_chrome_main_version()
        switchProxies = True 
        profile_path = os.path.expanduser("/home/ubuntu/ticket-scraper/backend/chrome-profile")

        chrome_options = uc.ChromeOptions()
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1280x800')
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        chrome_options.add_argument('--lang=en-US')
        chrome_options.add_argument(f'user-agent={get_random_user_agent()}') 

        proxy = 'noproxy'
        if switchProxies:
            proxy = get_proxy()
            chrome_options.add_argument(f'--proxy-server={proxy}')

        profile_path = os.path.expanduser(f"/home/ubuntu/ticket-scraper/backend/chrome-profile/{proxy}")
        chrome_options.add_argument(f'--user-data-dir={profile_path}') 
                
        driver = uc.Chrome(version_main=version_main, options=chrome_options, timeout=60)
        driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        driver.execute_script("""Object.defineProperty(navigator, 'deviceMemory', {get: () => 8});""")
        driver.execute_script("Object.defineProperty(navigator, 'hardwareConcurrency', {get: () => 4});")
        driver.execute_script("Object.defineProperty(navigator, 'platform', {get: () => 'Win32'});")
        

        search_term = quote(search_term).replace("%20", "+")
        driver.get("https://www.ticketone.it/search/?searchterm=" + search_term)

        time.sleep(3)

        html = driver.page_source
        
        driver.quit()
        display.stop()

        # Parse the HTML with BeautifulSoup
        soup = BeautifulSoup(html, 'html.parser')

        # Find elements with the class 'product-group-item'
        entry_headers = soup.find_all('product-group-item')[:9]

        if entry_headers:
            logger.info(f'Found {len(entry_headers)} results.' )
        else:
            logger.info('No results found')

        
        # List of events
        event_list = []

        # Iterate over each element and get their sub-elements
        for header in entry_headers:
            # Find the event title
            title_element = header.find(class_='event-listing-city')
            
            if title_element is None:
                continue  # Skip to the next iteration if no title is found
            
            title = title_element.text.strip()

            # Find the event link
            link_elements = header.find_all(id=lambda x: x and x.startswith('item-cta'))

            link = link_elements[0].get('href') if link_elements else None

            # Find the event image
            img_element = header.find(class_='listing-image')
            imgurl = img_element.get('data-src') if img_element else None
            if 'https://www.ticketone.it' not in imgurl:
                imgurl = 'https://www.ticketone.it' + imgurl


            # Add event details to the event list only if link and img are not None
            if link and imgurl:
                event_list.append({'title': title, 'img': imgurl, 'link': link.replace('/', '_')})

        return event_list
    
    except Exception as e:
        driver.quit()
        display.stop()
        error_message = str(e)  # Capture the error message
        return [{'title': error_message}]
    


def get_subsearch_results(event_url):
    display = None
    try:
     
        display = Display(visible=0, size=(1280, 800))
        display.start()

        version_main = get_chrome_main_version()
        switchProxies = True 

        chrome_options = uc.ChromeOptions()
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1280x800')
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        chrome_options.add_argument('--lang=en-US')
        chrome_options.add_argument(f'user-agent={get_random_user_agent()}')

        proxy = 'noproxy'
        if switchProxies:
            proxy = get_proxy()
            chrome_options.add_argument(f'--proxy-server={proxy}')

        profile_path = os.path.expanduser(f"/home/ubuntu/ticket-scraper/backend/chrome-profile/{proxy}")
        chrome_options.add_argument(f'--user-data-dir={profile_path}') 

                
        driver = uc.Chrome(version_main=version_main, options=chrome_options, timeout=60)


        # Perform the search on Ticketone
        driver.get('https://www.ticketone.it' + quote(event_url.replace('_', '/')))

        # Wait for the elements to be present on the page, indicating that the page has loaded
        time.sleep(3)

        # Get the page HTML
        html = driver.page_source

        driver.quit()
        display.stop()

        # Parse the HTML with BeautifulSoup
        soup = BeautifulSoup(html, 'html.parser')

        # Find elements with the class 'event-listing-item'
        entry_headers = soup.find_all(class_='event-listing-item')

        # List of sub-events
        subevent_list = []

        # Iterate over each element and get their sub-elements
        for header in entry_headers:
            
            # Find the event date and time

            date_time = (header.find(class_='event-listing-date').text.strip() + ' ' +
                         header.find(class_='event-listing-month').text.strip() + ' ' +
                         header.find(class_='event-listing-time').text.strip())
            
            date_element = header.find('time', class_='event-listing-date')
            iso_datetime = date_element.get('datetime')
            

            # Find the event location
            city = header.find(class_='event-listing-city').text.strip()
            location = (city + ' - ' +
                        header.find(class_='event-listing-venue').text.strip() + ' - ' +
                        header.find(class_='event-listing-event').text.strip()
                        )

            # Find the event link
            link_element = header.find('a', class_='btn')
            link = link_element['href'] if link_element else None

            # Add sub-event details to the sub-event list only if the link is not None
            if link:
                subevent_list.append(
                    {'iso_datetime': iso_datetime, 
                     'date_time': date_time, 
                     'location': location, 
                     'link': link,
                     'city': city})  # modificare questo, inviare tutti i dati che serviranno poi per aggiungerlo a db come tracked ticket se l'user conferma

        return subevent_list
    
    except Exception as e:
        error_message = str(e)  # Capture the error message
        return [{'title': error_message}]

    