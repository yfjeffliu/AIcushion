# -*- coding: utf-8 -*- 
import matplotlib.pyplot as plt
import numpy as np
import pymysql
import collections
import sys
import json
from matplotlib import font_manager
my_font = font_manager.FontProperties(fname="./OtsutomeFont.ttf")
data = []
data.append(sys.argv[1])

#print(data)                         # data = ['5,5,2,3,1,5,9,2,6']
#print(data[0])                      # data[0] = '5,5,2,3,1,5,9,2,6' datatype:string
#print(data[0].split(','))           # split() 可以將string轉成list, 並且告訴他string的分隔是以','
#print(type(data[0]))                # 但此時list裡面的每個值都還是string所以還要轉成int

data = data[0].split(',')
for i in range(len(data)):
    data[i] = int(data[i])

labels = [1,2,3,4,5,6,7,8,9]
labels2 = ['正坐','斜躺','重心偏左','重心偏右','翹腳','盤腿','駝背','h','i']
print(data)
print(labels)
print(collections.Counter(data))

#把收集到的data整理成可以畫圖的result
result=np.zeros((2,len(labels)))
result[0]=labels
for i in range(len(labels)):
    result[1][i]=collections.Counter(data)[labels[i]]
print(result)

# plt.pie(result[1] , labels = labels,autopct='%1.1f%%')
# plt.savefig("./dist/pie.png")

'''
result_diszero=np.zeros((2,len(labels)))
t=0
for i in range(0,len(labels)):
    if result[1][i] != 0:
        result_diszero[1][t]=collections.Counter(data)[labels[i]]
        result_diszero[0][t]=labels[i]
        t=t+1
print(result_diszero)

result_nonzero=np.zeros((2,t-1))
for i in range (0,t-1):
    result_nonzero[0][i]=result_diszero[0][i]
    result_nonzero[1][i]=result_diszero[1][i]
print(result_nonzero)
'''

# 優化版
count_nonzero = 0
for i in range(0,len(labels)):
    if result[1][i] != 0:
        count_nonzero = count_nonzero +1

result_nonzero=np.zeros((2,count_nonzero))
result_label = []
t=0
for i in range(0,len(labels)):
    if result[1][i] != 0:
        result_nonzero[1][t]=collections.Counter(data)[labels[i]]
        result_nonzero[0][t]=labels[i]
        result_label.append(labels2[i])
        t =t+1
print(result_nonzero)

#plot
patches,l_text,p_text = plt.pie(result_nonzero[1], labels=result_label, autopct='%1.1f%%')
for t in l_text:
    t.set_fontproperties(my_font) # 把每個文字設成中文字型
    t.set_size(16)        
plt.savefig("./front/pie_nonzero.png")

