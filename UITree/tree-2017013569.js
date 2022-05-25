// 修改一个结点的显示状态函数
function ChangeOneStatus (current_node, change_to_what) {
  // 展开时,把子节点不显示的变为显示
  if (change_to_what === true) {
    if (current_node.className === 'show_01') {
      current_node.className = 'show_11'
    } else if (current_node.className === 'show_00') {
      current_node.className = 'show_10'
    }
  }

  // 收起时,把子节点显示的变为不显示
  else {
    if (current_node.className === 'show_11') {
      current_node.className = 'show_01'
    } else if (current_node.className === 'show_10') {
      current_node.className = 'show_00'
    }
  }
}



// 递归修改显示状态函数
function RecursiveChangeStatus (the_root, change_to_what) {
  let ul_find_list = the_root.children
  let the_ul
  for (let i = 0; i < ul_find_list.length; i++) {
    if (ul_find_list[i].tagName === 'UL') {
      the_ul = ul_find_list[i]
      break
    }
  }

  // 让全部子节点显示或者收起
  if (the_ul === undefined) return
  ChangeOneStatus(the_ul, change_to_what)
  let son_list = the_ul.children
  for (let i = 0; i < son_list.length; i++) {
    if (son_list[i].tagName === 'LI') {
      ChangeOneStatus(son_list[i], change_to_what)

      // 展开时,显示子节点原先就展开的
      if (change_to_what === true && son_list[i].className === 'show_11') {
        RecursiveChangeStatus(son_list[i], true)
      }

      // 收起时,收起子节点原先就展开的
      else if (change_to_what === false && son_list[i].className === 'show_01') {
        RecursiveChangeStatus(son_list[i], false)
      }
    }
  }
}



// 递归建树
function RecursiveBuildTree (the_root, input, whether_show) {
  // 修改自身和儿子显示状态
  // 第一个数字代表是否显示,第二个数字代表是否展开
  let show_status
  let son_show_status
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
  // 设置自身的<li>标签
  let the_node = document.createElement('li')
  the_node.className = show_status
  the_node.id = input.tree.id

  if (input.tree.children.length > 0) {
    let the_icon = document.createElement('div')
    let real_icon = document.createElement('img')

    // dataURL的图片链接,有些长
    real_icon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAhnpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjadY7RDcQwCEP/M0VHAEMgjHOqWuk2uPELSqN83fswloUst+v3vdtRMKFp92FhRomGBj5pBk2EiEFcN3XyXuF02HETTGMxnHQ/6psvutiw29Xdup12IttxCQSpVVStVDNil7CvRX/yteIBQIgsG+SWBPMAAAoCaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjMiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIyMyIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMyIKICAgdGlmZjpJbWFnZUhlaWdodD0iMjMiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgwG62sAAAAEc0JJVAgICAh8CGSIAAAAuElEQVRIx2P8////fwYaASYGGoJRw0eq4U9+MTDMuP2bNoZ/PXuJYVdDG8PkM5+ob7i6pQpDkwcLw/7+LuIt+E8S+Pr/8qKW/4FR1f8nnf5IUDWJhkMs2DS35X9gVMP/vVfxW0Byarn/i4thyUNNBjOudww2ok+pFyz3fv7/H1a3+39jSt7/n69OUC9YHpNoMEmG3zt29n8PCQb/////PyPx5fk3BoavdxgYuPWIjh/G0cpi1HCiAQAG5N8MQCViXwAAAABJRU5ErkJggg=='
    the_icon.appendChild(real_icon)
    the_node.appendChild(the_icon)
  }

  // 设置箭头图片
  let the_text = document.createElement('span')
  if (input.tree.children.length > 0) {
    the_text.innerText = input.tree.title
  } else {
    let new_text = '      ' + input.tree.title
    the_text.innerText = new_text
  }
  the_node.appendChild(the_text)

  // 设置儿子的<ui>标签
  if (input.tree.children.length > 0) {
    let son_node = document.createElement('ul')
    son_node.className = show_status
    the_node.appendChild(son_node)

    // 递归建树
    for (let i = 0; i < input.tree.children.length; i++) {
      RecursiveBuildTree(son_node, {
        'tree': input.tree.children[i],
        'container': input.container,
        'clicked': input.clicked
      }, son_show_status)
    }
  }
  the_root.appendChild(the_node)

  // 点击字符的控制函数
  the_text.onclick = function () {
    if (the_node.className === 'show_10') {
      the_node.className = 'show_11'
      RecursiveChangeStatus(the_node, true)
    } else if (the_node.className === 'show_11') {
      the_node.className = 'show_10'
      RecursiveChangeStatus(the_node, false)
    }
    input.clicked(the_node.id)
  }
}

class Tree {
  constructor (input) {
    let main_place = document.querySelector(input.container)
    this.html = document.createElement('ul')
    RecursiveBuildTree(this.html, input, true)
    main_place.appendChild(this.html)
  }
}
