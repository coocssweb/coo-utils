/**
 * for：微信小程序富文本解析，html字符串 => tree的json
 * 由于微信小程序的rich-text，虽然直接用html字符串直接赋值。
 * 但是它的原理还是需要解析html字符串 => node树。这个是一个比较耗性能的。
 * 因此，可以把html => node树放在服务端（入数据库前的操作）。
 * 这是基于js写的代码，所以只能用在node
 * Created by 王佳欣 on 2018/11/4.
 */
export default (content) => {
    const regexUtil = {
        tagStart: /^<([a-z0-9A-Z_]*)[^>]*>/,                                        // 开始标签
        tagEnd: /^<\/[^>]*>/,                                                       // 结束标签
        attr: /[a-zA-Z_:][-a-zA-Z0-9_:.]*\s*=\s*"[^"]*"/g,                          // 属性&属性值
        text: /^([^<]*)/,                                                           // 文本
        br: /[\r\n]/ig,                                                             // 换行
        null: /[>]\s*[<]/ig,                                                        // 两个标签间的间隙
        quote: /"*/g,                                                               // 引号"
    };

    let depth = 0;                                                                  // 当前深度
    let tree = [];                                                                  // 数
    let nodes = [];                                                                 // 临时值，用于插入的时候递归，当前深度的节点树
    let charIndex = -1;                                                             // 临时值，用于记录字符串indexOf
    let match,                                                                      // 标签\值 正则匹配
        attrMatch,                                                                  // 属性正则匹配
        attrName2Value,                                                             // 属性、属性值数组
        attrs;                                                                      // 所有属性数组

    // 格式化内容，移除换行，移除标签间的的空字符
    content = content.replace(regexUtil.br, '');
    content = content.replace(regexUtil.null, '><');

    // 插入node到指定层级
    function insertNode(node, nodeDepth) {
        nodes = tree;
        while (nodeDepth) {
            if (!nodes[nodes.length - 1].children) {
                nodes[nodes.length - 1].children = [];
            }
            nodes = nodes[nodes.length - 1].children;
            nodeDepth--;
        }

        nodes.push(node);
    }

    while (content) {
        // 备注
        if (content.indexOf('<!--') === 0) {
            charIndex = content.indexOf('-->');

            if (charIndex >= 0) {
                content = content.substring(charIndex + 3);
            }

            // 结束标签
        } else if (content.indexOf('</') === 0) {
            match = content.match(regexUtil.tagEnd);
            if (match) {
                content = content.substring(match[0].length);
                depth--;
            }

            // 开始标签
        } else if (content.indexOf('<') === 0) {
            match = content.match(regexUtil.tagStart);
            if (match) {
                content = content.substring(match[0].length);

                // 属性匹配
                attrMatch = match[0].match(regexUtil.attr);
                attrs = {};
                attrMatch && attrMatch.map((item) => {
                    attrName2Value = item.split('=');
                    attrs[attrName2Value[0].trim()] = attrName2Value[1].replace(regexUtil.quote, "");
                });

                insertNode({
                    name: match[1],
                    attrs
                }, depth);

                // 非单标签
                if (match[0].indexOf('/') === -1) {
                    depth++;
                }
            }

            // 文本内容
        } else {
            match = content.match(regexUtil.text);
            if (match) {
                content = content.substring(match[0].length);
                insertNode({
                    type: 'text',
                    text: match[0]
                }, depth);
            }
        }
    }

    return tree;
};
