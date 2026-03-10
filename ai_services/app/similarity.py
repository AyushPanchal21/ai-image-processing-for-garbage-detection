
import cv2
from skimage.metrics import structural_similarity as ssim

def scene_similarity(img1_path,img2_path):
    img1 = cv2.imread(img1_path)
    img2 = cv2.imread(img2_path)

    g1 = cv2.cvtColor(img1,cv2.COLOR_BGR2GRAY)
    g2 = cv2.cvtColor(img2,cv2.COLOR_BGR2GRAY)

    score,_ = ssim(g1,g2,full=True)
    return score

