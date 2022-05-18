interface LabelledValue {
    label: string
}

function printLabel(labelledObj: LabelledValue){
    console.log('label')
    
}

let myObj = {
    size: 10,
    label: 'label'
}
printLabel(myObj)

// 可选属性
interface SquareConfig {
    color?:string;
    width?:number;
}
function creatSquare(config: SquareConfig): {color: string;area: number}{
    let newSquare = {
        color: 'white',
        area: 100
    }
    if(config.color){
        newSquare.color = config.color
    }
    if(config.width){
        newSquare.area = config.width * config.width
    }
    return newSquare
}

let mysQuare = creatSquare({color: 'black'})

// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = {x: 10,y:20}
p1.x=5

// readonly VS const
// 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 
// 做为变量使用的话用 const，若做为属性则使用readonly。

// 函数类型
interface SearchFunc{
    (source: string,subString: string): boolean
}
let mySearch = function(src,sub){
    let result = src.search(sub)
    return result > -1
}