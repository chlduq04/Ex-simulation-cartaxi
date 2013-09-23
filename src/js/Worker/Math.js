function wMath(){}
wMath.prototype = {
	Plus : function(){
		var result = 0;
		var length = arguments.length;
		for( var i = 0 ; i < length ; i++ ){
			result += arguments[i];
		}
		return result;
	},
	Multi : function(){
		var result = 1;
		var length = arguments.length;
		for( var i = 0 ; i < length ; i++ ){
			result *= arguments[i];
		}
		return result;
	}	
}
