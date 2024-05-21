import { useState } from 'react'
import './Rules.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'

function Rules({ density, intervalVal, gridSize, handleSetRules, handleInit, disabled }: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState({ density: false, intervalVal: false, gridSize: false})

  function handleBlur(val: number, errorKey: 'density' | 'intervalVal' | 'gridSize', min: number, max: number) {
    let errsCopy = { ...errors }

    if (val < min || val > max) {
      errsCopy[errorKey] = true
      setErrors(errsCopy)
    } else {
      errsCopy[errorKey] = false
      setErrors(errsCopy)
    }
  }

  function handleClick() {
    if (!(errors.density || errors.intervalVal || errors.gridSize)) {
      handleInit()
    }
  }

  return (
    <>
      {
        isOpen
        ?     
          <div className='rulesContainer'>
            <button className='gameRulesButton' onClick={() => { setIsOpen(false) }}>
              <FontAwesomeIcon className='icon' icon={faChevronDown} />
              Game Rules
            </button>

            <form>
              <label htmlFor='density'>Density (0-9):</label>
              {errors.density && 
                <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                  Error: Density must be a number 0-9
                </p>
              }
              <input 
                disabled={disabled}
                type='text' 
                id='density' 
                style={errors.density ? { borderColor: "rgb(255, 0, 0)" }: {}}
                onBlur={(e) => { handleBlur(Number(e.target.value), 'density', 0, 9) }}
                defaultValue={density} 
                onChange={(e) => { handleSetRules({ density: Number(e.target.value), intervalVal, gridSize }) }}
              />
              <label htmlFor='interval'>Interval (ms, 10-10000):</label>
              {errors.intervalVal && 
                <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                  Error: Interval must be a number 10-10000
                </p>
              }
              <input 
                disabled={disabled}
                type='text' 
                id='interval' 
                style={errors.intervalVal ? { borderColor: "rgb(255, 0, 0)" }: {}}
                onBlur={(e) => { handleBlur(Number(e.target.value), 'intervalVal', 10, 10000) }}
                defaultValue={intervalVal} 
                onChange={(e) => { handleSetRules({ density, intervalVal: Number(e.target.value), gridSize }) }}
              />
              <label htmlFor='gridSize'>Grid Size (cells, 10-200):</label>
              {errors.gridSize && 
                <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                  Error: Grid size must be a number 10-200
                </p>
              }
              <input 
                disabled={disabled}
                type='text' 
                id='gridSize' 
                style={errors.gridSize ? { borderColor: "rgb(255, 0, 0)" }: {}}
                onBlur={(e) => { handleBlur(Number(e.target.value), 'gridSize', 10, 200) }}
                defaultValue={gridSize} 
                onChange={(e) => { handleSetRules({ density, intervalVal, gridSize: Number(e.target.value)}) }}
              />
            </form>
            <button className='initButton' disabled={disabled} onClick={handleClick}>Initialize</button>
          </div>
        :
          <div className='rulesContainer'>
            <button className='gameRulesButton' onClick={() => { setIsOpen(true) }}>
              <FontAwesomeIcon className='icon' icon={faChevronRight} />
              Game Rules
            </button>
          </div>
      }
    </>
  )
}

export default Rules
