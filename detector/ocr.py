import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = "/opt/homebrew/bin/tesseract"

def extract_text(image_file):
    image = Image.open(image_file)
    text = pytesseract.image_to_string(image)
    return text