import fitz  # PyMuPDF
import io
from PIL import Image
import os

pdf_path = r"C:\Users\hp\Downloads\LIGHTEMOTION CATALOGUE 2025-26_compressed.pdf"
output_dir = r"C:\Users\hp\OneDrive\Desktop\lightemotion\public\images\projects"

os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

page_num = 5 
page = doc[page_num]
image_list = page.get_images(full=True)

print(f"Found {len(image_list)} images on page {page_num + 1}")

if len(image_list) == 0:
    page_num = 6
    page = doc[page_num]
    image_list = page.get_images(full=True)
    print(f"Found {len(image_list)} images on page {page_num + 1}")

def crop_to_4_3(img):
    width, height = img.size
    target_ratio = 4.0 / 3.0
    current_ratio = width / height
    
    if current_ratio > target_ratio:
        new_width = int(target_ratio * height)
        left = (width - new_width) / 2
        right = left + new_width
        img = img.crop((left, 0, right, height))
    elif current_ratio < target_ratio:
        new_height = int(width / target_ratio)
        top = (height - new_height) / 2
        bottom = top + new_height
        img = img.crop((0, top, width, bottom))
    return img

for img_index, img_info in enumerate(image_list):
    xref = img_info[0]
    base_image = doc.extract_image(xref)
    image_bytes = base_image["image"]
    
    img = Image.open(io.BytesIO(image_bytes))
    
    if img.mode in ("RGBA", "P", "CMYK"):
        img = img.convert("RGB")
        
    # Crop to 4:3
    img = crop_to_4_3(img)
    
    # Resize to exactly 640x480
    img = img.resize((640, 480), Image.Resampling.LANCZOS)
    
    filename = f"project_{img_index + 1}.webp"
    filepath = os.path.join(output_dir, filename)
    
    img.save(filepath, "webp", quality=85, method=6)
    
    size_kb = os.path.getsize(filepath) / 1024
    print(f"Saved {filename} ({img.size[0]}x{img.size[1]}) - {size_kb:.1f} KB")

print("Resize complete!")
