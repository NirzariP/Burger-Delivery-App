from PIL import Image
import os

input_folder = "images_original"
output_folder = "images"

for filename in os.listdir(input_folder):
    img = Image.open(os.path.join(input_folder, filename))
    img.thumbnail((500, 500))  # resizes so neither dimension exceeds 500px
    img.save(os.path.join(output_folder, filename), quality=80, optimize=True)