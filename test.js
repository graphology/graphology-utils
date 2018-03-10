/**
 * Graphology Utils Unit Tests
 * ============================
 */
var assert = require('assert'),
    Graph = require('graphology'),
    isGraph = require('./is-graph.js'),
    isGraphConstructor = require('./is-graph-constructor.js'),
    mergePath = require('./merge-path.js'),
    mergeStar = require('./merge-star.js');

var UndirectedGraph = Graph.UndirectedGraph;

describe('graphology-utils', function() {

  describe('isGraph', function() {

    it('should correctly return whether the given value is a graphology instance.', function() {
      var graph = new Graph(),
          multiDirectedGraph = new Graph(null, {multi: true, type: 'directed'});

      assert.strictEqual(isGraph(graph), true);
      assert.strictEqual(isGraph(multiDirectedGraph), true);

      var nonGraphs = [
        null,
        false,
        '',
        'test',
        0,
        -45,
        5380,
        6.4,
        {},
        [],
        {hello: 'world'},
        [1, 2, 3],
        new RegExp(),
        new Date()
      ];

      nonGraphs.forEach(function(value) {
        assert.strictEqual(isGraph(value), false);
      });
    });

  });

  describe('isGraphConstructor', function() {

    it('should correctly return whether the given value is a graphology constructor.', function() {
      assert.strictEqual(isGraphConstructor(Graph), true);
      assert.strictEqual(isGraphConstructor(UndirectedGraph), true);

      var nonGraphsConstructors = [
        null,
        false,
        '',
        'test',
        0,
        -45,
        5380,
        6.4,
        {},
        [],
        {hello: 'world'},
        [1, 2, 3],
        new RegExp(),
        new Date(),
        new Graph(),
        new UndirectedGraph()
      ];

      nonGraphsConstructors.forEach(function(value) {
        assert.strictEqual(isGraphConstructor(value), false);
      });
    });
  });

  describe('mergePath', function() {

    it('should correctly add the given path to the graph.', function() {
      var graph = new Graph();

      mergePath(graph, [1, 2, 3, 4, 5]);

      assert.strictEqual(graph.order, 5);
      assert.strictEqual(graph.size, 4);

      var adj = graph.edges().map(function(edge) {
        return graph.extremities(edge);
      });

      assert.deepEqual(adj, [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5]
      ]);
    });
  });

  describe('mergeStar', function() {

    it('should correctly add the given star to the graph.', function() {
      var graph = new Graph();

      mergeStar(graph, [1, 2, 3, 4, 5]);

      assert.strictEqual(graph.order, 5);
      assert.strictEqual(graph.size, 4);

      var adj = graph.edges().map(function(edge) {
        return graph.extremities(edge);
      });

      assert.deepEqual(adj, [
        [1, 2],
        [1, 3],
        [1, 4],
        [1, 5]
      ]);
    });
  });
});
