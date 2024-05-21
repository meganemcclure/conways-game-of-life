import { useState } from 'react'
import './Rules.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'

function Rules({ density, intervalVal, gridSize, handleSetRules, handleInit, disabled }: any) {
  const [isOpen, setIsOpen] = useState(false)

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
              <input 
                disabled={disabled}
                type='text' 
                id='density' 
                min={0}
                max={9}
                defaultValue={density} 
                onChange={(e) => { handleSetRules({ density: Number(e.target.value), intervalVal, gridSize }) }}
              />
              <label htmlFor='interval'>Interval (ms):</label>
              <input 
                disabled={disabled}
                type='text' 
                id='interval' 
                min={0}
                defaultValue={intervalVal} 
                onChange={(e) => { handleSetRules({ density, intervalVal: Number(e.target.value), gridSize }) }}
              />
              <label htmlFor='gridSize'>Grid Size (cells):</label>
              <input 
                disabled={disabled}
                type='text' 
                id='gridSize' 
                min={0}
                defaultValue={gridSize} 
                onChange={(e) => { handleSetRules({ density, intervalVal, gridSize: Number(e.target.value)}) }}
              />
            </form>
            <button className='initButton' disabled={disabled} onClick={() => { handleInit() }}>Initialize</button>
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
