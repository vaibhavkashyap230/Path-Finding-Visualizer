class Queue
{
    constructor()
    {
        var a = [], b = 0;
        this.getLength = function ()
        {
            return a.length - b;
        };
        this.isEmpty = function ()
        {
            return 0 == a.length;
        };
        this.enqueue = function (b)
        {
            a.push(b);
        };
        this.dequeue = function ()
        {
            if (0 != a.length)
            {
                var c = a[b];
                2 * ++b >= a.length && (a = a.slice(b), b = 0);
                return c;
            }
        };
        this.peek = function ()
        {
            return 0 < a.length ? a[b] : void 0;
        };
    }
}

class node
{
    constructor(i,j,element)
    {
        this.i = i;
        this.j = j;
        this.element = element;
        this.visited = false;
        this.weight = 0;
        this.source = -1;
    }
}

class pair
{
    constructor(a,b)
    {
        this.i = a;
        this.j = b;
    }
}

class acost
{
    constructor(a,b,c)
    {
        this.i = a;
        this.j = b;
        this.c = c;
    }
}