from fastapi import FastAPI
from app.detector import count_trash
from app.similarity import scene_similarity
import os
import requests

app = FastAPI()

os.makedirs("uploads/before", exist_ok=True)
os.makedirs("uploads/after", exist_ok=True)


def download_image(url, folder):
    filename = url.split("/")[-1].split("?")[0]
    filepath = os.path.join(folder, filename)

    response = requests.get(url)
    if response.status_code != 200:
        raise Exception("Failed to download image")

    with open(filepath, "wb") as f:
        f.write(response.content)

    return filepath


@app.post("/verify")
def verify(data: dict):
    try:
        before_url = data.get("beforeUrl")
        after_url = data.get("afterUrl")

        if not before_url or not after_url:
            return {"valid": False, "reason": "Missing URLs"}

        beforepath = download_image(before_url, "uploads/before")
        afterpath = download_image(after_url, "uploads/after")

        similarity = scene_similarity(beforepath, afterpath)
        if similarity < 0.6:
            return {"valid": False, "reason": "different locations"}

        before_trash = count_trash(beforepath)
        after_trash = count_trash(afterpath)

        return {
            "valid": before_trash > after_trash,
            "before_trash": before_trash,
            "after_trash": after_trash,
            "points": max((before_trash - after_trash) * 10, 0)
        }

    except Exception as e:
        return {"valid": False, "error": str(e)}
