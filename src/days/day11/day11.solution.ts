import { Injectable } from '@nestjs/common';
import { DayResult, DaySolution } from '../day-solution';

@Injectable()
export class Day11Solution implements DaySolution {
  readonly day = 11;
  readonly name = 'Day 11 placeholder';

  partOne(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day11.txt or via --input/--raw flags.';
    }

    let graph: Record<string, string[]> = {};
    let lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    for (let line of lines) {
      console.log(` ${line}`);
      const source = line.split(':')[0].trim();
      const destinations = line.split(':')[1].trim().split(' ').map(dest => dest.trim());
      console.log(`Source: ${source}, Destinations: ${destinations}`);
      // build graph
      for (let dest of destinations) {
        if (!graph[source]) {
          graph[source] = [];
        }
        graph[source].push(dest);
      }
    }

    console.log('Graph constructed:', graph);

 const start = 'you';
    const target = 'out';

    const allPaths: string[][] = [];

    function dfs(current: string, path: string[]) {
      // add current node to path
      path.push(current);

      if (current === target) {
        // reached destination: store a copy of the path
        allPaths.push([...path]);
        path.pop();
        return;
      }

      const neighbors = graph[current] || [];
      for (const next of neighbors) {
        // avoid cycles by not revisiting nodes already in the current path
        if (path.includes(next)) continue;
        dfs(next, path);
      }

      // backtrack
      path.pop();
    }

    if (!graph[start]) {
      console.log(`Start node "${start}" has no outgoing edges; no paths.`);
    } else {
      dfs(start, []);
    }

    if (allPaths.length === 0) {
      console.log('No paths found from you to out.');
      return 'No paths from you to out.';
    }

    const formatted = allPaths.map(p => p.join(' -> '));
    console.log('All paths from you to out:\n' + formatted.join('\n'));

    const pathCount = allPaths.length;

    return `Total paths found: ${pathCount}`;
  }

  partTwo(input: string): DayResult {
    if (!input.trim()) {
      return 'Provide puzzle input in inputs/day11.txt or via --input/--raw flags.';
    }

    const graph: Record<string, string[]> = {};
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    for (const line of lines) {
      const source = line.split(':')[0].trim();
      const destinations = line.split(':')[1].trim().split(' ').map(dest => dest.trim());
      for (const dest of destinations) {
        if (!graph[source]) {
          graph[source] = [];
        }
        graph[source].push(dest);
      }
    }

    const start = 'svr';
    const target = 'out';

    // Check if this is a DAG by doing topological sort
    const allNodes = new Set<string>();
    for (const [src, dests] of Object.entries(graph)) {
      allNodes.add(src);
      for (const d of dests) allNodes.add(d);
    }

    // Try topological sort to check for cycles
    const inDegree: Record<string, number> = {};
    for (const node of allNodes) inDegree[node] = 0;
    for (const dests of Object.values(graph)) {
      for (const d of dests) inDegree[d]++;
    }

    const queue: string[] = [];
    for (const node of allNodes) {
      if (inDegree[node] === 0) queue.push(node);
    }

    const topoOrder: string[] = [];
    while (queue.length > 0) {
      const node = queue.shift()!;
      topoOrder.push(node);
      for (const next of (graph[node] || [])) {
        inDegree[next]--;
        if (inDegree[next] === 0) queue.push(next);
      }
    }

    const isDAG = topoOrder.length === allNodes.size;

    if (isDAG) {
      // Use DP on the DAG - much more efficient!
      // dp[node][state] = number of paths from 'start' to 'node' with given state
      // state: 0 = neither, 1 = seen dac, 2 = seen fft, 3 = seen both
      const dp: Record<string, bigint[]> = {};
      for (const node of allNodes) {
        dp[node] = [0n, 0n, 0n, 0n];
      }

      // Initialize: start node with appropriate state
      const startState = (start as string === 'dac' ? 1 : 0) | (start as string === 'fft' ? 2 : 0);
      dp[start][startState] = 1n;

      // Process in topological order
      for (const node of topoOrder) {
        const neighbors = graph[node] || [];
        for (const next of neighbors) {
          // Determine state transition when moving to 'next'
          const nextDac = next === 'dac' ? 1 : 0;
          const nextFft = next === 'fft' ? 2 : 0;

          for (let state = 0; state < 4; state++) {
            if (dp[node][state] > 0n) {
              const newState = state | nextDac | nextFft;
              dp[next][newState] += dp[node][state];
            }
          }
        }
      }

      // Answer: paths to 'out' with state 3 (seen both dac and fft)
      const result = dp[target]?.[3] ?? 0n;

      if (result === 0n) {
        return 'No paths from svr to out that visit dac and fft.';
      }

      return `Total paths found: ${result}`;
    } else {
      // Graph has cycles - fall back to DFS with visited tracking
      // This might still be slow for large graphs with many paths
      let matchingCount = 0n;

      function dfs(current: string, seenDac: boolean, seenFft: boolean, visited: Set<string>) {
        if (current === 'dac') seenDac = true;
        if (current === 'fft') seenFft = true;

        if (current === target) {
          if (seenDac && seenFft) matchingCount++;
          return;
        }

        visited.add(current);
        for (const next of (graph[current] || [])) {
          if (!visited.has(next)) {
            dfs(next, seenDac, seenFft, visited);
          }
        }
        visited.delete(current);
      }

      if (!graph[start]) {
        return 'No paths from svr to out.';
      }

      dfs(start, false, false, new Set<string>());

      if (matchingCount === 0n) {
        return 'No paths from svr to out that visit dac and fft.';
      }

      return `Total paths found: ${matchingCount}`;
    }
  }

}