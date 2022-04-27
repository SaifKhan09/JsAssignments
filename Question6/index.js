class Q {
    constructor(opt) {
      opt = opt || {white: [0,3], black: [7, 3]};
      Object.assign(this, opt);
      if (this.white[0] === this.black[0] &&
          this.white[1] === this.black[1])
        throw 'Queens cannot share the same space';
      if (this.white[0] > 7 || this.white[0] < 0 || this.white[1] > 7 || this.white[1] < 0 || this.black[0] > 7 || this.black[0] < 0 || this.black [1] > 7 || this.black[1] < 0 )
      throw 'Queens are not on the Board'
    }
    canAttack() {
      let dx = this.black[0] - this.white[0],dy = this.black[1] - this.white[1];
      return (!(dx*dy) || Math.abs(dy/dx) === 1)
    }
}

function compute(){
    let obj = {
        white : [0,0],
        black : [7,6]
    } 
    let check = new Q (obj);
    let ans = check.canAttack();
    console.log(ans);
}
