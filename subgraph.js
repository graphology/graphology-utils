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

  if (Array.isArray(nodes)) {
    nodesSet = new Set(nodes);
  }
 else if (nodes instanceof Set) {
    nodesSet = nodes;
  }

  var subGraphResult = graph.emptyCopy();

  if (nodes.length === 0) return subGraphResult;

  var insertedSelfloops = new Set();

  nodesSet.forEach(function(node) {
    console.log('node : ', node);
    // For each node in the node list
    if (graph.hasNode(node)) {
      // If the node is actually present in the graph
      if (!subGraphResult.nodes().includes(node)) {
        // and is not already present in the subgraph
        subGraphResult.addNode(node);
        subGraphResult.replaceNodeAttributes(
          node,
          graph.getNodeAttributes(node)
        );
      }
      graph.forEachOutEdge(node, function(edge, attributes, source, target) {
        if (nodesSet.has(target) && nodesSet.has(source)) {
          if (!subGraphResult.nodes().includes(target)) {
            subGraphResult.addNode(target);
            subGraphResult.replaceNodeAttributes(
              target,
              graph.getNodeAttributes(target)
            );
          }
          if (!subGraphResult.nodes().includes(source)) {
            subGraphResult.addNode(source);
            subGraphResult.replaceNodeAttributes(
              source,
              graph.getNodeAttributes(source)
            );
          }
          console.log('INSERTION of : ', source, ' - ', target, '(directed)');
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
          if (!subGraphResult.nodes().includes(target)) {
            subGraphResult.addNode(target);
            subGraphResult.replaceNodeAttributes(
              target,
              graph.getNodeAttributes(target)
            );
          }
          if (!subGraphResult.nodes().includes(source)) {
            subGraphResult.addNode(source);
            subGraphResult.replaceNodeAttributes(
              source,
              graph.getNodeAttributes(source)
            );
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
              console.log(
                'INSERTION of : ',
                source,
                ' - ',
                target,
                '(undirected)'
              );
              subGraphResult.importEdge(graph.exportEdge(edge));
              //console.log("           added : ", source, "--", target);
            }
          }
        }
      });
    }
 else throw new Error('Node ' + node + ' is not present in the graph.');
  });

  return subGraphResult;
};
