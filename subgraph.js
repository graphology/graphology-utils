/**
 * Graphology Sub Graph
 * =====================
 *
 * Function returning the subgraph composed of the nodes passed as parameters.
 */

/**
 * Returning the subgraph composed of the nodes passed as parameters.
 *
 * @param  {Graph} graph - Graph containing the subgraph.
 * @param  {array} nodes - Array or set of the nodes to keep.
 * @return {Graph}
 */
module.exports = function subGraph(graph, nodes) {
  var nodesSet;
  var subGraphResult = graph.emptyCopy();

  if (Array.isArray(nodes)) {
    nodesSet = new Set(nodes);
  }
  else if (nodes instanceof Set) {
    nodesSet = nodes;
  }
  else {
    throw new Error('graphology-utils/subgraph: given "nodes" is neither an array nor a set.');
  }

  if (nodesSet.size === 0)
    return subGraphResult;

  var insertedSelfloops = new Set(); // Useful to check if a selfloop has already been inserted or not

  nodesSet.forEach(function(node) {
    // Nodes addition
    if (!graph.hasNode(node))
      throw new Error('graphology-utils/subgraph: the "' + node + '" node is not present in the graph.');
    subGraphResult.addNode(node, graph.getNodeAttributes(node));
  });

  nodesSet.forEach(function(node) {
    // Edges addition
    graph.forEachOutEdge(node, function(edge, attributes, source, target) {
      if (nodesSet.has(target)) {
        subGraphResult.importEdge(graph.exportEdge(edge));
      }
    });
    graph.forEachUndirectedEdge(node, function(
      edge,
      attributes,
      source,
      target
    ) {
      if (source !== node) {
        var tmp = source;
        source = target;
        target = tmp;
      }
      if (nodesSet.has(target)) {
        if (source === target && !insertedSelfloops.has(edge)) {
          subGraphResult.importEdge(graph.exportEdge(edge));
          insertedSelfloops.add(edge);
        }
        else if (source > target) {
          subGraphResult.importEdge(graph.exportEdge(edge));
        }
      }
    });
  });

  return subGraphResult;
};
