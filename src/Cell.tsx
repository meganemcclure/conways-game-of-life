import './Cell.css'

interface CellPropsType {
  active: boolean
}

function Cell({ active }: CellPropsType) {

  return (
    <div className={active ? 'active' : 'inactive'} />
  )
}

export default Cell
