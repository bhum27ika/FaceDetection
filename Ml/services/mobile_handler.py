import numpy as np
import cv2

def process_mobile_image(image_bytes):
    try:
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return None, "Invalid image format"

        return img, None

    except Exception as e:
        return None, str(e)