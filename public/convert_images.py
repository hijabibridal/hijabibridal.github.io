import os
from PIL import Image

SOURCE_FOLDER = 'images' 
QUALITY = 80

def convert_and_cleanup():
    if not os.path.exists(SOURCE_FOLDER):
        print(f"ERROR: Could not find '{SOURCE_FOLDER}'")
        return

    print(f"Converting and cleaning up images in: {os.path.abspath(SOURCE_FOLDER)}")
    
    count = 0
    for root, dirs, files in os.walk(SOURCE_FOLDER):
        for file in files:
            file_lower = file.lower()
            
            # Target formats
            if file_lower.endswith(('.jpg', '.jpeg', '.png')):
                file_path = os.path.join(root, file)
                file_name_no_ext = os.path.splitext(file)[0]
                new_file_path = os.path.join(root, f"{file_name_no_ext}.webp")
                
                try:
                    with Image.open(file_path) as image:
                        # Convert to RGB to ensure compatibility and small size
                        rgb_im = image.convert('RGB')
                        rgb_im.save(new_file_path, 'webp', quality=QUALITY)
                    
                    # DELETE the original file
                    os.remove(file_path)
                    print(f"🧹 Converted & Removed: {file}")
                    count += 1
                except Exception as e:
                    print(f"❌ Failed to process {file}: {e}")

    print(f"\nSuccess! {count} images are now WebP and originals have been removed.")

if __name__ == "__main__":
    convert_and_cleanup()