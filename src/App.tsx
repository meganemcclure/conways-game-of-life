import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Cell from './Cell'
import Rules from './Rules'

export interface RulesType {
  density: number,      // density value (number, 0 -> 9)
  intervalVal: number,  // time of each life cycle (in MS)
  gridSize: number      // game is played on canvas gridSize x gridSize
}

function App() {
  const [rules, setRules] = useState({density: 1, intervalVal: 100, gridSize: 60} as RulesType)
  const [running, setRunning] = useState(false)
  const [grid, setGrid] = useState(init())

  useEffect(() => {
    let intervalId: number | undefined
    if (running) intervalId = setInterval(() => setGrid(updateState()), rules.intervalVal)
    return () => clearInterval(intervalId);
  }, [running, grid])

  function init() {
    let newGrid = new Array(rules.gridSize)

    for (let i = 0; i < newGrid.length; i++) {
      newGrid[i] = []

      for (let j = 0; j < newGrid.length; j++) {
        let random = Math.random() * 10
        newGrid[i].push(Math.floor(random) <= rules.density ? 1 : 0)
      }
    }

    return newGrid
  }

  function updateState() {
    let newGrid = new Array(rules.gridSize)

    for (let i = 0; i < grid.length; i++) {
      newGrid[i] = new Array(rules.gridSize).fill(0)

      for (let j = 0; j < grid[i].length; j++) {
        let numNeighbours = countNeighbours(grid, i, j)

        if (grid[i][j] == 1 && 2 <= numNeighbours  && numNeighbours <= 3) newGrid[i][j] = 1
        if (grid[i][j] == 0 && numNeighbours == 3) newGrid[i][j] = 1
      }
    }

    return newGrid
  }

  function countNeighbours(vals: number[][], rowIndex: number, colIndex: number) {
    let count = 0;

    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
      for (let j = colIndex - 1; j <= colIndex + 1; j++) {
        if (i == rowIndex && j == colIndex) continue; // current val, don't check this
        if (i < 0 || j < 0 || i >= vals.length || j >= vals.length) continue; // invalid index, skip this, assumption: matrix height = width

        if (vals[i][j] == 1) count++ 
      }
    }

    return count
  }

  return (
    <div className='gameContainer'>
      <h1>Conway's Game of Life</h1>
      <div className='cellCol'>
        {grid.map(row => {
          return <div key={uuidv4()} className='cellRow'>
            {row.map((cell: number) => {
              return <Cell key={uuidv4()} active={cell == 1 ? true : false} />
            })}
          </div>
        })}
      </div>
      <div className='buttonContainer'>
        <Rules 
          density={rules.density} 
          intervalVal={rules.intervalVal} 
          gridSize={rules.gridSize} 
          handleSetRules={(newRules: RulesType) => { setRules(newRules) }}
          handleInit={() => { setGrid(init()) }}
          disabled={running}
        />
        {/* <button disabled={running} onClick={() => { setGrid(init()) }}>Initialize</button> */}
        <button onClick={() => { setRunning(!running) }}>{running ? 'Stop' : 'Run'}</button>
      </div>
    </div>
  )
}

export default App
