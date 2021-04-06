
let stepButton = document.querySelector('#submit');

class Shape {
    createShape(type) {
        switch(type) {
            case 'rectangle':
                return new RectangleShape();
            case 'square':
                return new SquareShape();
            case 'circle':
                return new CircleShape();
            case 'ellipse':
                return new EllipseShape();
        }
    }
}

class RectangleShape {
    constructor() {
        this.parameters = ['Length', 'Breadth'];
    }

    getArea(length, breadth) {
        return length * breadth;
    }
}

class SquareShape {
    constructor() {
        this.parameters = ['Side'];
    }

    getArea(side) {
        return side * side;
    }
}

class CircleShape {
    constructor() {
        this.parameters = ['Diameter'];
    }

    getArea(diameter) {
        return (Math.PI * diameter * diameter).toFixed(2);
    }
}

class EllipseShape {
    constructor() {
        this.parameters = ['Axis-A', 'Axis-B'];
    }

    getArea(axisA, axisB) {
        return (Math.PI * axisA * axisB).toFixed(2);
    }
}

const shapeObject = new Shape();
let choice;
let shape;
let inputs = [];

function gotoStep2() {
    let options = document.getElementsByName('shape');
    for(option of options) {
        if(option.checked) {
            choice = option.value;
        }
    }
    if(choice) {
        shape = shapeObject.createShape(choice);
        document.getElementById('step').style.display = 'none';
        let step2 = document.getElementById('step2');
        let subHeader = document.createElement('p');
        subHeader.innerHTML = `You have seleceted a ${choice}, please input the required variables.`;
        step2.appendChild(subHeader);


        var mainContent = document.createElement("div");
        mainContent.setAttribute('class', 'options');
        mainContent.innerHTML = shape.parameters.length > 1 ? 
                             `<div class="inputs"><label><span>${shape.parameters[0]}: </span><input class="input" type="number" name='inputs' id='value1' value='0'/></label><br><label><span>${shape.parameters[1]}: </span><input class="input" type="number" name='inputs' id='value2' value='0'/></label></div>` : 
                             `<div class="inputs"><label><span>${shape.parameters[0]}: </span><input class="input" type="number" name='inputs' id='value3' value='0'/></label></div>`;
        step2.appendChild(mainContent);
        step2.style.display = 'block';
    }
}


function gotoStep3() {
    const values = document.getElementsByName("inputs");
    document.getElementById('step2').style.display = 'none';
    for(value of values) {
        inputs.push(value.value);
    }
    let mainContent = document.createElement('p');
    let result = document.createElement('p');
    result.setAttribute('class', 'result');
    mainContent.innerHTML = `You have caculated the area of a ${choice} with a ${shape.parameters[0]} of ${inputs[0]} ${inputs.length > 1 ? ('and ' + shape.parameters[1] + ' of ' + inputs[1] + '. ') : '. '}Below is your result:`;
    result.innerHTML = `The Area is ${inputs.length > 1 ? shape.getArea(inputs[0], inputs[1]) : shape.getArea(inputs[0])}.`
    
    document.getElementById('step3').appendChild(mainContent);
    document.getElementById('step3').appendChild(result);
    document.getElementById('step3').style.display = 'block';
}