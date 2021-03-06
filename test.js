/**
 * Graphology Utils Unit Tests
 * ============================
 */
var assert = require('assert'),
    Graph = require('graphology'),
    inferType = require('./infer-type.js'),
    isGraph = require('./is-graph.js'),
    isGraphConstructor = require('./is-graph-constructor.js'),
    mergeClique = require('./merge-clique.js'),
    mergeCycle = require('./merge-cycle.js'),
    mergePath = require('./merge-path.js'),
    mergeStar = require('./merge-star.js');

var UndirectedGraph = Graph.UndirectedGraph;

describe('graphology-utils', function() {
  describe('inferType', function() {
    it('should correctly infer the type of the given graph.', function() {
      var graph = new Graph({type: 'mixed'});
      graph.mergeDirectedEdge(1, 2);

      assert.strictEqual(inferType(graph), 'directed');

      graph = new Graph({type: 'mixed'});
      graph.mergeUndirectedEdge(1, 2);

      assert.strictEqual(inferType(graph), 'undirected');

      graph = new Graph({type: 'mixed'});
      graph.mergeDirectedEdge(1, 2);
      graph.mergeUndirectedEdge(3, 4);

      assert.strictEqual(inferType(graph), 'mixed');

      graph = new Graph({type: 'mixed'});

      assert.strictEqual(inferType(graph), 'mixed');

      graph = new Graph({type: 'directed'});

      assert.strictEqual(inferType(graph), 'directed');

      graph = new Graph({type: 'undirected'});

      assert.strictEqual(inferType(graph), 'undirected');
    });
  });

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

  describe('mergeClique', function() {
    it('should correctly add the given clique to the graph.', function() {
      var graph = new Graph();

      mergeClique(graph, ['1', '2', '3', '4', '5']);

      assert.strictEqual(graph.order, 5);
      assert.strictEqual(graph.size, 10);

      var adj = graph.edges().map(function(edge) {
        return graph.extremities(edge);
      });

      assert.deepStrictEqual(adj, [
        ['1', '2'],
        ['1', '3'],
        ['1', '4'],
        ['1', '5'],
        ['2', '3'],
        ['2', '4'],
        ['2', '5'],
        ['3', '4'],
        ['3', '5'],
        ['4', '5']
      ]);
    });
  });

  describe('mergeCycle', function() {
    it('should correctly add the given path to the graph.', function() {
      var graph = new Graph();

      mergeCycle(graph, ['1', '2', '3', '4', '5']);

      assert.strictEqual(graph.order, 5);
      assert.strictEqual(graph.size, 5);

      var adj = graph.edges().map(function(edge) {
        return graph.extremities(edge);
      });

      assert.deepStrictEqual(adj, [['1', '2'], ['2', '3'], ['3', '4'], ['4', '5'], ['5', '1']]);
    });
  });

  describe('mergePath', function() {
    it('should correctly add the given path to the graph.', function() {
      var graph = new Graph();

      mergePath(graph, ['1', '2', '3', '4', '5']);

      assert.strictEqual(graph.order, 5);
      assert.strictEqual(graph.size, 4);

      var adj = graph.edges().map(function(edge) {
        return graph.extremities(edge);
      });

      assert.deepStrictEqual(adj, [['1', '2'], ['2', '3'], ['3', '4'], ['4', '5']]);
    });
  });

  describe('mergeStar', function() {
    it('should correctly add the given star to the graph.', function() {
      var graph = new Graph();

      mergeStar(graph, ['1', '2', '3', '4', '5']);

      assert.strictEqual(graph.order, 5);
      assert.strictEqual(graph.size, 4);

      var adj = graph.edges().map(function(edge) {
        return graph.extremities(edge);
      });

      assert.deepStrictEqual(adj, [['1', '2'], ['1', '3'], ['1', '4'], ['1', '5']]);
    });
  });
});
