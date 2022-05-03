from PIL import Image, ImageDraw
from random import randint as rand
import sys

# usage: draw.py [# of imgs] [file name prefix]

prefix = ''.join([chr(rand(ord('a'),ord('z'))) for i in range(5)])
N = 5
if len(sys.argv) >= 2: 
	N = int(sys.argv[1])
if len(sys.argv) >= 3:
	prefix = sys.argv[-1]

def shade():
	return rand(160,230)

def circ(draw):
	x = rand(10,w//2-50)
	y = rand(10,h//2-50)
	draw.ellipse((x, y, x+rand(100,400), y+rand(100,400)), fill=(shade(), shade(), shade(), 80), outline=(0, 0, 0, 0))

for i in range(N):
	w,h = [rand(200,500) for _ in range(2)]
	img = Image.new('RGB', (w, h), (255, 255, 255))
	draw = ImageDraw.Draw(img, 'RGBA')
	circ(draw)
	circ(draw)
	circ(draw)
	# img.show()
	img.save(prefix + str(i) + ".png")
