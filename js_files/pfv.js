"use strict";

window.onload = add();

var mat;
var algo = 1;

function add()
{
    mat = addTable();
}

var find_path = document.getElementById("go");
find_path.addEventListener('click',findPath);

var clear_grid = document.getElementById("clear");
clear_grid.addEventListener('click',clearAll);

var maze = document.getElementById("mazeSelect");
maze.addEventListener('click',addMaze);

var clear_wall = document.getElementById("clearWall");
clear_wall.addEventListener('click',clearWall);

function clearWall()
{
    for(let i=0;i<15;i++)
    {
        for(let j=0;j<50;j++)
        {
            if(mat[i][j].weight==Number.MAX_VALUE)
            {
                mat[i][j].element.style.backgroundColor = "white";
                mat[i][j].weight = 0;
                mat[i][j].element.classList.remove("path");
                mat[i][j].element.parentElement.classList.remove("path");
            }
        }
    }
}

function clearAll()
{
    for(let i=0;i<15;i++)
    {
        for(let j=0;j<50;j++)
        {
            mat[i][j].element.style.backgroundColor = "white";
            mat[i][j].visited = false;
            mat[i][j].weight = 0;
            mat[i][j].source = -1;
            mat[i][j].element.classList.remove("path");
            mat[i][j].element.parentElement.classList.remove("path");
            mat[i][j].element.style.backgroundImage = 'none';
        }
    }
    end = false;
}

function findPath()
{
    var si,sj,ei,ej;
    for(let i=0;i<15;i++)
    {
        for(let j=0;j<50;j++)
        {
            if(mat[i][j].element.childElementCount>0)
            {
                if(mat[i][j].element.children[0].alt==1)
                {
                    si = i;
                    sj = j;
                }
                if(mat[i][j].element.children[0].alt==2)
                {
                    ei = i;
                    ej = j;
                }
            }
        }
    }
    
    if(algo==1)
    {
        dijk(si,sj,ei,ej);
    }
    else if(algo==2)
    {
        astar(si,sj,ei,ej);
    }
    else
    {
        swarm(si,sj,ei,ej);
    }
    mat[si][sj].element.classList.add("path");
    mat[si][sj].element.parentElement.classList.add("path");
    mat[ei][ej].element.classList.add("path");
    mat[ei][ej].element.parentElement.classList.add("path");
}

function addTable()
{
    var mat = new Array(15);
    let table = document.getElementById("table");
    for(let i=0;i<15;i++)
    {
        mat[i] = new Array(50);
        let row = document.createElement("tr");
        document.getElementById("table").appendChild(row);
        for(let j=0;j<50;j++)
        {
            let col = document.createElement("td");
            row.appendChild(col);
            mat[i][j] = new node(i,j,col);

            // to add start-stop drag listeners
            col.addEventListener('dragstart',dragStart,event);
            col.addEventListener('dragover',()=>{
                event.preventDefault();
            });
            col.addEventListener('drop',drop,event);
            col.addEventListener('dragover',()=>{
                if(col.childElementCount>0)
                {
                    col.children[0].remove();
                }
            });

            // to add wall
            col.addEventListener('click',()=>
            {
                if(mat[i][j].weight!=0)
                {
                    mat[i][j].element.style.backgroundColor = "white";
                    mat[i][j].weight = 0;
                    mat[i][j].element.classList.remove("path");
                    mat[i][j].element.parentElement.classList.remove("path");
                }
                else
                {
                    mat[i][j].element.style.backgroundColor = "rgb(12,53,71)";
                    mat[i][j].weight = Number.MAX_VALUE;
                    mat[i][j].element.classList.add("path");
                    mat[i][j].element.parentElement.classList.add("path");
                }
            });
        }
    }

    var source = document.createElement("img");
    source.src = 'icons_images/source.png';
    source.draggable = "true";
    source.alt = "1";
    mat[7][12].element.appendChild(source);

    var dest = document.createElement("img");
    dest.src = 'icons_images/target.png';
    dest.draggable = "true";
    dest.alt = "2";
    mat[7][37].element.appendChild(dest);

    return mat;
}

function dragStart(event)
{
    event.dataTransfer.setData('Text',this.children[0].src);
}

function drop(event)
{
    event.preventDefault();
    var url = event.dataTransfer.getData('Text');
    var image = document.createElement("img");
    image.src = url;
    if(url.substring(url.length-5,url.length).charAt(0)=='e')
    {
        image.alt = "1";
    }
    else
    {
        image.alt = "2";
    }
    event.target.appendChild(image);
}

var dij = document.getElementById("dijkstra");
var ast = document.getElementById("astar");
var bfsa = document.getElementById("swarm");

dij.style.color = 'red';

dij.addEventListener('click',function(){
   algo =  1;
   dij.style.color = 'red';
   ast.style.color = 'rgb(52,73,94)';
   bfsa.style.color = 'rgb(52,73,94)';
});

ast.addEventListener('click',function(){
    algo =  2;
    dij.style.color = 'rgb(52,73,94)';
    ast.style.color = 'red';
    bfsa.style.color = 'rgb(52,73,94)';
});

bfsa.addEventListener('click',function(){
    algo =  3;
    dij.style.color = 'rgb(52,73,94)';
    ast.style.color = 'rgb(52,73,94)';
    bfsa.style.color = 'red';
});