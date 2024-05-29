class Complex{
    constructor(real, imag){
      if(real===undefined){
        this.real=0
      }else{
        this.real = real
      }
      if(imag===undefined){
        this.imag=0
      }else{
        this.imag = imag
      }
    }

    magnitude(){
      return Math.sqrt(this.real*this.real+this.imag*this.imag);
    }

    angle(){
      return Math.atan2(this.imag, this.real)
    }

    equals(c2){
      return this.real==c2.real && this.imag == c2.imag
    }

    set(c){
      this.real = c.real
      this.imag = c.imag
    }
    
    string(){
      if(approx(this.imag)==0){
        return approx(this.real)
      }else if(approx(this.real)==0){
        return approx(this.imag)+"i"
      }else{
        return approx(this.real)+" + " + approx(this.imag)+"i"
      }
    }

}

function approx(x){
  return Math.round(1000000*x)/1000000
}

function log(c){
  var imag = c.angle()
  var real = Math.log(c.magnitude())
  return new Complex(real, imag)
}

function exp(c){
  var m = Math.exp(c.real)
  var imag = m*Math.sin(c.imag)
  var real = m*Math.cos(c.imag)
  return new Complex(real, imag)
}

function multiply(c1,c2){
  var real = c1.real*c2.real-c1.imag*c2.imag
  var imag = c1.real*c2.imag+c1.imag*c2.real
  return new Complex(real, imag)
}

function add(c1,c2){
  var real = c1.real + c2.real;
  var imag = c1.imag + c2.imag;
  return new Complex(real, imag)
}

