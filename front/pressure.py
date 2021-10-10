import matplotlib.pyplot as plt
import numpy as np
import sys

''' Get the argument from app.js'''
point_pressure = []
point_pressure.append(sys.argv[1])
''' Seperate the argument into nine point pressure value '''
point_pressure = point_pressure[0].split(',')
for i in range(len(point_pressure)):
    point_pressure[i] = int(point_pressure[i])
#print(point_pressure)
labels = ['未坐下','正坐','斜躺','重心偏左','重心偏右','翹腳','盤腿','駝背']

'''Coordinate'''
x=np.array([0,1,2,3,4])
y=np.array([0,1,2,3,4])

test=np.array(
        [
        [0,0,0,0,0],
        [0,point_pressure[6],point_pressure[7],point_pressure[8],0],
        [0,point_pressure[3],point_pressure[4],point_pressure[5],0],
        [0,point_pressure[0],point_pressure[1],point_pressure[2],0],
        [0,0,0,0,0]]
        )

#print(test)
from matplotlib import font_manager
my_font = font_manager.FontProperties(fname="./OtsutomeFont.ttf")

plt.contourf(x, y, test)
plt.title(labels[point_pressure[9]],fontsize = 30,fontproperties = my_font)
plt.savefig("./front/imager.png")

