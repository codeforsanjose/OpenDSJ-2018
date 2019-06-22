from PIL import Image
from wand.image import Image as wi
import pytesseract
import io

p = 'data/general1162018associationofretiredsanjosepoliceofficersandfirefighterspoliticalactioncommitteegeneralpurposesupportballotmeasure/PdfHandler (8).pdf'
pdfStore = wi(filename=p, resolution=300)
image = pdfStore.convert('png')

imageBlobs = []

for img in image.sequence:
    imgPage = wi(image=img)
    imageBlobs.append(imgPage.make_blob('jpeg'))

extract = []

for imgBlob in imageBlobs:
    image = Image.open(io.BytesIO(imgBlob))
    text = pytesseract.image_to_string(image, lang = 'eng')
    extract.append(text)

for pages in extract:
    print(pages)
