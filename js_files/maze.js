function addMaze()
{
    var choice = document.getElementById("mazeSelect");
    var mazeType = choice.options[choice.selectedIndex].value;
    if(mazeType==1)
    {
        clearWall();
        oddevenMaze(mat);
    }
    else if(mazeType==2)
    {
        clearWall();
        stairMaze(mat);
    }
    else if(mazeType==3)
    {
        clearWall();
        randomMaze(mat);
    }

    clearSelection();
}

function clearSelection()
{
    var dropDown = document.getElementById("mazeSelect");
    for (let i=0; i<dropDown.options.length;i++)
    {
        if (dropDown.options[i].value==0)
        {
            dropDown.options[i].selected = true;
        }
        else
        {
            dropDown.options[i].selected = false;
        }
    }
}

function oddevenMaze(mat)
{
    var j = 0;
    
    var mazeColumn = setInterval(()=>
    {
        if(j>=50)
        {
            clearInterval(mazeColumn);
            return;
        }

        oddevenMazeRow(mat,j);
        j+=2;
    },150);
}

function oddevenMazeRow(mat,j)
{
    var i;
    if(j%4==2)
        i=0;
    else
        i=1;
    
    var mazeInterval = setInterval(()=>
    {
        if(i>=15)
        {
            clearInterval(mazeInterval);
            return;
        }

        mat[i][j].element.style.backgroundColor = "rgb(12,53,71)";
        mat[i][j].weight = Number.MAX_VALUE;
        mat[i][j].element.classList.add("path");
        mat[i][j].element.parentElement.classList.add("path");
        i+=2;
    },30);
}

function stairMaze(mat)
{
    var stairElement = new Array(1);
    var i=13,j=1,index=0;
    while(i>=0)
    {
        stairElement[index] = mat[i][j];
        index+=1;
        i-=1;
        j+=1;
    }

    i=1;
    while(i<13)
    {
        stairElement[index] = mat[i][j];
        index+=1;
        i+=1;
        j+=1;
    }
    while(i>0)
    {
        stairElement[index] = mat[i][j];
        index+=1;
        i-=1;
        j+=1;       
    }

    makeStair(mat,stairElement);
}

function makeStair(mat,stairElement)
{
    var index = 0;
    var id = setInterval(()=>
    {
        if(index>=stairElement.length)
        {
            clearInterval(id);
            return;
        }

        stairElement[index].element.style.backgroundColor = "rgb(12,53,71)";
        stairElement[index].weight = Number.MAX_VALUE;
        stairElement[index].element.classList.add("path");
        stairElement[index].element.parentElement.classList.add("path");
        index+=1;

    },50);
}

function randomMaze(mat)
{
    // var list = new Array(1);
    // var ind = 0;
    for(let i=0;i<15;i++)
    {
        for(let j=0;j<50;j++)
        {
            let x = Math.floor(Math.random()*10);
            if(x<3)
            {
                // list[ind] = mat[i][j];
                // ind+=1;
                mat[i][j].element.style.backgroundColor = "rgb(12,53,71)";
                mat[i][j].weight = Number.MAX_VALUE;
                mat[i][j].element.classList.add("path");
                mat[i][j].element.parentElement.classList.add("path");
            }
        }   
    }
}