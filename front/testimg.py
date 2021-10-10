import matplotlib.pyplot as plt
import numpy as np

x=np.array([0,1,2,3,4])
y=np.array([0,1,2,3,4])

test=np.array(
        [
        [0,0,0,0,0],
        [0,0,0,30,0],
        [0,50,60,20,0],
        [0,90,20,20,0],
        [0,0,0,0,0]]
        )

print(test)

plt.contourf(x, y, test)
plt.savefig("./front/imager.png")
