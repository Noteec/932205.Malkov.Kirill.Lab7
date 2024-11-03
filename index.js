const shapesContainer = document.querySelector(".canvas");

const squareBtn = document.getElementById('square-button');
const triangleBtn = document.getElementById('triangle-button');
const circleBtn = document.getElementById('circle-button');

const inputValueBox = document.getElementById("value-box");

function randomInRange(min, max) {
  return Math.floor(Math.random() * max) + min;
};

class Shape {
  constructor(shapeType) {
    this.shapeType = shapeType;
    this.figureSize = randomInRange(25, 250);

    this.shape = document.createElement("div");
    this.shape.classList.add(this.shapeType);
    this.shape.setAttribute("tabindex", "0");
    this.shape.style.width = this.figureSize + "px";
    this.shape.style.height = this.figureSize + "px";

    const windowWidth = window.innerWidth - this.figureSize;
    this.shape.style.left = randomInRange(0, windowWidth) + "px";
    const windowHeight = window.innerHeight - this.figureSize;
    this.shape.style.top = randomInRange(0, windowHeight) + "px";
    shapesContainer.appendChild(this.shape);

    this.shape.addEventListener("dblclick", () => {
      shapesContainer.removeChild(this.shape);
    });

    this.shape.addEventListener("focus", () => {
      if (this.shape.classList.contains("triangle")) {
        this.shape.style.borderBottomColor = "yellow";
      }
      else {
        this.shape.style.backgroundColor = "yellow";
      }
    });

    this.shape.addEventListener("blur", () => {
      this.returnDefaultColor();
    });
  }

  returnDefaultColor() {
    throw new Error("call of abstract method");
  }
}

class Square extends Shape {
  constructor() {
    super("square");
  }

  returnDefaultColor() {
    this.shape.style.backgroundColor = "red";
  }
}

class Triangle extends Shape {
  constructor() {
    super("triangle");
    this.shape.style.border = this.figureSize / 2 + "px solid transparent";
    this.shape.style.borderBottom = this.figureSize / 2 + "px solid blue";
    this.shape.style.width = 0 + "px";
    this.shape.style.height = 0 + "px";
  }

  returnDefaultColor() {
    this.shape.style.borderBottomColor = "blue";
  }
}

class Circle extends Shape {
  constructor() {
    super("circle");
  }

  returnDefaultColor() {
    this.shape.style.backgroundColor = "green";
  }
}

squareBtn.addEventListener("click", function() {
  for (let i = 0; i < parseInt(inputValueBox.value); i++) {
    new Square();
  }
});

triangleBtn.addEventListener("click", function() {
  for (let i = 0; i < parseInt(inputValueBox.value); i++) {
    new Triangle();
  }
});

circleBtn.addEventListener("click", function() {
  for (let i = 0; i < parseInt(inputValueBox.value); i++) {
    new Circle();
  }
});