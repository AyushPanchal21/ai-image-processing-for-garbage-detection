from ultralytics import YOLO

model = YOLO("yolov8n.pt")

TRASH_CLASSES = {
    "bottle", "cup", "can", "plastic", "paper", "trash"
}  

def count_trash(image_path):
    result = model(image_path)
    count = 0
    for r in result:
        for box in r.boxes:
            label = r.names[int(box.cls)]
            if label in TRASH_CLASSES:
                count += 1
    return count