---
title: 有界DFS解决八数码问题
date: 2020-11-06 10:32:23
tags: algorithm
---

##	一、问题概述

九宫格中有 0 到 8 共9个数字，给定一个初始状态，需要得到目标状态，每次操作只能交换0和其周围的数字。

本题中初始状态为 280163754，目标状态为 123804765，即如下图所示

![img](https://s1.ax1x.com/2020/11/06/BfPuUH.png)

##	二、相关概念

树：节点和节点由边连接成的不含回路的结构

深度优先搜索：遍历一棵树时优先扩展深度

有界深度优先搜索：扩展深度至某一值后不再继续向下扩展，而是返回

##	三、伪代码

```txt
dfs(root,depth):
	 if endflag 
	 	end
	 root.exists = true
	 if root = endnode
	 	endflag = true
	 	end
	 if depth = maxdepth
	 	end
	 for node in root.childs
	 	if node.exists
	 		dfs(node,depth+1)
```

##	四、实现

###	1. 需要实现的东西

地图的存储结构、node.exists、node.childs、dfs函数

###	2. 地图表示的选择

方案一：{ int[9], int exists } 

方案二：int

方案一在实现的过程中，需要写自定义类、写整数构造函数、数组构造函数、拷贝构造函数、重载==、!=、<、<<等运算符，非常容易写炸(实际就是写炸了)，虽然有可扩展地图大小的优点，但是仍然不予考虑。

方案二用一个 int 表示地图，int 的范围在21亿，10位数，因此恰好用每一个十进制位表示对应位置上的数字。int 自带赋值和比较运算符，需要重载<<时直接写函数即可，非常方便。

###	3.具体实现

<!--more-->

####	地图

```c++
int beginNumber = 280163754, //homework 280163754, sample 283104765
    endNumber = 123804765;
```

####	exists

```c++
map<int, bool> exists;
```

如果使用自定义类作为 map 的 key 需要重载 < 运算符

####	childs

```c++
vector<int> nxtDirection(int n)
{
    vector<int> c;
    for (int i = MAPSIZE - 1; i >= 0; i--)
    {
        if (n % 10 == 0)
        {
            for (size_t j = 0; j < 4; j++)
            {
                int tempNumber = i + allDirection[j];
                if (tempNumber < MAPSIZE && tempNumber >= 0 && isValidDirection(i, allDirection[j]))
                    c.push_back(allDirection[j]);
            }
            return c;
        }
        n /= 10;
    }
    return c;
};
```

```c++
bool isValidDirection(int i, int k)
{
    switch (i)
    {
    case 0:
        if (k == 1 || k == 3)
            return true;
        break;
    case 1:
        if (k == -1 || k == 1 || k == 3)
            return true;
        break;
    case 2:
        if (k == -1 || k == 3)
            return true;
        break;
    case 3:
        if (k == 1 || k == 3 || k == -3)
            return true;
        break;
    case 4:
        if (k == 1 || k == 3 || k == -1 || k == -3)
            return true;
        break;
    case 5:
        if (k == -1 || k == 3 || k == -3)
            return true;
        break;
    case 6:
        if (k == 1 || k == -3)
            return true;
        break;
    case 7:
        if (k == 1 || k == -3 || k == -1)
            return true;
        break;
    case 8:
        if (k == -1 || k == -3)
            return true;
        break;
    }
    return false;
}
```

```c++
int nxtMap(int m, int k)
{
    int t1[MAPSIZE], b = 0, t;
    for (int i = 8; i >= 0; i--)
    {
        t1[i] = m % 10;
        if (t1[i] == 0)
            b = i;
        m /= 10;
    }
    t = t1[b];
    t1[b] = t1[b + k];
    t1[b + k] = t;
    int mm = t1[0];
    for (int i = 1; i < MAPSIZE; i++)
    {
        mm = mm * 10 + t1[i];
    }
    return mm;
}
```

####	dfs

```c++
void dfs(int m, int layer)
{
    if (over)
        return;
    if (showStep)
    {
        printf("\ttotal: %5d\tlayer: %4d\n", (int)exists.size(), layer);
        showMap(m);
    }
    exists[m] = true;
    layers[layer].push_back(m);
    if (m == endNumber)
    {
        if (showStep)
            puts("OK");
        over = (int)exists.size();
    }
    if (layer == maxDepth || m == endNumber)
        return;
    vector<int> c = nxtDirection(m);
    for (auto i : c)
    {
        auto tempMap = nxtMap(m, i);
        if (!exists[tempMap])
            dfs(tempMap, layer + 1);
    }
}
```

####	其他

定义最大深度、四个方向常量数组、地图大小(fake)、结束标志

适当的地方加输出查看搜索步骤以及提示信息

##	五、效果

![img](https://s1.ax1x.com/2020/11/06/BWXfPK.png)

修改搜索方向和最大深度后需要的步数：

![img](https://s1.ax1x.com/2020/11/06/BWjlIx.jpg)

##	六、代码地址

https://paste.ubuntu.com/p/n66xkGBB9n/