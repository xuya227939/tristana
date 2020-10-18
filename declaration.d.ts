// 定义所有的less 文件，相对引用
declare module '*.less' {
    const content: any;
    export default content;
}

// 定义所有的css 文件，相对引用
declare module '*.css' {
    const content: any;
    export default content;
}

// 定义window变量
interface Window{
    r: string[]
}
