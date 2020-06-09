function getSpeed()
{
    var choice = document.getElementById("speed");
    var speed = choice.options[choice.selectedIndex].value;
    return speed;
}