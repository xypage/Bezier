class ConfigBox {
  constructor(label, items, location) {
    this.padding = 5;
    this.itemWidth = 200;
    this.itemHeight = 40;

    this.location = location;
    this.label = label;
    this.items = []
    this.size = 1.5;
    items.forEach(item => {
      let newConfig = new ConfigOption(item[0], item[1], item[2]);
      newConfig.parent = this;
      this.items.push(newConfig);
      this.size += newConfig.size;
    });
  }

  getHeight() {
    return this.size * this.itemHeight;
  }
  getBottom() {
    return this.location.y + this.getHeight();
  }
  getWidth() {
    return this.itemWidth + 2 * this.padding;
  }
  getRightSide() {
    return this.location.x + this.getWidth();
  }
  

  draw() {
    stroke("black");
    rect(this.location.x, this.location.y, this.getWidth(), this.getHeight());
    text(this.label, this.location.x + this.padding, this.location.y + 3 * this.padding);

    let currentY = this.location.y + 4 * this.padding;
    this.items.forEach(item => {
      item.draw(this.location.x + this.padding, currentY);
      currentY += item.getHeight() + 3 * this.padding;
    });
  }

  clicked() {
    let whichClicked = this.checkLocation(mouseX, mouseY);
    if(whichClicked == -1) {
      // console.log("Clicked " + this.label);

    } else {
      // console.log("Clicked " + this.items[whichClicked].label);
      let item = this.items[whichClicked];
      if(item.type == "button") {
        item.onClick();
      }
    }

  }

  dragged() {
    this.location.x += mouseX - pmouseX;
    this.location.y += mouseY - pmouseY;
    redraw();
  }

  // Checks if you're clicking on a certain element, an item in that element, or just the box
  // Assumes the location is somewhere within the box, not anywhere on the canvas
  checkLocation(x, y) {
    if(x < this.location.x + this.padding || x > this.getRightSide() - this.padding 
    || y < this.location.y + 4 * this.padding || y > this.getBottom() - this.padding) {
      // The box itself
      return -1;
    } else {
      // Sets current y to top of the first box
      let currentY = this.location.y + 4 * this.padding;
      for(let i = 0; i < this.items.length; i++) {
        let item = this.items[i];
        // Gets the item height as size * itemHeight + the inner padding for it
        if(y > currentY && y < currentY + item.getHeight()) {
          // if it's in there, return the index, can only be in one box so we can stop iterating here
          return i;
        }
        // Otherwise, increase currentY to account for the item as well as the padding between it and the nnxt one
        currentY += item.getHeight() + 3 * this.padding;
      }
    }
    // Otherwise, it didn't actually click in any of the boxes it clicked somewhere in
    return -1;
  }
}

class ConfigOption {
  constructor(label, type, onClick) {
    this.parent = null;
    this.label = label;
    this.type = type;
    switch (this.type) {
      case "toggle":
      case "button":
        this.size = 1;
        this.onClick = onClick;
        break;
      case "entry":
        this.size = 1;
        this.input = createInput("");
        this.input.size(70, 25);
        this.input.input(() => {
          onClick(this.input.value());
        });
      break;
      case "slider":
        this.size = 2;
        break;
      default:
        break;
    }
  }

  draw(x, y) {
    rect(x, y, this.parent.itemWidth, this.parent.itemHeight * this.size);
    text(this.label, x + 10, y + 15);
    switch(this.type) {
      case "entry":
        this.input.position(x + 80, y + 5);
        break;
      default:
        break;
    }
  }
  getHeight() {
    return this.parent.itemHeight * this.size;
  }
}