Function.prototype.myapply = function( context ){
	if(typeof this !== 'function'){
		throw new Error('is not function')
	}
	
	context = !context ? window : typeof context === 'object' ? context : {}
	context.fn = this
	const args = [...arguments][1] ? [...arguments][1] : []
	const result = context.fn(...args)
	
	delete context.fn
	
	return result
}

function say(name, age){
	console.log(name,age)
	return {
		name,
		age
	}
}

// say.myapply(window,['zhangsan', 20])

const o = {
	name: 'zhangsan',
	age: 20,
	say: function(a,b){
		console.log(this,this.name,this.age)
		return {
			a,
			b
		}
	}
	
}

console.log(o.say.myapply({name: 'lisi',age:40}, ['a', 'b']))