import { Dispatch } from 'react'
import { CartAction } from '../reducers/cart-reducer'
import type { Guitar } from '../types'

type GuitarProps = { guitar: Guitar; dispatch: Dispatch<CartAction> }

export function Guitar({ guitar, dispatch }: GuitarProps) {
  const { id, name, description, price, image } = guitar

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img className="img-fluid" src={`./public/img/${image}.jpg`} alt="imagen guitarra" />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button type="button" className="btn btn-dark w-100" onClick={() => dispatch({ type: 'add-to-card', payload: { item: guitar } })}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  )
}
