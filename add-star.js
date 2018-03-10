/**
 * Graphology addStar
 * ===================
 *
 * Function adding the given star to the graph.
 */

/**
 * Adding the given star to the graph.
 *
 * @param  {Graph} graph - Target graph.
 * @param  {array} nodes - Nodes to add, first one being the center of the star.
 */
module.exports = function addStar(graph, nodes) {
  if (nodes.length === 0)
    return;

  var node, i, l;

  var center = nodes[0];

  graph.addNode(center);

  for (i = 1, l = nodes.length; i < l; i++) {
    node = nodes[i];

    graph.mergeEdge(center, node);
  }
};
