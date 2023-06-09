from bs4 import BeautifulSoup
from selenium import webdriver
import json

url = "https://parade.com/971665/marynliles/pregnancy-quotes/"

# Create a new Chrome session
browser = webdriver.Chrome()

# Load the webpage
browser.get(url)

# Get the HTML of the page and close the browser
html = browser.page_source
browser.quit()

# Create a BeautifulSoup object and specify the parser
soup = BeautifulSoup(html, 'html.parser')

# Get all the p tags
p_tags = soup.find_all('p')

raw_quotes = []

# Get the text from each p tag and strip surrounding whitespace
for p in p_tags:
    quote_text = p.get_text(separator=" ", strip=True)
    raw_quotes.append(quote_text)

# Print the quotes
formatted_quotes = raw_quotes[4:]

json_data = json.dumps(formatted_quotes)

with open('quotes.json', 'w') as json_file:
    json_file.write(json_data)




