// 布尔类型
let isDone: boolean = false

// 数字
let num: number = 2

// 字符串
let str: string = 'lilei'

// 数组
let arr1: number[] = [1,2,3]
let arr2: Array<number> = [4,5,6] //数组泛型

// 元组 元组类型允许表示一个已知元素数量和类型的数组，各元素类型不必相同
let x: [string,number]
x = ['hanmeimei', 20]

// 枚举
enum Color { Red = 1, Green, Blue} //默认从1开始为元素编号，也可以手动指定成员的值
let c: Color = Color.Green
console.log(Color)
// 枚举类型提供一个便利是可以由枚举的值得到它的名字
let colorName:string = Color[2] //Green

// Any
let notSure: any = 4
notSure = 'notSure'
let list:any[] = [false,1,'hello']

// Void void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void
function warnUser():void{
    console.log('void')
}

// Null Undefined
let u: undefined = undefined
let n: null = null

// Never 不常用

// Object 非原始类型
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error

// 类型断言 有两种形式
// 尖括号
let someValue: any = 'hello'
let strLen: number = (<string>someValue).length
// 另一个为as
let strLen2: number = (someValue as string).length
// TypeScript里使用JSX时，只有 as语法断言是被允许的。






