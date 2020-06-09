function dijk(si,sj,ei,ej)
{
    var parent = new Array(15);
    for(let i=0;i<15;i++)
    {
        parent[i] = new Array(50);
    }

    var q = new Queue();
    q.enqueue(mat[si][sj]);
    mat[si][sj].visited = true;

    var id = setInterval(() => {
        if(q.peek()==mat[ei][ej] || q.isEmpty()==true)
        {
            clearInterval(id);
            while (!q.isEmpty())
            {
                q.dequeue();
            }
            tracePath(si,sj,ei,ej,mat,parent);
            return;
        }

        var cur = q.peek();
        if(mat[si][sj]!=cur)
        {
            cur.element.style.backgroundColor = "yellow";
        }
        
        setTimeout(()=>{
            cur.element.style.backgroundColor = 'rgb(64,206,227)';
        },getSpeed()*2);

        if((cur.i)-1>=0 && mat[(cur.i)-1][cur.j].visited==false && mat[(cur.i)-1][cur.j].weight!=Number.MAX_VALUE)
        {
            mat[(cur.i)-1][cur.j].visited = true;
            q.enqueue(mat[(cur.i)-1][cur.j]);
            parent[(cur.i)-1][cur.j] = new pair(cur.i,cur.j);
        }
        
        if((cur.i)+1<15 && mat[(cur.i)+1][cur.j].visited==false && mat[(cur.i)+1][cur.j].weight!=Number.MAX_VALUE)
        {
            mat[(cur.i)+1][cur.j].visited = true;
            q.enqueue(mat[(cur.i)+1][cur.j]);
            parent[(cur.i)+1][cur.j] = new pair(cur.i,cur.j);
        }
        
        if((cur.j)-1>=0 && mat[cur.i][(cur.j)-1].visited==false && mat[cur.i][(cur.j)-1].weight!=Number.MAX_VALUE)
        {
            mat[cur.i][(cur.j)-1].visited = true;
            q.enqueue(mat[cur.i][(cur.j)-1]);
            parent[cur.i][(cur.j)-1] = new pair(cur.i,cur.j);
        }
        
        if((cur.j)+1<50 && mat[cur.i][(cur.j)+1].visited==false && mat[cur.i][(cur.j)+1].weight!=Number.MAX_VALUE)
        {
            mat[cur.i][(cur.j)+1].visited = true;
            q.enqueue(mat[cur.i][(cur.j)+1]);
            parent[cur.i][(cur.j)+1] = new pair(cur.i,cur.j);
        }
        
        q.dequeue();
    },getSpeed());
}

function tracePath(si,sj,ei,ej,mat,parent)
{
    mat[si][sj].element.style.backgroundColor = "yellow";
    mat[ei][ej].element.style.backgroundColor = "yellow";

    var path = new Array(1);
    var cu = parent[ei][ej],tar = new pair(si,sj),size = 0;
    while(cu.i!=tar.i || cu.j!=tar.j)
    {
        path[size] = mat[cu.i][cu.j].element;
        size+=1;
        cu = parent[cu.i][cu.j];
    }
    makePath(path,size-1);
}

function makePath(path,size)
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