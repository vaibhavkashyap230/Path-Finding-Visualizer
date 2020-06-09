function astar(si,sj,ei,ej)
{
    var g=0;
    var parent = new Array(15);
    for(let i=0;i<15;i++)
    {
        parent[i] = new Array(50);
    }
    search(si,sj,ei,ej,g,parent,new pair(si,sj));
}

var end = false;

function search(si,sj,ei,ej,g,parent,start)
{
    if(end==true)
        return;
    
    if(mat[si][sj].visited==true)
        return false;
    
    if(si==ei && sj==ej)
    {
        end = true;
        traceAstarPath(start.i,start.j,ei,ej,mat,parent);
        return true;
    }
    
    // mat[si][sj].element.style.backgroundColor = 'yellow';
    // setTimeout(() =>{
    //     mat[si][sj].element.style.backgroundColor = 'rgb(64,206,227)';
    // },2*getSpeed());

    mat[si][sj].visited = true;
    var ht,hb,hl,hr;
    ht=hb=hl=hr=Number.MAX_VALUE;
    var ar = new Array(0);

    if(sj-1>=0)
    {
        var a = si;
        var b = sj-1;
        var c = Math.abs(ej-(sj-1))+Math.abs(ei-si);
        var temp = new acost(a,b,c);
        if(mat[a][b].weight==0 && mat[a][b].visited==false)
        {
            ar.push(temp);
        }
    }
    if(sj+1<50)
    {
        var a = si;
        var b = sj+1;
        var c = Math.abs(ej-(sj+1))+Math.abs(ei-si);
        var temp = new acost(a,b,c);
        if(mat[a][b].weight==0 && mat[a][b].visited==false)
        {
            ar.push(temp);
        }
    }
    if(si-1>=0)
    {
        var a = si-1;
        var b = sj;
        var c = Math.abs(ej-sj)+Math.abs(ei-(si-1));
        var temp = new acost(a,b,c);
        if(mat[a][b].weight==0 && mat[a][b].visited==false)
        {
            ar.push(temp);
        }
    }
    if(si+1<15)
    {
        var a = si+1;
        var b = sj;
        var c = Math.abs(ej-sj)+Math.abs(ei-(si+1));
        var temp = new acost(a,b,c);
        if(mat[a][b].weight==0 && mat[a][b].visited==false)
        {
            ar.push(temp);
        }
    }

    ar.sort((a, b) => a.c - b.c);

    for(let x=0;x<ar.length;x++)
    {
        parent[ar[x].i][ar[x].j] = new pair(si,sj);
        var res = search(ar[x].i,ar[x].j,ei,ej,g+1,parent,start);
        if(res==true)
        {
            return true;
        }
    }
    return false;
}

function traceAstarPath(si,sj,ei,ej,mat,parent)
{
    mat[si][sj].element.style.backgroundColor = "yellow";
    mat[ei][ej].element.style.backgroundColor = "yellow";

    var path = new Array(1);
    var ci = ei,cj = ej,size = 0;
    while(true)
    {
        path[size] = mat[ci][cj].element;
        size+=1;
        if(ci==si && cj==sj)
        {
            break;
        }
        var ni,nj;
        ni = parent[ci][cj].i;
        nj = parent[ci][cj].j;
        ci=ni;cj=nj;
    }
    makeAstarPath(path,size-1);
}

function makeAstarPath(path,size)
{
    var speed = getSpeed();
    var id = setInterval(()=>
    {
        if(size<=0)
        {
            clearInterval(id);
        }

        path[size].style.backgroundColor = "yellow";
        path[size].classList.add("path");
        path[size].parentElement.classList.add("path");
        size-=1;
    },getSpeed());
}