[![Build Status](https://travis-ci.org/graphology/graphology-utils.svg)](https://travis-ci.org/graphology/graphology-utils)

# Graphology Utils

Miscellaneous utils to be used with [`graphology`](https://graphology.github.io).

## Installation

```
npm install graphology-utils
```

## Usage

* [#.isGraph](#isgraph)
* [#.isGraphConstructor](#isgraphconstructor)
* [#.mergeCycle](#mergecycle)
* [#.mergePath](#mergepath)
* [#.mergeStar](#mergestar)

### #.isGraph

Function returning whether the given value is a `graphology` implementation's instance.

```js
import Graph from 'graphology';
import {isGraph} from 'graphology-utils';
// Alternatively, if you want to only load the relevant code:
import isGraph from 'graphology-utils/is-graph';

const graph = new Graph();

isGraph(graph);
>>> true

isGraph(45);
>>> false

isGraph({hello: 'world'});
>>> false
```

*Arguments*

* **value** *any*: value to test.

### #.isGraphConstructor

Function returning whether the given value is a `graphology` constructor.

```js
import Graph from 'graphology';
import {isGraphConstructor} from 'graphology-utils';
// Alternatively, if you want to only load the relevant code:
import isGraphConstructor from 'graphology-utils/is-graph-constructor';

isGraphConstructor(Graph);
>>> true

isGraphConstructor(45);
>>> false

isGraphConstructor(new Graph());
>>> false
```

*Arguments*

* **value** *any*: value to test.

### #.mergeCycle

Function adding a star to the given graph.

```js
import Graph from 'graphology';
import {mergeCycle} from 'graphology-utils';
// Alternatively, if you want to only load the relevant code:
import mergeCycle from 'graphology-utils/merge-cycle';

const graph = new Graph();

mergeCycle(graph, [1, 2, 3, 4, 5]);
graph.edges().map(e => graph.extremities(e));
>>> [[1, 2], [2, 3], [3, 4], [4, 5], [5, 1]]
```

*Arguments*

* **graph** *Graph*: target graph.
* **cycle** *array*: array of nodes representing the cycle to add.

### #.mergePath

Function adding a path to the given graph.

```js
import Graph from 'graphology';
import {mergePath} from 'graphology-utils';
// Alternatively, if you want to only load the relevant code:
import mergePath from 'graphology-utils/merge-path';

const graph = new Graph();

mergePath(graph, [1, 2, 3, 4, 5]);
graph.edges().map(e => graph.extremities(e));
>>> [[1, 2], [2, 3], [3, 4], [4, 5]]
```

*Arguments*

* **graph** *Graph*: target graph.
* **path** *array*: array of nodes representing the path to add.

### #.mergeStar

Function adding a star to the given graph.

```js
import Graph from 'graphology';
import {mergeStar} from 'graphology-utils';
// Alternatively, if you want to only load the relevant code:
import mergeStar from 'graphology-utils/merge-star';

const graph = new Graph();

mergeStar(graph, [1, 2, 3, 4, 5]);
graph.edges().map(e => graph.extremities(e));
>>> [[1, 2], [1, 3], [1, 4], [1, 5]]
```

*Arguments*

* **graph** *Graph*: target graph.
* **star** *array*: array of nodes representing the star to add.

### #.subGraph

Function returning the subgraph corresponding to the given list of nodes.

```js
import Graph from 'graphology';
import {subGraph} from 'graphology-utils';
// Alternatively, if you want to only load the relevant code:
import subGraph from 'graphology-utils/subgraph';

const graph = new Graph();

graph.addNode('Dale');
graph.addNode('Laura');
graph.addNode('Norma');
graph.addNode('Shelly');
graph.addEdge('Dale', 'Laura');
graph.addEdge('Dale', 'Norma');
graph.addEdge('Shelly', 'Laura');
graph.addUndirectedEdge('Norma', 'Shelly');

subGraphResult = subGraph(graph, ['Dale','Laura']);
subGraphResult.nodes();
>>> [ 'Dale', 'Laura' ]
subGraphResult.forEachEdge(
  (edge, attributes, source, target) => {
    console.log(`Edge from ${source} to ${target}`);
});
>>> 'Edge from Dale to Laura'
```

*Arguments*

* **graph** *Graph*: source graph.
* **nodes** *array*: array of nodes representing the subgraph to return.

