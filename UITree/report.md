# 作业3报告

软73 沈冠霖 2017013569 shenguanlin1999@163.com

## 1.显示树形结构

显示树形结构我参考了[这篇文章](https://www.jb51.net/css/594436.html),思路是用ul-li的列表来显示树形结构,每个li列表包括左边的箭头图片和title文字.大致结构如下:

```html
	<ul>`
​		<li>
			<div><img src="箭头图片"></div>//这里的div我设置成inline了
			<span>标题</span>
		</li>
	</ul>
```

为了生成这个html,我使用了js里的dom属性,包括设置tag,class,id等,参考了[这篇文章](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024977411904). 具体操作就是递归遍历给定的树,把每个节点转化成列表的ul-li节点.

## 2.控制收起与展开

我的思路是用四个class: show_11,show_10,show_01,show_00,来代表一个li标签(也就是一个元素)的显示状态,含义如下:第一个0/1代表当前这个元素是否显示(1显示0隐藏),第二个0/1代表当前这个元素是否展开(1展开0收起).我在js中负责修改这四个class,而在css中控制这四个class对应的显示和隐藏关系.

### 2.1 JS中修改这四个class

我用的是这样一个核心性质:当且仅当某个节点的直接父亲节点显示并且展开,这个节点才显示(根节点除外,永远显示).因此,不论在构造函数还是响应按键的函数中,我都是递归进行修改的.

#### 2.2.1 构造函数

判断本节点的显示状态的逻辑如下: 

```javascript
  if (whether_show === true && input.tree.expand === true) {
    show_status = 'show_11'
    son_show_status = true
  } else if (whether_show === true) {
    show_status = 'show_10'
    son_show_status = false
  } else if (whether_show === false && input.tree.expand === true) {
    show_status = 'show_01'
    son_show_status = false
  } else {
    show_status = 'show_00'
    son_show_status = false
  }
```

show_status代表本节点的显示状态,whether_show是父亲传来的参数(也就是父亲的son_show_status),代表本个节点是否显示.input.tree.expand是这个节点是否展开,son_show_status代表子节点是否显示,当仅当本个节点显示并展开,子节点才显示.

更新完本节点的显示状态,应该利用得到的son_show_status来更新子节点的显示状态.

#### 2.2.2 控制收起与展开的函数

我写了一个onclick函数来控制收起与展开.具体逻辑如下:

在我展开一个节点时,我显示其所有子节点.如果某个子节点原先就是展开的,则把这个子节点也要重新展开.

在我收起一个节点时,我让其所有子节点也不显示.如果某个子节点原先展开,则让其所有子节点也变成不显示.

同时,还要有回调函数onclick().

具体代码如下:

```javascript
ChangeOneStatus(son_list[i], change_to_what)

      // 展开时,显示子节点原先就展开的
      if (change_to_what === true && son_list[i].className === 'show_11') {
        RecursiveChangeStatus(son_list[i], true)
      }

      // 收起时,收起子节点原先就展开的
      else if (change_to_what === false && son_list[i].className === 'show_01') {
        RecursiveChangeStatus(son_list[i], false)
      }
```

其中ChangeOneStatus函数是修改当前子节点(son_list[i])自身的显示状态的函数.change_to_what记录当前是展开(1)还是收起(0).

### 2.2 CSS中显示这四种状态

我参考了[这篇文章的做法](https://blog.csdn.net/weiyongliang_813/article/details/78946465),如果一个节点li不显示,则将其高度max-height调到0,并且设置为invisible.否则将其高度max-height调到一个非常大的数字10000,并且设置为visible.因为span是行显示方式,因此其高度不会变成10000,而是其实际显示高度.

## 3.动画

左侧箭头我使用了DataUrl技术进行显示,也就是[这个工具](https://dataurl.sveinbjorn.org/#dataurlmaker).但是这会造成js代码里设置图片url的代码过长.

我同时实现了展开和收起时表单和左侧箭头的动画.

展开和收起时的动画只需要在其css里加入transition语句就可以实现了.

`transition: max-height 2s, visibility 1s;`

左侧箭头则需要先transform进行旋转,然后给transform设置动画,语句如下:

```css
/*控制图标的旋转动画*/
li.show_11 > div > img, li.show_10 > div > img
{
    width: 23px;
    height: 23px;
    border-style: none;
    
    /*给旋转添加动画*/
    transition: all 0.5s;
}

/*收起模式*/
li.show_10 > div > img
{
    transform: none;
}

/*展开模式*/
li.show_11 > div > img
{
    transform: rotate(90deg);
}
```

## 4.总结和备注

整体的测试效果还算不错,达到了要求.

我的代码用ESlint自动修正过格式了,我的命名规则如下:函数用帕斯卡命名法(首字母全部大写),变量用下划线命名法.

感谢从业臻同学提供的资料