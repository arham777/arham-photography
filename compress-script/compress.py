import os
from PIL import Image

def compress_images_in_folder(folder_path):
    # Allowed extensions
    valid_extensions = [".jpg", ".jpeg", ".png"]

    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        name, ext = os.path.splitext(filename)

        if ext.lower() in valid_extensions:
            try:
                img = Image.open(file_path)

                # RGB mein convert kar dete hain (to avoid issues with PNG/alpha)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")

                # Output file ka naam
                output_path = os.path.join(folder_path, f"{name}-final.jpg")

                # JPG ke liye compression
                img.save(output_path, "JPEG", optimize=True, quality=85)

                print(f"✅ Compressed: {filename} → {os.path.basename(output_path)}")

            except Exception as e:
                print(f"❌ Error compressing {filename}: {e}")


if __name__ == "__main__":
    folder = input("Enter folder path: ").strip()
    if os.path.isdir(folder):
        compress_images_in_folder(folder)
    else:
        print("⚠️ Invalid folder path!")
