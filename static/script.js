function eqEnter(){
  var d = document.getElementById("eq")
  var equation = d.value;
  varnames = []
  for(var i=0; i<equation.length; i++){
    var char = equation[i]
    
    if("+-ljpei#0123456789\n ".indexOf(char) == -1){
      //triggers if char is not a registered character
      if(varnames.indexOf(char)==-1){
        //triggers if variable is not yet used
        varnames.push(char)
      }
    }
  }
  createVariableFields(varnames);
  eqEval();
}

function eqEval(){
  //load the equation
  console.log("Evaluating ")
  var d = document.getElementById("eq")
  var equation = d.value;
  stack = []
  for(var i=0; i<equation.length; i++){
    var char = equation[i]
    if("+-ljpei#0123456789\n ".indexOf(char) == -1){
      //if char is a variable, push onto stack
      varval = parseFloat(document.getElementById("var"+char).value)
      stack.push(new Complex(varval))
    }else{
      //command section
      //operators
      if(char == "+"){
        var c1 = stack.pop()
        var c2 = stack.pop()
        stack.push(add(c1, c2))
      }
      if(char == "-"){
        var c1 = stack.pop()
        var c2 = stack.pop()
        c1.real = -c1.real
        c1.imag = -c1.imag
        stack.push(add(c1, c2))
      }
      if(char == "l"){
        var c = stack.pop()
        stack.push(log(c))
      }
      if(char == "j"){
        var c = stack.pop()
        stack.push(exp(c))
      }
      //constants
      if(char == "e"){
        stack.push(new Complex(Math.E))
      }
      if(char == "p"){
        stack.push(new Complex(Math.PI))
      }
      if(char == "i"){
        stack.push(new Complex(0,1))
      }
      //shorthandnumber entry
      if("0123456789".indexOf(char)!=-1){
        stack.push(new Complex(parseInt(char)))
      }
      //debug character #
      if(char == "#"){
        var c = stack.pop()
        console.log(c.string())
        stack.push(c)
      }
    }

  }
  var o = stack.pop()
  output(o.string())
}

function createVariableFields(varnames){
  document.getElementById("vardiv").innerHTML=""
  for(var i=0; i<varnames.length; i++){
    createVariableField(varnames[i])
  }
}

function createVariableField(varname){
  var text = "<p>"+varname+": "
  text+="<input type=\"text\" id=\"var" + varname+"\" oninput=\"varChange('"+varname+"')\" value=0></input></p>"
  document.getElementById("vardiv").innerHTML += text
}

function varChange(varname){
  var value = document.getElementById("var"+varname).value
  //console.log(varname+" now has a value of "+value); //debug line
  eqEval();
}

function output(val){
  var d=document.getElementById("output")
  d.innerHTML = val
}

eqEnter()
eqEval()