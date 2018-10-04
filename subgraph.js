/**
 * Graphology subGraph
 * ===================
 *
 * Function returning the subgraph composed of the nodes passed as parameters.
 */

/**
 * Returning the subgraph composed of the nodes passed as parameters.
 *
 * @param  {Graph} graph - Graph containing the subgraph.
 * @param  {array} nodes - Array or set of the nodes representing the subgraph to return.
 */

module.exports = function subGraph(graph, nodes) {
  var nodesSet;
  var subGraphResult = graph.emptyCopy();

  if (Array.isArray(nodes)) {
    nodesSet = new Set(nodes);
    if (nodes.length === 0) return subGraphResult;
  }
 else if (nodes instanceof Set) {
    nodesSet = nodes;
    if (nodes.size === 0) return subGraphResult;
  }
 else {
    throw new Error('The argument "nodes" is neither an array nor a set.');
  }

  var insertedSelfloops = new Set(); // Useful to check if a selfloop has already been inserted or not

  nodesSet.forEach(function(node) { // For each node in the node list
    if (!graph.hasNode(node)) throw new Error('Node ' + node + ' is not present in the graph.');
    if (!subGraphResult.hasNode(node)) {
      // and is not already present in the subgraph
      subGraphResult.addNode(node,graph.getNodeAttributes(node));
    }
    graph.forEachOutEdge(node, function(edge, attributes, source, target) {
      if (nodesSet.has(target) && nodesSet.has(source)) {
        if (!subGraphResult.hasNode(target)) {
          subGraphResult.addNode(target,graph.getNodeAttributes(target));
        }
        if (!subGraphResult.hasNode(source)) {
          subGraphResult.addNode(source,graph.getNodeAttributes(source));
        }
        subGraphResult.importEdge(graph.exportEdge(edge));
      }
    });
    graph.forEachUndirectedEdge(node, function(
      edge,
      attributes,
      source,
      target
    ) {
      if (nodesSet.has(target) && nodesSet.has(source)) {
        if (!subGraphResult.hasNode(target)) {
          subGraphResult.addNode(target,graph.getNodeAttributes(target));
        }
        if (!subGraphResult.hasNode(source)) {
          subGraphResult.addNode(source, graph.getNodeAttributes(source));
        }

        if (source === target) {
          if (!insertedSelfloops.has(edge)) {
            subGraphResult.importEdge(graph.exportEdge(edge));
            insertedSelfloops.add(edge);
          }
        }
        else {
          if (source !== node) {
            var tmp = source;
            source = target;
            target = tmp;
          }

          if (source > target) {
            subGraphResult.importEdge(graph.exportEdge(edge));
            //console.log("           added : ", source, "--", target);
          }
        }
      }
    });
  });

  return subGraphResult;
};
