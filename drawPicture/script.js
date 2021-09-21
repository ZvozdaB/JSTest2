function addToStr(str, iteral , symbol){
    for (let j = 0; j < iteral; j++) {
        str += symbol;
    }
    return str
}

function drawPyramid(n){
    let nLastString = (n*2)-1;
    let nGap = Math.floor(nLastString/2);
    let piramid = ""

    for(let i = 0; i < n; i++){
        let str = "";

        str = addToStr(str,nGap," ");
        str = addToStr(str, (i * 2 + 1), "*");
        
        piramid += str + "\n";
        nGap--;
    }
    return piramid;
}

function drawRomb(n) {
    let nLastString = (n * 2) - 1;
    let nGap = Math.ceil(nLastString / 2);
    let romb = ["*"];
    let romb2 = [];

    romb[0] = addToStr(romb[0], nLastString + 3, "*")
    
    for (let i = 0; i < n; i++) {
        let str = "*";

        str = addToStr(str,nGap," ");
        str = addToStr(str, (i * 2 + 1), "*");
        str = addToStr(str, nGap, " ");

        nGap--;
        romb.push(str + "*");
    }
    
    for(let i = 2; i <= romb.length; i++){
        romb2.push(romb[romb.length - i ])
    }
    romb = [...romb , ...romb2]
    return romb.join('\n');
}

function drawDiamont(n){
    let nGap = n - 1;
    let dim = [];
    let dim2 = [];

    for (let i = 0; i < n; i++) {
        let str = "";

        str = addToStr(str, nGap, " ");
        str = addToStr(str, i + 1, "* ");
    
        nGap--;
        dim.push(str );
    }
    for (let i = 2; i <= dim.length; i++) {
        dim2.push(dim[dim.length - i])
    }
    dim = [...dim, ...dim2]
    return dim.join('\n');
}


const n1 = prompt("Висота піраміди?")
console.log(drawPyramid(n1));

const n2 = prompt("Висота ромба?")
console.log(drawRomb(n2));

const n3 = prompt("Висота діаманта?")
console.log(drawDiamont(n3));