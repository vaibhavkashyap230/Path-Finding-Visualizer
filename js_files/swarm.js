function swarm(si,sj,ei,ej)
{
    var parent = new Array(15);
    for(let i=0;i<15;i++)
    {
        parent[i] = new Array(50);
    }

    var q = new Queue();
    q.enqueue(mat[si][sj]);
    mat[si][sj].source = 1;
    q.enqueue(mat[ei][ej]);
    mat[ei][ej].source = 2;

    var id = setInterval(() =>{
        if(q.isEmpty()==true)
        {
            clearInterval(id);
            while (!q.isEmpty())
            {
                q.dequeue();
            }
            return;
        }

        var cur = q.peek();
        cur.element.style.backgroundColor = 'yellow';
        
        if(cur.source==1)
        {
            setTimeout(()=>{
            cur.element.style.backgroundColor = 'rgb(64,206,227)';
            },getSpeed()*2);
        }
        else
        {
            setTimeout(()=>{
            cur.element.style.backgroundColor = 'rgb(244,112,154)';
            },getSpeed()*2);
        }

        if((cur.i)-1>=0 && mat[(cur.i)-1][cur.j].source!=cur.source && mat[(cur.i)-1][cur.j].weight!=Number.MAX_VALUE)
        {
            if(mat[(cur.i)-1][cur.j].source!=-1)
            {
                clearInterval(id);
                cur.element.style.backgroundColor = 'rgb(149,56,158)';
                if(cur.direction==1)
                {
                    traceSwarmPath(si,sj,cur.i,cur.j,mat,parent);
                    traceSwarmPath(ei,ej,(cur.i)-1,cur.j,mat,parent);
                }
                else
                {
                    traceSwarmPath(si,sj,(cur.i)-1,cur.j,mat,parent);
                    traceSwarmPath(ei,ej,cur.i,cur.j,mat,parent);
                }
                mat[cur.i-1][cur.j].element.style.backgroundColor = "yellow";
                mat[cur.i-1][cur.j].element.classList.add("path");
                mat[cur.i-1][cur.j].element.parentElement.classList.add("path");
                return;
            }
            mat[(cur.i)-1][cur.j].source = cur.source;
            q.enqueue(mat[(cur.i)-1][cur.j]);
            parent[(cur.i)-1][cur.j] = new pair(cur.i,cur.j);
        }
        
        if((cur.i)+1<15 && mat[(cur.i)+1][cur.j].source!=cur.source && mat[(cur.i)+1][cur.j].weight!=Number.MAX_VALUE)
        {
            if(mat[(cur.i)+1][cur.j].source!=-1)
            {
                clearInterval(id);
                cur.element.style.backgroundColor = 'rgb(149,56,158)';
                if(cur.direction==1)
                {

                    traceSwarmPath(si,sj,cur.i,cur.j,mat,parent);
                    traceSwarmPath(ei,ej,(cur.i)+1,cur.j,mat,parent);
                }
                else
                {
                    traceSwarmPath(si,sj,(cur.i)+1,cur.j,mat,parent);
                    traceSwarmPath(ei,ej,cur.i,cur.j,mat,parent);
                }
                mat[cur.i+1][cur.j].element.style.backgroundColor = "yellow";
                mat[cur.i+1][cur.j].element.classList.add("path");
                mat[cur.i+1][cur.j].element.parentElement.classList.add("path");
                return;
            }
            mat[(cur.i)+1][cur.j].source = cur.source;
            q.enqueue(mat[(cur.i)+1][cur.j]);
            parent[(cur.i)+1][cur.j] = new pair(cur.i,cur.j);
        }
        
        if((cur.j)-1>=0 && mat[cur.i][(cur.j)-1].source!=cur.source && mat[cur.i][(cur.j)-1].weight!=Number.MAX_VALUE)
        {
            if(mat[cur.i][(cur.j)-1].source!=-1)
            {
                clearInterval(id);
                cur.element.style.backgroundColor = 'rgb(149,56,158)';
                if(cur.direction==1)
                {
                    traceSwarmPath(si,sj,cur.i,cur.j,mat,parent);
                    traceSwarmPath(ei,ej,cur.i,(cur.j)-1,mat,parent);
                }
                else
                {
                    traceSwarmPath(si,sj,cur.i,(cur.j)-1,mat,parent);
                    traceSwarmPath(ei,ej,cur.i,cur.j,mat,parent);
                }
                mat[cur.i][cur.j-1].element.style.backgroundColor = "yellow";
                mat[cur.i][cur.j-1].element.classList.add("path");
                mat[cur.i][cur.j-1].element.parentElement.classList.add("path");
                return;
            }
            mat[cur.i][(cur.j)-1].source = cur.source;
            q.enqueue(mat[cur.i][(cur.j)-1]);
            parent[cur.i][(cur.j)-1] = new pair(cur.i,cur.j);
        }
        
        if((cur.j)+1<50 && mat[cur.i][(cur.j)+1].source!=cur.source && mat[cur.i][(cur.j)+1].weight!=Number.MAX_VALUE)
        {
            if(mat[cur.i][(cur.j)+1].source!=-1)
            {
                clearInterval(id);
                cur.element.style.backgroundColor = 'rgb(149,56,158)';
                if(cur.direction==1)
                {
                    traceSwarmPath(si,sj,cur.i,cur.j,mat,parent);
                    traceSwarmPath(ei,ej,cur.i,(cur.j)+1,mat,parent);
                }
                else
                {
                    traceSwarmPath(si,sj,cur.i,(cur.j)+1,mat,parent);
                    traceSwarmPath(ei,ej,cur.i,cur.j,mat,parent);
                }
                mat[cur.i][cur.j+1].element.style.backgroundColor = "yellow";
                mat[cur.i][cur.j+1].element.classList.add("path");
                mat[cur.i][cur.j+1].element.parentElement.classList.add("path");
                return;
            }
            mat[cur.i][(cur.j)+1].source = cur.source;
            q.enqueue(mat[cur.i][(cur.j)+1]);
            parent[cur.i][(cur.j)+1] = new pair(cur.i,cur.j);
        }
        
        q.dequeue();
    }, getSpeed()/2);
}

function traceSwarmPath(si,sj,ei,ej,mat,parent)
{
    mat[si][sj].element.style.backgroundColor = "yellow";
    mat[ei][ej].element.style.backgroundColor = "yellow";

    var path = new Array(1);
    var cu = mat[ei][ej],tar = new pair(si,sj),size = 0;
    while(cu!=undefined)
    {
        path[size] = mat[cu.i][cu.j].element;
        size+=1;
        cu = parent[cu.i][cu.j];
    }
    makeSwarmPath(path,size-1);
}

function makeSwarmPath(path,size)
{
    var id = setInterval(()=>
    {
        if(size<=0)
        {
            clearInterval(id);
        }

        if(path[size]!=undefined)
        {
            path[size].style.backgroundColor = "yellow";
            path[size].classList.add("path");
            path[size].parentElement.classList.add("path");
        }
        size-=1;
    },getSpeed()/2);
}