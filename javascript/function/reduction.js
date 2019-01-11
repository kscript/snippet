/**
 * 多维数组的展开与筛选
 * @func
 * @param {object|array} item 要展开的元素
 * @param {string=} son 子元素的key(当类型不为string和undefined时, 数组不会被递归展开)
 * @param {function=} filter 过滤函数
 * @return array
 * exmaple
  let list = [{
    id: 1,
    children: [
      1,
      {
        id: 11,
        index: 1,
        children: [
          {
            id: 111,
            index: 2,
            children: [
              {
                id: 1111,
                index: 3,
                children: null
              }
            ]
          }
        ]
      },
      {
        id: 12,
        children: [
          {
            id: 121
          },
          {
            id: 122
          }
        ]
      }
    ]
  },
  {
    id: 2,
    children: [
      {
        id: 21,
        children: [
          {
            id: 211,
            children: [
              {
                id: 2111,
              }
            ]
          }
        ]
      },
      {
        id: 22,
        children: [
          {
            id: 221
          },
          {
            id: 222
          }
        ]
      }
    ]
  }];
 console.log(reduction(list))
 console.log(reduction(list, 'children',item => {
    // 这里需要是数组
    return item.index ? [{
      index: item.index
    }] : [];
  }));
 */
function reduction(item, son, filter) {
  var deep = true;
  if (!/string|undefined/.test(typeof son)) {
    deep = false;
  } else {
    son = son || 'children';
  }
  filter = filter instanceof Function ? filter : ele => {
    return [ele]
  };
  // 如果当前元素是一个对象
	if(typeof item === 'object'){
    // 如果当前元素是数组, 则递归并降维
    if(Array.isArray(item)){
       return [].concat.apply([], item.map(item => reduction(item, son, filter)))
    }
    // 如果当前元素有子结构, 且是数组
    if(deep && Array.isArray(item[son])){
      // 筛选当前元素 并与 子元素的降维结果 连接
      return (filter
              ? filter(item)
              // 没有筛选器时, 保留当前元素? []
              : [item]
          ).concat(
        reduction(item[son], son, filter)
      );
    } 
    // 筛选当前元素中我们需要的属性
    return (filter && filter(item)) || [];
	}
  // 以上条件不成立, 直接返回
  return arguments.length > 0 ? [item] : [];
}
