const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add( data ) {
    const node = new Node(data);
    if (!this.rootNode) this.rootNode = node;
    else {
      let current = this.rootNode;
      let isFound = false;
      let direction = '';
        while (!isFound) {
          if (data === current.data) return;
          if (data > current.data) {
            if (current.right !== null) current = current.right;
            else isFound = true;
            direction = 'right';
          }
          else {
            if (current.left !== null) current = current.left;
            else isFound = true;
            direction = 'left';
          }
        }
        current[direction] = node;
    }
  }

  has( data ) {
    if (!this.rootNode) return false;
    let current = this.rootNode;
    let isFound = false;
    while (current !== null) {
      if (data === current.data) {
        isFound = true;
        break;
      }
      else if (data > current.data) {
        current = current.right;
      }
      else {
        current = current.left;
      }
    }
    return isFound;
  }

  find( data ) {
    if (!this.rootNode) return null;
    let current = this.rootNode;
    let node = null;
    let parentNode = null;
    while (current !== null) {
      if (data === current.data) {
        node = current;
        break;
      }
      else if (data > current.data) {
        parentNode = current;
        current = current.right;
      }
      else {
        parentNode = current;
        current = current.left;
      }
    }
    if (node) this.parentNode = parentNode;
    return node;
  }

  remove( data ) {
    if (!this.rootNode) return;
    const node = this.find(data);
    if (node) {
      let direction, opposite;
      if (this.parentNode) {
        direction = data > this.parentNode.data ? 'right' : 'left';
        opposite = direction === 'right' ? 'left' : 'right';
      }
      // no children - just remove
      if (!node.right && !node.left) {
        if (node === this.rootNode)  this.rootNode = null;
        else this.parentNode[direction] = null;
        return;
      }
      // node has 1 child
      else if ((!node.left && node.right)|| (!node.right && node.left)) {
        if (node === this.rootNode) this.rootNode = node.left || node.right;
        else this.parentNode[direction] = node.left || node.right;
        return;
      }
      // children in both directions
      else if (node.right && node.left) {
        let replaceNode = node.right;
        let replaceNodeParent = node;
        while (replaceNode.left !== null) {
          replaceNodeParent = replaceNode;
          replaceNode = replaceNode.left;
        }
        // some intermediate nodes
        if (replaceNodeParent !== node) {
          replaceNodeParent.left = null;
          if (replaceNode.right) replaceNodeParent.left = replaceNode.right;
        }
        // first right node was free
        else (replaceNodeParent.right) = replaceNode.right;
        node.data = replaceNode.data;
      }
    }
  }

  min() {
    if (this.rootNode === null) return null;
    let node = this.rootNode;
    while(node.left !== null) node = node.left;
    return node.data;
  }

  max() {
    if (this.rootNode === null) return null;
    let node = this.rootNode;
    while(node.right !== null) node = node.right;
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};
