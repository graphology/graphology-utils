/**
 * Graphology addPath
 * ===================
 *
 * Function adding the given path to the graph.
 */

/**
 * Adding the given path to the graph.
 *
 * @param  {Graph} graph - Target graph.
 * @param  {array} nodes - Nodes to add.
 */
module.exports = function addPath(graph, nodes) {
  if (nodes.length === 0)
    return;

  var previousNode, node, i, l;

  graph.addNode(nodes[0]);

  for (i = 1, l = nodes.length; i < l; i++) {
    previousNode = nodes[i - 1];
    node = nodes[i];

    graph.mergeEdge(previousNode, node);
  }
};
